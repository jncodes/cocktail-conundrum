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
                        state.push({ 'cocktail': drink.strDrink, 'ingredient': drink[`strIngredient${i}`], 'image': drink.strDrinkThumb });
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

            console.log(information.descendants());
            console.log(information.links());
            
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
            
            const nodes = svg.selectAll("g")
                .data(information.descendants())
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                })
                
                nodes.append('image')
                    .attr('href', function(d) { return d.image; })
                    .attr("x", "-12px")
                    .attr("y", "-12px")
                    .attr("width", "24px")
                    .attr("height", "24px");
                debugger
                // nodes.append("circle")
                // .attr("r", 7)
                // .style("fill", "#69b3a2")
                // .attr("stroke", "black")
                // .style("stroke-width", 2)
                
                nodes.append("text")
                    // .attr("dy", ".31em")
                    // .attr("x", function (d) { return d.x < 180 === !d.ingredient ? 6 : -6; })
                    // .style("text-anchor", function (d) { return d.x < 180 === !d.ingredient ? "start" : "end"; })
                    // .attr("transform", function (d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
                    // .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
                    
                    .text(d => d.data.ingredient)
                    .classed("text", true)
                    .attr("font-size", d => (10 + (3 * d.height)))
                    .attr("x", d => ((d.x < 180) === !d.ingredient ? (d.height + 8) : -(d.height + 8)))
                    .attr("text-anchor", d => ((d.x < 180) === !d.ingredient ? "start" : "end"))
                    .attr("transform", d => {
                        if (d.ingredient) {
                            return `rotate(${-(d.x - 90)})`
                        } else {
                            return (d.x >= 180 ? "rotate(180)" : null)
                        }
                    })

                    // .attr("dy", "0.31em")
                    // .attr("x", d => d.x < Math.PI === !d.ingredient ? 6 : -6)
                    // .attr("text-anchor", d => d.x < Math.PI === !d.ingredient ? "start" : "end")
                    // .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
                    // .text(d => d.data.ingredient)
                    // .filter(d => d.ingredient)
                    // .clone(true).lower()
                    // .attr("stroke", "white");
            // const names = svg.append('g')
            //     .selectAll("text")
            //     .data(information.descendants())
            //     .enter()
            //     .append("text")
            //     // .text(function(d) {return d.data.ingredient;})
            //     // .attr('x', function(d){return d.x + 5;})
            //     // .attr('y', function(d){return d.y + 5;})
            //     .attr("dy", ".31em")
            //     .attr("x", function (d) { return d.x < 180 === !d.ingredient ? 6 : -6; })
            //     .style("text-anchor", function (d) { return d.x < 180 === !d.ingredient ? "start" : "end"; })
            //     .attr("transform", function (d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
            //     .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

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