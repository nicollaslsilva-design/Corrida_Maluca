const carro1 = document.getElementById("carro1");
const carro2 = document.getElementById("carro2");

const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");
const turboBotao1 = document.getElementById("turbo1"); 
const turboBotao2 = document.getElementById("turbo2");
const reiniciar = document.getElementById("reiniciar");

const mensagem = document.getElementById("mensagem");
const chegada = document.querySelector(".chegada");

let position1 = 0;
let position2 = 0;
let turbo1Disponivel = true;
let turbo2Disponivel = true;
let terminou = false;

function verificarVencedor(limite) {
    if (position1 >= limite) {
        mensagem.textContent = "🏆 Jogador 1 venceu!";
        terminou = true;
    } else if (position2 >= limite) {
        mensagem.textContent = "🏆 Jogador 2 venceu!";
        terminou = true;
    }
}

function moverCarro(jogador, distancia) {
    if (terminou) return;

    const limite = Math.max(0, chegada.offsetLeft - carro1.offsetWidth);

    if (jogador === 1) {
        position1 = Math.min(position1 + distancia, limite);
        carro1.style.left = `${position1}px`;
    } else if (jogador === 2) {
        position2 = Math.min(position2 + distancia, limite);
        carro2.style.left = `${position2}px`;
    }

    verificarVencedor(limite);
}

function acelerar(jogador) {
    moverCarro(jogador, 15);
}

function turbo(jogador) {
    if (terminou) return;

    if (jogador === 1 && turbo1Disponivel) {
        turbo1Disponivel = false;
        mensagem.textContent = "⚡ Jogador 1 usou o TURBO!";
        moverCarro(1, 80);
    } else if (jogador === 2 && turbo2Disponivel) {
        turbo2Disponivel = false;
        mensagem.textContent = "⚡ Jogador 2 usou o TURBO!";
        moverCarro(2, 80);
    }
}
botao1.addEventListener("click", function () {
    acelerar(1);
});

botao2.addEventListener("click", function () {
    acelerar(2);
});

if (turboBotao1) {
    turboBotao1.addEventListener("click", function () {
        turbo(1);
    });
}

if (turboBotao2) {
    turboBotao2.addEventListener("click", function () {
        turbo(2);
    });
}
document.addEventListener("keydown", function (evento) {
    if (evento.repeat) return;

    const tecla = evento.key.toLowerCase();
    if (tecla === "a") {
        acelerar(1);
    }
    if (tecla === "l") {
        acelerar(2);
    }
    if (tecla === "w") {
        turbo(1);
    }
    if (tecla === "o") {
        turbo(2);
    }
});
reiniciar.addEventListener("click", function () {
    position1 = 0;
    position2 = 0;
    turbo1Disponivel = true;
    turbo2Disponivel = true;
    terminou = false;

    carro1.style.left = "0px";
    carro2.style.left = "0px";

    mensagem.textContent = "Preparar, apontar, já!";
});