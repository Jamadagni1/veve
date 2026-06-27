// 1. Data Base - Fixed Unique IDs (1-20)
const products = [
    { id: 1, name: "Fresh Red Apples", category: "fruit", price: 140, oldPrice: 180, discount: "22% OFF", rating: 4.8, reviews: 120, image: "images/apple.jpg" },
    { id: 2, name: "Farm Tomatoes", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/tomato.jpg" },
    { id: 3, name: "Avocado Hass", category: "exotic", price: 250, oldPrice: 300, discount: "16% OFF", rating: 4.9, reviews: 200, image: "images/avocodo.jpg" },
    { id: 4, name: "Organic Bananas", category: "fruit", price: 60, oldPrice: 80, discount: "25% OFF", rating: 4.6, reviews: 150, image: "images/banana.jpg" },
    { id: 5, name: "Fresh Broccoli", category: "vegetable", price: 75, oldPrice: 100, discount: "25% OFF", rating: 4.7, reviews: 90, image: "images/broccoli.jpg" },
    { id: 6, name: "Kiwi Zespri", category: "exotic", price: 120, oldPrice: 150, discount: "20% OFF", rating: 4.8, reviews: 110, image: "images/kiwi.jpg" },
    { id: 7, name: "Nagpur Oranges", category: "fruit", price: 120, oldPrice: 150, discount: "20% OFF", rating: 4.5, reviews: 75, image: "images/orange.jpg" },
    { id: 8, name: "Red Onions", category: "vegetable", price: 35, oldPrice: 50, discount: "30% OFF", rating: 4.4, reviews: 210, image: "images/onion.jpg" },
    { id: 9, name: "Fresh Strawberries", category: "fruit", price: 180, oldPrice: 220, discount: "18% OFF", rating: 4.9, reviews: 340, image: "images/strobarry.jpg" },
    { id: 10, name: "Green Capsicum", category: "vegetable", price: 45, oldPrice: 60, discount: "25% OFF", rating: 4.3, reviews: 60, image: "images/capsicum.jpg" },
    { id: 11, name: "Dragon Fruit", category: "exotic", price: 90, oldPrice: 120, discount: "25% OFF", rating: 4.6, reviews: 45, image: "images/dragon.jpg" },
    { id: 12, name: "Fresh Carrots", category: "vegetable", price: 50, oldPrice: 70, discount: "28% OFF", rating: 4.7, reviews: 130, image: "images/carrot.jpg" },
    { id: 13, name: "Fresh Peas", category: "vegetable", price: 50, oldPrice: 70, discount: "28% OFF", rating: 4.7, reviews: 130, image: "images/peas.jpg" },
    { id: 14, name: "Fresh Isquash", category: "vegetable", price: 50, oldPrice: 70, discount: "28% OFF", rating: 4.7, reviews: 130, image: "images/isquash.jpg" },
    { id: 15, name: "Fresh Red Potato", category: "vegetable", price: 50, oldPrice: 70, discount: "28% OFF", rating: 4.7, reviews: 130, image: "images/redpotato.jpg" },
    { id: 16, name: "Fresh Aloo Bukhara", category: "fruit", price: 180, oldPrice: 220, discount: "18% OFF", rating: 4.9, reviews: 340, image: "images/aloobukhara.jpg" },
    { id: 17, name: "Organic Pure Honey", category: "fruit", price: 750, oldPrice: 1000, discount: "25% OFF", rating: 4.6, reviews: 150, image: "images/purehoney.jpg" },
    { id: 18, name: "Farm Simi", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/simi.jpg" },
    { id: 19, name: "Farm Rayo Saag", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/rayo.jpg" },
    { id: 20, name: "Farm Iskush Munta", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/munta.jpg" }
];

// ... (Rest of your DOM Elements remain same) ...
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const noResultsMsg = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');
const toastContainer = document.getElementById('toast-container');
const cartIconContainers = document.querySelectorAll('.cart-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartSavingsElement = document.getElementById('cart-savings');

let cart = JSON.parse(localStorage.getItem('veve_cart')) || [];

function updateCartCount() { cartCountElement.innerText = cart.length; }

// FIXED: Check object ID instead of primitive ID
function isProductInCart(productId) {
    return cart.some(item => item.id === productId);
}

function getStars(rating) {
    let starsHtml = '';
    for(let i=1; i<=5; i++) {
        if(i <= Math.floor(rating)) starsHtml += '<i class="fa-solid fa-star"></i>';
        else if(i === Math.ceil(rating)) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        else starsHtml += '<i class="fa-regular fa-star"></i>';
    }
    return starsHtml;
}

function renderProducts(items) {
    productGrid.innerHTML = ""; 
    items.forEach(product => {
        const isAdded = isProductInCart(product.id);
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="discount-badge">${product.discount}</div>
            <div class="img-container"><img src="${product.image}" alt="${product.name}" class="product-img"></div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">${getStars(product.rating)} <span>(${product.reviews})</span></div>
                <select class="weight-select" onchange="updatePrice(event, ${product.price}, ${product.oldPrice})">
                    <option value="0.5">500 g</option>
                    <option value="1" selected>1 kg</option>
                    <option value="2">2 kg</option>
                </select>
                <div class="product-price-row">
                    <div class="price-box">
                        <span class="current-price">₹${product.price}</span>
                        <span class="old-price">₹${product.oldPrice}</span>
                    </div>
                </div>
                <button class="add-to-cart-btn ${isAdded ? 'added' : ''}" onclick="addToCart(event, ${product.id})" ${isAdded ? 'disabled' : ''}>
                    <i class="fa-solid ${isAdded ? 'fa-check-double' : 'fa-cart-plus'}"></i> 
                    <span>${isAdded ? 'In Cart' : 'Add to Cart'}</span>
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function updatePrice(event, basePrice, baseOldPrice) {
    const selectElement = event.target;
    const multiplier = parseFloat(selectElement.value);
    const cardInfo = selectElement.closest('.product-info');
    const currentPriceSpan = cardInfo.querySelector('.current-price');
    const oldPriceSpan = cardInfo.querySelector('.old-price');
    currentPriceSpan.innerText = `₹${Math.round(basePrice * multiplier)}`;
    oldPriceSpan.innerText = `₹${Math.round(baseOldPrice * multiplier)}`;
}

function addToCart(event, productId) {
    const card = event.currentTarget.closest('.product-card');
    const selectBox = card.querySelector('.weight-select');
    
    const cartItem = {
        id: productId,
        weight: selectBox.options[selectBox.selectedIndex].text,
        price: parseInt(card.querySelector('.current-price').innerText.replace('₹', '')),
        oldPrice: parseInt(card.querySelector('.old-price').innerText.replace('₹', ''))
    };

    cart.push(cartItem);
    localStorage.setItem('veve_cart', JSON.stringify(cart));
    updateCartCount();

    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>In Cart</span>';
    btn.classList.add('added');
    btn.disabled = true;

    showToast("Item added successfully!");
    renderCartItems();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let totalSavings = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            total += item.price;
            totalSavings += (item.oldPrice - item.price);

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${product.name} <br> <small style="color:gray;">${item.weight}</small></h4>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        }
    });

    cartTotalPrice.innerText = `₹${total}`;
    cartSavingsElement.innerText = `₹${totalSavings}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('veve_cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    renderProducts(products); // Refresh buttons
}

// Initialization
window.onload = () => {
    updateCartCount();
    renderProducts(products);
    renderCartItems();
};

// ... (Keep Search & Mobile menu functions as they were) ...
