// import $ from 'jquery';

hideRecipeArea();
loadInitialData();

function loadInitialData(){
    let mealID = localStorage.getItem("recipeLoad");
    //Only load initial recipe if data is stored from saved recipes page
    if(mealID){
        //Clear recipeLoad, so the recipe is only on this page load
        localStorage.setItem("recipeLoad", "");
        $("#save").text("Saved!");
        findRecipeID(mealID);
        $("#recipe-area").show();
    }
}

//Searches for recipe based on main ingredient
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

//Looks up recipe by ID
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
 
//Creates blank object to store nutrition data
let index = 0;
let nutritionAmounts = {
    KCALS: 0,
    FATS: 0,
    CARBS: 0,
    SUGARS: 0,
    PROTIEN: 0
};

function createIngredientJSON(arr) {
    let ingredientList = [];
    arr.forEach(obj => {
        // will give us a list of ingredients to use in object post
        if (obj.ingredient && obj.measure) {
            ingredientList.push(obj.measure + " " + obj.ingredient);
        }
    })
    // call postCall at some point
    let ingredientObject = JSON.stringify({"title":"chicken", "ingr":ingredientList});

    //ingredientObject.ingr = ingredientList;

    postCall(ingredientObject);
    //setTimeout(() => { setDOM() }, 3000);  
}

// send post request to nutrition api
let postCall = (data) => {
    let apiInfo = {
        KEY: "2f6d022a5420572bc02047965aa4dbaf",
        ID: "e0a59066"
    }
    let url = 'https://api.edamam.com/api/nutrition-details?app_id=' +
        apiInfo.ID + '&app_key=' +
        apiInfo.KEY;
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: data,
    })
        .done(res => {
            setNutrientObj(res);
        })
        .fail(err => {
            console.log(err);
            setDOM();
        });
} 

let setNutrientObj = (obj) => {       
    // set variables to data or if unavailable
    let totalKcals = obj.totalNutrients.ENERC_KCAL.quantity === undefined ? 0 : obj.totalNutrients.ENERC_KCAL.quantity;
    let fats = obj.totalNutrients.FAT.quantity === undefined ? 0 : obj.totalNutrients.FAT.quantity;
    let carbs = obj.totalNutrients.CHOCDF.quantity === undefined ? 0 : obj.totalNutrients.CHOCDF.quantity;
    let sugar = obj.totalNutrients.SUGAR.quantity === undefined ? 0 : obj.totalNutrients.SUGAR.quantity;
    let protien = obj.totalNutrients.PROCNT.quantity === undefined ? 0 : obj.totalNutrients.PROCNT.quantity;

    // // add the nutrients to object for each ingredient
    nutritionAmounts.KCALS += Math.round(totalKcals);
    nutritionAmounts.FATS += Math.round(fats);
    nutritionAmounts.CARBS += Math.round(carbs);
    nutritionAmounts.SUGARS += Math.round(sugar);
    nutritionAmounts.PROTIEN += Math.round(protien);

    setDOM();   
};

let setDOM = () => {
    // set stuff in object to html here
    if (nutritionAmounts.KCALS === 0) {
        // call failed
        $('#calories-display').text("Calories: " + "Unavailable");
        $('#fat-display').text("Fat: " + "Unavailable");
        $('#carb-display').text("Carbs: " +  "Unavailable");
        $('#protien-display').text("Protien: " + "Unavailable");
        $('#sugar-display').text("Sugar: " + "Unavailable");
    } else {
        // if call succeeded
        $('#calories-display').text("Calories: " + nutritionAmounts.KCALS);
        $('#fat-display').text("Fat: " + nutritionAmounts.FATS + 'g');
        $('#carb-display').text("Carbs: " + nutritionAmounts.CARBS + 'g');
        $('#protien-display').text("Protien: " + nutritionAmounts.PROTIEN + 'g');
        $('#sugar-display').text("Sugar: " + nutritionAmounts.SUGARS + 'g');
    }
} 

// function to split serving when number added to input
let splitServing = () => {
    let amountPeople = $('#amount-servings').val();
    for (const property in nutritionAmounts) {
        nutritionAmounts[property] /= amountPeople;
    }
    setDOM();
};

// listen for number input to change
$('#split').on('click', splitServing);
   
// Random recipe search function 
function findRecipeArea(area){
    let queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area;

    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {
        let random = Math.floor(Math.random() * response.meals.length);
        findRecipeID(response.meals[random].idMeal);
    });
}

//When save recipe button is clicked, store recipe id into local storage
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

//API sends a watch link, changes watch link to embed link to display on page
function createYouTubeEmbedLink (link) {
    return link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
}

//Prints recipe info to index.html
function recipeToDOM(response){
    $("#recipe-name").text(response.strMeal);
    $("#recipe-name").attr("data-id", response.idMeal);
    $("#instructions").text(response.strInstructions);
    $("#recipe-img").attr("src", response.strMealThumb);

    let youtubeLink = createYouTubeEmbedLink(response.strYoutube);

    console.log(youtubeLink);

    $("#recipe-video").attr("src", youtubeLink);

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

    $("#ingredients").empty();

    for(let i=0; i<ingredients.length; i++){
        if(ingredients[i].ingredient)
        {
            let liEL = $("<li>").text(ingredients[i].measure + " : " + ingredients[i].ingredient);
            $("#ingredients").append(liEL);
        }
    }

    // call nutrition functions
    createIngredientJSON(ingredients);
}

//On search, grab value from input field and select option and run the desired search
$("#search").on("click", function(){
    let searchValue = $("#search-value").val();
    var selectedOption = $('#search-select option:selected').attr("value");

    $("#save").text("Save Recipe");

    $("#recipe-area").show();

    if(selectedOption == "ingredients")
    {
        findRecipeMain(searchValue);
    }
    
    if(selectedOption == "area")
    {
        findRecipeArea(searchValue);
    }

})

//Calls function to save recipe id in local storage
$("#save").on("click", function(){
    $(this).text("Saved!");
    let id = parseInt($("#recipe-name").attr("data-id"));
    console.log(id);
    saveRecipe(id);
})

//Called on page load, hides recipe area of main page until there is data to be loaded into it
function hideRecipeArea(){
    $("#recipe-area").hide();
}

