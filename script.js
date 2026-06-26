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

// 3. Cart Data Setup
let cart = JSON.parse(localStorage.getItem('veve_cart')) || [];

function updateCartCount() {
    cartCountElement.innerText = cart.length;
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
            const isAdded = cart.includes(product.id);
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

                    <select class="weight-select">
                        <option value="500g">500 g</option>
                        <option value="1kg" selected>1 kg</option>
                        <option value="2kg">2 kg</option>
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

// 5. Category Filter
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

// 6. Search Bar Logic
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

// 7. Add to Cart Logic
function addToCart(event, productId) {
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('veve_cart', JSON.stringify(cart));
        updateCartCount();

        // Update button UI
        const btn = event.currentTarget;
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>In Cart</span>';
        btn.classList.add('added');
        btn.disabled = true;

        showToast("Item added to your cart!");
        
        // Background render to keep sidebar synced
        renderCartItems();
    }
}

// Toast Popup
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// 8. Mobile Menu Logic
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

// 9. Cart Sidebar Logic
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

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your cart is empty!</p>
            </div>
        `;
    } else {
        cart.forEach(id => {
            const product = products.find(p => p.id === id);
            if (product) {
                total += product.price;

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${product.name}</h4>
                        <span class="cart-item-price">₹${product.price}</span>
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
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('veve_cart', JSON.stringify(cart));
    
    updateCartCount();
    renderCartItems();
    
    // Refresh shop grid to reset "In Cart" button
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const category = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// 10. Initialization
window.onload = () => {
    updateCartCount(); 
    renderProducts(products); 
    renderCartItems();
};
