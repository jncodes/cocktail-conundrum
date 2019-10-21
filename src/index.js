import './styles/index.scss';

import search from './scripts/search';
import ingredients from './scripts/ingredients';
import autocomplete from './scripts/autocomplete';
// import display from './scripts/information';

document.addEventListener('DOMContentLoaded', () => { 

    const state = {};
    window.state = state;
    
    ingredients();
    const input = document.getElementById('ingredient');
    autocomplete(input, window.ingredients_list);
    
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.value !== "") { 
                search(input.value) 
            };
        }
    })

    // display();

});
