import BotaoConclui from './concluiTarefa.js'
import BotaoDeleta from './deletaTarefa.js'
import { textoParaData, dataParaTexto } from '../service/conversorDeData.js'

const $ = document.querySelector.bind(document);

const lista = $('[data-list]');
const inputTarefa = $('[data-form-tarefa]');
const inputDate = $('[data-form-date]');

const criarTarefa = (evento) => {

    evento.preventDefault();

    const [texto, data] = getValuesForm(inputTarefa, inputDate);

    const { dataFormatada, horario } = textoParaData(data);

    const dados = {
        texto,
        dataFormatada,
        horario,
        concluido: false
    }

    const tarefasArray = getTarefasLocalStorage();

    tarefasArray.push(dados);

    armazenarNoLocalStorage('tarefas', tarefasArray);

    ordenarTarefas(tarefasArray);

    criarUmElementoTarefa(tarefasArray);

    limparCampos();
}

const getValuesForm = (...inputs) => {

    return inputs.map(input => input.value);
}

const armazenarNoLocalStorage = (nomeItem, array) => {

    return localStorage.setItem(nomeItem, JSON.stringify(array));
}

const limparCampos = () => {

    inputTarefa.value = "";
    inputDate.value = "";
}

const criarUmElementoTarefa = (tarefas) => {

    lista.innerHTML = "";

    tarefas.forEach((tarefa, id) => {

        const li = document.createElement('li');

        li.classList.add('task');

        if (tarefa.concluido) {
            li.classList.add('done');
        }

        li.innerHTML = `<p class="content">${tarefa.horario} * ${tarefa.texto}</p>`;

        li.appendChild(BotaoConclui(tarefa, id));
        li.appendChild(BotaoDeleta(id));

        const sectionDate = getDateSection(tarefa.dataFormatada);
        sectionDate.appendChild(li);
        lista.appendChild(sectionDate);
    })
}

const getDateSection = (dataFormatada) => {

    const getElementDOM = $(`[data-section="${dataFormatada}"]`);

    if (getElementDOM) {
        return getElementDOM;
    }
    else {
        const sectionDate = document.createElement('section')
        sectionDate.classList.add('sectionDate')
        sectionDate.setAttribute("data-section", `${dataFormatada}`)

        sectionDate.innerHTML = `<h1 class="section__title">${dataFormatada}</h1>`

        return sectionDate;
    }
}

const getTarefasLocalStorage = () => {

    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

const ordenarTarefas = (tarefas) => {

    return tarefas.sort((a, b) => dataParaTexto(a.dataFormatada) - dataParaTexto(b.dataFormatada))
}

window.addEventListener('load', () => {

    const tarefas = getTarefasLocalStorage();

    if (tarefas.lenght !== 0) {
        criarUmElementoTarefa(ordenarTarefas(tarefas));
    }
})

export {
    criarTarefa,
    criarUmElementoTarefa,
    ordenarTarefas
}