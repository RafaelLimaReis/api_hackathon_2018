function openLoading(text) {
  document.getElementById("loading").style.display="block";
  document.getElementById("loading-text").innerHTML=text;
}

function closeLoading() {
  document.getElementById("loading").style.display='none';
}

function openModalMsg(title,text) {
  document.getElementById("modal-msg").style.display="block";
  document.getElementById("titulo-modal-msg").innerHTML=title;
  document.getElementById("msg-modal-msg").innerHTML=text;
}


function dataAtualFormatada() {
  let data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length === 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length === 1) ? '0'+mes : mes,
    anoF = data.getFullYear(),
    hora = data.getHours(),
    horaF = (String(hora).length === 1) ? '0'+hora : hora,
    minuto = data.getMinutes(),
    minutoF = (String(minuto).length === 1) ? '0'+minuto : minuto;
  return diaF+"/"+mesF+"/"+anoF+" "+horaF+":"+minutoF;
}
