
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

function renderizar() {

    if (estado.carregamento === "carregando") {
    renderizarTarefas([]);
    renderizarEstado("carregando");
    return;
}

    if (estado.carregamento === "erro") {
        renderizarTarefas([]);
        renderizarEstado("erro", estado.erro);
        return;
    }

    const tarefasVisiveis = derivarTarefas(estado);

    renderizarTarefas(tarefasVisiveis);

    if (estado.tarefas.length === 0) {
        renderizarEstado("vazio");
        return;
    }

    if (tarefasVisiveis.length === 0) {
        renderizarEstado("resultado-vazio");
        return;
    }

    renderizarEstado("sucesso", {
        visiveis: tarefasVisiveis.length,
        total: estado.tarefas.length
    });
}

const campoBusca = document.querySelector("#busca");

campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    renderizar();
});

const camposStatus = document.querySelectorAll('input[name="status"]');

camposStatus.forEach((campo) => {
    campo.addEventListener("change", (evento) => {
        estado.status = evento.target.value;
        renderizar();
    });
});

const camposPrioridade = document.querySelectorAll('input[name="prioridade"]');

camposPrioridade.forEach((campo) => {
    campo.addEventListener("change", (evento) => {
        estado.prioridade = evento.target.value;
        renderizar();
    });
});

const campoOrdenacao = document.querySelector("#ordenacao");

campoOrdenacao.addEventListener("change", (evento) => {
    estado.ordenacao = evento.target.value;
    renderizar();
});

const botaoLimpar = document.querySelector("#limpar-filtros");

botaoLimpar.addEventListener("click", () => {
    estado.busca = "";
    estado.status = "Todos";
    estado.prioridade = "Todas";
    estado.ordenacao = "nenhuma";

    document.querySelector("#busca").value = "";
    document.querySelector("#todos").checked = true;
    document.querySelector("#todas").checked = true;
    document.querySelector("#ordenacao").value = "nenhuma";

    renderizar();
});

async function iniciarAplicacao() {

    estado.carregamento = "carregando";
    estado.erro = null;

    renderizar();

    try {
        const tarefas = await carregarTarefas();

        estado.tarefas = tarefas;
        estado.carregamento = "sucesso";
        estado.erro = null;

        renderizar();

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

        estado.carregamento = "erro";
        estado.erro = mensagem;

        renderizar();
    }
}

iniciarAplicacao();