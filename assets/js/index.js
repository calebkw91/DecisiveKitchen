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
        
        somethingOrOther(ingredients);
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
