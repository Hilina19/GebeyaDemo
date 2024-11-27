// Global cart variable
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Cart Functionality
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems && cartTotal) { // Ensure the script runs only on the Cart Page
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            cartItems.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        ${item.quantity}
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${index})">Remove</button></td>
                </tr>
            `;
        });

        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Update Cart Quantity
function updateQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Add Item to Cart
function addToCart(product) {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// "Buy Now" functionality
function buyNow(product) {
    addToCart(product); // Add item to cart
    window.location.href = "checkout.html"; // Redirect to checkout page
} 

  


// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

// Handle Checkout Form Submission
function handleCheckoutForm() {
    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutForm) { // Ensure the script runs only on the Checkout Page
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Collect form data
            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const email = document.getElementById("email").value;

            // Simulate order placement
            alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nEmail: ${email}`);

            // Clear cart and redirect to home page
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        });
    }
}

// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    renderCart(); // Render cart if on Cart Page
    handleCheckoutForm(); // Attach form submission listener if on Checkout Page

    // Add event listeners to "Add to Cart" and "Buy Now" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const product = {
                name: productCard.getAttribute("data-name"),
                price: parseFloat(productCard.getAttribute("data-price")),
            };
            addToCart(product);
        });
    });

    document.querySelectorAll(".buy-now-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const product = {
                name: productCard.getAttribute("data-name"),
                price: parseFloat(productCard.getAttribute("data-price")),
            };
            buyNow(product);
        });
    });
});

// Product carousel functionality
const productCarousel = document.querySelector(".product-carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let scrollAmount = 0;

if (productCarousel) {
    nextBtn.addEventListener("click", () => {
        const maxScroll = productCarousel.scrollWidth - productCarousel.clientWidth;
        if (scrollAmount < maxScroll) {
            scrollAmount += 300; // Scroll by 300px (or width of one card)
            productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });

    prevBtn.addEventListener("click", () => {
        if (scrollAmount > 0) {
            scrollAmount -= 300; // Scroll by 300px (or width of one card)
            productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", () => {
          const productCard = button.closest(".product-card");
          const product = {
              name: productCard.getAttribute("data-name"),
              price: parseFloat(productCard.getAttribute("data-price")),
          };
          addToCart(product);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
          // Remove 'active' class from all buttons and contents
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          // Add 'active' class to clicked button and corresponding content
          button.classList.add("active");
          document.getElementById(button.dataset.target).classList.add("active");
      });
  });
});
function increaseQuantity() {
    const quantityInput = document.getElementById("quantity");
    const currentValue = parseInt(quantityInput.value);

    // Increment the value and update the input
    quantityInput.value = currentValue + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById("quantity");
    const currentValue = parseInt(quantityInput.value);

    // Decrement the value only if it's greater than the minimum (1)
    if (currentValue > parseInt(quantityInput.min)) {
        quantityInput.value = currentValue - 1;
    }
}


// Function to load an external HTML file and insert it into a specific element
function loadHTML(selector, file) {
    fetch(file)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch((error) => {
            console.error(error);
        });
}

// Load header and footer
window.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "header.html");
    loadHTML("footer", "footer.html");
});


// 
function validateAndPlaceOrder() {
    // Collect form input values
    const name = document.getElementById("name").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value.trim();
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryMonth = document.getElementById("expiry-month").value;
    const expiryYear = document.getElementById("expiry-year").value;
    const cvv = document.getElementById("cvv").value.trim();
  
    // Validation
    if (
      !name ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !cardName ||
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !cvv
    ) {
      alert("Please fill out all the required fields.");
      return; // Stop the function if validation fails
    }
  
    // Additional validation: Card number and CVV
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
  
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }
  
    // Show success message
    alert(`Order placed successfully!\n\nThank you for your purchase, ${name}.`);
    
    // Clear the form inputs and localStorage cart
    clearOrderForm();
    localStorage.removeItem("cart");
  
    // Redirect to a success or home page
    window.location.href = "index.html";
  }
  
  function clearOrderForm() {
    document.getElementById("name").value = "";
    document.getElementById("address1").value = "";
    document.getElementById("address2").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zip").value = "";
    document.getElementById("card-name").value = "";
    document.getElementById("card-number").value = "";
    document.getElementById("expiry-month").value = "";
    document.getElementById("expiry-year").value = "";
    document.getElementById("cvv").value = "";
  }
  