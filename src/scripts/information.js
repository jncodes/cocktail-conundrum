const display = (d) => {
    const key = d.data.child.toUpperCase();
    const ingredient = window.state.ingredients[key];
    const cocktail = window.state.drinks[key];
    let ingredient_details;
    let cocktail_details;
    if (ingredient) {
        ingredient_details = [
            ingredient.strIngredient,
            ingredient.strDescription
        ];
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

