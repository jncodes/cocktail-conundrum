// https://www.thecocktaildb.com/api.php


// Search cocktail by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// Search by ingredient
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// Lookup a random cocktail
// https://www.thecocktaildb.com/api/json/v1/1/random.php


export const ingredients = () => {
    // const ingredients = [];
    // window.ingredients = ingredients;
    // for (let i = 0; ingredients.length <= 470 ; i++) {
    //     console.log(i);
        // fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=1`)
            .then(response => response.json())
            // .catch(() => { })
            .then(data => {
                console.log(data);
                Object.assign(state, data['ingredients'])
            });
    }
};

// const ingredients = () => {
//     const list = [];
//     fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
//         .then(response => response.json())
//         .then(data => {
//             data["drinks"].forEach(drink => {
//                 return list.push(...Object.values(drink))
//             });
//         });
//     return (list);
// };

export const cocktail = () => {

}

export const ingredient = () => {

}

export const random = () => {

}