const searchByName = name => {
    d3.json("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name)
        .then(data => {
            let state = [];
            state.push({ 'cocktail': '', 'ingredient': name })
            window.state = state;
            let drinks = data["drinks"];
            drinks.map(drink => {
                state.push({ 'cocktail': name, 'ingredient': drink.strDrink });
                for (let i = 1; i <= 15; i++) {
                    if (drink[`strIngredient${i}`] !== null) {
                        state.push({ 'cocktail': drink.strDrink, 'ingredient': drink[`strIngredient${i}`] });
                    }
                }
            });
        }).then(() => {
            const svg = d3.select('body')
                .append('svg')
                .attr('width', 600)
                .attr('height', 600)
                .append('g')
                .attr('transform', 'translate(50, 50)');
            const dataStructure = d3.stratify()
                .id(function (d) { return d.ingredient; })
                .parentId(function (d) { return d.cocktail; })
                (window.state);
            const treeStructure = d3.tree().size([500, 300]);
            const information = treeStructure(dataStructure);
            const circles = svg.append('g')
                .selectAll('circle')
                .data(information.descendants());
            circles.enter()
                .append('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', 5);
        });
};

export default searchByName;