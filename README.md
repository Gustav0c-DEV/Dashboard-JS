# NutriData — SISVAN

Dashboard acadêmico para exploração de dados públicos de estado nutricional do SISVAN, com interface React/Vite e servidor Node.js/Express como proxy da API.

## Requisitos
- Node.js 18 ou superior (recomendado 20+).
- Conexão com a internet para consultar a API e carregar Chart.js/Google Fonts.

## Instalação
Abra o terminal na pasta do projeto:

```bash
npm install
npm start
```

Acesse http://localhost:3000.

Para desenvolvimento com atualização automática da interface, use `npm run dev`. O Vite fica em http://localhost:5173 e encaminha as chamadas `/api` ao servidor Express na porta 3001. A produção continua usando a porta 3000 por padrão.

**Não use Live Server** para executar esta versão. O servidor Express entrega o front-end e cria a rota intermediária `/api/sisvan`, evitando o bloqueio CORS do navegador.

## Funcionamento
- A aplicação consulta `GET https://apidadosabertos.saude.gov.br/sisvan/estado-nutricional`.
- A primeira consulta usa `uf=PR`, `limit=20` e `offset=0`.
- Use **Carregar mais** para avançar a paginação.
- Os indicadores são calculados somente sobre os registros carregados na sessão.
- O front-end tenta reconhecer diferentes nomes de campos; confirme os nomes reais no JSON antes de usar os indicadores em conclusões.

## Limitações e cuidados metodológicos
- A disponibilidade, autenticação, filtros e formato de resposta dependem da API oficial. Se a API exigir credenciais ou parâmetros adicionais, ajuste `server.cjs` conforme o Swagger.
- O endpoint pode devolver uma estrutura diferente de `estados_nutricionais`; o extrator aceita arrays no nível superior ou dentro de uma propriedade.
- O painel não deduplica pessoas por identificador. Remove apenas objetos idênticos dentro da sessão; isso não equivale a deduplicação epidemiológica.
- "Excesso de peso" é uma aproximação exploratória por texto da classificação e não deve misturar critérios de diferentes fases da vida. Valide a classificação e o denominador antes de publicar resultados.
- Dados de acompanhamento do SISVAN não representam automaticamente toda a população do Paraná.
- Não armazene dados pessoais ou identificáveis. Use somente dados públicos e anonimizados.

## Estrutura
- `server.cjs`: servidor Express e proxy da API.
- `index.html`: entrada do Vite.
- `public/css/style.css`: identidade visual.
- `src/main.jsx`: inicialização do React.
- `src/App.jsx`: componentes, consulta, indicadores, gráficos e tabela.
- `vite.config.mjs`: configuração do Vite e proxy de desenvolvimento.
- `server.cjs`: servidor Express e proxy da API.
- `docs/diagnostico.md`: registro das descobertas e decisões.
