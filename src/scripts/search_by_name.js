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
            const width = 600;
            const height = 600;
            const radius = width / 2;

            const svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + radius + ', ' + radius + ')');
                // .attr('transform', 'translate(50, 50)');

            const dataStructure = d3.stratify()
                .id(function (d) { return d.ingredient; })
                .parentId(function (d) { return d.cocktail; })
                (window.state);
            
            const treeStructure = d3.cluster()
                .size([360, radius - 60]);
            // const treeStructure = d3.tree().size([500, 300]);

            console.log(dataStructure);
            console.log(treeStructure);

            // debugger

            const information = treeStructure(dataStructure);

            // console.log(information.descendants());
            // console.log(information.links());
            
            const linksGenerator = d3.linkRadial()
                .angle(function (d) { return d.x / 180 * Math.PI; })
                .radius(function (d) { return d.y; });
            
            svg.selectAll('path')
                .data(information.links())
                .enter()
                .append('path')
                .attr("d", linksGenerator)
                .style("fill", 'none')
                .attr("stroke", '#ccc');
            
            svg.selectAll("g")
                .data(information.descendants())
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                })
                .append("circle")
                .attr("r", 7)
                .style("fill", "#69b3a2")
                .attr("stroke", "black")
                .style("stroke-width", 2);

            // const treeStructure = d3.tree().size([500, 300]);
            // const information = treeStructure(dataStructure);

            // const circles = svg.append('g')
            //     .selectAll('circle')
            //     .data(information.descendants());
            // circles.enter()
            //     .append('circle')
            //     .attr('cx', function (d) { return d.x; })
            //     .attr('cy', function (d) { return d.y; })
            //     .attr('r', 5);
        });
};

export default searchByName;