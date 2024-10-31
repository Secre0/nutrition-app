// async function fetchRecipeData(food) {
//     const Url = `https://api.spoonacular.com/recipes/complexSearch?query=${food}&apiKey=${apiKey}`;
//     try {
//         const response = await fetch(Url);
//         if (!response.ok) throw new Error('Error fetching recipe information');
//         const data = await response.json();

//         displayRecipeData(data);
//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('mealInfo').innerHTML = `<p>Could not retrieve recipe information for ${food}. Please try again.</p>`;
//     }
// }

// function displayRecipeData(data) {
//     const mealInfo = document.getElementById('mealInfo');
    
//     if (data.results && data.results.length > 0) {
//         const recipe = data.results[0];
//         mealInfo.innerHTML = `
//             <h3>${recipe.title}</h3>
//             <img src="${recipe.image}" alt="${recipe.title}" width="300">
//             <p>Ready in ${recipe.readyInMinutes} minutes | Servings: ${recipe.servings}</p>
//         `;
//     } else {
//         mealInfo.innerHTML = `<p>No recipe found for the searched food item.</p>`;
//     }
// }

// function startFetch() {
//     const food = document.getElementById('foodInput').value;
//     if (food) {
//         fetchRecipeData(food); 
//     }
// }
