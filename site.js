function setActivePage(){

    let path = window.location.pathname.split('/').pop();

    let navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setActivePage();
});

const pizzas = [
    {name: "Margeritha", price: 109, ingredients: "Tomato sauce, Mozzarella, Grana Padano, Olive Oil", img: "images/margeritha.jpg", quantity: 0},
    {name: "Pepperoni", price: 129, ingredients: "Tomato sauce, Mozzarella, Pepperoni", img: "images/pepperoni.jpg", quantity: 0},
    {name: "Hawaiian", price: 119, ingredients: "Tomato sauce, Mozzarella, Ham, Pineapple", img: "images/hawaii.jpg", quantity: 0},
    {name: "Veggie Delight", price: 125, ingredients: "Tomato sauce, Mozzarella, Bell Peppers, Onions, Mushrooms, Olives", img: "images/veggie.jpg", quantity: 0},
    {name: "Meat Lovers", price: 139, ingredients: "Tomato sauce, Mozzarella, Pepperoni, Ham, Bacon, Italian Sausage", img: "images/meatlover.avif", quantity: 0}
]

document.addEventListener('DOMContentLoaded', function() {
    showMenu();
});

function showMenu() {

    let menuContainer = document.getElementById("menuContainer");
    
    pizzas.forEach(function(pizza) {
        let pizzaCard = document.createElement("div");
        pizzaCard.className = "col-12 mb-3 d-flex justify-content-center";
        pizzaCard.innerHTML = `
            <div class="card" style="width: 25rem;">
                <img src="${pizza.img}" class="card-img-top opacity-75" alt="${pizza.name}">
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <p class="card-text">${pizza.ingredients}</p>
                    <p class="card-text"><strong>Price:</strong> ${pizza.price} SEK</p>
                </div>
            </div>
        `;

        let addButton = document.createElement("button");
        addButton.className = "btn btn-danger";
        addButton.textContent = "Add to Cart";
        addButton.onclick = function() { addToCart(pizza); };
        pizzaCard.querySelector('.card-body').appendChild(addButton);

        menuContainer.appendChild(pizzaCard);
    });
}


function showNotification(message) {
    let notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000); 
}


let cart = [];


function addToCart(pizza) {

    let found = cart.find(p => p.name === pizza.name);

    if(found) {
        found.quantity++;
    } else {
        cart.push({...pizza, quantity: 1});
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    showNotification(`1 ${pizza.name} added to cart`);

    updateShoppingCart();

}

function updateShoppingCart() {
    let cartItemsContainer = document.getElementById("cartItemsContainer");
    let totalPriceElement = document.getElementById("totalPrice");

    cartItemsContainer.innerHTML = '';

    let checkoutButton = document.getElementById("checkoutButton");
    let emptyButton = document.getElementById("emptyButton");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="lead text-center mt-3">Your cart is empty</p>';
        totalPriceElement.style.display = 'none';
        checkoutButton.disabled = true;
        emptyButton.disabled = true;
    } else {
        cart.forEach((item) => {
            let cartCard = document.createElement("div");
            cartCard.className = "card mb-3 mx-auto";
            cartCard.style.width = "25rem";

            

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            cartCard.appendChild(cardBody);

            let title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = item.name;
            cardBody.appendChild(title);

            let text = document.createElement("p");
            text.className = "card-text";
            text.textContent = `${item.ingredients} - ${item.price} SEK x ${item.quantity}`;
            cardBody.appendChild(text);

            let removeButton = document.createElement("button");
            removeButton.className = "btn btn-danger";
            removeButton.textContent = "Remove from Cart";
            removeButton.onclick = function() { removeFromCart(item.name); };
            cardBody.appendChild(removeButton);

            cartItemsContainer.appendChild(cartCard);

            checkoutButton.disabled = false;
            emptyButton.disabled = false;

            totalPriceElement.style.display = 'block';
            let totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
            totalPriceElement.textContent = `Total Price: ${totalPrice} SEK`;
        });
    }

    
}


function showCart() {

    if(localStorage.getItem("shoppingCart")) {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
    }

    updateShoppingCart();
}

function removeFromCart(pizzaName) {

    let itemIndex = cart.findIndex(item => item.name === pizzaName);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); 
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        updateShoppingCart();
    }

}

function emptyCart() {
    
    cart = [];

    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    updateShoppingCart();

}

function checkout() {

    cart = [];

    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    showNotification(`Thank you for your order, Bon Appetit`);

    updateShoppingCart();
}

document.addEventListener('DOMContentLoaded', function() {
    showCart();
});


