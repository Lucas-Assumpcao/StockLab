# Solução da atividade — StockLab

> **Organização da entrega:** atividade realizada por uma pessoa. Todo o levantamento, priorização, planejamento e apresentação será feito pelo mesmo participante.

## 1. Identificação e resumo do software

O **StockLab** é um sistema fictício de controle de estoque para um comércio de bairro. A solução permite acompanhar produtos, unidades disponíveis, valor do estoque e movimentações de entrada e saída.

A versão atual é a **1.4** e funciona apenas no navegador, utilizando `localStorage`. Não possui servidor, autenticação ou banco de dados externo.

**Problema de negócio:** evitar falta ou excesso de mercadorias, manter o cadastro atualizado e facilitar o acompanhamento das entradas e saídas do estoque.

## 2. Funcionalidades existentes

- Painel de visão geral com quantidade de produtos, unidades, valor em estoque e alertas.
- Lista de produtos com estoque baixo.
- Cadastro de novos produtos.
- Edição e exclusão de produtos.
- Pesquisa por nome ou código.
- Filtro por categoria.
- Exportação do catálogo filtrado em CSV.
- Registro de entradas e saídas.
- Validação para impedir saídas maiores que o estoque disponível.
- Consulta ao histórico de movimentações.
- Restauração dos dados iniciais.
- Armazenamento local no navegador.

## 3. Usuários e necessidades

### Operador de estoque

Responsável pelo cadastro, entrada de mercadorias e registro de vendas ou retiradas. Precisa realizar operações rapidamente e receber mensagens claras quando houver erro.

### Gestor ou responsável pela loja

Consulta o estoque geral, identifica produtos que precisam de reposição e acompanha movimentações recentes. Precisa de informações confiáveis para tomar decisões de compra.

### Responsável pela manutenção

Uma única pessoa será responsável por compreender o sistema atual, organizar as demandas, planejar a evolução e preparar a apresentação. Ela precisa de regras claras, limitações documentadas e prioridades justificadas.

## 4. Diagnóstico inicial

### Pontos positivos

- Interface simples e organizada em páginas.
- Navegação clara entre Visão geral, Produtos, Movimentações e Sobre o sistema.
- Os menus laterais possuem hover e indicam claramente o item ativo.
- Principais operações podem ser executadas sem instalação.
- Existem prevenções básicas de estoque negativo e campos obrigatórios.
- Os botões principais possuem estados visuais de hover.
- O projeto é leve e pode ser usado em demonstrações locais.

### Limitações e dúvidas

- Os dados ficam presos ao navegador e podem ser perdidos ao limpar o histórico ou trocar de dispositivo.
- Não há identificação de usuários ou registro de responsável pelas operações.
- Os critérios para estoque baixo não podem ser configurados por produto.
- O valor exibido na visão geral não corresponde ao valor total do estoque, pois soma apenas o preço unitário dos produtos.
- A edição de um produto não atualiza o preço unitário.
- Excluir um produto não apresenta confirmação e não impede ações que poderiam afetar o histórico.
- Não há hover ou feedback claro em todos os elementos do cabeçalho.
- O ponto verde da barra lateral parece um indicador animado ou de conexão, mas não possui animação e não representa um estado real confirmado pelo sistema.
- Não há paginação, auditoria ou suporte à importação de dados.
- Algumas regras precisam ser confirmadas com o cliente, como SKU único, limite mínimo de estoque e histórico obrigatório.

## 5. Demandas priorizáveis

Como a entrega é individual, o participante será responsável pela análise e pelo registro de todas as demandas no backlog.

### Demanda 1 — Corrigir o cálculo do valor em estoque

- **Contexto e impacto:** o gestor pode tomar decisões erradas ao ver um valor incorreto na visão geral. Atualmente, o sistema soma os preços unitários dos produtos, em vez de multiplicar o preço pela quantidade existente.
- **Tipo:** correção.
- **Prioridade:** alta, pois afeta diretamente a confiabilidade das informações financeiras.
- **Proposta:** calcular o valor total com a fórmula `preço unitário × quantidade em estoque` e validar o resultado.
- **Responsável pela análise:** participante individual.

### Demanda 2 — Permitir atualização do preço na edição

- **Contexto e impacto:** o operador pode alterar um produto, mas o novo preço informado não é salvo. Isso mantém informações desatualizadas no catálogo.
- **Tipo:** correção.
- **Prioridade:** alta, pois pode afetar a avaliação do estoque e decisões de venda ou compra.
- **Proposta:** atualizar o preço unitário na função de edição e confirmar que o novo valor aparece no sistema.
- **Responsável pela análise:** participante individual.

### Demanda 3 — Confirmar exclusão de produto

- **Contexto e impacto:** a exclusão pode remover um item do catálogo por engano e não possui uma confirmação.
- **Tipo:** melhoria.
- **Prioridade:** média, pois reduz riscos operacionais, mas não impede todas as atividades.
- **Proposta:** exibir uma confirmação antes da exclusão e informar que a ação não poderá ser desfeita.
- **Responsável pela análise:** participante individual.

### Demanda 4 — Definir limites de estoque baixo

- **Contexto e impacto:** todos os produtos usam o mesmo limite geral de menos de cinco unidades. A necessidade de reposição pode variar de acordo com o item.
- **Tipo:** dúvida de requisito.
- **Prioridade:** alta, pois a falta de uma regra clara pode gerar alertas incorretos.
- **Proposta:** perguntar ao cliente quais produtos precisam de limite personalizado e permitir um estoque mínimo por produto.
- **Responsável pela análise:** participante individual.

### Demanda 5 — Avaliar o armazenamento dos dados

- **Contexto e impacto:** os dados ficam apenas no navegador. Ao trocar de navegador ou limpar os dados locais, as informações podem ser perdidas.
- **Tipo:** melhoria.
- **Prioridade:** alta, pois compromete a continuidade do trabalho e a confiabilidade das informações.
- **Proposta:** confirmar se o armazenamento local atende ao uso atual ou se será necessário adicionar banco de dados e autenticação em uma versão futura.
- **Responsável pela análise:** participante individual.

### Demanda 6 — Melhorar o feedback visual do cabeçalho e da barra lateral

- **Contexto e impacto:** o usuário não recebe uma indicação visual clara ao passar o mouse sobre elementos do cabeçalho. Além disso, o ponto verde da barra lateral parece um indicador animado ou de conexão, mas é estático e não confirma estado real.
- **Tipo:** melhoria de interface.
- **Prioridade:** média, pois melhora clareza e usabilidade, mas não impede o funcionamento principal do estoque.
- **Proposta:** adicionar estados de hover consistentes aos elementos interativos do cabeçalho e transformar o ponto verde em um indicador visual claro. Caso não represente uma conexão real, o texto ao redor deve deixar explícito que os dados são locais.
- **Responsável pela análise:** participante individual.

## 6. Backlog organizado

As seis demandas serão registradas em um quadro próprio, no Trello ou em papel, com as colunas:

- **Ideias/pendências**
- **Priorizado**
- **Planejado**
- **Em andamento**
- **Concluído**

Cada cartão deverá conter:

- Título curto;
- Descrição da situação;
- Impacto no usuário;
- Tipo da demanda;
- Prioridade;
- Responsável pela análise: participante individual;
- Critério de conclusão;
- Comentários ou resposta do cliente.

Organização inicial:

- `Priorizado`: corrigir valor em estoque; corrigir edição de preço; melhorar feedback visual do cabeçalho e da barra lateral.
- `Planejado`: definir limites de estoque baixo; confirmar exclusão de produto.
- `Ideias/pendências`: avaliar o armazenamento dos dados.

Somente as três demandas priorizadas serão incluídas na primeira entrega. Os limites personalizados dependem da confirmação de requisitos pelo cliente, a exclusão tem menor urgência financeira e o armazenamento centralizado exige uma decisão técnica antes da implementação.

## 7. Proposta da versão 1.5

### Objetivo

Disponibilizar uma versão mais confiável para consulta e manutenção do estoque, corrigindo cálculos e dados editáveis críticos e oferecendo feedback visual claro na interface.

### Demandas selecionadas

A primeira entrega conterá somente:

1. **Corrigir o cálculo do valor em estoque** — elimina uma informação potencialmente incorreta.
2. **Permitir atualização do preço na edição** — garante que o catálogo reflita o preço vigente.
3. **Melhorar o feedback visual do cabeçalho e da barra lateral** — deixa os estados interativos e o indicador local mais claros.

### Justificativa da seleção

As três demandas foram escolhidas por terem impacto direto na confiabilidade das informações e na experiência de uso. Elas formam um escopo possível de ser concluído por uma pessoa no prazo da atividade.

Os limites personalizados ficaram em planejamento porque a regra ainda precisa ser confirmada pelo cliente. A confirmação de exclusão tem menor urgência financeira, e o armazenamento centralizado exige uma decisão técnica e uma infraestrutura adicional.

### Escopo

**Entra:**

- Correção do cálculo do valor total;
- Atualização do preço na edição;
- Estados de hover no cabeçalho;
- Indicador visual claro na barra lateral;
- Ajustes da interface necessários;
- Registro e validação das regras acordadas.

**Não entra:**

- Banco de dados externo;
- Autenticação de usuários;
- Sincronização entre dispositivos;
- Histórico completo com usuário responsável;
- Novos módulos ou integrações externas;
- Limites personalizados até a confirmação do cliente.

## 8. Plano simples de evolução — entrega individual

| Ordem | Atividade                                                                            | Responsável             | Estimativa |
| ----: | ------------------------------------------------------------------------------------ | ----------------------- | ---------: |
|     1 | Levantar e confirmar regras sobre valor em estoque e atualização de preço            | Participante individual |    3 horas |
|     2 | Ajustar cálculos, edição de preços e feedback visual do cabeçalho e da barra lateral | Participante individual |    5 horas |
|     3 | Validar o fluxo, revisar a interface e registrar os resultados                       | Participante individual |    4 horas |

**Esforço total estimado:** 12 horas para uma pessoa.

**Organização do trabalho:**

- Levantamento e registro das demandas: 3 horas.
- Ajustes e planejamento da solução: 5 horas.
- Revisão do documento e preparação da apresentação: 4 horas.
- Apresentação individual: até 3 minutos.

## 9. Recursos necessários

- Uma pessoa responsável pela atividade;
- Google Chrome ou Microsoft Edge;
- VS Code;
- Servidor HTTP local, caso seja necessário;
- Live Server como alternativa opcional;
- Trello ou quadro em papel;
- Arquivos atuais do projeto;
- Computador pessoal;
- Pasta local ou repositório para armazenar o documento;
- Contato com o cliente para validar os requisitos pendentes.

Não há custo obrigatório previsto. Eventuais custos poderão ser estimados somente após definição de banco de dados, hospedagem ou ferramentas pagas.

## 10. Risco e prevenção

| Risco                                         | Impacto                                                           | Medida de prevenção                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Uma pessoa acumular todas as atividades       | Pode comprometer o prazo da entrega                               | Reservar horários separados para análise, planejamento e apresentação                     |
| Perda de dados do navegador durante os testes | Pode invalidar os resultados ou apagar alterações da demonstração | Testar com dados de demonstração e usar o botão Restaurar dados antes e depois dos testes |
| Feedback visual implementado sem padrão claro | Pode gerar confusão sobre estados ativos e dados locais           | Definir o significado do hover e do indicador antes da alteração                          |
| Escopo maior que o tempo disponível           | Pode atrasar a versão 1.5                                         | Manter fora da entrega banco de dados, autenticação e integrações                         |

## 11. Perguntas pendentes para o cliente

- Cada produto deve possuir seu próprio limite mínimo de estoque?
- Qual mensagem ou classificação deve ser usada para estoque baixo e sem estoque?
- O código SKU deve ser único?
- É permitido excluir um produto que já apareceu em uma movimentação?
- Os dados locais no navegador são suficientes ou existe necessidade de compartilhamento entre computadores?
- O valor em estoque deve considerar custo de aquisição, preço de venda ou ambos?
- O ponto verde da barra lateral deve representar alguma conexão real ou apenas ambiente local?
- Os responsáveis pelas operações precisam ser registrados em uma próxima versão?
- Existe histórico mínimo ou período de retenção obrigatório?
