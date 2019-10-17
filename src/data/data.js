const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');




// -----------------------------------------------------------------------------

// Search by ingredient
// const ingredient = .value;
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient).then(response => {
    return response.json()
  })  .then(data => {
    console.log(data)
  }).drinks

// Sample response
// {
//     "drinks": [
//         {
//             "strDrink": "3-Mile Long Island Iced Tea",
//             "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
//             "idDrink": "15300"
//         }, ...


// Search by cocktail name
