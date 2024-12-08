const userInput = document.getElementById("search-input");
const submitBtn = document.getElementById("search-button");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokedex = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const displayPokemon = (data) => {
  const { id, name, weight, height, sprites, types, stats } = data;

  // Extract sprite URLs
  const { front_default } = sprites;

  // Clear existing types before adding new ones
  pokemonTypes.innerHTML = "";

  // Create a separate element for each type
  types.forEach(({ type: { name } }) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = name.toUpperCase();
    typeElement.className = `type ${name.toLowerCase()}`; // Add the correct class for each type
    pokemonTypes.appendChild(typeElement);
  });

  // Map stats to a key-value object
  const allStats = {};
  stats.forEach(({ base_stat, stat: { name } }) => {
    allStats[name] = base_stat;
  });

  // Insert data into the DOM
  pokemonImage.innerHTML = `<img src="${front_default}" alt="${name}" id="sprite">`;
  pokemonName.innerHTML = `${name.toUpperCase()}`;
  pokemonId.innerHTML = `#${id}`;
  pokemonWeight.innerHTML = `Weight: ${weight}`;
  pokemonHeight.innerHTML = `Height: ${height}`;

  // Stats
  hp.innerHTML = allStats["hp"];
  attack.innerHTML = allStats["attack"];
  defense.innerHTML = allStats["defense"];
  specialAttack.innerHTML = allStats["special-attack"];
  specialDefense.innerHTML = allStats["special-defense"];
  speed.innerHTML = allStats["speed"];

  // Show the Pokémon info and stats
  document.getElementById("pokemon-info").style.display = "block";
  document.getElementById("stats").style.display = "block";
};

const searchPokemon = async () => {
  const input = userInput.value.trim();
  if (input == "") {
    alert("Please Input a Name or an ID");
    return;
  }
  const data = await fetchData(input);

  displayPokemon(data);
};

const fetchData = async (input) => {
  try {
    const res = await fetch(`${pokedex}/${input.toLowerCase()}`);
    const data = await res.json();
    return data;
  } catch (err) {
    alert("Pokémon not found");
  }
};

userInput.addEventListener("keydown", (e) => {
  if (e.key === 13) {
    searchPokemon();
  }
});

submitBtn.addEventListener("click", searchPokemon);
