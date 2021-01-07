const textoParaData = (data) => {

    const datatime = new Date(data);

    console.log(datatime.toLocaleTimeString());

    const objDatatime = {
        dia: datatime.getDate(),
        mes: datatime.getMonth() + 1,
        ano: datatime.getFullYear(),
        hora: datatime.getHours(),
        minuto: datatime.getMinutes(),
    }

    const dataBR = `${objDatatime.dia}/${objDatatime.mes}/${objDatatime.ano}`
    const horario = `${objDatatime.hora}:${objDatatime.minuto}`

    return {
        dataBR,
        horario
    }
}

const dataParaTexto = (data) => {


    return
}

export {
    textoParaData,
    dataParaTexto
}