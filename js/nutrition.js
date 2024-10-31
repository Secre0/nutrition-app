const apiKey = `9186a38da04b48d4b341a852c37f2281`;

async function fetchNutritionData(foodName) {
    const nutrientURL = `https://api.spoonacular.com/recipes/guessNutrition?title=${foodName}&apiKey=${apiKey}`;

    document.getElementById('nutritionInfo').innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(nutrientURL);
        if (!response.ok) throw new Error('Error fetching nutrition information');
        const data = await response.json();

        displayNutritionData(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('nutritionInfo').innerHTML = `<p>Could not retrieve nutrition information for ${foodName}. Please try again.</p>`;
    }
}

function displayNutritionData(data) {
    const nutritionInfo = document.getElementById('nutritionInfo');
    const foodName = document.getElementById('foodInput').value;
    const calories = data.calories ? `${data.calories.value} ${data.calories.unit}` : "Not available";
    const carbs = data.carbs ? `${data.carbs.value} ${data.carbs.unit}` : "Not available";
    const protein = data.protein ? `${data.protein.value} ${data.protein.unit}` : "Not available";
    const totalFat = data.fat ? `${data.fat.value} ${data.fat.unit}` : "Not available";
    const sugar = data.sugar ? `${data.sugar.value} ${data.sugar.unit}` : "Not available";
    const cholesterol = data.cholesterol ? `${data.cholesterol.value} ${data.cholesterol.unit}` : "Not available";

    console.log(`Calories: ${calories}`);
    console.log(`Carbohydrates: ${carbs}`);
    console.log(`Protein: ${protein}`);
    console.log(`Total Fat: ${totalFat}`);
    console.log(`Sugar: ${sugar}`);
    console.log(`Cholesterol: ${cholesterol}`);

    nutritionInfo.innerHTML = `
    
    <div class="container mt-4">
    <h2 class="text-center" style="color: #EC5800;"><strong>Nutritional Facts of ${foodName} </strong></h2><br>
    <div class="row">
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                    <i class="fa fa-bolt fa-4x"></i><br><br>
                    <h5 class="card-title"><strong>Calories</strong></h5>
                    <h3 class="card-text">${calories}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                    <i class="fa fa-wheat-awn fa-4x"></i><br><br>
                    <h5 class="card-title"><strong>Carbohydrates</strong></h5>
                    <h3 class="card-text">${carbs}</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                    <i class="fas fa-dumbbell fa-4x"></i><br><br>
                    <h5 class="card-title"><strong>Protein</strong></h5>
                    <h3 class="card-text">${protein}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                <i class="fas fa-droplet fa-4x"></i><br><br>
                    <h5 class="card-title"><strong>Total Fat</strong></h5>
                    <h3 class="card-text">${totalFat}</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                    <i class="fas fa-cubes fa-4x"></i> <br><br>
                    <h5 class="card-title"><strong>Sugar</strong></h5>
                    <h3 class="card-text">${sugar}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card text-center mb-4 result-body">
                <div class="card-body">
                <i class="fas fa-percentage fa-4x"></i><br><br>
                    <h5 class="card-title"><strong>Cholesterol</strong></h5>
                    <h3 class="card-text">${cholesterol}</h3>
                </div>
            </div>
        </div>
    </div>
    `;
}

//MEAL RECOMMENDATION

async function fetchRecipeData(food) {
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=4&apiKey=${apiKey}`;
    
    document.getElementById('mealInfo').innerHTML = `<p>Loading...</p>`;
    
    try {
        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) throw new Error('Error fetching recipe information');
        const searchData = await searchResponse.json();

        if (searchData.results && searchData.results.length > 0) {
            document.getElementById('mealInfo').innerHTML = ''; 
            for (const result of searchData.results) {
                await fetchRecipeDetails(result.id); 
            }
        } else {
            document.getElementById('mealInfo').innerHTML = `<p>No recipes found for the searched food item.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mealInfo').innerHTML = `<p>Could not retrieve recipe information for ${food}. Please try again.</p>`;
    }
}

async function fetchRecipeDetails(recipeId) {
    const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    
    try {
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) throw new Error('Error fetching recipe details');
        const detailsData = await detailsResponse.json();

        displayRecipeData(detailsData);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mealInfo').innerHTML += `<p>Could not retrieve detailed recipe information. Please try again.</p>`;
    }
}

function displayRecipeData(data) {
    const mealInfo = document.getElementById('mealInfo');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('col-md-6', 'mb-4', 'd-flex', 'align-items-stretch'); 

    recipeCard.innerHTML = `
        <div class="card h-100" style="width: 100%;">
            <img src="${data.image}" class="card-img-top" alt="${data.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">Ready in ${data.readyInMinutes} minutes | Servings: ${data.servings}</p>
                <button type="button" class="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#recipeModal-${data.id}">
                    <i class="fas fa-eye"></i> View Recipe 
                </button>
            </div>
        </div>

        <!-- Bootstrap Modal for each recipe -->
        <div class="modal fade" id="recipeModal-${data.id}" tabindex="-1" aria-labelledby="recipeModalLabel-${data.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-5" id="recipeModalLabel-${data.id}">${data.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${data.image}" alt="${data.title}" class="img-fluid mb-3">
                        <p><strong>Servings:</strong> ${data.servings}</p>
                        <p><strong>Ready in:</strong> ${data.readyInMinutes} minutes</p>
                        <p>${data.summary}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fas fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    if (!mealInfo.classList.contains('row')) {
        mealInfo.classList.add('row'); 
    }
    
    mealInfo.appendChild(recipeCard);
}




function startFetch() {
    const food = document.getElementById('foodInput').value;
    if (food) {
        fetchNutritionData(food); 
        fetchRecipeData(food); 
    }
}

