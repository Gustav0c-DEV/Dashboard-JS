# NutriData — Diagnóstico SISVAN

## Escopo
- Fonte: API de Dados Abertos do Ministério da Saúde — SISVAN / Estado Nutricional.
- Abrangência planejada: Paraná (`PR`).
- Período: todos os anos disponíveis, a confirmar por exploração da API.
- Formato: JSON.
- Stack: Node.js/Express, React, Vite e CSS.

## Amostra inicial recebida
O arquivo JSON inicial continha 5 registros:
- PR: 2
- PA: 2
- PI: 1

Municípios do Paraná na amostra: Cruzeiro do Oeste e Pato Branco.

## Estrutura observada na amostra
Foram observados campos como `uf`, `municipio`, `idade`, `fase_vida`, `sexo`, `data_acompanhamento`, `peso`, `altura`, `imc` e campos de classificação nutricional específicos por fase da vida.

## Qualidade e limitações
- Há campos nulos, inclusive campos específicos de fases da vida.
- Valores antropométricos podem chegar como texto e usar vírgula decimal.
- A amostra de 5 registros não permite inferência estatística.
- Uma pessoa pode possuir mais de um acompanhamento; não confundir linhas com pessoas únicas.
- Não misturar critérios de classificação nutricional entre crianças, adolescentes, adultos e idosos.

## Próximas verificações
1. Confirmar resposta e parâmetros do endpoint via API.
2. Confirmar o campo que contém a lista de registros.
3. Confirmar filtros por UF e período.
4. Confirmar limite máximo e comportamento do offset.
5. Percorrer páginas até o fim e registrar anos disponíveis.
6. Auditar nulos, duplicidades, tipos e categorias antes de definir métricas.
