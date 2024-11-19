function verificaTudo() {
    if (checkChromebox()) {
        console.log("> CHROMEBOX ON");//CHROMEBOX LIGADO
        if (checkInternet()) {
            console.log(">> REDE ON");//REDE LIAGADA
            if (checkTV()) {
                console.log(">>> TV ON");//TV LIGADA
                if (checkHdmiTv()) {// HDMI LIGADO
                    console.log(">>>> HDMI ON - TV ON - TELA INICIAL");
                    selecionarImagemTV('inicio');
                    switch (sessionStorage.getItem('ultimo-tv')) {
                        case 'inicio':
                            selecionarImagemTV('inicio');
                            break;
                        case 'meeting solo':
                            selecionarImagemTV('meeting solo');
                            if (checkUsbCamera() && checkEstadoCamera()) {
                                camera('ligar');
                                desmutar();
                            }
                            else {
                                camera('desligar');
                                if (!checkUsbCamera()) mutar();
                            }
                            if (checkParticipante()) {
                                document.getElementById("reuniao-remoto").style.display = "block";
                                stopLoop3();
                            }
                            break;
                        case 'meeting remoto':
                            selecionarImagemTV('meeting remoto');
                            if (checkParticipante()) {
                                apagarCloneReuniao();
                            }
                            break;
                        case 'sem-sinal':
                            selecionarImagemTV('sem sinal');
                            break;
                        case 'apresentacao sala':
                            selecionarImagemTV('apresentacao sala');
                            break;
                        default:
                            selecionarImagemTV('inicio');
                            break;
                    }
                }
                else {
                    console.log(">>>> HDMI OFF - TV ON - SEM SINAL");//HDMI DESLIGADO
                    selecionarImagemTV('sem sinal');
                    if(checkParticipante()){
                        apagarCloneReuniao();
                    }
                }
            } else {
                console.log(">>> TV OFF");//TV DESLIGADA
                selecionarImagemTV('apagada');
                if(checkParticipante()){
                    apagarCloneReuniao();
                }
            }
            if (checkTAP()) {
                console.log(">>> TAP ON");//TAP LIGADO
                if (checkUsbTap()) {//USB TAP LIGADO
                    console.log(">>>> USB TAP ON - TELA INICIAL");
                    switch (sessionStorage.getItem('ultimo')) {
                        case 'pre Meeting':
                            selecionarImagemTAP('pre Meeting');
                            break;
                        case 'inicio':
                            selecionarImagemTAP('inicio');
                            break;
                        case 'meeting':
                            selecionarImagemTAP('meeting');
                            break;
                        default:
                            selecionarImagemTAP('inicio');
                            break;
                    }
                }
                else {
                    console.log(">>>> USB TAP OFF - TELA APAGADA");//USB TAP DESLIGADO
                    selecionarImagemTAP('apagada');
                }
            }
            else {
                console.log(">>> TAP OFF - TELA APAGADA");//TAP DESLIGADO
                selecionarImagemTAP('apagada');
            }
        }
        else {
            console.log(">> REDE OFF");
            if (checkTV()) {
                console.log(">>> TV ON");
                if (checkHdmiTv()) {
                    console.log(">>>> HDMI ON - TV ON - TELA APAGADA");
                    selecionarImagemTV('apagada');
                }
                else {
                    console.log(">>>> HDMI OFF - TV ON - SEM SINAL");
                    selecionarImagemTV('sem sinal');
                }
            } else {
                console.log(">>> TV OFF");
                selecionarImagemTV('apagada');
            }
            if (checkTAP()) {
                console.log(">>> TAP ON");
                if (checkUsbTap()) {
                    console.log(">>>> USB TAP ON");
                    selecionarImagemTAP('sem internet');
                }
                else {
                    console.log(">>>> USB TAP OFF");
                    selecionarImagemTAP('apagada');
                }
            }
            else {
                console.log(">>> TAP OFF");
                selecionarImagemTAP('apagada');
            }
        }
    }
    else {
        console.log("> CHROMEBOX OFF"); //CHROMEBOX DESLIGADO
        if (checkInternet()) {
            console.log(">> REDE ON");//REDE CONECTADA
            if (checkTV()) {
                console.log(">>> TV ON");//TV LIGADA
                selecionarImagemTV('sem sinal');
            } else {
                console.log(">>> TV OFF");//TV DESLIGADA
                selecionarImagemTV('apagada');
            }
            if (checkTAP()) {
                console.log(">>> TAP ON");//TAP LIGADO
                if (checkUsbTap()) {
                    console.log(">>>> USB TAP ON");// CABO USB TAP LIGADO
                    selecionarImagemTAP('apagada');
                }
                else {
                    console.log(">>>> USB TAP OFF");//CABO USB TAP DESLIGADO
                    selecionarImagemTAP('apagada');
                }
            }
            else {
                console.log(">>> TAP OFF");//TAP DESLIGADO
                selecionarImagemTAP('apagada');
            }
        }
        else {
            console.log(">> REDE OFF");
            if (checkTV()) {
                console.log(">>> TV ON");
                selecionarImagemTV('sem sinal');

            } else {
                console.log(">>> TV OFF");
                selecionarImagemTV('apagada');
            }
            if (checkTAP()) {
                console.log(">>> TAP ON");
                if (checkUsbTap()) {
                    console.log(">>>> USB TAP ON");
                    selecionarImagemTAP('apagada');

                }
                else {
                    console.log(">>>> USB TAP OFF");
                    selecionarImagemTAP('apagada');
                }
            }
            else {
                console.log(">>> TAP OFF");
                selecionarImagemTAP('apagada');
            }
        }
    }
}

// LIGAR OU DESLIGAR CHROMEBOX
function ligarDesligarChromebox() {
    const ledChrome = document.getElementById("led-chrome");
    if (checkChromebox()) {
        console.log("Acende LED Chromebox");
        ledChrome.style.stroke = "Lightgreen";
        if (checkHdmiTv() && checkTV() && checkInternet()) {
            selecionarImagemTV('inicio load');
        }
        if (checkTAP() && checkUsbTap()) {
            selecionarImagemTAP('inicio load');
        }
    }
    else {
        console.log("Apaga LED Chromebox");
        ledChrome.style.stroke = "rgb(69, 69, 69)";
        sessionStorage.clear();
        if (checkMeeting()) {
            sairMeeting();
        }
    }
    verificaTudo();
}
//CONECTAR OU DESCONECTAR REDE
function conectarDesconectarRJ45() {
    const caboRJ45 = document.getElementById("cabo-rj45");
    if (checkInternet()) {
        console.log("RJ 45 ON");
        caboRJ45.style.display = "block";
        if (!OnOffApresentar()) desligarApresentacao();
    }
    else {
        console.log("RJ 45 OFF");
        caboRJ45.style.display = "none";
        sessionStorage.clear();
        if (checkMeeting()) {
            sairMeeting();
        }
    }
    verificaTudo();
}
//LIGAR OU DESLIGAR TV
function ligarDesligarTV() {
    const ledTV = document.getElementById("led-TV");
    if (checkTV()) {
        console.log("TV LED ON");
        ledTV.style.display = "block";
    }
    else {
        console.log("TV LED OFF");
        ledTV.style.display = "none";
    }
    verificaTudo();
}
//CONECTAR OU DESCONECTAR HDMI TV
function conectarDesconectarHDMI() {
    const caboHdmi = document.getElementById("cabo-hdmi");

    if (checkHdmiTv()) {
        console.log("HDMI TV ON");
        caboHdmi.style.display = "block";
    }
    else {
        console.log("HDMI TV OFF");
        caboHdmi.style.display = "none";
    }
    verificaTudo();
}
//LIGAR OU DESLIGAR O TAP
function ligarDesligarTAP() {
    const ledTAP = document.getElementById("led-TAP");
    if (checkTAP()) {
        console.log("TAP LED ON");
        ledTAP.style.display = "none";
    }
    else {
        console.log("TAP LED OFF");
        ledTAP.style.display = "block";
    }
    verificaTudo();
}
//CONECTAR OU DESCONECTAR CABO USB TAP
function conectarDesconectarUsbTAP() {
    const caboUsbTap = document.getElementById("cabo-usbc-tap");
    if (checkUsbTap()) {
        caboUsbTap.style.display = "block";
    }
    else {
        caboUsbTap.style.display = "none";
    }
    verificaTudo();
}
//CONECTAR OU DESCONECTAR CABO USB CÂMERA
function conectarDesconectarUsbCamera() {
    const caboUsbCamera = document.getElementById("cabo-usbc-camera");
    if (checkUsbCamera()) {
        caboUsbCamera.style.display = "block";
    }
    else {
        caboUsbCamera.style.display = "none";
    }
    verificaTudo();
}
//CONECTAR OU DESCONECTAR CABO HDMI NOTEBOOK
function conectarDesconectarHdmiNotebook() {
    const caboHdmiNotebook = document.getElementById("cabo-hdmi-apresentacao");
    if (checkHdmiNotebook()) {
        caboHdmiNotebook.style.display = "block";
    }
    else {
        caboHdmiNotebook.style.display = "none";
    }
    desligarApresentacao();
    verificaTudo();
}
//LIGAR OU DESLIGAR NOTEBOOK
function ligarDesligarNotebook() {
    const notebook = document.getElementById("notebook");
    if (checkNotebook()) {
        notebook.style.display = "block";
    }
    else {
        notebook.style.display = "none";
    }
    desligarApresentacao();
    verificaTudo();
}
function checkChromebox() {
    const checkLigarChomebox = document.getElementById("ligar-chrome");
    return checkLigarChomebox.checked;
}

function checkInternet() {
    const checkInternet = document.getElementById("rj45-chrome");
    return checkInternet.checked;
}

function checkTV() {
    const checkLigarTV = document.getElementById("ligar-TV");
    return checkLigarTV.checked;
}

function checkHdmiTv() {
    const checkHdmiTv = document.getElementById("hdmi");
    return checkHdmiTv.checked;
}

function checkTAP() {
    const checkTap = document.getElementById("ligar-TAP");
    return checkTap.checked;
}

function checkUsbTap() {
    const checkUsbTap = document.getElementById("usbc-tap");
    return checkUsbTap.checked;
}

function checkUsbCamera() {
    const checkUsbCamera = document.getElementById("usbc-camera");
    return checkUsbCamera.checked;
}

function checkHdmiNotebook() {
    const checkHdmiNotebook = document.getElementById("hdmi-notebook");
    return checkHdmiNotebook.checked;
}

function checkNotebook() {
    const checkNotebook = document.getElementById("ligar-notebook");
    return checkNotebook.checked;
}

function checkLigarFalar() {
    const checkLigarFalar = document.getElementById("sala-falar");
    return checkLigarFalar.checked;
}

function checkEstadoCamera() {
    if (document.getElementById("circulo-camera").style.fill == "none") {
        return true;
    }
    else {
        return false;
    }
}

function checkEstadoMicrofone() {

    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");
    if (fundoMicrofonePreview.style.fill == "none") {
        return true;
    }
    else {
        return false;
    }
}

function selecionarImagemTV(opcao) {
    switch (opcao) {
        case 'inicio':
            document.getElementById("imagem-inicial").style.display = "block";
            document.getElementById("sinal-TV").style.display = "none";
            document.getElementById("img-tv-sem-imagem").style.display = "none";
            document.getElementById("reuniao-solo").style.display = "none";
            document.getElementById("apresentando").style.display = "none";
            document.getElementById("left-meeting").style.display = "none";
            break;
        case 'inicio load':
            document.getElementById("inicial-chromeos").style.display = "block";
            setTimeout(() => {
                document.getElementById("inicial-chromeos").style.display = "none";
                document.getElementById("inicial").style.display = "block";
                setTimeout(() => {
                    document.getElementById("inicial").style.display = "none";
                    selecionarImagemTV('apagada');
                    setTimeout(() => {
                        document.getElementById("inicial").style.display = "none";
                        selecionarImagemTV('inicio');
                    }, 500);

                }, 1000);

            }, 1000);
            sairMeeting();
            document.getElementById("preview-tap-on").style.display = "block";
            document.getElementById("sem-internet-preview").style.display = "none";
            document.getElementById("entrar-meeting-preview").style.display = "none";
            document.getElementById("meeting").style.display = "none";
            break;
        case 'sem sinal':
            document.getElementById("imagem-inicial").style.display = "none";
            document.getElementById("sinal-TV").style.display = "block";
            document.getElementById("img-tv-sem-imagem").style.display = "none";
            document.getElementById("reuniao-solo").style.display = "none";
            document.getElementById("apresentando").style.display = "none";
            document.getElementById("reuniao-remoto").style.display = "none";
            break;
        case 'apagada':
            document.getElementById("imagem-inicial").style.display = "none";
            document.getElementById("sinal-TV").style.display = "none";
            document.getElementById("img-tv-sem-imagem").style.display = "block";
            document.getElementById("reuniao-solo").style.display = "none";
            document.getElementById("apresentando").style.display = "none";
            document.getElementById("reuniao-remoto").style.display = "none";
            break;
        case 'meeting solo':
            document.getElementById("imagem-inicial").style.display = "none";
            document.getElementById("sinal-TV").style.display = "none";
            document.getElementById("img-tv-sem-imagem").style.display = "none";
            document.getElementById("reuniao-solo").style.display = "block";
            document.getElementById("apresentando").style.display = "none";
            document.getElementById("reuniao-remoto").style.display = "none";
            break;
        case 'meeting remoto':
            document.getElementById("imagem-inicial").style.display = "none";
            document.getElementById("sinal-TV").style.display = "none";
            document.getElementById("img-tv-sem-imagem").style.display = "none";
            document.getElementById("reuniao-solo").style.display = "none";
            document.getElementById("apresentando").style.display = "none";
            document.getElementById("reuniao-remoto").style.display = "block";
            break;
        case 'apresentacao sala':
            document.getElementById("imagem-inicial").style.display = "none";
            document.getElementById("sinal-TV").style.display = "none";
            document.getElementById("img-tv-sem-imagem").style.display = "none";
            document.getElementById("reuniao-solo").style.display = "none";
            document.getElementById("apresentando").style.display = "block";
            document.getElementById("reuniao-remoto").style.display = "none";
            break;
        default:
            break;
    }
}

function selecionarImagemTAP(opcao) {
    switch (opcao) {
        case 'inicio':
            document.getElementById("preview-tap-on").style.display = "block";
            document.getElementById("sem-internet-preview").style.display = "none";
            document.getElementById("entrar-meeting-preview").style.display = "none";
            document.getElementById("meeting").style.display = "none";
            break;
        case 'inicio load':
            selecionarImagemTAP('apagada');
            document.getElementById("inicial3").style.display = "block";
            setTimeout(() => {
                document.getElementById("inicial3").style.display = "none";
                selecionarImagemTAP('inicio');
            }, 2500);
            break;
        case 'sem internet':
            document.getElementById("preview-tap-on").style.display = "none";
            document.getElementById("sem-internet-preview").style.display = "block";
            document.getElementById("entrar-meeting-preview").style.display = "none";
            document.getElementById("meeting").style.display = "none";
            sessionStorage.setItem('ultimo-tv', 'inicio');
            break;
        case 'apagada':
            document.getElementById("preview-tap-on").style.display = "none";
            document.getElementById("sem-internet-preview").style.display = "none";
            document.getElementById("entrar-meeting-preview").style.display = "none";
            document.getElementById("meeting").style.display = "none";
            break;
        case 'pre Meeting':
            document.getElementById("preview-tap-on").style.display = "none";
            document.getElementById("sem-internet-preview").style.display = "none";
            document.getElementById("entrar-meeting-preview").style.display = "block";
            document.getElementById("meeting").style.display = "none";
            break;
        case 'meeting':
            document.getElementById("preview-tap-on").style.display = "none";
            document.getElementById("sem-internet-preview").style.display = "none";
            document.getElementById("entrar-meeting-preview").style.display = "none";
            document.getElementById("meeting").style.display = "block";
            break;
        default:
            break;
    }
}

function abrirMeeting() {
    selecionarImagemTAP('pre Meeting');
    sessionStorage.setItem('ultimo', 'pre Meeting');
    desligarApresentacao();
}

function fecharMeeting() {
    selecionarImagemTAP('inicio');
    sessionStorage.setItem('ultimo', 'inicio');
}

function entrarMeeting() {
    const meeting = document.getElementById("meeting");
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    const joining = document.getElementById("joining");
    sessionStorage.setItem('ultimo', 'meeting');
    sessionStorage.setItem('ultimo-tv', 'meeting solo');
    gerarCodigoReuniao();
    joining.style.display = "block";
    setTimeout(() => {
        joining.style.display = "none";
        meeting.style.display = "block";
        meetingPreview.style.display = "none";
        if (checkUsbCamera()) {
            camera('ligar');
            desmutar();
        }
        else {
            camera('desligar');
            mutar();
        }
    }, 1000);
    habilitarCheckBox("sala-falar");
    habilitarCheckBox("add-participante");
}

function sairMeeting() {
    const meetingPreview = document.getElementById("entrar-meeting-preview");
    const meeting = document.getElementById("meeting");
    const cameraSala = document.getElementById("reuniao-solo");
    const leftMeeting = document.getElementById("left-meeting");
    sessionStorage.setItem('ultimo', 'inicio');
    sessionStorage.setItem('ultimo-tv', 'inicio');
    cameraSala.style.display = "none";
    leftMeeting.style.display = "block";

    if (checkChromebox()) {
        setTimeout(() => {
            leftMeeting.style.display = "none";
            meetingPreview.style.display = "none";
            meeting.style.display = "none"
            cameraSala.style.display = "none";
            desmutar();
            verificaTudo();
        }, 1500);

    } else {
        leftMeeting.style.display = "none";
        meetingPreview.style.display = "none";
        meeting.style.display = "none"
        cameraSala.style.display = "none";
        desmutar();
        verificaTudo();
    }
    if (checkParticipante()) {
        apagarCloneReuniao();
        removerParticipante();
        resetCheckboxes();
    }

    desabilitarCheckBox("sala-falar");
    desabilitarCheckBox("add-participante");
    desabilitarCheckBox("participante-falar");
    naoFalando();
    pararAnimarFala();
    document.getElementById("sala-falar").setAttribute("checked", "unchecked");
    stopLoop2();
    naoFalandoRemoto();
    document.getElementById("participante-falar").setAttribute("checked", "unchecked");
    resetCamera();
}

function habilitarCheckBox(id) {
    const checkbox = document.getElementById(id);
    checkbox.disabled = false;
}
function desabilitarCheckBox(id) {
    const checkbox = document.getElementById(id);
    checkbox.checked = false;
    checkbox.disabled = true;
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

function camera(opcao) {
    selecionarImagemTV('nenhum');
    switch (opcao) {
        case 'desligar':
            if (checkTV() && checkHdmiTv()) {
                document.getElementById("circulo-camera").style.fill = "rgb(192,0,0)";
                document.getElementById("camera-on-off").setAttribute("href", "img/camera-branca.png");
                document.getElementById("reuniao-solo").style.display = "block";
                document.getElementById("camera-normal").style.display = "none";
                document.getElementById("camera-off").style.display = "block";
            }
            else {
                document.getElementById("circulo-camera").style.fill = "rgb(192,0,0)";
                document.getElementById("camera-on-off").setAttribute("href", "img/camera-branca.png");
                document.getElementById("reuniao-solo").style.display = "block";
                document.getElementById("camera-normal").style.display = "none";
                document.getElementById("camera-off").style.display = "block";
            }
            break;
        case 'ligar':
            if (checkTV() && checkHdmiTv()) {
                document.getElementById("circulo-camera").style.fill = "none";
                document.getElementById("camera-on-off").setAttribute("href", "img/camera.png");
                document.getElementById("reuniao-solo").style.display = "block";
                document.getElementById("camera-normal").style.display = "block";
                document.getElementById("camera-off").style.display = "none";
            }
            else {
                document.getElementById("circulo-camera").style.fill = "none";
                document.getElementById("camera-on-off").setAttribute("href", "img/camera.png");
                document.getElementById("reuniao-solo").style.display = "block";
                document.getElementById("camera-normal").style.display = "none";
                document.getElementById("camera-off").style.display = "block";
            }
            break;
    }
}

function mutar() {
    document.getElementById("fundo-microfone-preview").style.fill = "rgb(192,0,0)";
    document.getElementById("microfone-preview").setAttribute("href", "img/microfone-off.png");
    document.getElementById("fundo-microfone-tv-on").style.display = "none";
    document.getElementById("audio-parado1").style.display = "none";
    document.getElementById("audio-parado3").style.display = "block";
    document.getElementById("audio-svg1").style.display = "none";
    document.getElementById("audio-svg3").style.display = "none";
    document.getElementById("microfone-off-tv-on").style.display = "block";
    document.getElementById("microfone-off-preview").style.display = "block";
    document.getElementById("fundo-audio-preview").style.display = "none";
}

function desmutar() {
    document.getElementById("fundo-microfone-preview").style.fill = "none";
    document.getElementById("microfone-preview").setAttribute("href", "img/microfone.png");
    document.getElementById("fundo-microfone-tv-on").style.display = "block";
    document.getElementById("microfone-off-tv-on").style.display = "none";
    document.getElementById("microfone-off-preview").style.display = "none";
    document.getElementById("fundo-audio-preview").style.display = "block";
}

function OnOffCamera() {
    if (!checkUsbCamera()) {
        camera('desligar');
    }
    else {
        if (checkEstadoCamera()) {
            camera('desligar');
        }
        else {
            camera('ligar');
        }
    }
}

window.addEventListener('beforeunload', function () {
    sessionStorage.clear();
});

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
        if (checkParticipante() && checkTV() && checkHdmiTv()) {
            clonarReuniao();
        }

    }, 1000);
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

    if (checkTV() && checkHdmiTv()) {
        volumeNaTela.style.display = "block";
        const interval = setTimeout(() => {
            volumeNaTela.style.display = "none";

        }, 3000);
    }
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

    if (checkTV() && checkHdmiTv()) {
        volumeNaTela.style.display = "block";
        const interval = setTimeout(() => {
            volumeNaTela.style.display = "none";
        }, 3000);
    }
}

function volumeSpeaker(volume) {
    let somEsquerda = document.getElementById("som-esquerda");
    let somDireita = document.getElementById("som-direita");

    if (checkUsbCamera()) {
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

function mutarMicrofone() {
    const fundoMicrofonePreview = document.getElementById("fundo-microfone-preview");
    if (!checkUsbCamera()) {
        mutar();
    }
    else {
        if (checkEstadoMicrofone()) {
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
    if (checkEstadoMicrofone()) { // se microfone aberto
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
        document.getElementById(opcoes[i]).style.display = "none";
    }
    telaMeeting.setAttribute("filter", " ");
    telaPreviewOn.setAttribute("filter", " ");
    telaFeedback.style.display = "none";
}

function abrirInfo() {
    const info = document.getElementById("tela-info");
    const infoCode = (document.getElementById("info-code").textContent).slice(0, 24);
    const code = document.getElementById("codigo-reuniao-tap").textContent;
    console.log(infoCode)
    document.getElementById("info-code").textContent = infoCode + code;
    info.style.display = "block";
}

function fecharInfo() {
    const info = document.getElementById("tela-info");
    info.style.display = "none";
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

// TELA BOTÃO CONFIGURAÇÃO (ENGRENAGEM) TELA INICIAL NO TAP
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

function opcoesConfigOut(opcao) {
    const audio = document.getElementById("config-out-audio");
    const video = document.getElementById("config-out-video");
    const accessibility = document.getElementById("config-out-accessibility");
    const general = document.getElementById("config-out-general");
    const display = document.getElementById("config-out-display");
    const microfone = document.getElementById("txt-config-microfone");
    const speaker = document.getElementById("txt-config-speaker");
    const camera = document.getElementById("txt-config-camera");

    if (checkUsbCamera()) {
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

// APRESENTAR VIA HDMI FORA DA REUNIÃO
function apresentar() {
    const imgSlideApresentacao = document.getElementById("apresentando");
    if (OnOffApresentar()) {

        if (checkTV() && checkHdmiTv()) {
            if (checkHdmiNotebook() && checkNotebook()) {
                ligarApresentacao();
            }
        }
    }
    else {
        desligarApresentacao();
    }
}

function ligarApresentacao() {
    document.getElementById("botao-apresentar").style.display = "block";
    document.getElementById("apresentar").setAttribute("href", "img/hdmi-branco.png");
    document.getElementById("menu-apresentar").style.fill = "white";
    selecionarImagemTV('apresentacao sala');
    sessionStorage.setItem('ultimo-tv', 'apresentacao sala');
}

function desligarApresentacao() {
    document.getElementById("botao-apresentar").style.display = "none";
    document.getElementById("apresentar").setAttribute("href", "img/hdmi.png");
    document.getElementById("menu-apresentar").style.fill = "gray";
    if (!checkMeeting()) {
        sessionStorage.setItem('ultimo-tv', 'inicio');
        selecionarImagemTV('inicio');
    }
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
// LEVANTAR A MÃO NA REUNIÃO
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

//TELA EMOJI
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
    if (checkTV() && checkHdmiTv()) {

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

// CLOSED CAPTION

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

// ADICIONAR PARTICIPANTE REMOTO
function adicionarParticipante() {
    const participantePreview2 = document.getElementById("preview-participante02");
    const nPrticipantePreview = document.getElementById("numero-participantes-preview");
    selecionarImagemTV('meeting remoto');
    nPrticipantePreview.textContent = "2 participants";
    participantePreview2.style.display = "block";
    criarCloneReuniao();
}

function removerParticipante() {
    const participantePreview2 = document.getElementById("preview-participante02");
    const nPrticipantePreview = document.getElementById("numero-participantes-preview");
    selecionarImagemTV('meeting solo');
    nPrticipantePreview.textContent = "1 participant";
    participantePreview2.style.display = "none";
    // reuniaoRemoto.style.display = "none";
    apagarCloneReuniao();
    stopLoop3();
}

function ligarParticipante() {
    const check = document.getElementById("add-participante");
    if (checkTV() && checkHdmiTv()) {
        if (!checkParticipante()) {
            check.setAttribute("checked", "unchecked");
            removerParticipante();
            resetCheckboxes();
            desabilitarCheckBox("participante-falar");
        }
        else {
            check.setAttribute("checked", "checked");
            adicionarParticipante();
            habilitarCheckBox("participante-falar");
        }
    }
}

function checkParticipante() {
    const checkParticipante = document.getElementById("add-participante");
    return checkParticipante.checked;
}

function bringToFront(groupId) {
    const svg = document.getElementById('area');
    const group = document.getElementById(groupId);
    svg.appendChild(group);
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
    const checkbox2 = document.querySelector('#participante-falar');
    checkbox.checked = false;
    checkbox2.checked = false;
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

function checkLigarFalarParticipante() {
    const checkLigarFalar = document.getElementById("participante-falar");
    return checkLigarFalar.check;
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

function apresentarNaMeet() {
    const iconeApresentar = document.getElementById("icone-apresentar");
    const txtApresentar = document.getElementById("txt-apresentar");
    const telaApresentar = document.getElementById("tela-apresentar");
    const telaPreviewMeeting = document.getElementById("meeting");

    telaPreviewMeeting.setAttribute("filter", "url(#blurFilter)");

    if (checkTV() && checkHdmiTv()) {
        if (checkHdmiNotebook() && checkNotebook()) {
            iconeApresentar.setAttribute("href", "img/apresentar-azul.png");
            txtApresentar.style.fill = "#1790f3";
            telaApresentar.style.display = "block"
        }
    }
}

function fecharApresentarNaMeet() {
    document.getElementById("icone-apresentar").setAttribute("href", "img/apresentar.png");
    document.getElementById("txt-apresentar").style.fill = "black";
    document.getElementById("tela-apresentar").style.display = "none";
    document.getElementById("meeting").setAttribute("filter", " ");
}

function abrirControleCamera() {

    const telaControleCamera = document.getElementById("tela-controle-camera");
    const telaPreviewMeeting = document.getElementById("meeting");

    if (checkTV() && checkHdmiTv()) {
        if (checkCamera()) {
            telaPreviewMeeting.setAttribute("filter", "url(#blurFilter)");
            telaControleCamera.style.display = "block";
        }
    }
}

function fecharControleCamera() {
    document.getElementById("tela-controle-camera").style.display = "none";
    document.getElementById("meeting").setAttribute("filter", " ");
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










