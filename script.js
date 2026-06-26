// 1. Data Base (Har ek me discount aur rating add ki gayi hai)
const products = [
    { id: 1, name: "Fresh Red Apples", category: "fruit", price: 140, oldPrice: 180, discount: "22% OFF", rating: 4.8, reviews: 120, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Farm Tomatoes", category: "vegetable", price: 40, oldPrice: 60, discount: "33% OFF", rating: 4.5, reviews: 85, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Avocado Hass", category: "exotic", price: 250, oldPrice: 300, discount: "16% OFF", rating: 4.9, reviews: 200, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Organic Bananas", category: "fruit", price: 60, oldPrice: 80, discount: "25% OFF", rating: 4.6, reviews: 150, image: "https://images.unsplash.com/photo-1571501478200-85ba81dd602e?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Fresh Broccoli", category: "vegetable", price: 75, oldPrice: 100, discount: "25% OFF", rating: 4.7, reviews: 90, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Kiwi Zespri", category: "exotic", price: 120, oldPrice: 150, discount: "20% OFF", rating: 4.8, reviews: 110, image: "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Nagpur Oranges", category: "fruit", price: 120, oldPrice: 150, discount: "20% OFF", rating: 4.5, reviews: 75, image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Red Onions", category: "vegetable", price: 35, oldPrice: 50, discount: "30% OFF", rating: 4.4, reviews: 210, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Fresh Strawberries", category: "fruit", price: 180, oldPrice: 220, discount: "18% OFF", rating: 4.9, reviews: 340, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80" },
    { id: 10, name: "Green Capsicum", category: "vegetable", price: 45, oldPrice: 60, discount: "25% OFF", rating: 4.3, reviews: 60, image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=500&q=80" },
    { id: 11, name: "Dragon Fruit", category: "exotic", price: 90, oldPrice: 120, discount: "25% OFF", rating: 4.6, reviews: 45, image: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80" },
    { id: 12, name: "Fresh Carrots", category: "vegetable", price: 50, oldPrice: 70, discount: "28% OFF", rating: 4.7, reviews: 130, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80" }
];

// Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const noResultsMsg = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');
const toastContainer = document.getElementById('toast-container');

// LocalStorage setup for Cart
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

// 2. Render Products
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

// 3. Category Filter
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

// 4. Working Search Bar Function
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

// 5. Add to Cart with LocalStorage & Toast Notification
function addToCart(event, productId) {
    if (!cart.includes(productId)) {
        // Save to LocalStorage
        cart.push(productId);
        localStorage.setItem('veve_cart', JSON.stringify(cart));
        updateCartCount();

        // Change Button visually
        const btn = event.currentTarget;
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>In Cart</span>';
        btn.classList.add('added');
        btn.disabled = true;

        // Show professional Toast Notification
        showToast("Item added to your cart!");
    }
}

// Professional Toast Popup Function
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    
    toastContainer.appendChild(toast);

    // Remove toast after animation ends (approx 3.5s)
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// 6. Mobile Menu Logic
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

// Init load
window.onload = () => {
    updateCartCount(); // Set cart badge on load
    renderProducts(products); // Render products
};
