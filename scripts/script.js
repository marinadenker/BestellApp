let deliveryCosts = 4.99;
let totalCosts = 0;
let isDelivery = true;
let subtotal = 0;
let products = [];
let isCartOpen = false;

function calcSubtotal() {
  subtotal = 0;
  products.forEach((el) => {
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
    document.getElementById("total-costs-sum").innerHTML = totalCosts.toFixed(2) + " €";
    document.getElementById("total-costs-mobile").innerHTML = totalCosts.toFixed(2) + " €";
  } 
}

function init() {
  getDishesData();
  toggleDeliveryType(true);
}

function getDishesData() {
  for (let categoryIndex = 0; categoryIndex < dishes.length; categoryIndex++) {
    let category = dishes[categoryIndex];
    let categoryName = Object.keys(category)[0];
    let dishesInCategory = category[categoryName];
    let categoryImage = category.image;
    let cardsContainer = document.getElementById("cards-container");
    createCategorySection(categoryName, dishesInCategory, categoryImage, cardsContainer);
  }
}

function renderCart() {
  let contentRef = document.getElementById("cart-content-container");
  contentRef.innerHTML = "";
  for (let indexCart = 0; indexCart < products.length; indexCart++) {
    contentRef.innerHTML += getCartTemplate(indexCart);
  }
}

function addToCart(productName, productPrice) {
  const found = products.find((el) => el.productName === productName);
  if (found) {
    found.productQuantity++;
  } else {
    let newcartItem = {
      productName: productName,
      productPrice: Number(productPrice).toFixed(2),
      productQuantity: 1,
    };
    products.push(newcartItem);
  }
  renderCartItem();
}

function calculateCartItemQuantity(){
  let productCounts = 0;
  products.forEach(product => {
    productCounts = product.productQuantity + productCounts;
  });
  document.getElementById("product-count").innerHTML = productCounts;
}

function renderCartItem() {
  let cartContent = document.getElementById("cart-content-container");
  cartContent.innerHTML = "";
  if (products.length > 0) {
    calcData();
    renderCartItems(cartContent);
    toggleDeliveryType(isDelivery);
    // document.getElementById("total-costs-mobile").innerHTML = totalCosts.toFixed(2) + " €";
  } else {
    cartContent.innerHTML = getEmptyCart();
    document.getElementById("cart-costs-container").innerHTML = "";
    document.getElementById("total-costs-mobile").innerHTML = "";
  }
  calculateCartItemQuantity();
}

function renderCartItems(cartContent){
  products.forEach((element) => {
      const cartItemHTML = renderCartItemTemplate(element.productName, element.productPrice, element.productQuantity);
      cartContent.insertAdjacentHTML("beforeend", cartItemHTML);
    });
}

// render template for cost calculation
function calcData() {
  let cartCostsContent = document.getElementById("cart-costs-container");
  const calcHTML = renderCalcTemplate();
  cartCostsContent.innerHTML = calcHTML;
  calcSubtotal();
  SumTotalCosts();
}

// remove product from cart
function removeFromCart(productName) {
  let filteredCart = products.filter((item) => item.productName !== productName);
  products = filteredCart;
  renderCartItem();
}

function toggleDeliveryType(delivery) {
  isDelivery = delivery;
  checkIfDeliveryCostsinCart();
  if (delivery) {
    document.getElementById("delivery").classList.add("btn-selected");
    document.getElementById("pickup").classList.remove("btn-selected");
    calcSubtotal();
  } else {
    document.getElementById("delivery").classList.remove("btn-selected");
    document.getElementById("pickup").classList.add("btn-selected");
    calcSubtotal();
  }
}

function checkIfDeliveryCostsinCart(){
  if (!document.getElementById("delivery-costs")) return;
    if (isDelivery) {
      document.getElementById("delivery-costs").classList.remove("d-none");
    } else {
      document.getElementById("delivery-costs").classList.add("d-none");
    }
}

function increaseSum(productName) {
  const found = products.find((el) => el.productName === productName);
  if (found) {
    found.productQuantity++;
  }
  renderCartItem();
}

function decreaseSum(productName) {
  const found = products.find((el) => el.productName === productName);
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
  const elementArrayIds = ["cart-toggle", "btn-to-top"];
  if (isCartOpen) {
    document.getElementById("cart").classList.add("show");
    document.getElementById("close-btn").classList.remove("d-none");
    document.getElementById("body").classList.add("stop-scrolling");
    hideElement(elementArrayIds); 
  } else {
    document.getElementById("close-btn").classList.add("d-none");
    document.getElementById("cart").classList.remove("show");
    document.getElementById("body").classList.remove("stop-scrolling");
    showElement(elementArrayIds);
  }
}

function hideElement(elementIds){
  elementIds.forEach((element) => {
    document.getElementById(element).classList.add("d-none");
  });
}

function showElement(elementIds) {
  elementIds.forEach((element) => {
    document.getElementById(element).classList.remove("d-none");
  });
}

function sendOrder(){
  document.getElementById("cart-content-container").innerHTML = getSentOrderTemplate();
  document.getElementById("cart-costs-container").innerHTML = "";
  products = [];
} 
