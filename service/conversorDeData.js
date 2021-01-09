const textoParaData = (data) => {

    const datatime = new Date(data);

    const objDatatime = {
        dia: datatime.getDate(),
        mes: datatime.getMonth() + 1,
        ano: datatime.getFullYear(),
        hora: datatime.getHours(),
        minuto: datatime.getMinutes(),
    }

    const dataFormatada = `${objDatatime.dia}/${objDatatime.mes}/${objDatatime.ano}`
    const horario = `${objDatatime.hora}:${formatarMinutos(objDatatime.minuto)}`

    return {
        dataFormatada,
        horario
    }
}

const dataParaTexto = (data) => {

    const [dia, mes, ano] = data.split("/");
    return new Date(dia, mes, ano);
}

const formatarMinutos = (minuto) => {

    return minuto < 10 ? `0${minuto}` : `${minuto}`;
}

export {
    textoParaData,
    dataParaTexto
}