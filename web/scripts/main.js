const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    addRecipe();
});

function addRecipe(name, id) {
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
        if (id)
            recipeTitle.setAttribute('data-id', id);
        if (!name)
            addRecipeToDatabase(recipeTitle);
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

function addRecipeToDatabase(recipe) {
    fetch("http://localhost:3000/addRecipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"name": recipe.innerText, "instructions":""})
    })
    .then(r => r.json())
    .then((res) => recipe.setAttribute('data-id', res.id));
}

async function loadRecipes() {
    const res = await fetch("http://localhost:3000/");
    const recipes = await res.json();
    recipes.forEach(r => addRecipe(r.name, r.id));
}

function delRecipeFromDB(button) {
    fetch("http://localhost:3000/delRecipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"id": button.previousSibling.getAttribute('data-id')})
    }).then(() =>  button.parentNode.remove());
}

loadRecipes();
