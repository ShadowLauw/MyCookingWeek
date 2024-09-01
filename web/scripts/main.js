const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    addRecipe();
});

function addRecipe(name) {
    const title = name || document.getElementById("recipe-box").value;
    if (title) {
        const newRecipe = document.createElement("div");
        const recipeTitle = document.createElement("p");
        recipeTitle.textContent = title;
        newRecipe.id = "recipe";
        newRecipe.appendChild(recipeTitle);
        const recipes = document.getElementById("recipes");
        recipes.insertBefore(newRecipe, recipes.firstChild);
        if (!name)
            addRecipeToDatabase(title);
    }
    recipeForm.reset();
}

async function addRecipeToDatabase(name) {
    const res = await fetch("http://localhost:3000/addRecipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"name": name, "instructions":""})
    });
}

async function loadRecipes() {
    const res = await fetch("http://localhost:3000/");
    const recipes = await res.json();
    recipes.forEach(r => addRecipe(r.name));
}

loadRecipes();
