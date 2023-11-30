const msgErro = document.getElementById('mensagemErro');
const nomeFilme = document.getElementById('nomeFilme');
const btnBuscar = document.getElementById('btnBuscar');
const titulo = document.getElementById('titulo');
const poster = document.getElementById('poster');
const sinopse = document.getElementById('sinopse');
const ano = document.getElementById('ano');
const duracao = document.getElementById('duracao');
const genero = document.getElementById('genero');
const atores = document.getElementById('atores');
const diretor = document.getElementById('diretor');

const apiKey = 'c4f07ff4';
const imgDefault = "./default_image.png";

async function buscaFilme(nomeFilme){
    const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeFilme}&apikey=${apiKey}`);
    return resposta.json();
}

//Ao clicar no buscar, o progama ira limpar os campos (se tiver algo), depois ele consulta a API e define os valores no core.

btnBuscar.addEventListener('click', () =>{
    limpaCampos();
    core();
})


function limpaCampos(){
    titulo.textContent = '';
    sinopse.textContent = '';
    ano.textContent = '';
    duracao.textContent = '';
    genero.textContent = '';
    atores.textContent = '';
    diretor.textContent = '';
    poster.setAttribute('scr', imgDefault);
}


async function core(){
    try{
        const filme = await buscaFilme(nomeFilme.value);
        validaDados(filme);
        defineValores(filme);
    }catch(erro){
        console.log(erro);
        msgErro.textContent = `${erro}`;
    }  
}

//Definindo valores para consulta na API

function defineValores(filme){
    titulo.textContent = filme.Title;
    sinopse.textContent = filme.Plot;
    ano.textContent = 'Year: ' + filme.Year;
    duracao.textContent = 'Run time: ' + filme.Runtime;
    genero.textContent = 'Genre: ' + filme.Genre;
    atores.textContent = 'Actors: ' + filme.Actors;
    diretor.textContent = 'Diretor: ' + filme.Diretor;
    poster.setAttribute("scr", filme.Poster);
}

//Definindo a mensagem de erro

function validaDados(filme){
    if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === undefined){
        throw new Error('Filme não encontrado.')
    }
}