
export function renderizarEstado(estado, dados) {
    const status = document.querySelector('[role="status"]');

    if (estado === "carregando") {
        status.textContent = "Carregando tarefas...";
    }

    if (estado === "sucesso") {
    status.textContent = `${dados.visiveis} de ${dados.total} tarefas.`;
    }

    if (estado === "vazio") {
        status.textContent = "Nenhuma tarefa cadastrada.";
    }

    if (estado === "resultado-vazio") {
        status.textContent = "Nenhuma tarefa corresponde aos filtros.";
    }

    if (estado === "erro") {
        status.textContent = dados;
    }
}