import draw from './radial_tree';

const capitalize = string => {
    const words = string.split(' ');
    let cap_words = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return cap_words.join(' ');
};

const search = ingredient => {
    ingredient = ingredient.toLowerCase();
    state['drinks'] = {};
    const tree_data = [];
    window.tree_data = tree_data;
    d3.json('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient)
        .then(data => {
            tree_data.push({ 'parent': '', 'child': ingredient, 'image': null });
            const drinks = data['drinks'];
            const promise_array = [];
            drinks.map((drink, idx) => {
                tree_data.push({ 'parent': ingredient, 'child': capitalize(drink.strDrink), 'image': drink.strDrinkThumb });
                promise_array[idx] = d3.json('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink.idDrink )
                    .then(data => {
                        const drink = data.drinks[0];
                        state['drinks'][drink.strDrink.toUpperCase()] = drink;
                        for (let i = 1; i <= 15; i++) {
                            if (drink[`strIngredient${i}`] !== null) {
                                tree_data.push({
                                    'parent': capitalize(drink.strDrink),
                                    'child': capitalize(drink[`strIngredient${i}`]),
                                    'image': `https://www.thecocktaildb.com/images/ingredients/${drink[`strIngredient${i}`]}.png`
                                });
                            }
                        }
                    });
                });
            Promise.all(promise_array).then(() => draw());
        });
};

export default search;