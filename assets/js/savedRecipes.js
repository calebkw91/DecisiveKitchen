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
    // let savedRecipes = [];
    // if (localStorage.getItem("savedRecipes") !== null){
    //     savedRecipes = savedRecipes.concat(JSON.parse(localStorage.getItem("savedRecipes")));
    //     //Load saved recipes into HTML elements
    // }
}



function findRecipeID(loadRecipes){
    let arrayRecipes = [52772, 52771, 53016]
    for (let i = 0; i < arrayRecipes.length; i++){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + arrayRecipes[i];


    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {

        console.log(response);
        console.log(response.meals[0].strMeal)



        


        // // Print recipe name
        // $("#recipeName1").text(response.meals[0].strMeal);

        // // Print image recipieImage  response.meals[0].strMealThumb

        // //let image = $("<img>").attr("src", response.meals[0].strMealThumb);

        // $(".recipieImage").attr("src", response.meals[0].strMealThumb);


        // // Print instructions
        // $(".writtenDirection").text(response.meals[0].strInstructions);   

        // // print YT link into videoLink class
        // $(".videoLink").attr("href", response.meals[0].strYoutube);
        
    });
    }
}

findRecipeID();