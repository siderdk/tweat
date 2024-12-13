const recipeObject = {
    id: 1,
    title: "Gløgg",
    picture_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: undefined },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  };

// getting the elements from the page
const recipeName = document.querySelector('.recipe_name')
const recipeImg = document.querySelector('.recipe_img')
const ingredientsList = document.querySelector('.ingredients_list')
const cookingSteps = document.querySelector('.cooking_steps')

// linking the elements to the recipe's object

recipeName.innerText = recipeObject.title
recipeImg.src = recipeObject.picture_url

for (let element of recipeObject.ingredients) {
    const listItem = document.createElement('li')
    listItem.innerText = `${element.AMOUNT} of ${element.NAME}`;
    ingredientsList.appendChild(listItem)
}

cookingSteps.innerText = recipeObject.description