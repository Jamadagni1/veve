// 1. Data Base
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
    { id: 9, name: "Fresh Aloo Bukhara", category: "fruit", price: 180, oldPrice: 220, discount: "18% OFF", rating: 4.9, reviews: 340, image: "images/aloobukhara.jpg" },
    { id: 4, name: "Organic Pure Honey", category: "fruit", price: 750, oldPrice: 1000, discount: "25% OFF", rating: 4.6, reviews: 150, image: "images/purehoney.jpg" },
    { id: 2, name: "Farm Simi", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/simi.jpg" },
    { id: 2, name: "Farm Rayo Saag", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/rayo.jpg" },
    { id: 2, name: "Farm Iskush Munta", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "images/munta.jpg" }
];

// 2. DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const noResultsMsg = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');
const toastContainer = document.getElementById('toast-container');

// Sidebar Elements
const cartIconContainers = document.querySelectorAll('.cart-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

// 3. Cart Data Setup (Now storing Objects instead of just IDs)
let cart = JSON.parse(localStorage.getItem('veve_cart')) || [];

function updateCartCount() {
    cartCountElement.innerText = cart.length;
}

// Check if a product is already in cart
function isProductInCart(productId) {
    return cart.some(item => item.id === productId);
}

// Generate Star Rating HTML
function getStars(rating) {
    let starsHtml = '';
    for(let i=1; i<=5; i++) {
        if(i <= Math.floor(rating)) starsHtml += '<i class="fa-solid fa-star"></i>';
        else if(i === Math.ceil(rating)) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        else starsHtml += '<i class="fa-regular fa-star"></i>';
    }
    return starsHtml;
}

// 4. Render Products
function renderProducts(items) {
    productGrid.innerHTML = ""; 
    
    if (items.length === 0) {
        noResultsMsg.style.display = "block";
    } else {
        noResultsMsg.style.display = "none";
        items.forEach(product => {
            const isAdded = isProductInCart(product.id);
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <div class="discount-badge">${product.discount}</div>
                <div class="img-container">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    
                    <div class="product-rating">
                        ${getStars(product.rating)} <span>(${product.reviews})</span>
                    </div>

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
}

// 5. Auto Price Calculator Logic
function updatePrice(event, basePrice, baseOldPrice) {
    const selectElement = event.target;
    const multiplier = parseFloat(selectElement.value);
    
    const cardInfo = selectElement.closest('.product-info');
    const currentPriceSpan = cardInfo.querySelector('.current-price');
    const oldPriceSpan = cardInfo.querySelector('.old-price');
    
    const newCurrentPrice = Math.round(basePrice * multiplier);
    const newOldPrice = Math.round(baseOldPrice * multiplier);
    
    currentPriceSpan.innerText = `₹${newCurrentPrice}`;
    oldPriceSpan.innerText = `₹${newOldPrice}`;
}

// 6. Add to Cart Logic (UPDATED)
function addToCart(event, productId) {
    if (!isProductInCart(productId)) {
        
        // 1. Get the closest product card
        const card = event.currentTarget.closest('.product-card');
        
        // 2. Extract selected weight and updated price from the screen
        const selectBox = card.querySelector('.weight-select');
        const selectedWeight = selectBox.options[selectBox.selectedIndex].text;
        const currentPriceText = card.querySelector('.current-price').innerText.replace('₹', '');
        const updatedPrice = parseInt(currentPriceText);

        // 3. Save as Object instead of just ID
        const cartItem = {
            id: productId,
            weight: selectedWeight,
            price: updatedPrice
        };

        cart.push(cartItem);
        localStorage.setItem('veve_cart', JSON.stringify(cart));
        updateCartCount();

        // 4. Update button UI
        const btn = event.currentTarget;
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>In Cart</span>';
        btn.classList.add('added');
        btn.disabled = true;

        showToast("Item added to your cart!");
        
        // 5. Update Sidebar immediately
        renderCartItems();
    }
}

// 7. Category Filter
function filterByCategory(category) {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-filter') === category) btn.classList.add('active');
    });
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

filterBtns.forEach(btn => btn.addEventListener('click', (e) => filterByCategory(e.target.getAttribute('data-filter'))));

// 8. Search Bar Logic
function performSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');

    const searchedItems = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if(searchTerm.length > 0 && window.scrollY < 300) {
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    }
    renderProducts(searchedItems);
}

searchInput.addEventListener('input', performSearch);
mobileSearchInput.addEventListener('input', performSearch);

// Toast Popup
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// 9. Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-xmark');
    });
});

// 10. Cart Sidebar Logic (UPDATED)
cartIconContainers.forEach(icon => {
    icon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        renderCartItems();
    });
});

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    // Filter out old legacy data if user didn't clear cache
    const validCart = cart.filter(item => typeof item === 'object');

    if (validCart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your cart is empty!</p>
            </div>
        `;
    } else {
        validCart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                total += cartItem.price; // Now adding the specific price stored in cart

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${product.name} <br><span style="color:#6b7280; font-size:12px;">(${cartItem.weight})</span></h4>
                        <span class="cart-item-price">₹${cartItem.price}</span>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${product.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemDiv);
            }
        });
    }

    cartTotalPrice.innerText = `₹${total}`;
}

function removeFromCart(productId) {
    // Remove object from array matching the ID
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('veve_cart', JSON.stringify(cart));
    
    updateCartCount();
    renderCartItems();
    
    // Refresh shop grid to reset "In Cart" button
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const category = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// 11. Initialization
window.onload = () => {
    // Clean old ID-only arrays from legacy users automatically
    if(cart.length > 0 && typeof cart[0] !== 'object') {
        cart = [];
        localStorage.removeItem('veve_cart');
    }
    
    updateCartCount(); 
    renderProducts(products); 
    renderCartItems();
};
