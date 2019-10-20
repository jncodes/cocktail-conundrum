const ingredients = () => {
    state['ingredients'] = {};
    const ingredients_list = [];
    window.ingredients_list = ingredients_list;
    for (let i = 0; i < 1000; i++) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`)
            .then(response => response.json())
            .then(data => {
                const ingredient = data.ingredients[0];
                state['ingredients'][ingredient.strIngredient] = ingredient;
                ingredients_list.push(ingredient.strIngredient);
            })
            .catch(() => { });
    }
}

export default ingredients;