const ingredients = () => {
    const list = [];
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.json())
        .then(data => {
            data["drinks"].forEach(drink => { 
                return list.push(...Object.values(drink)) 
            });
        });
    return (list);
};