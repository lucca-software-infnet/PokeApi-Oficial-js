// Seleciona o elemento com a classe 'pokemon__name' para exibir o nome do Pokémon.
const pokemonName = document.querySelector('.pokemon__name');
// Seleciona o elemento com a classe 'pokemon__number' para exibir o número do Pokémon.
const pokemonNumber = document.querySelector('.pokemon__number');
// Seleciona o elemento com a classe 'pokemon__image' para exibir a imagem do Pokémon.
const pokemonImage = document.querySelector('.pokemon__image');

const habilidades = document.querySelector('.habilidades');
const type = document.querySelector('.type');
const hp = document.querySelector('.hp');
const dano = document.querySelector('.dano');
const defesa = document.querySelector('.defesa');

// Seleciona o formulário com a classe 'form'.
const form = document.querySelector('.form');
// Seleciona o campo de entrada com a classe 'input__search'.
const input = document.querySelector('.input__search');
// Seleciona o botão de navegação anterior com a classe 'btn-prev'.
const buttonPrev = document.querySelector('.btn-prev');
// Seleciona o botão de navegação próximo com a classe 'btn-next'.
const buttonNext = document.querySelector('.btn-next');

// Inicializa a variável searchPokemon com o valor 1, representando o ID do Pokémon a ser pesquisado.
let searchPokemon = 1;

// Função assíncrona que busca os dados do Pokémon na API pokeapi.co.
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Se a resposta da API for bem-sucedida (status 200), converte os dados para JSON e retorna-os.
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Função assíncrona que renderiza os dados do Pokémon na página.
const renderPokemon = async (pokemon) => {
  // Exibe 'Loading...' enquanto os dados do Pokémon estão sendo carregados.
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Obtém os dados do Pokémon usando a função fetchPokemon.
  const data = await fetchPokemon(pokemon);

  // Se os dados do Pokémon forem encontrados, atualiza a imagem, nome e número do Pokémon.
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    habilidades.innerHTML = data.abilities.map(ability => `<p>${ability.ability.name}, </p>`).join('');
    type.innerHTML = data.types.map(type => `<p>${type.type.name}, </p>`).join('');
    hp.innerHTML = data.stats[0].base_stat;
    dano.innerHTML = data.stats[1].base_stat;
    defesa.innerHTML = data.stats[2].base_stat;
    
    
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    // Atualiza a variável searchPokemon com o ID do Pokémon atual.
    searchPokemon = data.id;
  } else {
    // Se os dados do Pokémon não forem encontrados, exibe uma mensagem de erro e esconde a imagem do Pokémon.
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona um evento de submit ao formulário que previne o comportamento padrão e renderiza o Pokémon com base na entrada do usuário.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Adiciona um evento de clique ao botão de navegação anterior que diminui o ID do Pokémon e renderiza o Pokémon anterior.
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Adiciona um evento de clique ao botão de navegação próximo que aumenta o ID do Pokémon e renderiza o próximo Pokémon.
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Renderiza o Pokémon inicial com o ID armazenado na variável searchPokemon.
renderPokemon(searchPokemon);
