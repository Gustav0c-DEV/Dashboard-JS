
async function explorarDados() {
    try {
        // 1. Buscar o arquivo JSON
        const resposta = await fetch("data/estado-nutricional.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar JSON: " + resposta.status);
        }

        // 2. Converter para JSON
        const json = await resposta.json();

        const dados = json.estados_nutricionais;

        console.log("========== DIAGNÓSTICO SISVAN ==========");

        // 3. Quantidade de registros
        console.log("Total de registros:", dados.length);

        // 4. Distribuição por estado
        const estados = {};

        dados.forEach(item => {
            estados[item.uf] = (estados[item.uf] || 0) + 1;
        });

        console.log("Registros por estado:", estados);

        // 5. Filtrar Paraná
        const dadosPR = dados.filter(item => item.uf === "PR");

        console.log("Registros do Paraná:", dadosPR.length);

        // 6. Municípios encontrados
        const municipios = [...new Set(
            dadosPR.map(item => item.municipio)
        )];

        console.log("Municípios do Paraná:", municipios);

        // 7. Distribuição por fase da vida
        const fases = {};

        dadosPR.forEach(item => {
            fases[item.fase_vida] =
                (fases[item.fase_vida] || 0) + 1;
        });

        console.log("Fases da vida no Paraná:", fases);

        // 8. Verificar valores nulos
        const campos = Object.keys(dados[0]);
        const valoresNulos = {};

        campos.forEach(campo => {
            valoresNulos[campo] = dados.filter(
                item => item[campo] === null
            ).length;
        });

        console.log("Valores nulos:", valoresNulos);

        console.log("========== FIM DO DIAGNÓSTICO ==========");

    } catch (erro) {
        console.error("Erro na exploração:", erro);
    }
}

explorarDados();
