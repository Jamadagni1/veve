// 1. Data Base
const products = [
    { id: 1, name: "Fresh Red Apples", category: "fruit", qty: "1 kg", price: 140, oldPrice: 180, discount: "22% OFF", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Farm Tomatoes", category: "vegetable", qty: "1 kg", price: 40, oldPrice: 60, discount: "33% OFF", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Avocado Hass", category: "exotic", qty: "2 Pcs", price: 250, oldPrice: 300, discount: "16% OFF", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Organic Bananas", category: "fruit", qty: "1 Dozen", price: 60, oldPrice: 80, discount: "25% OFF", image: "https://images.unsplash.com/photo-1571501478200-85ba81dd602e?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Fresh Broccoli", category: "vegetable", qty: "500 g", price: 75, oldPrice: 100, discount: "25% OFF", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Kiwi Zespri", category: "exotic", qty: "3 Pcs", price: 120, oldPrice: 150, discount: "20% OFF", image: "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Nagpur Oranges", category: "fruit", qty: "1 kg", price: 120, oldPrice: 150, discount: "20% OFF", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Red Onions", category: "vegetable", qty: "1 kg", price: 35, oldPrice: 50, discount: "30% OFF", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "Fresh Strawberries", category: "fruit", qty: "250 g", price: 180, oldPrice: 220, discount: "18% OFF", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80" },
    { id: 10, name: "Green Capsicum", category: "vegetable", qty: "500 g", price: 45, oldPrice: 60, discount: "25% OFF", image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=500&q=80" },
    { id: 11, name: "Dragon Fruit", category: "exotic", qty: "1 Pc", price: 90, oldPrice: 120, discount: "25% OFF", image: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80" },
    { id: 12, name: "Fresh Carrots", category: "vegetable", qty: "1 kg", price: 50, oldPrice: 70, discount: "28% OFF", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80" }
];

// Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const noResultsMsg = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');

let cartItemsCount = 0;

// 2. Render Products
function renderProducts(items) {
    productGrid.innerHTML = ""; 
    
    if (items.length === 0) {
        noResultsMsg.style.display = "block";
    } else {
        noResultsMsg.style.display = "none";
        items.forEach(product => {
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
                    <span class="product-qty">${product.qty}</span>
                    <div class="product-price-row">
                        <div class="price-box">
                            <span class="current-price">₹${product.price}</span>
                            <span class="old-price">₹${product.oldPrice}</span>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(event)">
                        <i class="fa-solid fa-cart-plus"></i> <span>Add to Cart</span>
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }
}

// 3. Category Filter
function filterByCategory(category) {
    // Scroll to shop section
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });

    // Update Buttons UI
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });

    // Filter Data
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// Add event listeners to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterByCategory(e.target.getAttribute('data-filter'));
    });
});

// 4. Working Search Bar Function
function performSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Clear category active states since we are searching everything
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');

    // Filter by name OR category
    const searchedItems = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Auto scroll to products if typing
    if(searchTerm.length > 0 && window.scrollY < 300) {
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    }

    renderProducts(searchedItems);
}

searchInput.addEventListener('input', performSearch);
mobileSearchInput.addEventListener('input', performSearch);

// 5. Add to Cart
function addToCart(event) {
    cartItemsCount++;
    cartCountElement.innerText = cartItemsCount;
    
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Added!</span>';
    btn.style.backgroundColor = "#f59e0b"; 
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.backgroundColor = ""; 
    }, 1500);
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

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-xmark');
    });
});

// Load all products initially
window.onload = () => {
    renderProducts(products);
};
