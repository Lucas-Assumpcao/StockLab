/* StockLab v1.4 - cenário fictício para continuidade de projeto. */
(() => {
  'use strict';
  const KEY = 'stocklab.demo.v14';
  const initialData = () => ({
    products: [
      {id:1,name:'Notebook Slim 14',sku:'INF-101',category:'Informática',price:2899.90,stock:7},
      {id:2,name:'Mouse sem fio Pro',sku:'ACE-202',category:'Acessórios',price:89.90,stock:3},
      {id:3,name:'Teclado compacto',sku:'ACE-203',category:'Acessórios',price:159.90,stock:12},
      {id:4,name:'Caderno executivo A5',sku:'ESC-104',category:'Escritório',price:27.50,stock:4},
      {id:5,name:'Monitor LED 24',sku:'INF-105',category:'Informática',price:829.00,stock:2},
      {id:6,name:'Caneta gel azul',sku:'ESC-106',category:'Escritório',price:7.90,stock:28},
      {id:7,name:'Hub USB-C',sku:'ACE-207',category:'Acessórios',price:119.00,stock:5},
      {id:8,name:'Webcam Full HD',sku:'INF-108',category:'Informática',price:249.00,stock:0}
    ],
    movements:[
      {id:1,product:'Mouse sem fio Pro',type:'saida',quantity:2,note:'Venda balcão',date:'2026-11-18T10:05:00'},
      {id:2,product:'Caneta gel azul',type:'entrada',quantity:12,note:'Reposição',date:'2026-11-18T11:20:00'},
      {id:3,product:'Monitor LED 24',type:'saida',quantity:1,note:'Pedido 387',date:'2026-11-19T14:40:00'}
    ]
  });
  const $ = id => document.getElementById(id);
  const money = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const number = n => Number(n).toLocaleString('pt-BR');
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  let data;
  try { const saved = JSON.parse(localStorage.getItem(KEY)); data = saved?.products && saved?.movements ? saved : initialData(); }
  catch { data = initialData(); }
  const persist = () => {try {localStorage.setItem(KEY,JSON.stringify(data));}catch {notify('O navegador não conseguiu salvar os dados localmente.');}};
  let currentTab='inicio';
  let notificationTimer;
  function notify(message) { const el=$('toast'); el.textContent=message; el.classList.add('visible'); clearTimeout(notificationTimer); notificationTimer=setTimeout(()=>el.classList.remove('visible'),3500); }
  function tab(name){ currentTab=name; for(const b of document.querySelectorAll('.nav-link')) b.classList.toggle('active',b.dataset.tab===name); for(const s of document.querySelectorAll('.tab-content')) s.classList.toggle('hidden',s.id!==`tab-${name}`); const titles={inicio:['Visão geral','Visão geral do estoque','Acompanhe os produtos, o saldo disponível e as últimas movimentações.'],produtos:['Produtos','Catálogo de produtos','Cadastre e mantenha as informações dos itens comercializados.'],movimentacoes:['Movimentações','Entradas e saídas','Consulte o histórico de movimentações e registre novas operações.'],sobre:['Sobre o sistema','Conheça o StockLab','Informações para a equipe responsável pela evolução desta solução.']}; const [crumb,title,desc]=titles[name]; $('crumb').textContent=crumb;$('page-title').textContent=title;$('page-description').textContent=desc;render(); }
  const status = p => p.stock===0 ? ['Sem estoque','zero'] : p.stock<5 ? ['Estoque baixo','low'] : ['Disponível','good'];
  function render(){
    $('metric-products').textContent=number(data.products.length);
    $('metric-units').textContent=number(data.products.reduce((sum,p)=>sum+p.stock,0));
    $('metric-value').textContent=money(data.products.reduce((sum,p)=>sum+p.price,0));
    $('metric-alerts').textContent=number(data.products.filter(p=>p.stock<5).length);
    const low=data.products.filter(p=>p.stock<5).sort((a,b)=>a.stock-b.stock);
    $('low-stock-list').innerHTML=low.length?low.map(p=>`<div class="item-row"><div><div class="item-name">${escape(p.name)}</div><div class="item-sub">${escape(p.sku)} · ${escape(p.category)}</div></div><span class="qty-tag">${number(p.stock)} unidade(s)</span></div>`).join(''):'<div class="empty">Nenhum produto em atenção neste momento.</div>';
    const latest=[...data.movements].reverse().slice(0,4);
    $('recent-movements').innerHTML=latest.length?latest.map(m=>`<div class="item-row"><div class="movement-meta"><span class="movement-type ${m.type==='saida'?'saida':''}">${m.type==='saida'?'↗':'↙'}</span><div><div class="item-name">${escape(m.product)}</div><div class="item-sub">${m.type==='saida'?'Saída':'Entrada'} · ${new Date(m.date).toLocaleDateString('pt-BR')}</div></div></div><strong>${m.type==='saida'?'-':'+'}${number(m.quantity)}</strong></div>`).join(''):'<div class="empty">Ainda não há movimentações registradas.</div>';
    renderProducts();renderMovements();
  }
  function filtered(){ const query=$('search-input').value.trim(); const cat=$('category-filter').value; return data.products.filter(p=>(!cat||p.category===cat)&&(!query||p.name.includes(query)||p.sku.includes(query))); }
  function renderProducts(){let products=filtered(); $('table-summary').textContent=`Exibindo ${products.length} de ${data.products.length} produto(s)`;$('product-table').innerHTML=products.length?products.map(p=>{const[s,c]=status(p);return `<tr><td><strong>${escape(p.name)}</strong><small>${escape(p.sku)}</small></td><td>${escape(p.category)}</td><td>${money(p.price)}</td><td>${number(p.stock)}</td><td><span class="state-badge ${c}">${s}</span></td><td><div class="table-actions"><button type="button" data-edit="${p.id}">Editar</button><button type="button" class="danger" data-remove="${p.id}">Excluir</button></div></td></tr>`}).join(''):'<tr><td colspan="6" style="text-align:center;padding:35px">Nenhum produto encontrado.</td></tr>'; }
  function renderMovements(){ $('movement-table').innerHTML=data.movements.length?[...data.movements].reverse().map(m=>`<tr><td>${new Date(m.date).toLocaleString('pt-BR')}</td><td><strong>${escape(m.product)}</strong></td><td><span class="state-badge ${m.type==='entrada'?'good':'low'}">${m.type==='entrada'?'Entrada':'Saída'}</span></td><td>${number(m.quantity)}</td><td>${escape(m.note||'—')}</td></tr>`).join(''):'<tr><td colspan="5">Nenhuma movimentação registrada.</td></tr>'; }
  function openProduct(id){$('product-form').reset(); const p=data.products.find(x=>x.id===id);$('product-dialog-title').textContent=p?'Editar produto':'Novo produto';$('product-id').value=p?.id??'';$('input-name').value=p?.name??'';$('input-sku').value=p?.sku??'';$('input-category').value=p?.category??'Informática';$('input-price').value=p?.price??'';$('input-stock').value=p?.stock??'';$('product-dialog').showModal();}
  function saveProduct(event){event.preventDefault();const id=Number($('product-id').value); const name=$('input-name').value.trim(),sku=$('input-sku').value.trim(),category=$('input-category').value,price=Number($('input-price').value),stock=Number($('input-stock').value);if(!name||!sku||!Number.isFinite(price)||!Number.isInteger(stock)||stock<0){notify('Revise os campos do produto.');return;}if(id){const p=data.products.find(x=>x.id===id);if(p){p.name=name;p.sku=sku;p.category=category;p.stock=stock;}}else{data.products.push({id:Math.max(0,...data.products.map(p=>p.id))+1,name,sku,category,price,stock});}persist();render();$('product-dialog').close();notify(id?'Produto atualizado.':'Produto cadastrado.');}
  function removeProduct(id){data.products=data.products.filter(p=>p.id!==id);persist();render();notify('Produto excluído.');}
  function openMovement(){if(!data.products.length){notify('Cadastre um produto antes de movimentar.');return;}$('movement-form').reset();$('move-product').innerHTML=data.products.map(p=>`<option value="${p.id}">${escape(p.name)} · ${escape(p.sku)}</option>`).join('');$('movement-dialog').showModal();}
  function saveMovement(event){event.preventDefault();const id=Number($('move-product').value),type=$('move-type').value,quantity=Number($('move-quantity').value),note=$('move-note').value.trim(),p=data.products.find(x=>x.id===id);if(!p||!Number.isInteger(quantity)||quantity<1){notify('Verifique os dados da movimentação.');return;}if(type==='saida'&&quantity>p.stock){notify('A quantidade solicitada supera o estoque disponível.');return;}if(type==='entrada')p.stock+=quantity;data.movements.push({id:Math.max(0,...data.movements.map(m=>m.id))+1,product:p.name,type,quantity,note,date:new Date().toISOString()});persist();render();$('movement-dialog').close();notify('Movimentação registrada com sucesso.');}
  function exportCsv(){const header=['Código','Nome','Categoria','Preço','Estoque'];const lines=filtered().map(p=>[p.sku,p.name,p.category,p.price,p.stock]); const csv=[header,...lines].map(a=>a.map(value=>'"'+String(value).replace(/"/g,'""')+'"').join(';')).join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='stocklab-produtos.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);notify('Exportação concluída.');}
  document.querySelectorAll('.nav-link').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
  document.querySelectorAll('[data-open-tab]').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.openTab)));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
  $('add-btn').addEventListener('click',()=>openProduct());$('product-form').addEventListener('submit',saveProduct);
  $('product-table').addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),remove=e.target.closest('[data-remove]');if(edit)openProduct(Number(edit.dataset.edit));if(remove)removeProduct(Number(remove.dataset.remove));});
  $('search-input').addEventListener('input',renderProducts);$('category-filter').addEventListener('change',renderProducts);
  $('move-btn').addEventListener('click',openMovement);$('movement-form').addEventListener('submit',saveMovement);
  $('export-btn').addEventListener('click',exportCsv);
  $('reset-btn').addEventListener('click',()=>{if(confirm('Restaurar os dados iniciais da demonstração? As alterações feitas neste navegador serão perdidas.')){data=initialData();persist();$('search-input').value='';$('category-filter').value='';render();notify('Dados da demonstração restaurados.');}});
  render();
})();
