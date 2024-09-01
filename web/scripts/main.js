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
        newRecipe.appendChild(createDeleteButton());
        if (!name)
            addRecipeToDatabase(title);
    }
    recipeForm.reset();
}

function createDeleteButton() {
    const button = document.createElement("button");
    button.addEventListener("click", () => delRecipeFromDB(button));
    button.id = "del";
    button.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
        stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>`

    return button;
}

async function addRecipeToDatabase(name) {
    await fetch("http://localhost:3000/addRecipe", {
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

function delRecipeFromDB(button) {
    fetch("http://localhost:3000/delRecipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"name": button.previousSibling.innerText})
    }).then(() =>  button.parentNode.remove());
}

loadRecipes();
