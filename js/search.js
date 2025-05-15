const side = $(".links").innerWidth();
let isShown = false;
$(".sideBar").css({ left: `${-side}px` });

$(".open-close-icon").on("click", function () {
  isShown ? closeSidebar() : openSidebar();
  isShown = !isShown;
});

function closeSidebar() {
  $(".sideBar").animate({ left: `${-side}px` }, 500);
  $(".open-close-icon").removeClass("fa-xmark").addClass("fa-align-justify");
}

function openSidebar() {
  $(".sideBar").animate({ left: `0` }, 500);
  $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-xmark");
}

$("#searchInput, #searchByLetterInput").on("input", function () {
  let item = $(this).val();
  if (item.length === 1) {
    getFoodByFirstLetter(item);
  } else {
    getFood(item);
  }
});

async function getFood(term) {
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  if (x.ok) {
    let data = await x.json();
    display(data.meals);
  }
}

async function getFoodByFirstLetter(term) {
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  if (x.ok) {
    let data = await x.json();
    display(data.meals);
  }
}

function display(meals) {
  let cartona = meals.map(meal => `
    <div class="col-sm-12 col-md-3 col-lg-3 mb-3">
      <div class="meal-box">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
        <div class="layer d-flex align-items-center justify-content-center text-black">
          <h2 class="text-center">${meal.strMeal}</h2>
        </div>
      </div>
    </div>
  `).join('');

  $(".data").html(cartona);

  $(".meal-box").on("click", async function () {
    $(".loading").fadeIn(500);
  $("body").css("overflow", "hidden");
    let mealName = $(this).find("h2").text();
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    if (res.ok) {
      let data = await res.json();
      displayDetails(data.meals[0]);
      $(".data").hide();
      $('.input').hide()
      $(".foodInfo").show();
      $(".loading").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });

    }
  });
}

function displayDetails(meal) {
  let cartona = `
    <div class="col-md-6">
      <img src="${meal.strMealThumb}" class="w-75 rounded-3" alt="${meal.strMeal}">
      <h2 class="mt-3">${meal.strMeal}</h2>
    </div>
    <div class="col-md-6">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
      <h5><strong>Area:</strong> ${meal.strArea}</h5>
      <h5><strong>Category:</strong> ${meal.strCategory}</h5>
      <h5><strong>Ingredients:</strong></h5>
      <div class="d-flex flex-wrap gap-2">
        ${getIngredients(meal)}
      </div>
      <div class="mt-3">
        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Watch on YouTube</a>
        <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
      </div>
    </div>
  `;
  $(".foodInfo").html(cartona);
}

function getIngredients(meal) {
  let content = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      content += `<span class="badge bg-info text-dark p-2">${measure} ${ingredient}</span>`;
    }
  }
  return content;
}

$(".foodInfo").hide();

$('.logo').on('click', function(){
  window.location.href = "index.html";
});

jQuery(function(){
  $('.loading').fadeOut(1500 , function(){
    $('body').css({overflow:'auto'})
  })
})