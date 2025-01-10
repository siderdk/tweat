const recipeObject = {
    id: 1,
    title: "Gløgg",
    pictureLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { name: "Orange zest", amount: "0.5" },
      { name: "Water", amount: "200 ml" },
      { name: "Sugar", amount: "275 g" },
      { name: "Whole cloves", amount: "5" },
      { name: "Cinnamon sticks", amount: "2" },
      { name: "Spice", amount: undefined },
      { name: "Bottle of red wine", amount: "1" },
      { name: "Raisins", amount: "100 g" },
      { name: "Slipped Almonds", amount: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  };

// getting the elements from the page
const recipeName = document.querySelector('.recipe_name')
const recipeImg = document.querySelector('.recipeImg')
const ingredientsList = document.querySelector('.ingredientsList')
const cookingSteps = document.querySelector('.cookingSteps')

// linking the elements to the recipe's object

recipeName.innerText = recipeObject.title
recipeImg.src = recipeObject.pictureLink

for (let element of recipeObject.ingredients) {
    const listItem = document.createElement('li')
    listItem.innerText = `${element.amount} of ${element.name}`;
    ingredientsList.appendChild(listItem)
}

cookingSteps.innerText = recipeObject.description

// user added recipe section
let newRecipeObject = {
    id: 0,
    title: "",
    picture_url:
      "",
    ingredients: [],
    description: "",
}

const addRecipeButton = document.querySelector('.addRecipeButton')

addRecipeButton.addEventListener('click', addRecipe)

// adding a recipe function
function addRecipe(event) {
    const parent = event.target.parentNode
    const newRecipeDiv = document.createElement('div');
    newRecipeDiv.classList.add('NewRecipeContainer'); 
    const HTMLString = `
    <br>
    <label for="newRecipeName">Name</label>
    <input type="text" id="newRecipeName" placeholder="Give your recipe a name" />
    <button class="addNameButton">Add</button>
    `;
    parent.insertAdjacentHTML('beforeend', HTMLString);
    const addNewName = document.querySelector('.addNameButton')
    addNewName.addEventListener('click', addName)
    
}

function addName(event){
    const parent = event.target.parentNode
    const nameInput = document.querySelector('#newRecipeName');
    newRecipeObject.title = nameInput.value 
    const HTMLString = `
    <br>
    <label for="ingredient1">Add ingredient</label>
    <input type="text" id="ingredient1" placeholder="ingredient name"/><input id="amount1" type="number" min="0" max="9999" placeholder="amount"/><label for="unit1">unit</label><select id="unitDropDown"><option value="gr" selected>grams</option><option value="dl">dl</option><option value="cup">cup</option><option value="units">units</option></select>
    <button class="addIngredient">Add</button><br>
    <button class="addDescription">Add description</button>
    `
    parent.insertAdjacentHTML('beforeend', HTMLString);
    const addNewIngredient = document.querySelector('.addIngredient')
    addNewIngredient.addEventListener('click', addIngredient)
}

function addIngredient(event) {
    const ingredientNameInput = document.querySelector('#ingredient1');
    const ingredientAmountInput = document.querySelector('#amount1');
    const ingredientUnitInput = document.querySelector('#unitDropDown');

    const newIngredient = {
        name: ingredientNameInput.value,
        amount: `${ingredientAmountInput.value} ${ingredientUnitInput.value}`
    };

    newRecipeObject.ingredients.push(newIngredient);
 
    console.log(newRecipeObject.ingredients);
}