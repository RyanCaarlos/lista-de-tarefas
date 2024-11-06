document.addEventListener('DOMContentLoaded', () => {
    // 1. Pegar elementos HTML 
    const formulario = document.getElementById('taskForm');
    const campoTexto = document.getElementById('taskInput');
    const listaTarefas = document.getElementById('taskList');

    // 2. Criei um array para guardar as tarefas
    // Se já existirem tarefas salvas, pega elas, senão começa com array vazio
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // 3. salvar tarefas no navegador
    function salvarTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // 4. Função para mostrar as tarefas na tela
    function mostrarTarefas() {
        // Limpa a lista antes de mostrar
        listaTarefas.innerHTML = '';

        // Para cada tarefa no array, cria os elementos na tela
        tarefas.forEach((tarefa, posicao) => {
            // Cria um item de lista
            const li = document.createElement('li');
            //utilizando operador ternário 
            li.className = `task-item ${tarefa.completa ? 'completed' : ''}`;

            // Adiciona o conteúdo do item
            // com innerHTML
            li.innerHTML = `
                <span>${tarefa.texto}</span>
                <div class="task-actions">
                    <button class="task-button complete-btn" onclick="marcarTarefa(${posicao})">
                        ${tarefa.completa ? '↩️' : '✅'}
                    </button>
                    <button class="task-button delete-btn" onclick="apagarTarefa(${posicao})">
                        🗑️
                    </button>
                </div>
            `;

            // Adiciona o item na lista
            listaTarefas.appendChild(li);
        });
    }

    // 5. Função para marcar/desmarcar 
    window.marcarTarefa = (posicao) => {
        // para inverter o estado de completa/não completa
        tarefas[posicao].completa = !tarefas[posicao].completa;
        // Salva e atualiza a tela
        salvarTarefas();
        mostrarTarefas();
    };

    // 6. Função para apagar tarefa
    window.apagarTarefa = (posicao) => {
        // Remove a tarefa do array
        tarefas.splice(posicao, 1);
        // Salva e atualiza a tela
        salvarTarefas();
        mostrarTarefas();
    };

    // 7. Adicionar nova tarefa quando o formulário for enviado
    formulario.addEventListener('submit', (evento) => {
        // Impede a página de recarregar
        evento.preventDefault();

        // Pega o texto digitado e remove espaços em branco
        const textoTarefa = campoTexto.value.trim();

        // Se tiver texto, cria a nova tarefa
        if (textoTarefa) {
            // Adiciona nova tarefa ao array
            tarefas.push({
                texto: textoTarefa,
                completa: false
            });

            // Salva e atualiza a tela
            salvarTarefas();
            mostrarTarefas();

            // Limpar o campo de texto
            campoTexto.value = '';
        }
    });

    // 8. Mostra as tarefas quando a página carrega
    mostrarTarefas();
});