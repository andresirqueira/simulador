function conectarUSBCtap() {
    const checkUsbc = document.getElementById("usbc-tap");
    const caboUsbc = document.getElementById("cabo-usbc-tap");

    if (checkUsbc.getAttribute("checked") == "checked") {
        caboUsbc.style.display = "none";
        checkUsbc.setAttribute("checked", "unchecked");
    }
    else {
        caboUsbc.style.display = "block";
        checkUsbc.setAttribute("checked", "checked");
    }
    verificaImagemTAP();
}

function conectarUSBCcamera() {
    const checkUsbc = document.getElementById("usbc-camera");
    const caboUsbc = document.getElementById("cabo-usbc-camera");

    if (checkUsbc.getAttribute("checked") == "checked") {
        caboUsbc.style.display = "none";
        checkUsbc.setAttribute("checked", "unchecked");
    }
    else {
        caboUsbc.style.display = "block";
        checkUsbc.setAttribute("checked", "checked");
    }
    if (checkMeetingTV()) {
        OnOffCamera();
        mutar();
        desligarCamera()
    }
}

function conectarHDMI() {
    const checkHdmi = document.getElementById("hdmi");
    const caboHdmi = document.getElementById("cabo-hdmi");

    if (checkHdmi.getAttribute("checked") == "checked") {
        caboHdmi.style.display = "none";
        checkHdmi.setAttribute("checked", "unchecked");
    }
    else {
        caboHdmi.style.display = "block";
        checkHdmi.setAttribute("checked", "checked");
    }
    verificaImagemTV();
    ligaDesligaCamera();
}

function conectarHDMINotebook() {
    const checkHdmi = document.getElementById("hdmi-notebook");
    const caboHdmi = document.getElementById("cabo-hdmi-apresentacao");

    if (checkHdmi.getAttribute("checked") == "checked") {
        caboHdmi.style.display = "none";
        checkHdmi.setAttribute("checked", "unchecked");
    }
    else {
        caboHdmi.style.display = "block";
        checkHdmi.setAttribute("checked", "checked");
    }
    desligarApresentacao();
}

function conectarRJ45() {
    const checkRJ = document.getElementById("rj45-chrome");
    const caboRJ45 = document.getElementById("cabo-rj45");

    if (checkRJ.getAttribute("checked") == "checked") {
        caboRJ45.style.display = "none";
        checkRJ.setAttribute("checked", "unchecked");
    }
    else {
        caboRJ45.style.display = "block";
        checkRJ.setAttribute("checked", "checked");
    }
    verificaImagemTAP();
    verificaImagemTV();
    carregarMeet();
    // fecharMeeting();
}

function ligarChrome() {
    const checkChrome = document.getElementById("ligar-chrome");
    const ledChrome = document.getElementById("led-chrome");

    if (checkChrome.getAttribute("checked") == "checked") {
        ledChrome.style.stroke = "rgb(69, 69, 69)";
        checkChrome.setAttribute("checked", "unchecked");
    }
    else {
        ledChrome.style.stroke = "Lightgreen";
        checkChrome.setAttribute("checked", "checked");
        carregarMeet();
    }
    verificaImagemTAP();
    verificaImagemTV();
}

function ligarTV() {
    const checkTV = document.getElementById("ligar-TV");
    const ledTV = document.getElementById("led-TV");

    if (checkTV.getAttribute("checked") == "checked") {
        ledTV.style.display = "none";
        checkTV.setAttribute("checked", "unchecked");
    }
    else {
        ledTV.style.display = "block";
        checkTV.setAttribute("checked", "checked");
    }
    verificaImagemTV();
    ligaDesligaCamera();
}

function ligarTAP() {
    const checkTAP = document.getElementById("ligar-TAP");
    const ledTAP = document.getElementById("led-TAP");

    if (checkTAP.getAttribute("checked") == "checked") {
        ledTAP.style.display = "block";
        checkTAP.setAttribute("checked", "unchecked");
    }
    else {
        ledTAP.style.display = "none";
        checkTAP.setAttribute("checked", "checked");
    }
    verificaImagemTAP();
}

function ligarNotebook() {
    const checkNotebook = document.getElementById("ligar-notebook");
    const notebook = document.getElementById("notebook");

    if (checkNotebook.getAttribute("checked") == "checked") {
        notebook.style.display = "none";

        checkNotebook.setAttribute("checked", "unchecked");
    }
    else {
        notebook.style.display = "block";
        checkNotebook.setAttribute("checked", "checked");
    }
    desligarApresentacao();
}

function verificaImagemCamera() {
    const cameraSalaOn = document.getElementById("reuniao-solo");
    const cameraSalaOff = document.getElementById("reuniao-solo-off");

    if (checkLigarChromebox() && checkLigarTV() && checkLigarHDMI() && checkMeeting()) {
        cameraSalaOn.style.display = "block";
        cameraSalaOff.style.display = "none";
    }
    else {
        cameraSalaOn.style.display = "none";
        cameraSalaOff.style.display = "block";
    }
}

function verificaImagemTV() {
    const imagemInicial = document.getElementById("imagem-inicial");
    const semSinal = document.getElementById("sinal-TV");
    const semInternet = document.getElementById("tela-tv");
    const imagemRemoto = document.getElementById("reuniao-remoto");
    const imagemSala = document.getElementById("clone-camera-on");
    const imagemApresentando = document.getElementById("apresentando");

    if (checkLigarTV()) {
        console.log("TV On ");
        if (!checkLigarChromebox() || !checkLigarHDMI()) {
            console.log("TV SEM SINAL");
            imagemInicial.style.display = "none";
            semSinal.style.display = "block";
            semInternet.style.display = "none";
            imagemApresentando.style.display = "none";

            if (checkParticipante()) {
                imagemRemoto.style.display = "none";
                imagemSala.style.display = "none";
            }

            if (!checkLigarChromebox() && checkParticipante()) {
                fecharMeeting();
            }
        }
        else if (checkLigarHDMI() && checkLigarChromebox() && !checkInternet()) {
            console.log("TV COM SEM SINAL INTERNET");
            imagemInicial.style.display = "none";
            semSinal.style.display = "none";
            semInternet.style.display = "block";
            fecharMeeting()
        }
        else if (checkLigarHDMI() && checkLigarChromebox() && checkInternet() && !checkParticipante()) {
            console.log("TV COM SINAL INICIO MEET");
            if (!OnOffApresentar()) {
                imagemApresentando.style.display = "block";
            }
            else {
                imagemInicial.style.display = "block";
                semSinal.style.display = "none";
                semInternet.style.display = "none";
                imagemApresentando.style.display = "none";
            }
        }
        else if (checkLigarHDMI() && checkLigarChromebox() && checkInternet() && checkParticipante()) {
            console.log("TV COM SINAL INICIO MEET COM REMOTO");
            imagemInicial.style.display = "none";
            semSinal.style.display = "none";
            semInternet.style.display = "none";
            imagemRemoto.style.display = "block";
            imagemSala.style.display = "block";
        }
    }
    else {
        console.log("TV Off");
        imagemInicial.style.display = "none";
        semSinal.style.display = "none";
        semInternet.style.display = "none";
        imagemApresentando.style.display = "none";

        if (checkParticipante()) {
            imagemRemoto.style.display = "none";
            imagemSala.style.display = "none";
        }

    }
}

function verificaImagemTAP() {
    const telaDesligada = document.getElementById("tela-preview-tap-off");
    const telaInicial = document.getElementById("preview-tap-on");
    const semInternet = document.getElementById("sem-internet-preview");

    if (checkLigarTAP()) {
        console.log("TAP On");
        if (checkLigarChromebox() && checkLigarUSBCtap() && checkInternet()) {
            console.log("Chrome On - USB on - Internet ON");
            telaInicial.style.display = "block";
            semInternet.style.display = "none";
            telaDesligada.style.display = "none";
        }
        else if (checkLigarChromebox() && checkLigarUSBCtap() && !checkInternet()) {
            console.log("Chrome On - USB on - Internet Off");
            telaInicial.style.display = "none";
            semInternet.style.display = "block";
            telaDesligada.style.display = "none";
        }
        else {
            telaDesligada.style.display = "block";
            fecharTudoTap();
            fecharTudoTV();

        }
    }
    else {
        console.log("TAP Off");
        telaDesligada.style.display = "block";
        fecharTudoTap();
        fecharTudoTV();
    }
}

function carregarMeet() {
    const inicioTV = document.getElementById("inicial");
    const inicio3Preview = document.getElementById("inicial3");

    if (checkLigarChromebox()) {
        if (checkLigarHDMI() && checkLigarTV()) {
            inicioTV.style.display = "block";
            setTimeout(() => {
                inicioTV.style.display = "none";
            }, 2000);
        }
        if (checkLigarTAP() && checkLigarUSBCtap()) {
            inicio3Preview.style.display = "block";
            setTimeout(() => {
                inicio3Preview.style.display = "none";
            }, 2000);
        }
    }
}

function checkMeeting() {
    const checkMeeting = document.getElementById("meeting");
    const computedStyle = window.getComputedStyle(checkMeeting);
    const displayValue = computedStyle.display;

    if (displayValue == "block") {
        return true;
    }
    else {

        return false;
    }
}

function checkMeetingTV() {
    const checkMeetingTVon = document.getElementById("reuniao-solo");
    const computedStyleOn = window.getComputedStyle(checkMeetingTVon);
    const displayValueOn = computedStyleOn.display;

    if (displayValueOn == "block") {
        return true;
    }
    else {
        return false;
    }
}

function checkHdmiNotebook() {
    const checkHdmiNotebook = document.getElementById("hdmi-notebook");
    if (checkHdmiNotebook.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkNotebook() {
    const checkNotebook = document.getElementById("ligar-notebook");
    if (checkNotebook.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkInternet() {
    const checkRJ45 = document.getElementById("rj45-chrome");
    if (checkRJ45.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarTV() {
    const checkLigarTV = document.getElementById("ligar-TV");
    if (checkLigarTV.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarChromebox() {
    const checkLigarChomebox = document.getElementById("ligar-chrome");
    if (checkLigarChomebox.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarHDMI() {
    const checkLigarHDMI = document.getElementById("hdmi");
    if (checkLigarHDMI.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarUSBCtap() {
    const checkLigarUSBCtap = document.getElementById("usbc-tap");
    if (checkLigarUSBCtap.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarUSBCcamera() {
    const checkLigarUSBCcamera = document.getElementById("usbc-camera");

    if (checkLigarUSBCcamera.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarTAP() {
    const checkLigarTAP = document.getElementById("ligar-TAP");
    if (checkLigarTAP.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarFalar() {
    const checkLigarFalar = document.getElementById("sala-falar");
    if (checkLigarFalar.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function checkLigarFalarParticipante() {
    const checkLigarFalar = document.getElementById("participante-falar");
    if (checkLigarFalar.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}


function checkParticipante() {
    const checkParticipante = document.getElementById("add-participante");
    if (checkParticipante.getAttribute("checked") == "checked") {
        return true;
    }
    else return false;
}

function abrirMeeting() {
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    meetingPreview.style.display = "block";
    gerarCodigoReuniao();
}

function fecharTudoTap() {
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    const meeting = document.getElementById("meeting");
    const telaInicialTap = document.getElementById("preview-tap-on");
    const telaOff = document.getElementById("tela-preview-tap-off");
    telaInicialTap.style.display = "none";
    meeting.style.display = "none";
    meetingPreview.style.display = "none";
    telaOff.style.display = "block";
}

function fecharTudoTV() {
    const cameraSala = document.getElementById("reuniao-solo");
    cameraSala.style.display = "none";
}

function fecharMeeting() {
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    const meeting = document.getElementById("meeting");
    const cameraSala = document.getElementById("reuniao-solo");
    const leftMeeting = document.getElementById("left-meeting");

    if (checkMeetingTV()) {
        leftMeeting.style.display = "block";
    }
    if (!checkInternet()) {
        leftMeeting.style.display = "none";
    }

    cameraSala.style.display = "none";
    removerParticipante();

    setTimeout(() => {
        leftMeeting.style.display = "none";



        if (checkLigarTAP()) {
            meetingPreview.style.display = "none";
            meeting.style.display = "none"
            cameraSala.style.display = "none";
        }
        else {
            meetingPreview.style.display = "none";
            meeting.style.display = "none"
            cameraSala.style.display = "none";
        }
        desmutar();
        removerParticipante();
        resetCheckboxes();
        desligarApresentacao();
        desligarClosedCaption();
        verificaImagemTV();
    }, 1500);


}

function levantarMao() {
    const imgMao = document.getElementById("img-levantar-mao");
    const txtMao = document.getElementById("txt-levantar-mao");
    const fundoLevantarMao = document.getElementById("fundo-levantar-mao");
    const fundoLevantarMaoTV = document.getElementById("fundo-levantar-mao-tv");
    const imgMaoTV = document.getElementById("img-mao-tv");
    const txtMaoTV = document.getElementById("txt-nome-sala");

    if (fundoLevantarMao.style.fill == "none") {
        fundoLevantarMao.style.fill = "gray";
        fundoLevantarMaoTV.style.display = "block";
        imgMaoTV.style.display = "block";
        imgMao.setAttribute("href", "img/mao-azul.png");
        txtMao.textContent = "Low Hand";
        txtMao.style.fill = "#1790f3";
        txtMaoTV.style.fill = "black";
    }
    else if (fundoLevantarMao.style.fill == "gray") {
        fundoLevantarMao.style.fill = "none";
        fundoLevantarMaoTV.style.display = "none";
        imgMaoTV.style.display = "none";
        imgMao.setAttribute("href", "img/mao.png");
        txtMao.textContent = "Raise Hand";
        txtMao.style.fill = "black";
        txtMaoTV.style.fill = "white";
    }
}

function entrarMeeting() {
    const meeting = document.getElementById("meeting");
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    const joining = document.getElementById("joining");

    joining.style.display = "block";

    setTimeout(() => {
        joining.style.display = "none";
        meeting.style.display = "block";
        meetingPreview.style.display = "none";

        if (checkLigarUSBCcamera()) {
            ligarCamera();
            desmutar();
        }
        else {
            desligarCamera();
            mutar();
        }
        desligarApresentacao();
    }, 1000);

}

function apresentar() {
    const imgSlideApresentacao = document.getElementById("apresentando");
    if (OnOffApresentar()) {

        if (checkLigarTV() && checkLigarHDMI()) {
            if (checkHdmiNotebook() && checkNotebook()) {
                ligarApresentacao();
            }
        }
    }
    else {
        desligarApresentacao();
        verificaImagemTV();
    }
}


function ligarApresentacao() {
    const botaoApresentar = document.getElementById("botao-apresentar");
    const imgApresentar = document.getElementById("apresentar");
    const txtApresentar = document.getElementById("menu-apresentar");
    const imgSlideApresentacao = document.getElementById("apresentando");
    botaoApresentar.style.display = "block";
    imgApresentar.setAttribute("href", "img/hdmi-branco.png");
    txtApresentar.style.fill = "white";
    imgSlideApresentacao.style.display = "block";
}

function desligarApresentacao() {
    const botaoApresentar = document.getElementById("botao-apresentar");
    const imgApresentar = document.getElementById("apresentar");
    const txtApresentar = document.getElementById("menu-apresentar");
    const imgSlideApresentacao = document.getElementById("apresentando");
    botaoApresentar.style.display = "none";
    imgApresentar.setAttribute("href", "img/hdmi.png");
    txtApresentar.style.fill = "gray";
    imgSlideApresentacao.style.display = "none";
}

function OnOffApresentar() {
    const botaoApresentar = document.getElementById("botao-apresentar");

    if (botaoApresentar.style.display == "none") {

        return true;
    }
    else if (botaoApresentar.style.display == "block") {

        return false;
    }

}

function ligaDesligaCamera() {
    const cameraSalaOn = document.getElementById("reuniao-solo");
    const camera = document.getElementById("camera-normal");
    const cameraOff = document.getElementById("camera-off");

    if (checkLigarUSBCcamera() && checkCamera()) {
        if (checkLigarTV() && checkLigarHDMI() && checkLigarChromebox() && checkInternet() && checkMeeting()) {
            cameraSalaOn.style.display = "block";
            camera.style.display = "block";
            cameraOff.style.display = "none";
        }
        else {
            cameraSalaOn.style.display = "none";
        }
    }
    else {
        if (checkLigarTV() && checkLigarHDMI() && checkLigarChromebox() && checkInternet() && checkMeeting()) {
            cameraSalaOn.style.display = "block";
            camera.style.display = "none";
            cameraOff.style.display = "block";
        }
        else {
            cameraSalaOn.style.display = "none";
        }
    }
}

function desligarCamera() {

    const fundoCameraPreview = document.getElementById("circulo-camera");
    const cameraPreview = document.getElementById("camera-on-off");
    const cameraSalaOn = document.getElementById("reuniao-solo");
    const camera = document.getElementById("camera-normal");
    const cameraOff = document.getElementById("camera-off");

    if (checkLigarTV() && checkLigarHDMI()) {
        fundoCameraPreview.style.fill = "rgb(192,0,0)";
        cameraPreview.setAttribute("href", "img/camera-branca.png");
        cameraSalaOn.style.display = "block";
        camera.style.display = "none";
        cameraOff.style.display = "block";
    }
    else {
        fundoCameraPreview.style.fill = "rgb(192,0,0)";
        cameraPreview.setAttribute("href", "img/camera-branca.png");
        cameraSalaOn.style.display = "block";
        camera.style.display = "block";
        cameraOff.style.display = "none";
    }

}

function ligarCamera() {
    const fundoCameraPreview = document.getElementById("circulo-camera");
    const cameraPreview = document.getElementById("camera-on-off");
    const cameraSalaOn = document.getElementById("reuniao-solo");
    const camera = document.getElementById("camera-normal");
    const cameraOff = document.getElementById("camera-off");

    if (checkLigarTV() && checkLigarHDMI()) {
        fundoCameraPreview.style.fill = "none";
        cameraPreview.setAttribute("href", "img/camera.png");
        cameraSalaOn.style.display = "block";
        camera.style.display = "block";
        cameraOff.style.display = "none";
    }
    else {
        fundoCameraPreview.style.fill = "none";
        cameraPreview.setAttribute("href", "img/camera.png");
        cameraSalaOn.style.display = "block";
        camera.style.display = "none";
        cameraOff.style.display = "block";
    }
}

function checkCamera() {

    const fundoCameraPreview = document.getElementById("circulo-camera");
    if (fundoCameraPreview.style.fill == "none") {
        return true;
    }
    else {
        return false;
    }
}

function checkMicrofone() {

    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");
    if (fundoMicrofonePreview.style.fill == "none") {
        return true;
    }
    else {
        return false;
    }
}

function checkCC() {
    const cc = document.getElementById("ligar-cc");
    if (cc.getAttribute("href") == "img/ligar-azul.png") {
        return true;
    }
    else {
        return false;
    }
}

function dataEhora() {
    // Função para formatar 1 em 01
    const zeroFill = n => {
        return ('0' + n).slice(-2);
    }
    // Cria intervalo
    const interval = setInterval(() => {
        // Pega o horário atual
        const now = new Date();
        const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
        const mes = [" " + "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        var newformat = now.getHours() >= 12 ? 'PM' : 'AM';

        // Formata a data conforme dd/mm/aaaa hh:ii:ss
        const dataHora = zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ' ' + newformat;
        const dataSemana = semana[now.getDay()] + ', ' + now.getUTCDate() + ' de ' + mes[(now.getUTCMonth())];
        const horaDataSemana = dataHora + ' - ' + dataSemana;

        // Exibe na tela usando a div#data-hora
        document.getElementById('relogio').innerHTML = dataHora;
        document.getElementById('relogio-remoto').innerHTML = dataHora;
        document.getElementById('data').innerHTML = dataSemana;
        document.getElementById('mini-relogio2').innerHTML = dataHora;
        document.getElementById('relogio3').innerHTML = dataHora;
        document.getElementById("data-e-hora").innerHTML = horaDataSemana;
        clonarSvg();
        if (checkMeetingTV() && checkParticipante()) {
            clonarReuniao();

        }

    }, 1000);

}

function mutar() {
    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");
    const microfonePreview = document.getElementById("microfone-preview");
    const audioAtivo = document.getElementById("audio-svg1");
    const audioAtivo2 = document.getElementById("audio-svg2");
    const audioAtivo3 = document.getElementById("audio-svg3");
    const audioParado = document.getElementById("audio-parado1");
    const audioParado2 = document.getElementById("audio-parado2");
    const audioParado3 = document.getElementById("audio-parado3");
    const fundoMicrofoneTvOn = document.getElementById("fundo-microfone-tv-on");
    const fundoMicrofoneTvOff = document.getElementById("fundo-microfone-tv-off");
    const microfoneOffTvOn = document.getElementById("microfone-off-tv-on");
    const microfoneOffTvOff = document.getElementById("microfone-off-tv-off");
    const fundoAudioPreview = document.getElementById("fundo-audio-preview");
    const audioPreviewOff = document.getElementById("microfone-off-preview");

    fundoMicrofonePreview.style.fill = "rgb(192,0,0)";
    microfonePreview.setAttribute("href", "img/microfone-off.png");
    // fundoMicrofoneTvOff.style.display = "none";
    fundoMicrofoneTvOn.style.display = "none";
    audioParado.style.display = "none";
    // audioParado2.style.display = "none";
    audioParado3.style.display = "block";
    audioAtivo.style.display = "none";
    // audioAtivo2.style.display = "none";
    audioAtivo3.style.display = "none";
    microfoneOffTvOn.style.display = "block";
    // microfoneOffTvOff.style.display = "block";
    audioPreviewOff.style.display = "block";
    fundoAudioPreview.style.display = "none";

}

function desmutar() {

    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");
    const microfonePreview = document.getElementById("microfone-preview");
    const fundoMicrofoneTvOn = document.getElementById("fundo-microfone-tv-on");
    const microfoneOffTvOn = document.getElementById("microfone-off-tv-on");
    const fundoAudioPreview = document.getElementById("fundo-audio-preview");
    const audioPreviewOff = document.getElementById("microfone-off-preview");

    fundoMicrofonePreview.style.fill = "none";
    microfonePreview.setAttribute("href", "img/microfone.png");
    fundoMicrofoneTvOn.style.display = "block";
    microfoneOffTvOn.style.display = "none";
    audioPreviewOff.style.display = "none";
    fundoAudioPreview.style.display = "block";

}

function mutarMicrofone() {

    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");

    if (!checkLigarUSBCcamera()) {
        mutar();
    }

    else {

        if (checkMicrofone()) {
            mutar();
        }
        else if (checkLigarFalar()) {
            desmutar();
            falando();

        }
        else if (!checkLigarFalar()) {
            desmutar();
            naoFalando();
        }
    }

}

function OnOffCamera() {

    const fundoCameraPreview = document.getElementById("circulo-camera");

    if (!checkLigarUSBCcamera()) {
        desligarCamera();
    }

    else {

        if (checkCamera()) {
            desligarCamera();
        }
        else {
            ligarCamera();
        }
    }

}

function falandoRemoto() {
    const audioAtivo = document.getElementById("audio-remoto");
    const audioParado = document.getElementById("audio-parado-remoto");
    const audioAtivo3 = document.getElementById("audio-animado-participante-02");
    const audioParado3 = document.getElementById("audio-parado-participante-02");

    audioAtivo.style.display = "block";
    audioParado.style.display = "none";
    audioAtivo3.style.display = "block";
    audioParado3.style.display = "none";

    startLoop3();

}
function naoFalandoRemoto() {
    const audioAtivo = document.getElementById("audio-remoto");
    const audioParado = document.getElementById("audio-parado-remoto");
    const audioAtivo3 = document.getElementById("audio-animado-participante-02");
    const audioParado3 = document.getElementById("audio-parado-participante-02");

    audioAtivo.style.display = "none";
    audioParado.style.display = "block";
    audioAtivo3.style.display = "none";
    audioParado3.style.display = "block";
    stopLoop3();

}


function falando() {
    const audioAtivo = document.getElementById("audio-svg1");
    const audioParado = document.getElementById("audio-parado1");
    const audioAtivo3 = document.getElementById("audio-svg3");
    const audioParado3 = document.getElementById("audio-parado3");

    audioAtivo.style.display = "block";
    audioParado.style.display = "none";
    audioAtivo3.style.display = "block";
    audioParado3.style.display = "none";
}

function naoFalando() {
    const audioAtivo = document.getElementById("audio-svg1");
    const audioParado = document.getElementById("audio-parado1");
    const audioAtivo3 = document.getElementById("audio-svg3");
    const audioParado3 = document.getElementById("audio-parado3");

    audioAtivo.style.display = "none";
    audioParado.style.display = "block";
    audioAtivo3.style.display = "none";
    audioParado3.style.display = "block";
}

function ligarFalar() {
    const chkFalar = document.getElementById("sala-falar");
    if (checkMicrofone()) { // se microfone aberto
        if (chkFalar.getAttribute("checked") == "checked") {

            naoFalando();
            pararAnimarFala();
            chkFalar.setAttribute("checked", "unchecked");
        }
        else {
            falando();
            animarFala();
            chkFalar.setAttribute("checked", "checked");
        }
    }

    else {
        if (chkFalar.getAttribute("checked") == "checked") {
            naoFalando();
            pararAnimarFala();
            mutar();
            chkFalar.setAttribute("checked", "unchecked");
        }
        else {
            falando();
            animarFala();
            mutar();
            chkFalar.setAttribute("checked", "checked");
        }
    }
}

function ligarFalarParticipante() {
    const chkFalar = document.getElementById("participante-falar");
    const cc = document.getElementById("ligar-cc");

    if (checkParticipante()) {

        if (chkFalar.getAttribute("checked") == "checked") {
            stopLoop2();
            naoFalandoRemoto();
            chkFalar.setAttribute("checked", "unchecked");
        }
        else {
            if (cc.getAttribute("href") == "img/ligar-azul.png") {
                startLoop2();
            }
            falandoRemoto();
            chkFalar.setAttribute("checked", "checked");
        }
    }
}

function volumeAtual() {
    const MIN = 365;
    const circuloVolumeAzul = document.getElementById("circulo-volume-azul");
    const posicaoCirculoAtual = circuloVolumeAzul.getAttribute("cx");
    const volume = (posicaoCirculoAtual - MIN) * 2;
    return volume;
}


function aumentarVolume() {
    const linhaVolumeAzul = document.getElementById("linha-volume-azul");
    const circuloVolumeAzul = document.getElementById("circulo-volume-azul");

    const linhaVolumeTv = document.getElementById("linha-volume-tv");
    const circuloVolumeTv = document.getElementById("circulo-volume-tv");

    const volumeNaTela = document.getElementById("volume-na-tela");

    const MAX = 415;
    const MAXTV = 855;
    const MIN = 365;

    let posicaoLinhaAtual = +linhaVolumeAzul.getAttribute("x2");
    let posicaoCirculoAtual = +circuloVolumeAzul.getAttribute("cx");

    let posicaoLinhaAtualTv = +linhaVolumeTv.getAttribute("x2");
    let posicaoCirculoAtualTv = +circuloVolumeTv.getAttribute("cx");

    let volumeNaTv = document.getElementById("volume-na-tv");

    if (posicaoCirculoAtual < MAX) {

        posicaoCirculoAtual = posicaoCirculoAtual + 5;
        posicaoLinhaAtual = posicaoLinhaAtual + 5;

        posicaoCirculoAtualTv = posicaoCirculoAtualTv + 5;
        posicaoLinhaAtualTv = posicaoLinhaAtualTv + 5;
    }
    else {
        posicaoCirculoAtual = MAX;
        posicaoLinhaAtual = MAX;
        posicaoCirculoAtualTv = MAXTV;
        posicaoLinhaAtualTv = MAXTV;
    }

    circuloVolumeAzul.setAttribute("cx", posicaoCirculoAtual);
    linhaVolumeAzul.setAttribute("x2", posicaoLinhaAtual);

    circuloVolumeTv.setAttribute("cx", posicaoCirculoAtualTv);
    linhaVolumeTv.setAttribute("x2", posicaoLinhaAtualTv);

    let volume = (posicaoCirculoAtual - MIN) * 2;

    volumeNaTv.textContent = volume;

    volumeSpeaker(volume);

    volumeNaTela.style.display = "block";

    const interval = setTimeout(() => {
        volumeNaTela.style.display = "none";

    }, 3000);
}

function diminuirVolume() {
    const linhaVolumeAzul = document.getElementById("linha-volume-azul");
    const circuloVolumeAzul = document.getElementById("circulo-volume-azul");

    const volumeNaTela = document.getElementById("volume-na-tela");

    const linhaVolumeTv = document.getElementById("linha-volume-tv");
    const circuloVolumeTv = document.getElementById("circulo-volume-tv");
    const MIN = 365;
    const MINTV = 805;

    let posicaoLinhaAtual = +linhaVolumeAzul.getAttribute("x2");
    let posicaoCirculoAtual = +circuloVolumeAzul.getAttribute("cx");

    let posicaoLinhaAtualTv = +linhaVolumeTv.getAttribute("x2");
    let posicaoCirculoAtualTv = +circuloVolumeTv.getAttribute("cx");

    let volumeNaTv = document.getElementById("volume-na-tv");

    if (posicaoCirculoAtual > MIN) {

        posicaoCirculoAtual = posicaoCirculoAtual - 5;
        posicaoLinhaAtual = posicaoLinhaAtual - 5;

        posicaoCirculoAtualTv = posicaoCirculoAtualTv - 5;
        posicaoLinhaAtualTv = posicaoLinhaAtualTv - 5;
    }
    else {
        posicaoCirculoAtual = MIN;
        posicaoLinhaAtual = MIN;
        posicaoCirculoAtualTv = MINTV;
        posicaoLinhaAtualTv = MINTV;
    }

    circuloVolumeAzul.setAttribute("cx", posicaoCirculoAtual);
    linhaVolumeAzul.setAttribute("x2", posicaoLinhaAtual);
    circuloVolumeTv.setAttribute("cx", posicaoCirculoAtualTv);
    linhaVolumeTv.setAttribute("x2", posicaoLinhaAtualTv);

    let volume = (posicaoCirculoAtual - MIN) * 2;

    volumeNaTv.textContent = volume;

    volumeSpeaker(volume);

    volumeNaTela.style.display = "block";

    const interval = setTimeout(() => {
        volumeNaTela.style.display = "none";

    }, 3000);

}

function volumeSpeaker(volume) {
    let somEsquerda = document.getElementById("som-esquerda");
    let somDireita = document.getElementById("som-direita");

    if (checkLigarUSBCcamera()) {
        if (volume <= 50 && volume > 0) {
            somEsquerda.setAttribute("href", "img/som-normal.png");
            somDireita.setAttribute("href", "img/som-normal.png");
            somEsquerda.style.display = "block";
            somDireita.style.display = "block";
        }
        else if (volume > 50 && volume <= 80) {
            somEsquerda.setAttribute("href", "img/som-alerta.png");
            somDireita.setAttribute("href", "img/som-alerta.png");
            somEsquerda.style.display = "block";
            somDireita.style.display = "block";
        }
        else if (volume > 80) {
            somEsquerda.setAttribute("href", "img/som-alto.png");
            somDireita.setAttribute("href", "img/som-alto.png");
            somEsquerda.style.display = "block";
            somDireita.style.display = "block";
        }

        setTimeout(() => {
            somEsquerda.style.display = "none";
            somDireita.style.display = "none";

        }, 1000);

    }
    else {
        somEsquerda.style.display = "none";
        somDireita.style.display = "none";
    }

}

let intervalId;
let intervaloSpeaker;
let intervaloPalavrasRemoto;
let intervaloPalavras;

function startLoop3() {
    intervaloSpeaker = setInterval(animarSpeakers, 2000);
    intervaloPalavrasRemoto = setInterval(mudarImagemRemoto, 2000);

}
function stopLoop3() {
    const img = document.getElementById("fala01-remoto");
    img.style.display = "none";
    clearInterval(intervaloSpeaker);
    clearInterval(intervaloPalavrasRemoto);
}

function mudarImagemRemoto() {
    const imagens = ["img/fala01.png", "img/fala02.png", "img/fala03.png", "img/fala04.png", "img/fala05.png", "img/fala06.png", "img/fala07.png", "img/fala08.png", "img/fala09.png"];
    let indice = 0;
    const img = document.getElementById("fala01-remoto");
    img.style.display = "block";
    indice = getRandomInt(0, 8);
    indice = (indice + 1) % imagens.length;
    img.setAttribute("href", imagens[indice]);
}

function animarSpeakers() {
    const volume = volumeAtual();
    const somEsquerda = document.getElementById("som-esquerda");
    const somDireita = document.getElementById("som-direita");
    if (volume <= 50 && volume > 0) {
        somEsquerda.setAttribute("href", "img/som-normal.png");
        somDireita.setAttribute("href", "img/som-normal.png");
        somEsquerda.style.display = "block";
        somDireita.style.display = "block";
    }
    else if (volume > 50 && volume <= 80) {
        somEsquerda.setAttribute("href", "img/som-alerta.png");
        somDireita.setAttribute("href", "img/som-alerta.png");
        somEsquerda.style.display = "block";
        somDireita.style.display = "block";
    }
    else if (volume > 80) {
        somEsquerda.setAttribute("href", "img/som-alto.png");
        somDireita.setAttribute("href", "img/som-alto.png");
        somEsquerda.style.display = "block";
        somDireita.style.display = "block";
    }

    setTimeout(() => {
        somEsquerda.style.display = "none";
        somDireita.style.display = "none";

    }, 1000);
}

function mudarPalavras() {
    const palavras = ["bla bla bla", "graficos", "etc", "com isso", "telas", "enquanto", "blah", "planilhas", "sem"];
    let index = 0;
    const texto = document.getElementById("texto-cc");
    texto.style.display = "block";
    index = getRandomInt(0, 8);
    index = (index + 1) % palavras.length;
    texto.textContent = palavras[index];
}
function startLoop2() {
    intervaloPalavras = setInterval(mudarPalavras, 2000);
}
function stopLoop2() {
    const texto = document.getElementById("texto-cc");
    texto.style.display = "none";
    clearInterval(intervaloPalavras);
}

function animarFala() {
    const cc = document.getElementById("ligar-cc");
    if (cc.getAttribute("href") == "img/ligar-azul.png") {
        startLoop2();
    }
    startLoop();
}

function mudarImagem() {
    const imagens = ["img/fala01.png", "img/fala02.png", "img/fala03.png", "img/fala04.png", "img/fala05.png", "img/fala06.png", "img/fala07.png", "img/fala08.png", "img/fala09.png"];
    let indice = 0;
    const img = document.getElementById("fala01");
    img.style.display = "block";
    indice = getRandomInt(0, 8);
    indice = (indice + 1) % imagens.length;
    img.setAttribute("href", imagens[indice]);
}

function startLoop() {
    intervalId = setInterval(mudarImagem, 2000); // Muda a imagem a cada 2 segundos
}

function stopLoop() {
    clearInterval(intervalId);
}

function pararAnimarFala() {
    const imagem = document.getElementById("fala01");
    const texto = document.getElementById("texto-cc");
    stopLoop();
    stopLoop2();
    texto.style.display = "none";
    imagem.style.display = "none";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function abrirTelaConfigOut() {
    const telaConfig = document.getElementById("tela-config-out");
    const telaPreviewOn = document.getElementById("preview-tap-on");

    telaPreviewOn.setAttribute("filter", "url(#blurFilter)");
    telaConfig.style.display = "block";

    opcoesConfigOut("Audio");
}

function fecharTelaConfigOut() {
    const telaConfig = document.getElementById("tela-config-out");
    const telaPreviewOn = document.getElementById("preview-tap-on");

    telaPreviewOn.setAttribute("filter", " ");
    telaConfig.style.display = "none";
}

function abrirOpcaoParticipante(participante) {

    if (participante == 1) {

        if (document.getElementById("fundo-opcao-participante01").style.fill == "gray") {
            document.getElementById("tela-opcao-participante01").style.display = "none";
            document.getElementById("fundo-opcao-participante01").style.fill = "none";
        }
        else {
            document.getElementById("tela-opcao-participante01").style.display = "block";
            document.getElementById("fundo-opcao-participante01").style.fill = "gray";

        }
    }
    if (participante == 2) {
        if (document.getElementById("fundo-opcao-participante02").style.fill == "gray") {
            document.getElementById("tela-opcao-participante02").style.display = "none";
            document.getElementById("fundo-opcao-participante02").style.fill = "none";
        }
        else {
            document.getElementById("tela-opcao-participante02").style.display = "block";
            document.getElementById("fundo-opcao-participante02").style.fill = "gray";
        }
    }

}

function fecharOpcaoParticipante(participante) {

    switch (participante) {
        case 1:
            document.getElementById("tela-opcao-participante01").style.display = "none";
            document.getElementById("fundo-opcao-participante01").style.fill = "none";
            break;

        case 2:
            document.getElementById("tela-opcao-participante02").style.display = "none";
            document.getElementById("fundo-opcao-participante02").style.fill = "none";
            break;
    }

}


function opcoesConfigOut(opcao) {
    const audio = document.getElementById("config-out-audio");
    const video = document.getElementById("config-out-video");
    const accessibility = document.getElementById("config-out-accessibility");
    const general = document.getElementById("config-out-general");
    const display = document.getElementById("config-out-display");
    const microfone = document.getElementById("txt-config-microfone");
    const speaker = document.getElementById("txt-config-speaker");
    const camera = document.getElementById("txt-config-camera");

    if (checkLigarUSBCcamera()) {
        microfone.style.display = "block";
        speaker.style.display = "block";
        camera.style.display = "block";
    }
    else {
        microfone.style.display = "none";
        speaker.style.display = "none";
        camera.style.display = "none";
    }

    switch (opcao) {
        case 'Audio':
            audio.style.display = "block";
            video.style.display = "none";
            accessibility.style.display = "none";
            general.style.display = "none";
            display.style.display = "none";
            break;
        case 'Video':
            audio.style.display = "none";
            video.style.display = "block";
            accessibility.style.display = "none";
            general.style.display = "none";
            display.style.display = "none";
            break;
        case 'Accessibility':
            audio.style.display = "none";
            video.style.display = "none";
            accessibility.style.display = "block";
            general.style.display = "none";
            display.style.display = "none";
            break;
        case 'General':
            audio.style.display = "none";
            video.style.display = "none";
            accessibility.style.display = "none";
            general.style.display = "block";
            display.style.display = "none";
            break;
        case 'Display':
            audio.style.display = "none";
            video.style.display = "none";
            accessibility.style.display = "none";
            general.style.display = "none";
            display.style.display = "block";
            break;
    }
}

function abrirFeedback() {
    const telaFeedback = document.getElementById("tela-feedback");
    const telaPreviewOn = document.getElementById("preview-tap-on");
    const telaMeeting = document.getElementById("meeting");

    telaMeeting.setAttribute("filter", "url(#blurFilter)");
    telaPreviewOn.setAttribute("filter", "url(#blurFilter)");
    telaFeedback.style.display = "block";
}

function fecharFeedback() {
    const telaFeedback = document.getElementById("tela-feedback");
    const telaPreviewOn = document.getElementById("preview-tap-on");
    const telaMeeting = document.getElementById("meeting");
    const opcoes = ["video-x", "audio-x", "connectivity-x", "other-x"];

    for (i = 0; i < opcoes.length; i++) {
        document.getElementById(opcoes[i]).style.display="none";
    }

    telaMeeting.setAttribute("filter", " ");
    telaPreviewOn.setAttribute("filter", " ");
    telaFeedback.style.display = "none";
}

function abrirInfo(){
    const info = document.getElementById("tela-info");
    const infoCode = (document.getElementById("info-code").textContent).slice(0,24);
    const code = document.getElementById("codigo-reuniao-tap").textContent;
    console.log(infoCode)

    document.getElementById("info-code").textContent = infoCode + code;
    info.style.display="block";
}

function fecharInfo(){
    const info = document.getElementById("tela-info");
     info.style.display="none";
}

function marcarBox(elemento) {
    const elementoX = elemento + "-x";
    document.getElementById(elementoX).style.display = "block";
}
function desmarcarBox(elementoX) {
    const elemento = elementoX.replace("-x", "");
    document.getElementById(elementoX).style.display = "none";
    document.getElementById(elemento).style.display = "block";
}

function abrirTelaEmoji() {
    const telaEmoji = document.getElementById("tela-emoji");
    const iconeEmoji = document.getElementById("icone-emoji");

    iconeEmoji.setAttribute("href", "img/smile-azul.png");
    telaEmoji.style.display = "block";
}

function fecharTelaEmoji() {
    const telaEmoji = document.getElementById("tela-emoji");
    const iconeEmoji = document.getElementById("icone-emoji");

    iconeEmoji.setAttribute("href", "img/smile.png");
    telaEmoji.style.display = "none";
}

function animateImage(elemento) {
    elemento.style.opacity = 1; // Aparece
    elemento.style.transform = 'translateY(-100px)';

    setTimeout(() => {
        elemento.style.opacity = 0; // Desaparece

    }, 1200);
}

function criarEmoji(tipoDeEmoji) {
    if (checkLigarTV() && checkLigarHDMI()) {

        const svgNS = "http://www.w3.org/2000/svg";
        const newElement = document.createElementNS(svgNS, 'text');

        newElement.textContent = tipoDeEmoji;
        newElement.setAttribute('x', getRandomInt(655, 675));
        newElement.setAttribute('y', '280');
        newElement.classList = "elementoEmoji";
        newElement.id = "emoji" + getRandomInt(0, 100);
        document.getElementById('area').appendChild(newElement);

        setTimeout(() => {
            animateImage(newElement);

        }, 1000);

        setTimeout(() => {
            excluirEmoji(newElement.id);

        }, 3000);
    }

    function excluirEmoji(id) {
        const element = document.getElementById(id);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }
}

function closedCaption() {

    const cc = document.getElementById("ligar-cc");

    if (cc.getAttribute("href") == "img/desligar.png") {
        cc.setAttribute("href", "img/ligar-azul.png");

        if (checkLigarFalar() || checkLigarFalarParticipante()) {
            startLoop2();
        }
        else {
            stopLoop2();
        }
    }
    else if (cc.getAttribute("href") == "img/ligar-azul.png") {
        cc.setAttribute("href", "img/desligar.png");
        stopLoop2();

    }
}

function desligarClosedCaption() {
    const cc = document.getElementById("ligar-cc");
    cc.setAttribute("href", "img/desligar.png");
    stopLoop2();
}

function apresentarNaMeet() {

    const imgSlideApresentacao = document.getElementById("apresentando");
    const cameraSala = document.getElementById("reuniao-solo");
    const iconeApresentar = document.getElementById("icone-apresentar");
    const txtApresentar = document.getElementById("txt-apresentar");
    const telaApresentar = document.getElementById("tela-apresentar");
    const telaPreviewMeeting = document.getElementById("meeting");

    telaPreviewMeeting.setAttribute("filter", "url(#blurFilter)");

    if (checkLigarTV() && checkLigarHDMI()) {
        if (checkHdmiNotebook() && checkNotebook()) {
            iconeApresentar.setAttribute("href", "img/apresentar-azul.png");
            txtApresentar.style.fill = "#1790f3";
            telaApresentar.style.display = "block"
        }
    }
}

function fecharApresentarNaMeet() {
    const iconeApresentar = document.getElementById("icone-apresentar");
    const txtApresentar = document.getElementById("txt-apresentar");
    const telaApresentar = document.getElementById("tela-apresentar");
    const telaPreviewMeeting = document.getElementById("meeting");

    iconeApresentar.setAttribute("href", "img/apresentar.png");
    txtApresentar.style.fill = "black";
    telaApresentar.style.display = "none";
    telaPreviewMeeting.setAttribute("filter", " ");

}

function abrirControleCamera() {

    const telaControleCamera = document.getElementById("tela-controle-camera");
    const telaPreviewMeeting = document.getElementById("meeting");



    if (checkLigarTV() && checkLigarHDMI()) {
        if (checkCamera()) {
            telaPreviewMeeting.setAttribute("filter", "url(#blurFilter)");
            telaControleCamera.style.display = "block";
        }
    }
}

function fecharControleCamera() {
    const telaControleCamera = document.getElementById("tela-controle-camera");
    const telaPreviewMeeting = document.getElementById("meeting");
    telaControleCamera.style.display = "none";
    telaPreviewMeeting.setAttribute("filter", " ");

}

function adicionarParticipante() {
    const participantePreview2 = document.getElementById("preview-participante02");
    const nPrticipantePreview = document.getElementById("numero-participantes-preview");
    const reuniaoRemoto = document.getElementById("reuniao-remoto");

    nPrticipantePreview.textContent = "2 participants";
    participantePreview2.style.display = "block";
    reuniaoRemoto.style.display = "block";
    criarCloneReuniao();
}

function removerParticipante() {
    const participantePreview2 = document.getElementById("preview-participante02");
    const nPrticipantePreview = document.getElementById("numero-participantes-preview");
    const reuniaoRemoto = document.getElementById("reuniao-remoto");

    nPrticipantePreview.textContent = "1 participant";
    participantePreview2.style.display = "none";
    reuniaoRemoto.style.display = "none";
    apagarCloneReuniao();
    resetCheckboxFalarRemoto();
    stopLoop3();

}

function ligarParticipante() {
    const check = document.getElementById("add-participante");
    if (checkLigarTV() && checkLigarHDMI() && checkMeeting() && checkMeetingTV()) {
        if (checkParticipante()) {
            check.setAttribute("checked", "unchecked");
            removerParticipante();
        }
        else {
            check.setAttribute("checked", "checked");
            adicionarParticipante();
        }
    }
}

function bringToFront(groupId) {
    const svg = document.getElementById('area');
    const group = document.getElementById(groupId);
    svg.appendChild(group);
}

function clonarSvg() {
    if (document.querySelector("#clone-tap")) {
        apagarClone();
        criarClone();

    } else {
        criarClone();
    }
}

function criarClone() {
    const originalSVG = document.querySelector('#preview-tap');
    const tap = document.getElementById("tela-tap");
    const cloneSVG = originalSVG.cloneNode(true);

    const posicaoX = parseInt(tap.getAttribute("x")) + 98;
    const posicaoY = parseInt(tap.getAttribute("y")) + 5;

    cloneSVG.id = "clone-tap";
    cloneSVG.style.top = posicaoY;
    cloneSVG.style.left = posicaoX;
    document.body.appendChild(cloneSVG);
}

function apagarClone() {
    const clone = document.getElementById("clone-tap");
    clone.remove();
}


function criarCloneReuniao() {

    const group = document.getElementById('tela-sala');
    const cloneGroup = group.cloneNode(true);

    cloneGroup.id = "clone-camera-on";

    scaleAndTranslate(cloneGroup);

    const elementoPai = document.getElementById("tela-total-tv");
    elementoPai.appendChild(cloneGroup);

}

function apagarCloneReuniao() {
    const cloneGroup = document.getElementById('clone-camera-on');
    if (cloneGroup) {
        cloneGroup.remove();
    }

}

function clonarReuniao() {
    if (document.querySelector("#clone-camera-on")) {
        apagarCloneReuniao();
        criarCloneReuniao();
    } else {
        criarCloneReuniao();
    }
}

function scaleAndTranslate(group) {
    group.setAttribute('transform', 'scale(0.25) translate(2953, 930)');
}

function resetTransform(group) {
    group.setAttribute('transform', ' ');
}


function resetCheckboxes() {
    const checkbox = document.querySelector('#add-participante');
    checkbox.setAttribute("checked", "unchecked");
    checkbox.checked = false;
    resetCheckboxFalarRemoto();

}

function resetCheckboxFalarRemoto() {
    const checkboxFalarRemoto = document.querySelector('#participante-falar');
    checkboxFalarRemoto.setAttribute("checked", "unchecked");
    checkboxFalarRemoto.checked = false;
}



function moverDireita(escala) {
    const imgCamera = document.getElementById("camera-normal");
    let scale = parseFloat(escala);
    let imgCameraMaxX = 420;
    let imgCameraX = parseInt(imgCamera.getAttribute("x"));

    switch (scale) {
        case 1.5:
            imgCameraMaxX = 390;
            break;
        case 1.6:
            imgCameraMaxX = 340;
            break;
        case 1.7:
            imgCameraMaxX = 345;
            break;
        case 1.8:
            imgCameraMaxX = 325;
            break;
        case 1.9:
            imgCameraMaxX = 310;
            break;

        default:
            break;
    }

    if (imgCameraX < imgCameraMaxX) {
        imgCameraX += 10;
        imgCamera.setAttribute("x", imgCameraX);
    }

}

function moverEsquerda(escala) {
    const imgCamera = document.getElementById("camera-normal");
    let scale = parseFloat(escala);
    let imgCameraMinX = 360;
    let imgCameraX = parseInt(imgCamera.getAttribute("x"));

    switch (scale) {
        case 1.5:
            imgCameraMinX = 315;
            break;
        case 1.6:
            imgCameraMinX = 280;
            break;
        case 1.7:
            imgCameraMinX = 240;
            break;
        case 1.8:
            imgCameraMinX = 210;
            break;
        case 1.9:
            imgCameraMinX = 185;
            break;

        default:
            break;
    }

    if (imgCameraX > imgCameraMinX) {
        imgCameraX -= 10;
        imgCamera.setAttribute("x", imgCameraX);
    }

}

function moverCima(escala) {
    const imgCamera = document.getElementById("camera-normal");
    let scale = parseFloat(escala);
    let imgCameraMaxY = 60;
    let imgCameraY = parseInt(imgCamera.getAttribute("y"));

    switch (scale) {
        case 1.5:
            imgCameraMaxY = 55;
            break;
        case 1.6:
            imgCameraMaxY = 50;
            break;
        case 1.7:
            imgCameraMaxY = 45;
            break;
        case 1.8:
            imgCameraMaxY = 40;
            break;
        case 1.9:
            imgCameraMaxY = 35;
            break;
        default:
            break;
    }

    if (imgCameraY < imgCameraMaxY) {
        imgCameraY += 5;
        imgCamera.setAttribute("y", imgCameraY);
    }

}

function moverBaixo(escala) {
    const imgCamera = document.getElementById("camera-normal");
    let scale = parseFloat(escala);
    let imgCameraMinY = 25;
    let imgCameraY = parseInt(imgCamera.getAttribute("y"));

    switch (scale) {
        case 1.5:
            imgCameraMinY = 20;
            break;
        case 1.6:
            imgCameraMinY = 15;
            break;
        case 1.7:
            imgCameraMinY = 10;
            break;
        case 1.8:
            imgCameraMinY = 5;
            break;
        case 1.9:
            imgCameraMinY = 0;
            break;

        default:
            break;
    }

    if (imgCameraY > imgCameraMinY) {
        imgCameraY -= 5;
        imgCamera.setAttribute("y", imgCameraY);
    }

}

function zoomIn() {
    const imgCamera = document.getElementById("camera-normal");
    let imgCameraY = parseInt(imgCamera.getAttribute("y"));
    let imgCameraX = parseInt(imgCamera.getAttribute("x"));
    let imgScale = parseFloat(imgCamera.style.scale);
    let imgCameraMinY = 25;
    let imgCameraMaxY = 60;
    let imgCameraMinX = 360;
    let imgCameraMaxX = 420;

    if (imgScale < "1.9") {
        imgScale += 0.1;
        imgScale.toFixed(1);
        imgCamera.style.scale = imgScale;
        switch (imgScale) {
            case 1.5:
                imgCameraMinY = 20;
                imgCameraMaxY = 55;
                imgCameraMinX = 315;
                imgCameraMaxX = 390;
                break;
            case 1.6:
                imgCameraMinY = 15;
                imgCameraMaxY = 50;
                imgCameraMinX = 275;
                imgCameraMaxX = 365;
                break;
            case 1.7000000000000002:
                imgCameraMinY = 10;
                imgCameraMaxY = 45;
                imgCameraMinX = 240;
                imgCameraMaxX = 345;
                break;
            case 1.8:
                imgCameraMinY = 5;
                imgCameraMaxY = 40;
                imgCameraMinX = 210;
                imgCameraMaxX = 325;
                break;
            case 1.9000000000000001:
                imgCameraMinY = 0;
                imgCameraMaxY = 35;
                imgCameraMinX = 185;
                imgCameraMaxX = 310;
                break;

            default:
                break;
        }

        imgCameraY -= 5;
        imgCameraX -= 40;

        if (imgCameraY > imgCameraMinY && imgCameraY < imgCameraMaxY) {
            imgCamera.setAttribute("y", imgCameraY);
        }
        else if (imgCameraY <= imgCameraMinY) {
            imgCamera.setAttribute("y", imgCameraMinY);
        }
        else if (imgCameraY >= imgCameraMaxY) {
            imgCamera.setAttribute("y", imgCameraMaxY);
        }

        if (imgCameraX > imgCameraMinX && imgCameraX < imgCameraMaxX) {
            imgCamera.setAttribute("x", imgCameraX);
        }
        else if (imgCameraX <= imgCameraMinX) {
            imgCamera.setAttribute("x", imgCameraMinX);
        }
        else if (imgCameraX >= imgCameraMaxX) {
            imgCamera.setAttribute("x", imgCameraMaxX);

        }


    }


}

function zoomOut() {
    const imgCamera = document.getElementById("camera-normal");
    let imgCameraY = parseInt(imgCamera.getAttribute("y"));
    let imgCameraX = parseInt(imgCamera.getAttribute("x"));
    let imgScale = parseFloat(imgCamera.style.scale);
    let imgCameraMinY = 25;
    let imgCameraMaxY = 60;
    let imgCameraMinX = 360;
    let imgCameraMaxX = 420;

    if (imgScale > "1.4") {
        imgScale -= 0.1;
        imgScale.toFixed(1);
        imgCamera.style.scale = imgScale;
        switch (imgScale) {
            case 1.5:
                imgCameraMinY = 20;
                imgCameraMaxY = 55;
                imgCameraMinX = 315;
                imgCameraMaxX = 390;
                break;
            case 1.5999999999999999:
                imgCameraMinY = 15;
                imgCameraMaxY = 50;
                imgCameraMinX = 275;
                imgCameraMaxX = 365;
                break;
            case 1.7:
                imgCameraMinY = 10;
                imgCameraMaxY = 45;
                imgCameraMinX = 240;
                imgCameraMaxX = 345;
                break;
            case 1.7999999999999998:
                imgCameraMinY = 5;
                imgCameraMaxY = 40;
                imgCameraMinX = 210;
                imgCameraMaxX = 325;
                break;
            case 1.9:
                imgCameraMinY = 0;
                imgCameraMaxY = 35;
                imgCameraMinX = 185;
                imgCameraMaxX = 310;
                break;
            case 4:
                imgCameraMinY = -40;
                imgCameraMaxY = -40;
                imgCameraMinX = 25;
                imgCameraMaxX = 25;
                break;


            default:
                break;
        }
        imgCameraY += 5;
        imgCameraX += 40;

        if (imgCameraY > imgCameraMinY && imgCameraY < imgCameraMaxY) {
            imgCamera.setAttribute("y", imgCameraY);
        }
        else if (imgCameraY <= imgCameraMinY) {
            imgCamera.setAttribute("y", imgCameraMinY);
        }
        else if (imgCameraY >= imgCameraMaxY) {
            imgCamera.setAttribute("y", imgCameraMaxY);
        }

        if (imgCameraX > imgCameraMinX && imgCameraX < imgCameraMaxX) {
            imgCamera.setAttribute("x", imgCameraX);
        }
        else if (imgCameraX <= imgCameraMinX) {
            imgCamera.setAttribute("x", imgCameraMinX);
        }
        else if (imgCameraX >= imgCameraMaxX) {
            imgCamera.setAttribute("x", imgCameraMaxX);

        }
    }
}

function resetCamera() {
    const imgCamera = document.getElementById("camera-normal");
    imgCamera.style.scale = "1.4";
    imgCamera.setAttribute("x", 390);
    imgCamera.setAttribute("y", 40);
}

function framePeople() {
    const imgCamera = document.getElementById("camera-normal");
    if (checkCamera()) {
        if (imgCamera.getAttribute("x") != "25") {
            imgCamera.style.scale = "4.0";
            imgCamera.setAttribute("x", 25);
            imgCamera.setAttribute("y", -40);
        }
        else if (imgCamera.getAttribute("x") == "25") {
            resetCamera();
        }

    }

}

function gerarCodigoReuniao() {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const telaCodigo = document.getElementById("codigo-reuniao-tap");
    let codigo = '';
    for (let i = 0; i < 10; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        codigo += letras[indiceAleatorio];
    }
    telaCodigo.textContent = codigo.slice(0, 3) + '-' + codigo.slice(3, 7) + '-' + codigo.slice(7);
}



























