// CART STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
const cartCount = document.querySelector("#cartCount");

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

updateCartCount();

const decreaseButton = document.querySelector("#decreaseQuantity");
const increaseButton = document.querySelector("#increaseQuantity");
const quantityValue = document.querySelector("#quantityValue");

if (decreaseButton && increaseButton && quantityValue) {
  let quantity = 1;

  increaseButton.addEventListener("click", function () {
    quantity++;
    quantityValue.textContent = quantity;
  });

  decreaseButton.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });
}

// ADD PRODUCT TO CART
const addToCartButton = document.querySelector("#addToCartButton");

const currentProduct = {
  name: "Hydrating Serum",
  category: "Skincare",
  price: 349,
  image: "Images/Serum.png",
};

if (addToCartButton) {
  addToCartButton.addEventListener("click", function () {
    const selectedQuantity = quantityValue
      ? parseInt(quantityValue.textContent)
      : 1;

    for (let i = 0; i < selectedQuantity; i++) {
      cart.push(currentProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    addToCartButton.textContent = "Added to cart";
  });
}

// RENDER CART ITEMS
const cartItemsContainer = document.querySelector("#cartItems");

const subtotalPrice = document.querySelector("#subtotalPrice");
const totalPrice = document.querySelector("#totalPrice");

function renderCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price;

    const cartItem = document.createElement("article");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <div>
        <h2>${product.name}</h2>
        <p>${product.price} kr</p>
      </div>

      <button class="remove-button" data-index="${index}">
        Remove
      </button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  subtotalPrice.textContent = `${total} kr`;
  totalPrice.textContent = `${total} kr`;
}

renderCart();

// REMOVE CART ITEMS
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-button")) {
      const productIndex = event.target.dataset.index;

      cart.splice(productIndex, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
      renderCart();
    }
  });
}
