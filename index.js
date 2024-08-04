// script.js

const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const cart = {};

const productList = document.getElementById('products');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

function renderProducts() {
    products.forEach(product => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <div>
                <button onclick="removeFromCart(${product.id})">-</button>
                <span id="quantity-${product.id}">0</span>
                <button onclick="addToCart(${product.id})">+</button>
            </div>
        `;

        productList.appendChild(li);
    });
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '<li>No Product added to the cart</li>';
    } else {
        for (const id in cart) {
            const product = products.find(p => p.id == id);
            const quantity = cart[id];
            const li = document.createElement('li');

            li.innerHTML = `
                <span>${product.name}</span>
                <span>${quantity} × $${product.price}</span>
            `;

            cartItems.appendChild(li);
            total += product.price * quantity;
        }
    }

    totalPriceElement.innerText = total;
}

function addToCart(id) {
    if (cart[id]) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }
    document.getElementById(`quantity-${id}`).innerText = cart[id];
    renderCart();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id]--;
        if (cart[id] === 0) {
            delete cart[id];
        }
    }
    document.getElementById(`quantity-${id}`).innerText = cart[id] || 0;
    renderCart();
}

// Initialize the app
renderProducts();
// renderCart();
// 