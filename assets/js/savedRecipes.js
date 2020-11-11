loadRecipes();

function loadRecipes(){
    let savedRecipes = [];
    if (localStorage.getItem("savedRecipes") !== null){
        savedRecipes = savedRecipes.concat(JSON.parse(localStorage.getItem("savedRecipes")));
        //Load saved recipes into HTML elements
    }
}