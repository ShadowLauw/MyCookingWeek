const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    addRecipe();
});

function addRecipe() {
    const title = document.getElementById("recipe-box").value;
    if (title) {
        const newRecipe = document.createElement("div");
        const recipeTitle = document.createElement("p");
        recipeTitle.textContent = title;
        newRecipe.id = "recipe";
        newRecipe.appendChild(recipeTitle);
        const recipes = document.getElementById("recipes");
        recipes.insertBefore(newRecipe, recipes.firstChild);
    }
    recipeForm.reset();
}