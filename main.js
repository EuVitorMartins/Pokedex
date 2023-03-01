const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.form_pesquisa');
const input = document.querySelector('.input_pesquisa');
const btnVoltar = document.querySelector('.botao_voltar');
const btnProximo = document.querySelector('.botao_proximo');

let pokemonAtual = 1;

const APIPokemon = (async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResposta.status === 200) {
        const data = await APIResposta.json();
        return data
    }


});

const exibirPokemon = async (pokemon) => {
    pokemonNome.innerHTML = "..."
    pokemonNumero.innerHTML = "...";
    pokemonImage.style.display = "none"

    const data = await APIPokemon(pokemon);

    if (data) {
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImage.style.display = "block"
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        pokemonAtual = data.id;
    } else {
        pokemonNome.innerHTML = ":("
        pokemonNumero.innerHTML = "Não encontrado";
        pokemonImage.style.display = "none"
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    exibirPokemon(input.value.toLowerCase());
})

btnVoltar.addEventListener('click', () => {
    if(pokemonAtual > 1){
        pokemonAtual -= 1 ;
        exibirPokemon(pokemonAtual)
    }
})
btnProximo.addEventListener('click', () => {
    pokemonAtual += 1 ;
    exibirPokemon(pokemonAtual)
})

exibirPokemon(pokemonAtual)