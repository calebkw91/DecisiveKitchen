// for reference
// will get saved recepies from local storage
// then will call them to display in savedRecipes.html

loadRecipes();

//Loads all recipes from local storage
function loadRecipes(){
    let savedRecipes = [];
    if (localStorage.getItem("savedRecipes") !== null){
        savedRecipes = savedRecipes.concat(JSON.parse(localStorage.getItem("savedRecipes")));
        //Load saved recipes into HTML elements
    }

    console.log(savedRecipes);

    //For each recipe in local storage, look up recipe info
    for(let i=0; i<savedRecipes.length; i++){
        findRecipeID(savedRecipes[i], i);
    }
}


function findRecipeID(recipeID, i){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeID;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        //When a response is recieved, call function to print elements to page
        recipeToDOM(response.meals[0], i);
    });
}

function recipeToDOM(response, i){
    console.log(response);

    let ingredients = 
    [{
        ingredient: response.strIngredient1,
        measure: response.strMeasure1
    },{
        ingredient: response.strIngredient2,
        measure: response.strMeasure2
    },{
        ingredient: response.strIngredient3,
        measure: response.strMeasure3
    },{
        ingredient: response.strIngredient4,
        measure: response.strMeasure4
    },{
        ingredient: response.strIngredient5,
        measure: response.strMeasure5
    },{
        ingredient: response.strIngredient6,
        measure: response.strMeasure6
    },{
        ingredient: response.strIngredient7,
        measure: response.strMeasure7
    },{
        ingredient: response.strIngredient8,
        measure: response.strMeasure8
    },{
        ingredient: response.strIngredient9,
        measure: response.strMeasure9
    },{
        ingredient: response.strIngredient10,
        measure: response.strMeasure10
    },{
        ingredient: response.strIngredient11,
        measure: response.strMeasure11
    },{
        ingredient: response.strIngredient12,
        measure: response.strMeasure12
    },{
        ingredient: response.strIngredient13,
        measure: response.strMeasure13
    },{
        ingredient: response.strIngredient14,
        measure: response.strMeasure14
    },{
        ingredient: response.strIngredient15,
        measure: response.strMeasure15
    },{
        ingredient: response.strIngredient16,
        measure: response.strMeasure16
    },{
        ingredient: response.strIngredient17,
        measure: response.strMeasure17
    },{
        ingredient: response.strIngredient18,
        measure: response.strMeasure18
    },{
        ingredient: response.strIngredient19,
        measure: response.strMeasure19
    },{
        ingredient: response.strIngredient20,
        measure: response.strMeasure20
    }]

    //Create and append all elements to page, this is done for each recipe
    //The i variable is passed down from loadRecipes() and is used to give a unique
    //target data state to each recipe, allowing a hide and show feature
    let savedDiv = $("#saved-recipes");

    let titleCol = $("<div>").addClass("columns recipe-title");
    titleCol.attr("target", i);
    let headerELCol = $("<div>").addClass("column is-half");
    let buttonCol = $("<div>").addClass("column is-half");

    let headerEL = $("<h3>").addClass("recipeName");
    headerEL.text(response.strMeal);

    let divHide = $("<div>").addClass("recipe hide");
    divHide.attr("data-state", "hide");
    divHide.attr("target", i);
    divHide.attr("id", "recipe" + i);

    let divCol = $("<div>").addClass("columns");

    let divColImg = $("<div>").addClass("column is-one-third recipeImage");
    let img = $("<img>").attr("src", response.strMealThumb);

    let divColIng = $("<div>").addClass("column is-one-quarter ingredient");
    let ingHead = $("<h3>").text("Ingredients");
    let ingList = $("<ul>").addClass("ingredientList");

    for(let i=0; i<ingredients.length; i++){
        if(ingredients[i].ingredient)
        {
            let liEL = $("<li>").text(ingredients[i].measure + " : " + ingredients[i].ingredient);
            ingList.append(liEL);
        }
    }

    let instDiv = $("<div>").addClass("column direction");
    let instHead = $("<h3>").text("Instructions");

    let instructions = $("<p>").addClass("writtenDirection");
    instructions.text(response.strInstructions);

    let mainBtn = $("<button>").attr("data-id", response.idMeal);
    mainBtn.addClass("main-page-btn");
    mainBtn.text("Link to Full Recipe")

    divColIng.append(ingHead);
    divColIng.append(ingList);

    divColImg.append(img);
    divColImg.append(mainBtn);

    instDiv.append(instHead);
    instDiv.append(instructions);

    divCol.append(divColImg);
    divCol.append(divColIng);
    divCol.append(instDiv);

    divHide.append(divCol);

    headerELCol.append(headerEL);

    titleCol.append(headerELCol);
    titleCol.append(buttonCol);

    savedDiv.append(titleCol);
    savedDiv.append(divHide);
}

//When a recipe title area is clicked, the recipe information will show below it
$(document).on("click", ".recipe-title",  function () {
    console.log("here");
    let state = $(this).attr("data-state");

    if (state === "hide") {
        $("#recipe" + $(this).attr("target")).hide();
        $(this).attr("data-state", "show");
    } else {
        $("#recipe" + $(this).attr("target")).show();
        $(this).attr("data-state", "hide");
    }

});

//When the button is clicked to navigate to main page, store the desired recipe id into local storage
//The main page has a function that will grab this id on load
$(document).on("click", ".main-page-btn", function(){
    let mealID = $(this).attr("data-id");
    localStorage.setItem("recipeLoad", mealID);
    window.location.href = "index.html";
})
