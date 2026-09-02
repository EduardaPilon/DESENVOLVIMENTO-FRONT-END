/*
export = permite que outro arquivo JavaScript ultilize a função
*/

export async function carregarTarefas() {
    try {
        const resposta = await fetch("../dados.json");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!dados || !Array.isArray(dados.tarefas)) {
            throw new Error("Formato inválido");
        }

        return dados.tarefas;

    } catch (erro) {
        throw erro;
    }
}