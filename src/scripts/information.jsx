// const display = () => {
//     d3.selectAll('image')
//         .on('click', function(e) {
//             d3.select('#information-box')
//                 .text('test')
//         });
// };


const display = (d) => {
    const ingredient = window.state.ingredients[d.data.child];
    const cocktail = window.state.drinks[d.data.child];
    
    d3.select('#information-box')
        .append('ul')

    if (ingredient) {
        return (
            <ul>
                <li>{cocktail.strDrink}</li>
                <li>{cocktail.strAlcoholic}</li>
                <li>{cocktail.strCategory}</li>
                <li>{cocktail.strGlass}</li>
                <li>{cocktail.strInstructions}</li>
            </ul>
        );
    } else {
        return (
            <ul>
                <li>{ingredient.strIngredient}</li>
                <li>{ingredient.strDescription}</li>
            </ul>
        );
    }
};

export default display;

