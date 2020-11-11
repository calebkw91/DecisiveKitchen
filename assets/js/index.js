// import $ from 'jquery';

function findRecipeMain(mainIng){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast" + mainIng;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        for (let i=0; i<response.meals.length; i++){
            //Create html elements to a list on the page, when a link is clicked use findRecipeID function to
            //pull up recipe details
        }
    });
}

function findRecipeID(recipeID){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeID;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

        let recipeName = response.meals[0].strMeal;
        let recipeInstructions = response.meals[0].strInstructions;
        let recipeImage = response.meals[0].strMealThumb;
        let recipeVideo = response.meals[0].strYoutube;

        let ingredients = 
        [{
            ingredient: response.meals[0].strIngredient1,
            measure: response.meals[0].strMeasure1
        },{
            ingredient: response.meals[0].strIngredient2,
            measure: response.meals[0].strMeasure2
        },{
            ingredient: response.meals[0].strIngredient3,
            measure: response.meals[0].strMeasure3
        },{
            ingredient: response.meals[0].strIngredient4,
            measure: response.meals[0].strMeasure4
        },{
            ingredient: response.meals[0].strIngredient5,
            measure: response.meals[0].strMeasure5
        },{
            ingredient: response.meals[0].strIngredient6,
            measure: response.meals[0].strMeasure6
        },{
            ingredient: response.meals[0].strIngredient7,
            measure: response.meals[0].strMeasure7
        },{
            ingredient: response.meals[0].strIngredient8,
            measure: response.meals[0].strMeasure8
        },{
            ingredient: response.meals[0].strIngredient9,
            measure: response.meals[0].strMeasure9
        },{
            ingredient: response.meals[0].strIngredient10,
            measure: response.meals[0].strMeasure10
        },{
            ingredient: response.meals[0].strIngredient11,
            measure: response.meals[0].strMeasure11
        },{
            ingredient: response.meals[0].strIngredient12,
            measure: response.meals[0].strMeasure12
        },{
            ingredient: response.meals[0].strIngredient13,
            measure: response.meals[0].strMeasure13
        },{
            ingredient: response.meals[0].strIngredient14,
            measure: response.meals[0].strMeasure14
        },{
            ingredient: response.meals[0].strIngredient15,
            measure: response.meals[0].strMeasure15
        },{
            ingredient: response.meals[0].strIngredient16,
            measure: response.meals[0].strMeasure16
        },{
            ingredient: response.meals[0].strIngredient17,
            measure: response.meals[0].strMeasure17
        },{
            ingredient: response.meals[0].strIngredient18,
            measure: response.meals[0].strMeasure18
        },{
            ingredient: response.meals[0].strIngredient19,
            measure: response.meals[0].strMeasure19
        },{
            ingredient: response.meals[0].strIngredient20,
            measure: response.meals[0].strMeasure20
        }]
    });
}

// Random recipe search function 
function findRecipeID(recipeID){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/randomselection.php"+ recipeID;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

        let recipeName = response.meals[0].strMeal;
        let recipeInstructions = response.meals[0].strInstructions;
        let recipeImage = response.meals[0].strMealThumb;
        let recipeVideo = response.meals[0].strYoutube;
        let ingredients = 
        [{
            ingredient: response.meals[0].strIngredient1,
            measure: response.meals[0].strMeasure1
        },{
            ingredient: response.meals[0].strIngredient2,
            measure: response.meals[0].strMeasure2
        },{
            ingredient: response.meals[0].strIngredient3,
            measure: response.meals[0].strMeasure3
        },{
            ingredient: response.meals[0].strIngredient4,
            measure: response.meals[0].strMeasure4
        },{
            ingredient: response.meals[0].strIngredient5,
            measure: response.meals[0].strMeasure5
        },{
            ingredient: response.meals[0].strIngredient6,
            measure: response.meals[0].strMeasure6
        },{
            ingredient: response.meals[0].strIngredient7,
            measure: response.meals[0].strMeasure7
        },{
            ingredient: response.meals[0].strIngredient8,
            measure: response.meals[0].strMeasure8
        },{
            ingredient: response.meals[0].strIngredient9,
            measure: response.meals[0].strMeasure9
        },{
            ingredient: response.meals[0].strIngredient10,
            measure: response.meals[0].strMeasure10
        },{
            ingredient: response.meals[0].strIngredient11,
            measure: response.meals[0].strMeasure11
        },{
            ingredient: response.meals[0].strIngredient12,
            measure: response.meals[0].strMeasure12
        },{
            ingredient: response.meals[0].strIngredient13,
            measure: response.meals[0].strMeasure13
        },{
            ingredient: response.meals[0].strIngredient14,
            measure: response.meals[0].strMeasure14
        },{
            ingredient: response.meals[0].strIngredient15,
            measure: response.meals[0].strMeasure15
        },{
            ingredient: response.meals[0].strIngredient16,
            measure: response.meals[0].strMeasure16
        },{
            ingredient: response.meals[0].strIngredient17,
            measure: response.meals[0].strMeasure17
        },{
            ingredient: response.meals[0].strIngredient18,
            measure: response.meals[0].strMeasure18
        },{
            ingredient: response.meals[0].strIngredient19,
            measure: response.meals[0].strMeasure19
        },{
            ingredient: response.meals[0].strIngredient20,
            measure: response.meals[0].strMeasure20
        }]
    });
}


function saveRecipe(recipeID){
    let savedRecipes = [];
    if (localStorage.getItem("savedRecipes") !== null){
        savedRecipes = savedRecipes.concat(JSON.parse(localStorage.getItem("savedRecipes")));
        console.log(savedRecipes);
        savedRecipes = savedRecipes.concat(recipeID);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    }
    else{
        savedRecipes = [recipeID];
        localStorage.setItem("savedRecipes", savedRecipes);
    }
}

findRecipeID("52772");
