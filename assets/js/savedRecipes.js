// for reference
// will get saved recepies from local storage
// then will call them to display in savedRecipies.html


// Function to show or hide recipie
function showRecipe() {
    $(".recipeName").on("click", function () {
        let state = $(this).attr("data-state");

        if (state === "hide") {
            $("#recipe" + $(this).attr("target")).hide();
            $(this).attr("data-state", "show");
        } else {
            $("#recipe" + $(this).attr("target")).show();
            $(this).attr("data-state", "hide");
        }

    });
};

// call function
showRecipe();

loadRecipes();

function loadRecipes(){
    let savedRecipes = [];
    if (localStorage.getItem("savedRecipes") !== null){
        savedRecipes = savedRecipes.concat(JSON.parse(localStorage.getItem("savedRecipes")));
        //Load saved recipes into HTML elements
    }
}
