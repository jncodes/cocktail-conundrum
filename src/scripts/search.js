import draw from './radial_tree';

const search = ingredient => {
    // clear previous tree render...
    state['drinks'] = {};
    const tree_data = [];
    window.tree_data = tree_data;
    d3.json('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient)
        .then(data => {
            tree_data.push({ 'parent': '', 'child': ingredient, 'image': null });
            const drinks = data['drinks'];
            const promise_array = [];
            drinks.map((drink, idx) => {
                tree_data.push({ 'parent': ingredient, 'child': drink.strDrink, 'image': drink.strDrinkThumb });
                promise_array[idx] = d3.json('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink.idDrink )
                    .then(data => {
                        const drink = data.drinks[0];
                        state['drinks'][drink.strDrink] = drink;
                        for (let i = 1; i <= 15; i++) {
                            if (drink[`strIngredient${i}`] !== null) {
                                tree_data.push({
                                    'parent': drink.strDrink,
                                    'child': drink[`strIngredient${i}`],
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