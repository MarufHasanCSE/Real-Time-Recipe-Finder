const searchBtn = document.getElementById('search-btn');
const resultGrid = document.getElementById('result-grid');
const userInput = document.getElementById('user-input');

async function getRecipes() {
    const mealName = userInput.value.trim();
    if (!mealName) return;

    resultGrid.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await response.json();

        if (!data.meals) {
            resultGrid.innerHTML = "<p>No recipes found. Try another dish!</p>";
            return;
        }

        resultGrid.innerHTML = data.meals.map(meal => `
            <div class="recipe-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>Category: ${meal.strCategory}</p>
                <button onclick="window.open('${meal.strYoutube}', '_blank')" 
                        style="margin-bottom:15px; background:#252422;">
                    Watch Video
                </button>
            </div>
        `).join('');

    } catch (error) {
        resultGrid.innerHTML = "<p>Error fetching data. Check your connection.</p>";
    }
}

searchBtn.addEventListener('click', getRecipes);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getRecipes();
});