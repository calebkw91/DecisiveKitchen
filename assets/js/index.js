// import $ from 'jquery';

function findRecipeMain(mainIng){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + mainIng;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {

        let random = Math.floor(Math.random() * response.meals.length);
        findRecipeID(response.meals[random].idMeal);
    });
}

function findRecipeID(recipeID){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeID;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        recipeToDOM(response.meals[0]);
    });
}
    
// NEW STUFF

let nutritionAmounts = {
    FATS: 0,
    CARBS: 0,
    SUGARS: 0,
    PROTIEN: 0
};

let somethingOrOther = (arr) => {
    arr.forEach(obj => {
        if (obj.ingredient || obj.measure) {
            let searchIngredient = obj.ingredient.replace(/ /g, '%20');
            let searchMeasure = obj.measure.replace(/ /g, '%20');
            tempName(searchMeasure + '%20' + searchIngredient);
        }
        // RENAME 'something'
    });
    setDOM();
}

// function to make the call
let tempName = (foodData) => {
    // which ingrediant to search for
    // let ingrediant = 
    // url stuffs
    let apiInfo = {
        key: 'ff2e56199c3ca1c897bcdae2d4f3d7a9',
        ID: '126bfcd4'
    };

    $.ajax({
        url: 'https://api.edamam.com/api/nutrition-data?app_id=' + apiInfo.ID + '&app_key=' + apiInfo.key +
            '&ingr=' + foodData,
        type: 'GET'
    })
        .fail(err => { console.log(err); })
        .done(res => {
            // if succeed
            // or 0, some calls don't return all nutrients
            let fats = res.totalNutrients.FAT === undefined ? 0 : res.totalNutrients.FAT.quantity;
            let carbs = res.totalNutrients.CHOCDF === undefined ? 0 : res.totalNutrients.CHOCDF.quantity;
            let sugar = res.totalNutrients.SUGAR === undefined ? 0 : res.totalNutrients.SUGAR.quantity;
            let protien = res.totalNutrients.PROCNT === undefined ? 0 : res.totalNutrients.PROCNT.quantity;

            // // add the nutrients to object for each ingredient
            nutritionAmounts.FATS += fats;
            nutritionAmounts.CARBS += carbs;
            nutritionAmounts.SUGARS += sugar;
            nutritionAmounts.PROTIEN += protien;

        });
};

let setDOM = () => {
    // set stuff in object to html here
    console.log(nutritionAmounts);
};

findRecipeID("52772");

// fat carbs/sugar protien
   
// Random recipe search function 
function findRandomRecipe(){
    console.log("here");
    let queryURL = "https://www.themealdb.com/api/json/v1/1/randomselection.php";

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        console.log(response);

        recipeToDOM(response.meals[0]);
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

function recipeToDOM(response){
    console.log(response);
    $("#recipe-name").text(response.strMeal);
    $("#instructions").text(response.strInstructions);
    $("#recipe-img").attr("src", response.strMealThumb);
    $("#recipe-video").attr("src", response.strYoutube);

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

    for(let i=0; i<ingredients.length; i++){
        if(ingredients[i].ingredient)
        {
            let liEL = $("<li>").text(ingredients[i].measure + " : " + ingredients[i].ingredient);
            $("#ingredients").append(liEL);
        }
    }

    somethingOrOther(ingredients);
}

$("#search").on("click", function(){
    let searchValue = $("#search-value").val();
    var selectedOption = $('#search-select option:selected').attr("value");

    console.log(selectedOption);
    console.log(searchValue);

    if(selectedOption == "ingredients")
    {
        findRecipeMain(searchValue);
    }
    
    if(selectedOption == "random")
    {
        findRandomRecipe();
    }

})

findRecipeID("52772");
