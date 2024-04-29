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
      const selectedSize = document.querySelector('input[name="size"]:checked').id;
  
      cartMessage.textContent = `Embrace Sideboard with Color ${selectedColorName} and Size ${selectedSize} added to cart`;
      cartMessage.style.display = "block";
    });
  });
  