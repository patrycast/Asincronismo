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
            pokemonInfo.innerHTML = `Pokémon no encontrado`;
        }
    } catch (error) {
        pokemonInfo.innerHTML = `Error al buscar el Pokémon`;
        console.error(error);
    }
};

// Función para obtener el ID del input y buscar el Poke
const buscarPoke = () => {
    const pokeNumber = Number(pokeId.value.trim());
    if (pokeNumber) {
        pokeapi(pokeNumber);
        pokeId.value = '';
    } else {
        pokemonInfo.innerHTML = `Por favor, ingresa un número válido`;
    }
};


const init = () => {
    btn.addEventListener("click", buscarPoke);
};

init();
