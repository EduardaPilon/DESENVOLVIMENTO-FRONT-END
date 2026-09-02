
export function renderizarTarefas(tarefas) {
    const listas = {
        "a-fazer": document.querySelector("#status-fazer + ul"),
        "andamento": document.querySelector("#status-andamento + ul"),
        "revisao": document.querySelector("#status-revisao + ul"),
        "concluida": document.querySelector("#status-concluida + ul")
    };

    Object.values(listas).forEach(lista => {
        lista.textContent = "";
    });
    //limpa os cartões antigos

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");

        const article = document.createElement("article");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const prazo = document.createElement("p");
        prazo.classList.add("prazo");
        prazo.textContent = `Prazo: ${tarefa.prazo}`;

        const prioridade = document.createElement("p");
        prioridade.classList.add("prioridade");
        prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

        article.appendChild(titulo);
        article.appendChild(prazo);
        article.appendChild(prioridade);

        li.appendChild(article);

        listas[tarefa.status].appendChild(li);
    });
}