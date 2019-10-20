import './styles/index.scss';

import search from './scripts/search';
import ingredients from './scripts/ingredients';

// doc-ready callback

const state = {};
window.state = state;

ingredients();
// find element by ID
const input = document.querySelector('#cocktail_name');
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (input.value !== "") { 
            search(input.value) 
        };
    }
})
