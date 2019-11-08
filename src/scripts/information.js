const display = (d) => {
    const key = d.data.child.toUpperCase();
    const ingredient = window.state.ingredients[key];
    const cocktail = window.state.drinks[key];
    // let ingredient_details;
    let ingredient_details = [];
    let cocktail_details = [];
    if (ingredient) {
        if (ingredient.strIngredient !== null) ingredient_details.push('Ingredient', ingredient.strIngredient);
        if (ingredient.strDescription !== null) ingredient_details.push('Description', ingredient.strDescription);
        if (ingredient.strType !== null) ingredient_details.push('Type', ingredient.strType);
        if (ingredient.strAlcohol !== null) ingredient_details.push('Alcohol', ingredient.strAlcohol);
        if (ingredient.strABV !== null) ingredient_details.push('ABV', ingredient.strABV);
    }
    if (cocktail) {
        cocktail_details = [
            cocktail.strDrink,
            cocktail.strAlcoholic,
            cocktail.strCategory,
            cocktail.strGlass,
            cocktail.strInstructions
        ];
    }
    const info = ingredient_details || cocktail_details;
    
    d3.select('ul').remove();

    var ul = d3.select('#information-box')
        .append('ul');

    ul.selectAll('li')
        .data(info)
        .enter()
        .append('li')
        .html(String);
};

export default display;

