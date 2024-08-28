const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    addRecipe();
});

function addRecipe() {
    const newRecipe = document.createElement("div");
    const recipeTitle = document.createElement("p");
    recipeTitle.textContent = document.getElementById("recipe-box").value;
    newRecipe.id = "recipe";
    newRecipe.appendChild(recipeTitle);
    document.getElementById("recipes").appendChild(newRecipe);
    recipeForm.reset();
}