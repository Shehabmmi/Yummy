const side = $(".links").innerWidth();
let isShown = false;
$(".sideBar").css({ left: `${-side}px` });

$(".open-close-icon").on("click", function () {
  if (isShown) {
    $(".sideBar").animate({ left: `${-side}px` }, 500);
        $(".menu-items a").slideUp(1000);
    $(this).removeClass("fa-xmark").addClass("fa-align-justify");
    isShown = false;
  } else {
    $(".sideBar").animate({ left: `0` }, 500);
        $(".menu-items a").slideDown(400);
    $(this).removeClass("fa-align-justify").addClass("fa-xmark");
    isShown = true;
  }
});

$(".menu-items a").hide();



// API fetch
async function getFood(term) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  if (res.ok) {
    let data = await res.json();
    display(data.meals);
  }
}

// Display food on home screen
function display(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
      <div class="col-sm-12 col-md-3 col-lg-3 mb-3">
        <div class="meal-box" data-id="${meals[i].idMeal}">
          <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="w-100">
          <div class="layer d-flex align-items-center justify-content-center text-black">
            <h2 class="text-center">${meals[i].strMeal}</h2>
          </div>
        </div>
      </div>
    `;
  }

  $(".data").html(cartona);
}


// API fetch
$(".data").on("click", ".meal-box", async function () {
  $(".loading").fadeIn(500);
  $("body").css("overflow", "hidden");
  let mealId = $(this).data("id");
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  
  if (res.ok) {
    let data = await res.json();
    displayDetails(data.meals[0]);
    $(".sec").hide();
    $(".foodInfo").show();
    $(".loading").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  }
});



// البيانات اللي بتظهر لما ادوس علي الاكل 
function displayDetails(meal) {
  let cartona = `
    <div class="col-sm-12 col-md-6 col-lg-6">
      <div class="inner">
        <img src="${meal.strMealThumb}" alt="" class="w-75 rounded-3">
        <h1>${meal.strMeal}</h1>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h2>Area: ${meal.strArea}</h2>
      <h2>Category: ${meal.strCategory}</h2>
      <h2>Recipes:</h2>
      <div class="d-flex flex-wrap gap-2">
        ${getIngredients(meal)}
      </div>
      <h2>Tags :</h2>
      <button class="btn btn-success">
        <a href="${meal.strSource || '#'}" target="_blank" class="text-decoration-none text-white">Source</a>
      </button>
      <button class="btn btn-danger">
        <a href="${meal.strYoutube}" target="_blank" class="text-decoration-none text-white">YouTube</a>
      </button>
    </div>
  `;
  

  $(".foodInfo").html(cartona);
}


function getIngredients(meal) {
  let content = "";
  for (let i = 0; i < 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      content += `<p class="border rounded-3 bg-info px-2 text-center">${measure} ${ingredient}</p>`;
    }
  }
  
  return content;
}

$('.logo').on('click' , function(){
    window.location.href = "index.html"
})

getFood("");


jQuery(function(){
  $('.loading').fadeOut(1500 , function(){
    $('body').css({overflow:'auto'})
  })
})