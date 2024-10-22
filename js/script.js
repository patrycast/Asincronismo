const pokeId=document.querySelector("#pokemon-id");
const btn= document.querySelector("#btn-poke");
const pokemonInfo = document.querySelector("#pokemon-info");



const pokeapi = async (id) => {
    try {
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (response.ok) {
            const json = await response.json();
            console.log(json);

            // Datos del Pokémon
            const name = json.name.charAt(0).toUpperCase() + json.name.slice(1);
            const height = (json.height / 10).toFixed(2); 
            const weight = (json.weight / 10).toFixed(2); 
            const types = json.types.map(type => type.type.name).join(', ');
            const imageUrl = json.sprites.front_default;

            // info del Pokémon
            pokemonInfo.innerHTML = `
                <div class="pokemon-card">
                    <img class="poke-img" src="${imageUrl}" alt="${name}">
                    <h2>Nombre: ${name}</h2>
                    <p>Tipo: ${types}</p>
                    <p>Altura: ${height} m</p>
                    <p>Peso: ${weight} kg</p>
                    <p>ID: ${json.id}</p>
                </div>    
            `;
        }
        else {
            pokemonInfo.innerHTML = `<div class="info-Container"><p class="msg-info">Pokémon no encontrado</p> <img class="img-tryAgain" src="./img/try-again.png"></div>`;
            pokeId.value = '';
        }
    } catch (error) {
        pokemonInfo.innerHTML =  `<div class="info-Container"><p class="msg-info">Error al buscar el Pokémon</p> <img class="img-tryAgain" src="./img/try-again.png"></div>`;
        console.error(error);
        pokeId.value = '';

    }
};

// Función para obtener el ID del input y buscar el Poke
const buscarPoke = () => {
    const pokeNumber = Number(pokeId.value.trim());
    if (pokeNumber) {
        pokeapi(pokeNumber);
        pokeId.value = '';
    } else {
        pokemonInfo.innerHTML =`<div class="info-Container"><p class="msg-info">Por favor, ingresa un número válido</p> <img class="img-tryAgain" src="./img/try-again.png"></div>`;
        pokeId.value = '';
    }
};


const init = () => {
    btn.addEventListener("click", buscarPoke);
};

init();
