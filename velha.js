var jogador, vencedor = null;
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
const URL = "https://pokeapi.co/api/v2";
let qtd_max_pokemon;

let jogador1 = {}, jogador2 = {};

inicio();

async function inicio(){
    await pegarQtdPokemon(URL);

    jogador1.id = gerarIdAleatorioPokemon(qtd_max_pokemon);
    jogador2.id = gerarIdAleatorioPokemon(qtd_max_pokemon);

    await preencherDadosPokemon(jogador1)
    await preencherDadosPokemon(jogador2)

    console.dir(jogador1)
    console.log(jogador2)


    mudarJogador('X');
}

async function pegarQtdPokemon(URL){
    await fetch(`${URL}/pokemon/`)
        .then(value => value.json())
        .then(data => {
            qtd_max_pokemon = data.count
        })
        .catch(erro => console.log(erro))
}

function gerarIdAleatorioPokemon(qtd_max_pokemon) {
    let max = qtd_max_pokemon;
    max = 898; //existem 1126 pokémon, incluindo as diferentes formas
    return Math.floor(Math.random() * max);
}

async function preencherDadosPokemon(jogador){
    await fetch(`${URL}/pokemon/${jogador.id}`)
        .then(value => value.json())
        .then(data => {
            jogador.nome = data.name;
            jogador.img = data.sprites.front_default;
            jogador.tipo1 = data.types[0].type.name;
            jogador.tipo2 = typeof data.types[1] !== 'undefined' ? data.types[1].type.name : "";
            jogador.hp = data.stats[0].base_stat;
            jogador.atk = data.stats[1].base_stat;
            jogador.def = data.stats[2].base_stat;
            jogador.spc_atk = data.stats[3].base_stat;
            jogador.spc_def = data.stats[4].base_stat;
            jogador.spd = data.stats[5].base_stat;
            jogador.xp = data.base_experience;
           
        })
        .catch(erro => console.log(erro))
}

function escolherQuadrado(id) {
    if (vencedor !== null) {
        return;
    }

    var quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== '-') {
        return;
    }

    quadrado.innerHTML = jogador;
    quadrado.style.color = '#000';

    if (jogador === 'X') {
        jogador = 'O';
    } else {
        jogador = 'X';
    }

    mudarJogador(jogador);
    checaVencedor();
}

async function mudarJogador(valor) {
    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;
}

function checaVencedor(){
    var quadrado1 = document.getElementById(1);
    var quadrado2 = document.getElementById(2);
    var quadrado3 = document.getElementById(3);
    var quadrado4 = document.getElementById(4);
    var quadrado5 = document.getElementById(5);
    var quadrado6 = document.getElementById(6);
    var quadrado7 = document.getElementById(7);
    var quadrado8 = document.getElementById(8);
    var quadrado9 = document.getElementById(9);

    if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
        mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado4, quadrado5, quadrado6)) {
        mudaCorQuadrado(quadrado4, quadrado5, quadrado6);
        mudarVencedor(quadrado4);
        return;
    }

    if (checaSequencia(quadrado7, quadrado8, quadrado9)) {
        mudaCorQuadrado(quadrado7, quadrado8, quadrado9);
        mudarVencedor(quadrado7);
        return;
    }

    if (checaSequencia(quadrado1, quadrado4, quadrado7)) {
        mudaCorQuadrado(quadrado1, quadrado4, quadrado7);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado2, quadrado5, quadrado8)) {
        mudaCorQuadrado(quadrado2, quadrado5, quadrado8);
        mudarVencedor(quadrado2);
        return;
    }

    if (checaSequencia(quadrado3, quadrado6, quadrado9)) {
        mudaCorQuadrado(quadrado3, quadrado6, quadrado9);
        mudarVencedor(quadrado3);
        return;
    }

    if (checaSequencia(quadrado1, quadrado5, quadrado9)) {
        mudaCorQuadrado(quadrado1, quadrado5, quadrado9);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado3, quadrado5, quadrado7)) {
        mudaCorQuadrado(quadrado3, quadrado5, quadrado7);
        mudarVencedor(quadrado3);
    }
}

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
    quadrado1.style.background = '#0f0';
    quadrado2.style.background = '#0f0';
    quadrado3.style.background = '#0f0';
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
    var eigual = false;

    if (quadrado1.innerHTML !== '-' && quadrado1.innerHTML === quadrado2.innerHTML && quadrado2.innerHTML === quadrado3.innerHTML) {
        eigual = true;
    }

    return eigual;
}

function reiniciar()
{
    vencedor = null;
    vencedorSelecionado.innerHTML = '';

    for (var i = 1; i <= 9; i++) {
        var quadrado = document.getElementById(i);
        quadrado.style.background = '#eee';
        quadrado.style.color = '#eee';
        quadrado.innerHTML = '-';
    }

    mudarJogador('X');
}