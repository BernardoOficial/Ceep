import { criarUmElementoTarefa, ordenarTarefas } from '../componentes/criarTarefa.js'

const BotaoDeleta = (id) => {

    const botaoDeleta = document.createElement('button');
    botaoDeleta.innerText = 'Deletar';
    botaoDeleta.addEventListener('click', () => deletarTarefa(id));

    return botaoDeleta;
}

const deletarTarefa = (id) => {

    let tarefas = JSON.parse(localStorage.getItem('tarefas'));

    tarefas.splice(id, 1);

    criarUmElementoTarefa(ordenarTarefas(tarefas));

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export default BotaoDeleta;