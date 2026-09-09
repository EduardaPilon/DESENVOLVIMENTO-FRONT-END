
import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { renderizarTarefas } from "./renderizacao.js";

const estado = {
    tarefas: [],
    busca: "",
    status: "Todos",
    prioridade: "Todas",
    ordenacao: "nenhuma",
    carregamento: "carregando",
    erro: null
};

function derivarTarefas(estado) {
    let tarefas = [...estado.tarefas];

    if (estado.busca !== "") {
        tarefas = tarefas.filter(tarefa =>
            tarefa.titulo.toLowerCase().includes(estado.busca.toLowerCase())
        );
    }

    if (estado.status !== "Todos") {
        tarefas = tarefas.filter(tarefa =>
            tarefa.status === estado.status
        );
    }

    if (estado.prioridade !== "Todas") {
        tarefas = tarefas.filter(tarefa =>
            tarefa.prioridade === estado.prioridade
        );
    }

    if (estado.ordenacao === "prazo") {
        tarefas.sort((a, b) => {
            const dataA = new Date(a.prazo.split("/").reverse().join("-"));
            const dataB = new Date(b.prazo.split("/").reverse().join("-"));

            return dataA - dataB;
        });
    }

    return tarefas;
}

async function iniciarAplicacao() {

    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();
        estado.tarefas = tarefas;

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