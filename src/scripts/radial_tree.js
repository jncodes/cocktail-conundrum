import display from "./information";

function autoBox() {
        const { x, y, width, height } = this.getBBox();
        return [x, y, width, height];
    }

const draw = () => {
    const width = 975;
    const height = 975;
    const radius = width / 2;

    d3.select('svg').remove();

    const svg = d3.select('#app')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // svg.append('g')
    //     .attr('transform', 'translate(' + radius + ', ' + radius + ')');

    const dataStructure = d3.stratify()
        .id(function (d) { return d.child; })
        .parentId(function (d) { return d.parent; })
        (window.tree_data);

    const treeStructure = d3.cluster()
        .size([360, radius - 60]);

    const information = treeStructure(dataStructure);

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
        .attr('href', function (d) { 
            // debugger
            return d.data.image; })
        .attr("x", "-12px")
        .attr("y", "-12px")
        .attr("width", "24px")
        .attr("height", "24px")
        .attr("transform", d => {
            if (d.child) {
                return `rotate(${-(d.x - 90)})`
            } else {
                return (d.x >= 180 ? "rotate(180)" : null)
            }
        })
        .on('click', function (d) { return display(d); });

    nodes.append("text")
        .text(d => d.data.child)
        .classed("text", true)
        .attr("font-size", d => (10 + (3 * d.height)))
        .attr("x", d => ((d.x < 180) === !d.child ? (d.height + 8) : -(d.height + 8)))
        .attr("text-anchor", d => ((d.x < 180) === !d.child ? "start" : "end"))
        .attr("transform", d => {
            if (d.child) {
                return `rotate(${-(d.x - 90)})`
            } else {
                return (d.x >= 180 ? "rotate(180)" : null)
            }
        })
        .on('click', function (d) { return display(d); });
        
    svg.attr("viewBox", autoBox);
};

export default draw;