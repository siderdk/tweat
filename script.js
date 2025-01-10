// getting the elements from the page
const recipesContainer = document.querySelector('.recipesContainer');
const recipesSearchResults = document.querySelector('.search-results');
const recipeName = document.querySelector('.recipe_name');
const recipeImg = document.querySelector('.recipeImg');
const ingredientsList = document.querySelector('.ingredientsList');
const cookingSteps = document.querySelector('.cookingSteps');
const ingredientNumber = document.querySelector('.number-seach-input');
const keywordInput = document.querySelector('.keyword-seach-input');
const keywordSearchBtn = document.querySelector('.keyword-search-btn');
const ingredientSearchBtn = document.querySelector('.ingr-nbr-find-btn');
const timeCounterContainer = document.querySelector('.time-counter');
const timeCount = document.querySelector('.time-count');
const durationUnit = document.querySelector('.duration-unit')
const timerContainer = document.querySelector('.timer-container');
const minutesInput = document.querySelector('.time-amount-input');
const setTimerBtn = document.querySelector('.set-timer-btn');
const timerState = document.querySelector('.timer-state')

//load previous added recipes from local storage, or initialize an empty list in case this is used for the first time
const userRecipes = JSON.parse(localStorage.getItem("data")) || [];
// the list of all recipes, will be an array of objects, to facilitate iteration and ordering
//the list of units that are used in the recipes
const unitTypes = {
    weight: ["g", "kg"],
    volume: ["ml", "dl", "l", "cup", "tbsp", "tsp"],
    counts: ["piece", "dozen", "bottle", "pack", "clove"]

    // shortcuts
    // g = unitTypes.weight[0] kg = unitTypes.weight[1]
    // ml = unitTypes.volume[0] ld =ml = unitTypes.volume[1] l = unitTypes.volume[2] cup = unitTypes.volume[3] tbsp = unitTypes.volume[4] tsp = unitTypes.volume[5] 
    // pieces = unitTypes.counts[0] dozen = unitTypes.counts[1]   bottle = unitTypes.counts[2] pack = unitTypes.counts[3] clove = unitTypes.counts[4]
};
const builtInRecipes = [
    {
    id: "glogg00001",
    title: "Gløgg",
    pictureLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    type: "Dinner",
    pitch: "easy sweet and spicy mulled wine",
    ingredients: [
          { name: "Orange zest", amount: "0.5", unit: unitTypes.counts[0] },
          { name: "Water", amount: "200", unit: unitTypes.volume[0] },
          { name: "Sugar", amount: "275", unit: unitTypes.weight[0] },
          { name: "Whole cloves", amount: "5", unit: unitTypes.counts[0] },
          { name: "Cinnamon sticks", amount: "2", unit: unitTypes.counts[0] },
          { name: "Spice", amount: "0" }, // the amount of 0 should be later referenced to render "to taste" in the browser 
          { name: "Red wine", amount: "1", unit: unitTypes.counts[2] },
          { name: "Raisins", amount: "100", unit: unitTypes.weight[0] },
          { name: "Slipped Almonds", amount: "50", unit: unitTypes.weight[0] },
        ],
    description: "Mix everything, heat it, and you are good to go!"},
    
    {
    id: "bnizen00002",
    title: "Bniwen",
    pictureLink: "https://lifestyleofafoodie.com/wp-content/uploads/2020/05/Almond-no-bake-energy-balls-with-chocolate-crunch-13-of-18.jpg",
    type: "Dessert",
    pitch: "delightful and easy, guaranteed happiness with each bite",
    ingredients: [
          { name: "crackers", amount: "1", unit:  unitTypes.volume[3] },
          { name: "butter", amount: "0.75", unit: unitTypes.volume[3] },
          { name: "Vanilla sugar", amount: "3", unit: unitTypes.volume[4] },
          { name: "Turkish halva", amount: "0.75", unit: unitTypes.volume[3] },
          { name: "Almond flour", amount: "0.5", unit: unitTypes.volume[3] },
          { name: "Nut mix", amount: "0.5", unit: unitTypes.volume[3] },
          { name: "Licorice pulver", amount: "1", unit: unitTypes.volume[4] },
          { name: "Cocoa pulver", amount: "3", unit: unitTypes.volume[4] },
          { name: "Dark chocolate", amount: "120", unit: unitTypes.weight[0] },
          
        ],
    description: "Process the nuts. Mix everything, cover in melted chocolate, and you are good to go!",},
    {
        id: "lasgn00003",
        title: "Classic Lasagna",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lasagna_%28cropped%29.jpg",
        type: "Dinner",
        pitch: "Rich and cheesy layers of goodness",
        ingredients: [
            { name: "Lasagna noodles", amount: "12", unit: unitTypes.counts[0] },
            { name: "Ground beef", amount: "500", unit: unitTypes.weight[0] },
            { name: "Tomato sauce", amount: "2", unit: unitTypes.volume[3] },
            { name: "Ricotta cheese", amount: "1", unit: unitTypes.volume[3] },
            { name: "Mozzarella cheese", amount: "2", unit: unitTypes.volume[3] },
            { name: "Parmesan cheese", amount: "0.5", unit: unitTypes.volume[3] },
            { name: "Onion", amount: "1", unit: "" },
            { name: "Garlic", amount: "2", unit: unitTypes.counts[4] },
            { name: "Olive oil", amount: "2", unit: unitTypes.volume[4] },
        ],
        description: "Layer noodles, meat sauce, and cheeses. Bake until bubbly and golden.",
    },
    {
        id: "ratat00004",
        title: "Ratatouille",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/2/27/Ratatouille.jpg",
        type: "Lunch",
        pitch: "A healthy French veggie medley",
        ingredients: [
            { name: "Eggplant", amount: "1", unit: "" },
            { name: "Zucchini", amount: "1", unit: "" },
            { name: "Bell peppers", amount: "2", unit: "" },
            { name: "Tomatoes", amount: "3", unit: "" },
            { name: "Garlic", amount: "2", unit: unitTypes.counts[4] },
            { name: "Olive oil", amount: "3", unit: unitTypes.volume[4] },
            { name: "Thyme", amount: "1", unit: unitTypes.volume[5] },
            { name: "Salt", amount: "0", unit: "" },
            { name: "Pepper", amount: "0", unit: "" },
        ],
        description: "Sauté vegetables, layer them in a dish, and bake until tender.",
    },
    {
        id: "pesto00005",
        title: "Pesto Pasta",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/8/81/Pesto_pasta.jpg",
        type: "Lunch",
        pitch: "Simple and refreshing Italian flavors",
        ingredients: [
            { name: "Pasta", amount: "250", unit: unitTypes.weight[0] },
            { name: "Basil leaves", amount: "2", unit: unitTypes.volume[3] },
            { name: "Pine nuts", amount: "2", unit: unitTypes.volume[4] },
            { name: "Garlic", amount: "1", unit: unitTypes.counts[4] },
            { name: "Parmesan cheese", amount: "0.5", unit: unitTypes.volume[3] },
            { name: "Olive oil", amount: "0.25", unit: unitTypes.volume[3] },
            { name: "Salt", amount: "0", unit: "" },
            { name: "Pepper", amount: "0", unit: "" },
        ],
        description: "Blend pesto ingredients, mix with cooked pasta, and serve.",
    },
    {
        id: "tirsm00006",
        title: "Tiramisu",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/0/04/Tiramisu_with_spoon.jpg",
        type: "Dessert",
        pitch: "The classic creamy Italian delight",
        ingredients: [
            { name: "Ladyfingers", amount: "300", unit: unitTypes.weight[0] },
            { name: "Mascarpone cheese", amount: "500", unit: unitTypes.weight[0] },
            { name: "Espresso", amount: "2", unit: unitTypes.volume[3] },
            { name: "Cocoa powder", amount: "2", unit: unitTypes.volume[4] },
            { name: "Egg yolks", amount: "4", unit: "" },
            { name: "Sugar", amount: "0.5", unit: unitTypes.volume[3] },
            { name: "Whipping cream", amount: "1", unit: unitTypes.volume[3] },
        ],
        description: "Layer mascarpone cream and coffee-dipped ladyfingers. Chill and dust with cocoa.",
    },
    {
        id: "shak00007",
        title: "Shakshuka",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shakshouka.jpg",
        type: "Breakfast",
        pitch: "A hearty and flavorful breakfast dish",
        ingredients: [
            { name: "Eggs", amount: "4", unit: "" },
            { name: "Tomatoes", amount: "4", unit: "" },
            { name: "Bell pepper", amount: "1", unit: "" },
            { name: "Onion", amount: "1", unit: "" },
            { name: "Garlic", amount: "2", unit: unitTypes.counts[4] },
            { name: "Olive oil", amount: "2", unit: unitTypes.volume[4] },
            { name: "Cumin", amount: "1", unit:unitTypes.volume[5] },
            { name: "Paprika", amount: "1", unit: unitTypes.volume[5] },
            { name: "Cilantro", amount: "0", unit: "" },
        ],
        description: "Cook vegetables in a skillet, add eggs, and let them cook to desired doneness.",
    },
    {
        id: "cckch00008",
        title: "Chocolate Chip Cookies",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/6/69/Chocolate_Chip_Cookies_-_kimberlykv.jpg",
        type: "Dessert",
        pitch: "Soft and chewy, a timeless classic",
        ingredients: [
            { name: "Butter", amount: "1", unit: unitTypes.volume[3] },
            { name: "Sugar", amount: "1", unit: unitTypes.volume[3] },
            { name: "Brown sugar", amount: "1", unit: unitTypes.volume[3] },
            { name: "Eggs", amount: "2", unit: "" },
            { name: "Vanilla extract", amount: "1", unit: unitTypes.volume[5] },
            { name: "Flour", amount: "2.5", unit: unitTypes.volume[3] },
            { name: "Baking soda", amount: "1", unit: unitTypes.volume[5] },
            { name: "Salt", amount: "0.5", unit: unitTypes.volume[5] },
            { name: "Chocolate chips", amount: "2", unit: unitTypes.volume[3] },
        ],
        description: "Mix wet and dry ingredients, fold in chocolate chips, and bake until golden.",
    },
    {
        id: "ramen00009",
        title: "Ramen Noodles",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/3/39/Ramen_by_guilhem_vellut.jpg",
        type: "Lunch",
        pitch: "Quick and satisfying noodle bowl",
        ingredients: [
            { name: "Ramen noodles", amount: "2", unit: "packs" },
            { name: "Chicken broth", amount: "4", unit: unitTypes.volume[3] },
            { name: "Soy sauce", amount: "2", unit: unitTypes.volume[4] },
            { name: "Ginger", amount: "1", unit: unitTypes.volume[5]},
            { name: "Garlic", amount: "2", unit: unitTypes.counts[4] },
            { name: "Eggs", amount: "2", unit: "" },
            { name: "Green onions", amount: "2", unit: "" },
            { name: "Sesame oil", amount: "1", unit: unitTypes.volume[5] },
        ],
        description: "Simmer broth, add noodles, and top with eggs and green onions.",
    },
    {
        id: "pcklz00010",
        title: "Pickled Vegetables",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/1/19/Japanese_picked_vegetables.jpg",
        type: "Side Dish",
        pitch: "Crisp, tangy, and versatile",
        ingredients: [
            { name: "Cucumber", amount: "1", unit: "" },
            { name: "Carrots", amount: "2", unit: "" },
            { name: "Vinegar", amount: "1", unit: unitTypes.volume[3] },
            { name: "Water", amount: "1", unit: unitTypes.volume[3] },
            { name: "Sugar", amount: "2", unit: unitTypes.volume[4] },
            { name: "Salt", amount: "1", unit: unitTypes.volume[5] },
            { name: "Garlic", amount: "1", unit: unitTypes.counts[4] },
        ],
        description: "Mix brine ingredients, pour over sliced vegetables, and refrigerate.",
    },
    {
        id: "pancake0011",
        title: "Pancakes",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Pancakes_with_maple_syrup.jpg",
        type: "Breakfast",
        pitch: "Fluffy and delicious, perfect for mornings",
        ingredients: [
            { name: "Flour", amount: "1", unit: unitTypes.volume[3] },
            { name: "Milk", amount: "1", unit: unitTypes.volume[3] },
            { name: "Egg", amount: "1", unit: "" },
            { name: "Baking powder", amount: "1", unit: unitTypes.volume[5] },
            { name: "Sugar", amount: "2", unit: unitTypes.volume[4] },
            { name: "Butter", amount: "2", unit: unitTypes.volume[4] },
            { name: "Salt", amount: "0.25", unit: unitTypes.volume[5] },
        ],
        description: "Mix ingredients, pour batter onto a skillet, and cook until golden brown.",
    },
    {
        id: "smooth00012",
        title: "Berry Smoothie",
        pictureLink: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Smoothie.jpg",
        type: "Drink",
        pitch: "Refreshing and packed with nutrients",
        ingredients: [
            { name: "Mixed berries", amount: "1", unit: unitTypes.volume[3] },
            { name: "Banana", amount: "1", unit: "" },
            { name: "Greek yogurt", amount: "0.5", unit: unitTypes.volume[3] },
            { name: "Milk", amount: "1", unit: unitTypes.volume[3] },
            { name: "Honey", amount: "1", unit: unitTypes.volume[4] },
        ],
        description: "Blend all ingredients together until smooth and creamy.",
    }
    
]


//getting userRecipes from local storage
const userRecipesKey = "userRecipes"; // Key for local storage

// Load user-created recipes from local storage
const loadUserRecipes = () => {
    const storedRecipes = localStorage.getItem(userRecipesKey);
    return storedRecipes ? JSON.parse(storedRecipes) : [];
};

//consolidating all recipes in one list
const getAllRecipes = () => {
    const userRecipes = loadUserRecipes();
    return [...builtInRecipes, ...userRecipes];
  };
const allRecipes = getAllRecipes()


//a function to render a preview card for each recipe inside a given container "parent"
const renderRecipeCard = (parent, array) =>{ 
    parent.innerHTML = ""
    array.forEach((obj)=>{
    
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-preview');
        
        const recipeTitle = document.createElement('h3');
        recipeTitle.innerText = obj.title;
        recipeCard.appendChild(recipeTitle);

        const recipeImage = document.createElement('img');
        recipeImage.src = obj.pictureLink;
        recipeImage.alt = obj.title;
        recipeCard.appendChild(recipeImage)    

        const recipePitch = document.createElement('p');
        recipePitch.innerText = obj.pitch;
        recipeCard.appendChild(recipePitch);

        

        parent.appendChild(recipeCard)

    //making cards expand on click
            recipeCard.addEventListener("click", ()=>{
                if (!recipeCard.querySelector('.ingredients') && !recipeCard.querySelector('.description')) {
                    const ingredientsList = document.createElement('ul');
                    ingredientsList.classList.add('ingredients'); 
                    obj.ingredients.forEach((ingredient) => {
                        const listItem = document.createElement('li');
                        listItem.innerText = ingredient.amount > 0 
                            ? `${ingredient.amount || ""} ${ingredient.unit || ""} of ${ingredient.name}`
                            : `${ingredient.name}: to taste`;
                        ingredientsList.appendChild(listItem);
                    });
                    recipeCard.appendChild(ingredientsList);

                    const recipeDescription = document.createElement('p');
                    recipeDescription.innerText = `Description: ${obj.description}`;
                    recipeDescription.classList.add('description'); 
                    recipeCard.appendChild(recipeDescription);

                    const collapseButton = document.createElement('button');
                    collapseButton.innerText = 'Collapse';
                    collapseButton.classList.add('collapse-button'); 
                    recipeCard.appendChild(collapseButton);

                    // Make a card collapse
                    collapseButton.addEventListener("click", (e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        ingredientsList.remove();
                        recipeDescription.remove();
                        collapseButton.remove();
                    });
        }
            })

    
    })
}

//rendering all recipes
renderRecipeCard(recipesContainer, allRecipes);

//find recipes by number of ingredients
const getRecipeByIngredientNbr = (num)=>{
    const foundRecipes = [];
    allRecipes.forEach((obj)=>{
        if(obj.ingredients.length===num) {
            foundRecipes.push(obj);
        }
    })
    return foundRecipes;
}


ingredientSearchBtn.addEventListener("click", (e)=> {
    const num = Math.sqrt((parseInt(ingredientNumber.value) ** 2)); // because I'm lazy I am getting the square root of the square of the input, to make sure it's not a negative value
    result = getRecipeByIngredientNbr(num);
    renderRecipeCard(recipesSearchResults, result);

})



// finding recipes by keywords
const getRecipeByKeyword = (array, str) =>{
    const foundRecipes = [];
    //If I understand regex correctly, this is supposed to catch anything that is not a space or a letter
    const regex = /[^a-zA-Z\s]/g; 
    const cleanStr = str.replace(regex, "").toLowerCase();
    //handling empty inputs
    if (!cleanStr.trim()) { 
        alert("Please enter a valid keyword.");
        return;  
    };
    array.forEach((obj)=>{
        let found = false;
        for (const key in obj) {
            const value = obj[key];
            // check for each value if it's a string 
            if (typeof value === "string" && value.includes(cleanStr)){
                found = true;
                break 
            };
            // check for the value if it's an array to handle the case of ingredients
            if ( Array.isArray(value)) {
                value.forEach((element)=>{
                    for (const elementKey in element){
                        const elementValue = element[elementKey]
                        if (elementValue.includes(cleanStr)){
                            found = true;
                            break
                        }
                    }
                })
            }
        }
        if (found) {
            foundRecipes.push(obj)
        }
    });
    return foundRecipes

}

keywordSearchBtn.addEventListener("click", (e)=>{
    recipesSearchResults.innerHTML = ""
    
    result = getRecipeByKeyword(allRecipes, keywordInput.value);
    renderRecipeCard(recipesSearchResults, result);

} )


//time counter function
const timeCounter= ()=>{
    let seconds = 0; 
    setInterval(()=>{
    
        seconds++;
        timeCount.innerText = seconds;
        durationUnit.textContent = " seconds";
        if (seconds>59){
            timeCount.innerText = seconds%60;
            let minutes = Math.floor(seconds/60);
            durationUnit.textContent = ` seconds and ${minutes} minutes`;
            if(minutes > 59){
                alert('There is no way you are on this page for this long! Thank you for your attention');
            };
        };
    }, 1000);
    
};
//start the count
timeCounter();

//user timer 
const TimeIsUp = ()=> {
    alert('The timer is Up!!!')
}

setTimerBtn.addEventListener("click", ()=>{
    const timeAmount = Math.sqrt((parseInt(minutesInput.value) ** 2))
    const timeInMlSec = timeAmount * 60000 // converting the amount of time to milliseconds
    timerState.textContent = `A timer has been set for ${timeAmount} minutes`;
    setTimeout(()=>{
            alert("The time is up!");
            timerState.textContent = "";
            minutesInput.value = ""
        }, timeInMlSec);
    

})


