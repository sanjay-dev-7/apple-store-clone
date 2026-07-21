function increase(btn) {
    let quantity = btn.previousElementSibling;
    let value = parseInt(quantity.innerText);

    if (value < 10) {
        quantity.innerText = value + 1;
    } else {
        alert("Maximum 10 products allowed.");
    }
}

function decrease(btn) {
    let quantity = btn.nextElementSibling;
    let value = parseInt(quantity.innerText);

    if (value > 1) {
        quantity.innerText = value - 1;
    }
}


function addToCart(name, price, image, btn) {

    let quantity = parseInt(
        btn.parentElement.querySelector(".quantity span").innerText
    );

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(product => product.name === name);

    if (existing) {
        existing.quantity += quantity;

        if (existing.quantity > 10) {
            existing.quantity = 10;
        }
    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}



function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    let badge = document.getElementById("cart_count");

    if (badge) {
        badge.innerText = total;
    }
}




function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cart");

    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = `
            <h2 class=" empty-txt">Your cart is empty.</h2>
            <p class=" empty-txt2" >Add some products to get started!</p>
        `;
        return;
}

    let output = "";

    let grandTotal = 0;

    cart.forEach((item, index) => {

        grandTotal += item.price * item.quantity;

        output += `
        <div class="cart-item">

           <img src="${item.image}" alt=""
            class="cart-image ${item.name === 'iPhone 17' ? 'iphone17-img' : ''}">

            <div class="details">
                <h2>${item.name}</h2>

                <p style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: 600;">Total</span>
              <span style="font-weight: 600; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">₹${item.price}</p>

               
                <div class="cart-quantity">

                    <button style="padding-left:12px;" onclick="decreaseCart(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseCart(${index})">+</button>

                </div>
                

                <button class="remove-btn" onclick="removeItem(${index})">
                 <i class="fa-solid fa-trash"></i> 
                    Remove
                </button>
                
            </div>

        </div>
        `;

    });

   

    container.innerHTML = output;
    document.getElementById("subtotal").innerText =
        "₹" + grandTotal;

     document.getElementById("total").innerText =
        "₹" + grandTotal;

}


function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

    updateCartCount();

}



updateCartCount();

displayCart();
function increaseCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].quantity < 10){
        cart[index].quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}

function decreaseCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}
function clearCart() {

    let confirmClear = confirm("Are you sure you want to clear your cart?");

    if (confirmClear) {

        localStorage.removeItem("cart");

        displayCart();

        updateCartCount();

    }

}

function checkout(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("thankYouModal").style.display = "flex";

    localStorage.removeItem("cart");

    updateCartCount();

}

function closeModal(){

    document.getElementById("thankYouModal").style.display = "none";

    displayCart();

    window.location.href = "index.html";

}