
const API_URL = "https://apidadosabertos.saude.gov.br/sisvan/estado-nutricional";

async function testarAPI() {
    try {
        const parametros = new URLSearchParams({
            uf: "PR",
            limit: "20",
            offset: "0"
        });

        const url = `${API_URL}?${parametros}`;

        console.log("Consultando API:", url);

        const resposta = await fetch(url);

        console.log("Status HTTP:", resposta.status);

        if (!resposta.ok) {
            throw new Error(
                `Erro HTTP ${resposta.status}: ${resposta.statusText}`
            );
        }

        const resultado = await resposta.json();

        console.log("Resposta completa:", resultado);

        const dados = resultado.estados_nutricionais;

        console.log("Quantidade recebida:", dados.length);
        console.log("Primeiro registro:", dados[0]);

    } catch (erro) {
        console.error("Falha na consulta:", erro);
    }
}

testarAPI();
