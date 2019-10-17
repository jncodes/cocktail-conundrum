import './styles/index.scss';
import searchByName from './scripts/search_by_name';

const input = document.querySelector('#cocktail_name');
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (input.value !== "") { 
            searchByName(input.value) 
        };
    }
})
