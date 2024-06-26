document.addEventListener("DOMContentLoaded", function () {
  const colorBoxes = document.querySelectorAll(".color-box");
  let selectedColor = null;

  colorBoxes.forEach((colorBox) => {
    colorBox.addEventListener("click", function () {
      if (selectedColor) {
        selectedColor.classList.remove("selected");
        selectedColor.style.border = "none";
      }

      this.classList.add("selected");
      selectedColor = this;

      const color = this.style.backgroundColor;
      const borderColor = darkenColor(color);
      this.style.border = `2px solid ${borderColor}`; 
    });
  });

  var discountAmountText = document.querySelector('.discount').textContent;
  var discountAmount = parseFloat(discountAmountText.replace('$', ''));

  var originalPriceText = document.querySelector('.original-price').textContent;
  var originalPrice = parseFloat(originalPriceText.replace('$', ''));

  var discountPercentage = ((originalPrice - discountAmount) / originalPrice) * 100;
  discountPercentage = Math.round(discountPercentage);

  console.log(discountPercentage + '%');

  function darkenColor(color) {
    const factor = 0.8;
    const [r, g, b] = color.match(/\d+/g);
    const darkenedR = Math.floor(parseInt(r) * factor);
    const darkenedG = Math.floor(parseInt(g) * factor);
    const darkenedB = Math.floor(parseInt(b) * factor);
    return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
  }

  const minusButton = document.querySelector(".quantity-box button:first-child");
  const plusButton = document.querySelector(".quantity-box button:last-child");
  const quantityDisplay = document.querySelector(".quantity-box span");

  let quantity = 1;

  function updateQuantityDisplay() {
    quantityDisplay.textContent = quantity;
  }

  minusButton.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      updateQuantityDisplay();
    }
  });

  plusButton.addEventListener("click", function () {
    quantity++;
    updateQuantityDisplay();
  });

  const addToCartButton = document.querySelector(".add-to-cart");
  const cartMessage = document.querySelector(".cart-message");

  addToCartButton.addEventListener("click", function () {
    if (!selectedColor) {
      cartMessage.style.display = "none";
      return;
    }

    const selectedColorName = selectedColor.style.backgroundColor;
    const selectedSize = document.querySelector('input[name="size"]:checked');
    if (!selectedSize) {
      cartMessage.style.display = "none";
      return;
    }

    cartMessage.textContent = `Embrace Sideboard with Color ${selectedColorName} and Size ${selectedSize.id} added to cart`;
    cartMessage.style.display = "block";

    setTimeout(function () {
      cartMessage.style.display = "none";
    }, 5000);

    selectedColor.classList.remove("selected");
    selectedColor.style.border = "none";
    selectedColor = null;
    selectedSize.checked = false;
  });
});
