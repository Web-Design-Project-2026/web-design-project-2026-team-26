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
