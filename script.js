const getMealButton = document.querySelector("#get_meal");
const mealContainer = document.querySelector("#meal-section");

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
  recipeTitleEl.id = "recipe_title";
  recipeTitleEl.innerHTML = newRecipe.strMeal;
  mealContainer.appendChild(recipeTitleEl);

  //tags
  const recipeTagsEl = document.createElement("div");
  const recipeCountryEl = document.createElement("p");
  const recipeCategoryEl = document.createElement("p");
  recipeTagsEl.classList.add("tag-container");
  recipeCountryEl.classList.add("tag");
  recipeCategoryEl.classList.add("tag");
  recipeCountryEl.innerHTML = newRecipe.strArea;
  recipeCategoryEl.innerHTML = newRecipe.strCategory;
  recipeTagsEl.appendChild(recipeCountryEl);
  recipeTagsEl.appendChild(recipeCategoryEl);
  mealContainer.appendChild(recipeTagsEl);

  //image and ingredients container
  const recipeImgIngContEl = document.createElement("div");
  recipeImgIngContEl.classList.add("ImgIngCont");

  //image
  const recipeImageEl = document.createElement("IMG");
  recipeImageEl.src = newRecipe.strMealThumb;

  //Ingredients and Measure
  const ingredientsCont = document.createElement("div");
  ingredientsCont.classList.add("recipe-ingredients");
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
  ingredientsCont.appendChild(ingredientsHeader);
  ingredientsCont.appendChild(recipeIngMeasEl);
  recipeImgIngContEl.appendChild(recipeImageEl);
  recipeImgIngContEl.appendChild(ingredientsCont);
  mealContainer.appendChild(recipeImgIngContEl);

  //video
  const recipeVideoEl = document.createElement("iframe");
  recipeVideoEl.id = "recipe_video";
  recipeVideoEl.src = `https://youtube.com/embed/${newRecipe.strYoutube.slice(
    -11
  )}`;
  recipeVideoEl.frameborder = "0";
  recipeVideoEl.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  mealContainer.appendChild(recipeVideoEl);

  //instructions
  const instructionsHeader = document.createElement("h3");
  instructionsHeader.innerText = "Instructions";
  const recipeInstructionEl = document.createElement("p");
  recipeInstructionEl.id = "recipe_instructions";
  recipeInstructionEl.innerText = newRecipe.strInstructions;
  mealContainer.appendChild(instructionsHeader);
  mealContainer.appendChild(recipeInstructionEl);
}
//   let recipeSource = newRecipe.meals[0].strSource;
