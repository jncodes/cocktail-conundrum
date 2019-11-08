const ingredients = () => {
    state['ingredients'] = {};
    const ingredients_list = [];
    window.ingredients_list = ingredients_list;
    const promise_array = [];
    for (let i = 0; i < 1000; i++) {
        promise_array[i] = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`)
            .then(response => response.json())
            .then(data => {
                const ingredient = data.ingredients[0];
                state['ingredients'][ingredient.strIngredient.toUpperCase()] = ingredient;
                ingredients_list.push(ingredient.strIngredient);
            })
            .catch(() => { });
    }
    Promise.all(promise_array)
        .then(() => document.getElementById('ingredient').disabled = false);
}

export default ingredients;