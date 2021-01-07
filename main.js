import BotaoConclui from './componentes/concluiTarefa.js'
import BotaoDeleta from './componentes/deletaTarefa.js'
import { textoParaData, dataParaTexto } from './conversorDeData.js'

const $ = document.querySelector.bind(document);

// variáveis
const novaTarefa = $('[data-form-button]');
const lista = $('[data-list]');
const inputTarefa = $('[data-form-tarefa]');
const inputDate = $('[data-form-date]');

const criarTarefa = (evento) => {

    evento.preventDefault();

    const tarefa = inputTarefa.value;
    const data = inputDate.value;

    const { dataBR, horario } = textoParaData(data);

    const dados = {
        tarefa,
        dataBR,
        horario
    }

    const tarefasArray = getTarefasLocalStorage() || [];

    tarefasArray.push(dados);

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));

    criarUmElementoTarefa(dados);

    limparCampos();
}

const limparCampos = () => {

    inputTarefa.value = "";
    inputDate.value = "";
}

const criarUmElementoTarefa = ({ tarefa, dataBR, horario }) => {

    const li = document.createElement('li');
    li.classList.add('task');

    const conteudo = `<p class="content">${dataBR} * ${horario} * ${tarefa}</p>`;

    li.innerHTML = conteudo;

    li.appendChild(BotaoConclui());
    li.appendChild(BotaoDeleta());
    lista.appendChild(li);
}

const criarElementosTarefas = (tarefasArray) => {

    tarefasArray.forEach(tarefa => {

        const li = document.createElement('li');
        li.classList.add('task');

        const conteudo = `<p class="content">${tarefa.dataBR} * ${tarefa.horario} * ${tarefa.tarefa}</p>`;

        li.innerHTML = conteudo;

        li.appendChild(BotaoConclui());
        li.appendChild(BotaoDeleta());
        lista.appendChild(li);
    })
}

const getTarefasLocalStorage = () => {

    return JSON.parse(localStorage.getItem('tarefas'));
}

const onloadWindow = () => {

    const tarefasArray = getTarefasLocalStorage() || [];
    criarElementosTarefas(tarefasArray);
}

window.addEventListener('load', onloadWindow);

novaTarefa.addEventListener('click', criarTarefa);