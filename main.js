import { criarTarefa } from "./componentes/criarTarefa.js";

const $ = document.querySelector.bind(document);

const novaTarefa = $('[data-form-button]');

novaTarefa.addEventListener('click', criarTarefa);