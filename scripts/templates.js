function createCategorySection(categoryName, dishes, image, cardsContainer) {
  cardsContainer.innerHTML += `   
    <section class="category-section" id="${categoryName}">
    <img src="${image}" class="section-header-img" alt="${categoryName}">
      <h2>${categoryName}</h2> 
      <div class="category-dishes">
        ${dishes
          .map(
            (dish) => `
          <article class="card" id="card-container">
            <div class="card-content-left">
              <h3>${dish.name}</h3>
              <p>${dish.description}</p>
              <p class="price">${dish.price.toFixed(2) + " " + "€"}</p>
            </div>
            <div class="card-content-right">
              <button class="add-to-cart-btn" onclick="addToCart('${
                dish.name
              }', '${dish.price}')">+</button>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
    `;
}

function getCartTemplate(indexCart) {
  return `    
    <div class="basket-menu">
      <button onclick="minusAmmountPrice(${indexCart})">-</button>
      <div class="basket-item">
        <p id="ammountPriceUp${indexCart}"> 
        ${products[indexCart].productQuantity} x</p>
        <h3> ${products[indexCart].productName}</h3>
        <p id='changePrice${indexCart}'> 
        ${(
          products[indexCart].productPrice * products[indexCart].productQuantity
        ).toFixed(2)} €</p>
      </div>
      <button onclick="plusAmmountPrice(${indexCart})">+</button>         
    </div>
    `;
}

function renderCartItemTemplate(productName, productPrice, productQuantity) {
  return `
    <div id="cart-item">
      <h4>${productName}</h4>
      <div class="cart-item-infos">
        <section class="cart-item-quantity">
        <button id="minus" class="decrease-btn cart-btn" onclick="decreaseSum('${productName}')"><img class="img-btn" src="././assets/icons/ic_remove.svg"></button>
        <p id="cart-item-amount" class="cart-item-amount-sum">${productQuantity}</p>
        <button id="plus" class="increase-btn cart-btn" onclick="increaseSum('${productName}')"><img class="img-btn" src="././assets/icons/ic_add.svg"></button>
        </section>
        <span>${productPrice} €</span>
        <button class="trash-btn cart-btn" onclick="removeFromCart('${productName}')"></button>
      </div>
    </div>
  `;
}

function renderCalcTemplate() {
  return `
    <div id="cart-order-total">
      <div id="subtotal" class="subtotal">
          <p>Zwischensumme</p>
          <p id="subtotal-sum"></p>
      </div>
      <div id="delivery-costs" class="delivery-costs">
          <p>Lieferkosten</p>
          <p id="delivery-costs-sum">${deliveryCosts} €</p>
      </div>
      <hr>
      <div id="total-costs" class="total-costs">
          <p>Gesamt</p>
          <p id="total-costs-sum"></p>
      </div>
      <div id="order-button">
      <button class="btn-order" onclick="sendOrder()">Bestellen</button>
      </div>
    </div>
  `;
}

function getEmptyCart() {
  return `
    <div id="empty">
      <img class="cart-icon" src="./assets/img/ic_bag.svg">
      <h3>Fülle deinen Warenkorb</h3>
      <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>
  `;
}

function getSentOrderTemplate() {
  return `
    <div id="sentorder">
      <img class="cart-icon" src="./assets/icons/ic_delivery.svg">
      <h3>Vielen Dank für deine Bestellung!</h3>
      <p>Deine Bestellung wird nun zubereitet und ist bald auf dem Weg zu dir.</p>
    </div>
  `;
}
