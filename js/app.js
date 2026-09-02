
import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { renderizarTarefas } from "./renderizacao.js";

async function iniciarAplicacao() {

    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {
            renderizarEstado("vazio");
            return;
        }

        renderizarTarefas(tarefas);
        renderizarEstado("sucesso", tarefas);

    } catch (erro) {

        let mensagem;

        if (erro.name === "TypeError") {
            mensagem = "Não foi possível carregar as tarefas. Verifique sua conexão.";
        } 
        else if (erro.name === "SyntaxError") {
            mensagem = "Não foi possível carregar as tarefas porque o arquivo JSON está inválido.";
        } 
        else {
            mensagem = `Não foi possível carregar as tarefas. ${erro.message}`;
        }

        renderizarEstado("erro", mensagem);
    }
}

iniciarAplicacao();