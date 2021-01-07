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

    const texto = inputTarefa.value;
    const data = inputDate.value;

    const { dataBR, horario } = textoParaData(data);

    const dados = {
        texto,
        dataBR,
        horario
    }

    const tarefasArray = getTarefasLocalStorage() || [];

    tarefasArray.push(dados);

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));

    ordenarTarefas(tarefasArray);

    criarUmElementoTarefa(tarefasArray);

    limparCampos();
}

const limparCampos = () => {

    inputTarefa.value = "";
    inputDate.value = "";
}

const criarUmElementoTarefa = (tarefas) => {

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const li = document.createElement('li');
        li.classList.add('task');

        li.innerHTML = `<p class="content">${tarefa.horario} * ${tarefa.texto}</p>`;

        li.appendChild(BotaoConclui());
        li.appendChild(BotaoDeleta());

        const sectionDate = getDateSection(tarefa.dataBR)
        sectionDate.appendChild(li);
        lista.appendChild(sectionDate)
    })
}

const getDateSection = (dataBR) => {

    const getElementDOM = $(`[data-section="${dataBR}"]`);

    if (getElementDOM) {
        return getElementDOM;
    }
    else {
        const sectionDate = document.createElement('section')
        sectionDate.classList.add('sectionDate')
        sectionDate.setAttribute("data-section", `${dataBR}`)

        sectionDate.innerHTML = `<h1 class="section__title">${dataBR}</h1>`

        return sectionDate;
    }
}

const getTarefasLocalStorage = () => {

    return JSON.parse(localStorage.getItem('tarefas'));
}

novaTarefa.addEventListener('click', criarTarefa);

window.addEventListener('load', () => {

    const tarefas = getTarefasLocalStorage();

    if (tarefas.lenght === 0) {
        criarUmElementoTarefa(tarefas);
    }
    else {
        criarUmElementoTarefa(ordenarTarefas(tarefas));
    }


})

const ordenarTarefas = (tarefas) => {

    return tarefas.sort((a, b) => dataParaTexto(a.dataBR) - dataParaTexto(b.dataBR))
}