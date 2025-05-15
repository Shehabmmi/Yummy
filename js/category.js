const side = $(".links").innerWidth();
let isShown = false;
$(".sideBar").css({ left: `${-side}px` });

$(".close-icon").on("click", function () {
  if (isShown) {
    $(".sideBar").animate({ left: `${-side}px` }, 500);
    $(this).removeClass("fa-xmark").addClass("fa-align-justify");

    isShown = false;
  } else {
    $(".sideBar").animate({ left: `0` }, 500);
    $(this).removeClass("fa-align-justify").addClass("fa-xmark");
    isShown = true;
  }
});

$(".logo").on("click", function () {
  window.location.href = "index.html";
});

async function getCategory() {
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  if (x.ok == true) {
    let data = await x.json();
    display(data.categories);
  }
}

let data = $(".data");
function display(categories) {
  let cartona = "";
  for (let i = 0; i < categories.length; i++) {
    cartona += `
         <div class="col-sm-12 col-md-3 col-lg-3 mb-3">
            <img src="${categories[i].strCategoryThumb}" alt="" class="w-100 category-img" data-category="${categories[i].strCategory}">
            
         </div>
    `;
  }

  $(".data").html(cartona);
}

// Filter by Category
// `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.strCategory}`

$(".data").on("click", ".category-img", async function () {
  $(".loading").fadeIn(500);
  $("body").css("overflow", "hidden");
  let categoryName = $(this).data("category");
  let x = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  if (x.ok) {
    let data = await x.json();
    
    displayMeals(data.meals);
    $(".loading").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  }
});

function displayMeals(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
         <div class=" col-sm-12 col-md-3 col-lg-3 mb-3">
         <div class="meal-box">
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

getCategory();

jQuery(function(){
  $('.loading').fadeOut(1500 , function(){
    $('body').css({overflow:'auto'})
  })
})