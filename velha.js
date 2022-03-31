var jogador, vencedor = null;
let rodada = 0;
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
const URL = "https://pokeapi.co/api/v2";
let qtd_max_pokemon;

let jogador1 = {class: ".jogador1"}, jogador2 = {class: ".jogador2"};

inicio();

async function inicio(){
    //await pegarQtdPokemon(URL);
    const lista_frases = document.querySelector('.falas');

    jogador1.id = gerarIdAleatorioPokemon(898);
    jogador2.id = gerarIdAleatorioPokemon(898);

    await preencherDadosPokemon(jogador1);
    await preencherDadosPokemon(jogador2);

    criarTituloBatalha(jogador1.nome, jogador2.nome);

    desenharPokemon(jogador1);
    desenharPokemon(jogador2);

    if (jogador1.spd > jogador2.spd)
        mudarJogador(jogador1);
    else 
        mudarJogador(jogador2);

    let frase = 'Olá senhoras e senhores! Parece que teremos uma incrível batalha Pokémon aqui hoje!';
    escreverFrase(frase, 'comentario');
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

            jogador.moves = [];
            data.moves.forEach(item => {
                jogador.moves.push(item.move.name)
            })
        })
        .catch(erro => console.log(erro))
}

function criarTituloBatalha(pokemon1, pokemon2){
    const batalha = document.querySelector('.batalha');

    batalha.innerHTML = pokemon1 + ' <i>Vs.</i> ' + pokemon2;
}

function desenharPokemon(jogador){
    if (jogador.nome === 'undefined')
        return; 

    const div_jogador = document.querySelector(jogador.class);
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const ul = document.createElement('ul');
    const span =document.createElement('span');

    const hp = document.createElement('li');
    hp.innerHTML = `<b>HP:</b> ${jogador.hp}`;
    ul.appendChild(hp);
    
    const atk = document.createElement('li');
    atk.innerHTML = `<b>ATK:</b> ${jogador.atk}`;
    ul.appendChild(atk);
    
    const def = document.createElement('li');
    def.innerHTML = `<b>DEF:</b> ${jogador.def}`;
    ul.appendChild(def);
    
    const spc_atk = document.createElement('li');
    spc_atk.innerHTML = `<b>SPC ATK:</b> ${jogador.spc_atk}`;
    ul.appendChild(spc_atk);
    
    const spc_def = document.createElement('li');
    spc_def.innerHTML = `<b>SPC DEF:</b> ${jogador.spc_def}`;
    ul.appendChild(spc_def);
    
    const spd = document.createElement('li');
    spd.innerHTML = `<b>SPD:</b> ${jogador.spd}`;
    ul.appendChild(spd);

    h3.textContent = jogador.nome;
    span.textContent = jogador.tipo1;
    span.textContent += jogador.tipo2 !== '' ? "/"+jogador.tipo2 : "";
    img.src = jogador.img;
    img.alt = jogador.nome;

    div_jogador.appendChild(h3);
    div_jogador.appendChild(span);
    div_jogador.appendChild(img);
    div_jogador.appendChild(ul);
}

function escolherQuadrado(id) {
    if (vencedor !== null) {
        return;
    }

    var quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== '') {
        return;
    }

    quadrado.innerHTML = `<img src="${jogador.img}" alt="${jogador.nome}" />`;

    escreverFrase(gerarFraseGolpe(jogador));
    if (jogador === jogador1) {
        jogador = jogador2;
    } else {
        jogador = jogador1;
    }
    
    mudarJogador(jogador);
    checaVencedor();
    
    rodada++;
}

function mudarJogador(valor) {
    const img = document.createElement('img');
    jogador = valor;
    
    img.src = jogador.img;
    img.alt = jogador.nome;
    img.className = jogador.nome;

    jogadorSelecionado.innerHTML = '';
    jogadorSelecionado.appendChild(img);

    gerarFraseComentario();
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

    let frase = ''; 

    if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
        mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
        mudarVencedor(quadrado1);
        frase = 'Eu amo batalhas Pokémon! O que vimos aqui hoje entrará para a hitória!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado4, quadrado5, quadrado6)) {
        mudaCorQuadrado(quadrado4, quadrado5, quadrado6);
        mudarVencedor(quadrado4);
        frase = 'Minha nossa! Com certeza ninguém podia esperar que a batalha terminaria assim!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado7, quadrado8, quadrado9)) {
        mudaCorQuadrado(quadrado7, quadrado8, quadrado9);
        mudarVencedor(quadrado7);
        frase = 'Incrível! Essa batalha foi memorável!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado1, quadrado4, quadrado7)) {
        mudaCorQuadrado(quadrado1, quadrado4, quadrado7);
        mudarVencedor(quadrado1);
        frase = 'Não foi uma batalha muito emocionante, mas temos um vencedor!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado2, quadrado5, quadrado8)) {
        mudaCorQuadrado(quadrado2, quadrado5, quadrado8);
        mudarVencedor(quadrado2);
        frase = 'Chegamos ao fim! Tenho certeza que todos aprenderam muit com essa batalha!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado3, quadrado6, quadrado9)) {
        mudaCorQuadrado(quadrado3, quadrado6, quadrado9);
        mudarVencedor(quadrado3);
        frase = 'Não acredito no que vi hoje. Estou muito feliz de poder trabalhar com isso!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado1, quadrado5, quadrado9)) {
        mudaCorQuadrado(quadrado1, quadrado5, quadrado9);
        mudarVencedor(quadrado1);
        frase = 'Chegamos ao fim. O campeão é aplaudido de pé pelo público!';
        escreverFrase(frase, 'comentario');
    }
    else if (checaSequencia(quadrado3, quadrado5, quadrado7)) {
        mudaCorQuadrado(quadrado3, quadrado5, quadrado7);
        mudarVencedor(quadrado3);
        frase = 'Terminou!!! Ele com certeza sabia que seria o campeão!';
        escreverFrase(frase, 'comentario');
    }
    
    else if (quadrado1.innerHTML !== '' && quadrado2.innerHTML !== '' && quadrado3.innerHTML !== '' &&
        quadrado4.innerHTML !== '' && quadrado5.innerHTML !== '' && quadrado6.innerHTML !== '' &&
        quadrado7.innerHTML !== '' && quadrado8.innerHTML !== '' && quadrado9.innerHTML !== ''){
            jogadorSelecionado.innerHTML = '';
            frase = 'Uou! Temos um empate senhoras e senhores!!!';
            escreverFrase(frase, 'comentario');
    }
    
    
}

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
    jogadorSelecionado.innerHTML = '';
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
    quadrado1.style.background = '#0f0';
    quadrado2.style.background = '#0f0';
    quadrado3.style.background = '#0f0';
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
    var eigual = false;

    if (quadrado1.innerHTML !== '' && quadrado1.innerHTML === quadrado2.innerHTML && quadrado2.innerHTML === quadrado3.innerHTML) {
        eigual = true;
    }

    return eigual;
}

function reiniciar() {
    const lista_frases = document.querySelector('.falas');
    lista_frases.innerHTML = '';

    rodada = 0;
    vencedor = null;
    vencedorSelecionado.innerHTML = '';
    jogadorSelecionado.innerHTML = '';

    for (var i = 1; i <= 9; i++) {
        var quadrado = document.getElementById(i);
        quadrado.style.background = '#eee';
        quadrado.style.color = '#eee';
        quadrado.innerHTML = '';
    }

    if (jogador1.spd > jogador2.spd)
        mudarJogador(jogador1);
    else 
        mudarJogador(jogador2);
}

async function nova_batalha() {
    jogador1 = {class: ".jogador1"}, jogador2 = {class: ".jogador2"};

    const jog1 = document.querySelector(jogador1.class);
    jog1.innerHTML = '';
    
    const jog2 = document.querySelector(jogador2.class);
    jog2.innerHTML = '';

    jogadorSelecionado.innerHTML = '';
    vencedorSelecionado.innerHTML = '';

    await inicio();

    reiniciar();
}

function capitalizarPrimeiraLetra(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  }

function escreverFrase(frase, classe = ''){
    const lista_frases = document.querySelector('.falas');
    const li = document.createElement('li');

    li.innerHTML = frase;
    li.className = classe;

    lista_frases.prepend(li)
}

function gerarFraseComentario(){
    fetch("frases.json")
        .then(value => value.json())
        .then(data => {
            let frase = '';
            const frases = [];
            frases['abertura'] = [];
            frases['inicio'] = [];
            frases['meio'] = [];
            frases['final'] = [];
            frases['encerramento'] = [];

            let fase = "";
            if (rodada === 0) 
                fase = "abertura";
            else if (rodada >= 1 && rodada <= 3) 
                fase = "inicio";
            else if (rodada >= 4 && rodada <= 6) 
                fase = "meio";
            else if (rodada >= 7 && rodada <= 9) 
                fase = "final";
            else 
                fase = "encerramento";

            data.frases.forEach(item => {
                frases[item.fase_partida].push(item.frase);
            });

            const qtd_frases = frases[fase].length;
            const id_frase = Math.floor(Math.random() * qtd_frases);
            frase = frases[fase][id_frase];

            escreverFrase(frase, 'comentario');
        })
        .catch(erro => console.log(erro));
}


function gerarFraseGolpe(jogador){
    let frase = '';
    const qtd_moves = jogador.moves.length;
    const id_move = Math.floor(Math.random() * qtd_moves);
    frase = "<b>" + capitalizarPrimeiraLetra(jogador.nome) + "</b> usou <i>" + capitalizarPrimeiraLetra(jogador.moves[id_move]) + "</i>.";

    return frase;
}