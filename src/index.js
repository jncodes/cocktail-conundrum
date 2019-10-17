import './styles/index.scss';
import searchByName from './scripts/search_by_name';

// find element by ID
const input = document.querySelector('#cocktail_name');
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (input.value !== "") { 
            searchByName(input.value) 
        };
    }
})
