'use strict';


const POKEMONS_CRUD_DATA = 'Pokemons';
const pokemons = JSON.parse(localStorage.getItem(POKEMONS_CRUD_DATA)) ?? [];

const createPokemon = () => {
    e.preventDefault();
    const documentFormPokemon = document.forms['formPokemon'];
    const name = documentFormPokemon.name.value;
    const type = documentFormPokemon.type.value;
    const hp = documentFormPokemon.hp.value;
    const attack = documentFormPokemon.attack.value;
    const special = documentFormPokemon.special.value;
    const imgurl = documentFormPokemon.imgurl.value;
    pokemons.push({ name, type, hp, attack, special, imgurl });
    localStorage.setItem(POKEMONS_CRUD_DATA, JSON.stringify(pokemons));
    readPokemons();
};

const readPokemons = () => {
    const tBodyPokemons = document.getElementById('tBodyPokemons');
    tBodyPokemons.innerHTML = '';
    pokemons.forEach((element, index) => {
        const { name, type, hp, attack, special, imgurl } = element;
        tBodyPokemons.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${name}</td>
            <td>${type}</td>
            <td>${hp}</td>
            <td>${attack}</td>
            <td>${special}</td>
            <td>
            <img
                src="${imgurl}"
                alt="${name}" class="img-fluid" style="max-width: 128px;" />
            </td>
            <td>
            <button 
            class="btn btn-info"
            onclick="readPokemon(${index})"
            >
            ✏
            </button>
            <button 
            class="btn btn-danger"
            onclick="deletePokemon(${index})"
            >
            🗑
            </button>
            </td>
        </tr>
        `;
    });
};

const readPokemon = (index) => {
    // const pokemon = pokemons.find((_, i) => {
    //     return i === index;
    const documentFormPokemon = document.forms['formPokemon'];
    const pokemon = pokemons.slice(index, index + 1)[0];
    const { name, type, hp, attack, special, imgurl } = pokemon;
    documentFormPokemon.index.value = index;
    documentFormPokemon.name.value = name;
    documentFormPokemon.type.value = type;
    documentFormPokemon.hp.value = hp;
    documentFormPokemon.attack.value = attack;
    documentFormPokemon.special.value = special;
    documentFormPokemon.imgurl.value = imgurl;
    document.getElementById('button').innerText = 'Editar';


};

const updatePokemon = (index) => {
    const documentFormPokemon = document.forms['formPokemon'];
    const name = documentFormPokemon.name.value;
    const type = documentFormPokemon.type.value;
    const hp = documentFormPokemon.hp.value;
    const attack = documentFormPokemon.attack.value;
    const special = documentFormPokemon.special.value;
    const imgurl = documentFormPokemon.imgurl.value;
    pokemons.splice(index, 1, { name, type, hp, attack, special, imgurl });
    localStorage.setItem(POKEMONS_CRUD_DATA, JSON.stringify(pokemons));
    documentFormPokemon.reset();
    readPokemons();
    document.getElementById('button').innerText = 'Crear';
}

const deletePokemon = (index) => {


    Swal.fire({
        title: 'Seguro Mano?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si de Uña!'
    }).then((result) => {
        if (result.isConfirmed) {
            pokemons.splice(index, 1);
            localStorage.setItem(POKEMONS_CRUD_DATA, JSON.stringify(pokemons));
            readPokemons();
            Swal.fire(
                'Eliminado!',
                'Ya no lo puedes recuperar pipipi.',
                'success'
            )
        } else if (
            result.dismiss == Swal.DismissReason.cancel
        ) {
            Swal.fire(
                'Cancelado',
                'Te salvaste pelon:',
                'error'
            );
        }
    });

};

const documentReady = () => {
    const formPokemon = document.getElementById('formPokemon');
    const submitPokemon = (e) => {
        e.preventDefault();
        const index = document.getElementById('index').value;
        // (index === '' && console.log('create'));
        // (index === '' || console.log('update'));
        if (index === '') {
            createPokemon();
        } else {
            updatePokemon(index);
        }
    };
    readPokemons();
    formPokemon.addEventListener('submit', submitPokemon);
};
document.addEventListener('DOMContentLoaded', documentReady);