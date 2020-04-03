const getMealButton = document.querySelector("#get_meal");
const mealContainer = document.querySelector("#meal");

getMealButton.addEventListener("click", getRecipe);

function getRecipe() {
  mealContainer.innerText = "";
  //get data from API
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      const newRecipe = res.meals[0];
      console.log(newRecipe);
      generateRecipe(newRecipe);
    });
}

function generateRecipe(newRecipe) {
  //title
  const recipeTitleEl = document.createElement("h2");
  recipeTitleEl.innerHTML = newRecipe.strMeal;
  mealContainer.appendChild(recipeTitleEl);

  //tags
  const recipeCountryEl = document.createElement("p");
  const recipeCategoryEl = document.createElement("p");
  recipeCountryEl.innerHTML = newRecipe.strArea;
  recipeCategoryEl.innerHTML = newRecipe.strCategory;
  mealContainer.appendChild(recipeCountryEl);
  mealContainer.appendChild(recipeCategoryEl);

  //image
  const recipeImageEl = document.createElement("IMG");
  recipeImageEl.src = newRecipe.strMealThumb;
  mealContainer.appendChild(recipeImageEl);

  //Ingredients and Measure
  const ingredientsHeader = document.createElement("h3");
  ingredientsHeader.innerText = "Ingredients";
  const recipeIngMeasEl = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    if (newRecipe[`strIngredient${i}`]) {
      const recipeItem = document.createElement("li");
      recipeItem.innerHTML =
        newRecipe[`strIngredient${i}`] + ": " + newRecipe[`strMeasure${i}`];
      recipeIngMeasEl.appendChild(recipeItem);
    }
  }
  mealContainer.appendChild(ingredientsHeader);
  mealContainer.appendChild(recipeIngMeasEl);

  //video
  const recipeVideoEl = document.createElement("object");
  recipeVideoEl.data = newRecipe.strYoutube.replace("watch?", "embed/");
  recipeVideoEl.frameborder = "0";
  recipeVideoEl.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  console.log(newRecipe.strYoutube.replace("watch?v=", "embed/"));
  mealContainer.appendChild(recipeVideoEl);

  //instructions
  const instructionsHeader = document.createElement("h3");
  instructionsHeader.innerText = "Instructions";
  const recipeInstructionEl = document.createElement("p");
  recipeInstructionEl.innerText = newRecipe.strInstructions;
  mealContainer.appendChild(instructionsHeader);
  mealContainer.appendChild(recipeInstructionEl);
}
//   let recipeSource = newRecipe.meals[0].strSource;
