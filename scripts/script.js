let deliveryCosts = 4.99;
let totalCosts = 0;
let isDelivery = true;
let subtotal = 0;
let waren = []; // save in object
let isCartOpen = false;

function calcSubtotal() {
  subtotal = 0;
  waren.forEach((el) => {
    let cal = el.productQuantity * el.productPrice;
    subtotal = subtotal + cal;
  });
  if (document.getElementById("subtotal-sum")) {
    document.getElementById("subtotal-sum").innerHTML = subtotal.toFixed(2) + " €";
  }
  
  SumTotalCosts();
}

function SumTotalCosts() {
  if (isDelivery) {
    totalCosts = subtotal + deliveryCosts;
  } else {
    totalCosts = subtotal;
  }
  if (document.getElementById("total-costs-sum")) {
    document.getElementById("total-costs-sum").innerHTML =
      totalCosts.toFixed(2) + " €";
  }
}

function init() {
  getDishesData();
  toggleDeliveryType(true);
}

function getDishesData() {
  for (let categoryIndex = 0; categoryIndex < dishes.length; categoryIndex++) {
    let category = dishes[categoryIndex];
    let categoryName = Object.keys(category)[0]; // z.B. "pizza", "pasta"
    let dishesInCategory = category[categoryName];
    let categoryImage = category.image;

    createCategorySection(categoryName, dishesInCategory, categoryImage);
  }
}

function renderCart() {
  let contentRef = document.getElementById("cart-content-container");
  contentRef.innerHTML = "";
  for (let indexCart = 0; indexCart < waren.length; indexCart++) {
    contentRef.innerHTML += getCartTemplate(indexCart);
  }
}

function addToCart(productName, productPrice) {
  const found = waren.find((el) => el.productName === productName);
  if (found) {
    found.productQuantity++;
  } else {
    let newcartItem = {
      productName: productName,
      productPrice: Number(productPrice).toFixed(2),
      productQuantity: 1,
    };
    waren.push(newcartItem);
  }
  renderCartItem();
}

function renderCartItem() {
  let cartContent = document.getElementById("cart-content-container");
  cartContent.innerHTML = "";
  if (waren.length > 0) {
    waren.forEach((element) => {
      const cartItemHTML = renderCartItemTemplate(
        element.productName,
        element.productPrice,
        element.productQuantity
      );
      cartContent.insertAdjacentHTML("beforeend", cartItemHTML);
    });
    calcData();
  } else {
    cartContent.innerHTML = getEmptyCart();
  }
}

// render template for cost calculation
function calcData() {
  let cartContent = document.getElementById("cart-content-container");
  const calcHTML = renderCalcTemplate();
  cartContent.insertAdjacentHTML("beforeend", calcHTML);
  calcSubtotal();
  SumTotalCosts();
}

// remove product from cart
function removeFromCart(productName) {
  let filteredCart = waren.filter((item) => item.productName !== productName);
  waren = filteredCart;
  renderCartItem();
}

function toggleDeliveryType(delivery) {
  isDelivery = delivery;
  if (delivery) {
    document.getElementById("delivery").classList.add("btn-selected");
    document.getElementById("pickup").classList.remove("btn-selected");
    if (document.getElementById("delivery-costs")) {
      document.getElementById("delivery-costs").classList.remove("d-none");
    }
    calcSubtotal();
  } else {
    document.getElementById("delivery").classList.remove("btn-selected");
    document.getElementById("pickup").classList.add("btn-selected");
    document.getElementById("delivery-costs").classList.add("d-none");
    calcSubtotal();
  }
}

function increaseSum(productName) {
  const found = waren.find((el) => el.productName === productName);
  if (found) {
    found.productQuantity++;
  }
  console.log(waren);
  renderCartItem();
}

function decreaseSum(productName) {
  const found = waren.find((el) => el.productName === productName);
  if (found) {
    found.productQuantity--;
    if (found.productQuantity == 0) {
      removeFromCart(productName);
    }
  }
  renderCartItem();
}

function toggleCart() {
  isCartOpen = !isCartOpen;
  handleCartClass();
}

function handleCartClass() {
  const cart = document.getElementById("cart");
  const closeBtn = document.getElementById("close-btn");
  if (isCartOpen) {
    cart.classList.add("show");
    closeBtn.classList.remove("d-none");
    document.getElementById("body").classList.add("stop-scrolling");
  } else {
    closeBtn.classList.add("d-none");
    cart.classList.remove("show");
    document.getElementById("body").classList.remove("stop-scrolling");
  }
}

function sendOrder(){
  let cartContent = document.getElementById("cart-content-container");
  cartContent.innerHTML = getSentOrderTemplate();
  waren = [];
} 
