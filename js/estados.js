
export function renderizarEstado(estado, dados) {
    const status = document.querySelector('[role="status"]');

    if (estado === "carregando") {
        status.textContent = "Carregando tarefas...";
    }

    if (estado === "sucesso") {
        status.textContent = `${dados.length} tarefas carregadas.`;
    }

    if (estado === "vazio") {
        status.textContent = "Nenhuma tarefa encontrada.";
    }

    if (estado === "erro") {
        status.textContent = dados;
    }
}