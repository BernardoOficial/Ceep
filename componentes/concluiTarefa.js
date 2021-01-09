import { criarUmElementoTarefa, ordenarTarefas } from '../componentes/criarTarefa.js'

const BotaoConclui = (tarefa, id) => {

    const botaoConclui = document.createElement('button');
    botaoConclui.classList.add('check-button');
    botaoConclui.innerText = 'Concluir';
    botaoConclui.addEventListener('click', () => concluirTarefa(tarefa, id));

    return botaoConclui;
}

const concluirTarefa = (tarefa, id) => {

    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    tarefas[id].concluido = !tarefa.concluido;

    criarUmElementoTarefa(ordenarTarefas(tarefas));

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export default BotaoConclui;