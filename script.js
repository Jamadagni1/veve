// 1. Extended Products Data with Unsplash HD Images
const products = [
    {
        id: 1,
        name: "Fresh Red Apples",
        category: "fruit",
        qty: "1 kg",
        price: 140,
        oldPrice: 180,
        discount: "22% OFF",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Farm Tomatoes",
        category: "vegetable",
        qty: "1 kg",
        price: 40,
        oldPrice: 60,
        discount: "33% OFF",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Avocado Hass",
        category: "exotic",
        qty: "2 Pcs",
        price: 250,
        oldPrice: 300,
        discount: "16% OFF",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Organic Bananas",
        category: "fruit",
        qty: "1 Dozen",
        price: 60,
        oldPrice: 80,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1571501478200-85ba81dd602e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Fresh Broccoli",
        category: "vegetable",
        qty: "500 g",
        price: 75,
        oldPrice: 100,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Kiwi Zespri",
        category: "exotic",
        qty: "3 Pcs",
        price: 120,
        oldPrice: 150,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Nagpur Oranges",
        category: "fruit",
        qty: "1 kg",
        price: 120,
        oldPrice: 150,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Red Onions",
        category: "vegetable",
        qty: "1 kg",
        price: 35,
        oldPrice: 50,
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Fresh Strawberries",
        category: "fruit",
        qty: "250 g",
        price: 180,
        oldPrice: 220,
        discount: "18% OFF",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Green Capsicum",
        category: "vegetable",
        qty: "500 g",
        price: 45,
        oldPrice: 60,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Dragon Fruit",
        category: "exotic",
        qty: "1 Pc",
        price: 90,
        oldPrice: 120,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Fresh Carrots",
        category: "vegetable",
        qty: "1 kg",
        price: 50,
        oldPrice: 70,
        discount: "28% OFF",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80"
    }
];

// 2. DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

let cartItemsCount = 0;

// 3. Render Products Logic
function displayProducts(filterCategory) {
    productGrid.innerHTML = ""; // Clear existing grid

    // Filter products
    const filteredProducts = filterCategory === "all" 
        ? products 
        : products.filter(product => product.category === filterCategory);

    // Create Cards
    filteredProducts.forEach(product => {
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

// 4. Add to Cart Animation Logic
function addToCart(event) {
    cartItemsCount++;
    cartCountElement.innerText = cartItemsCount;
    
    // Get the button that was clicked
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    
    // Change style to show success
    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Added!</span>';
    btn.style.backgroundColor = "#f59e0b"; // Turn orange/yellow
    
    // Revert back after 1.5 seconds
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.backgroundColor = ""; // Reset to CSS default
    }, 1500);
}

// 5. Category Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Handle Active Class
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        // Apply Filter
        const category = btn.getAttribute('data-filter');
        displayProducts(category);
    });
});

// 6. Mobile Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Icon animation (Bars to X)
    const icon = hamburger.querySelector('i');
    if(mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Initialize first load
window.onload = () => {
    displayProducts('all');
};
