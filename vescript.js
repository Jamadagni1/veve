// 1. Products Data (Database simulation)
const products = [
    {
        id: 1,
        name: "Fresh Red Apples",
        category: "fruit",
        qty: "1 kg",
        price: 140,
        oldPrice: 180,
        discount: "22% OFF",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Farm Fresh Tomatoes",
        category: "vegetable",
        qty: "1 kg",
        price: 40,
        oldPrice: 60,
        discount: "33% OFF",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Organic Bananas",
        category: "fruit",
        qty: "1 Dozen",
        price: 60,
        oldPrice: 80,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1571501478200-85ba81dd602e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Fresh Green Cabbage",
        category: "vegetable",
        qty: "500 g",
        price: 35,
        oldPrice: 45,
        discount: "22% OFF",
        image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "Nagpur Oranges",
        category: "fruit",
        qty: "1 kg",
        price: 120,
        oldPrice: 150,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "Fresh Carrots",
        category: "vegetable",
        qty: "1 kg",
        price: 50,
        oldPrice: 70,
        discount: "28% OFF",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80"
    }
];

// 2. DOM Elements Selection
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');

let cartItemsCount = 0;

// 3. Render Products Function
function displayProducts(filterCategory) {
    productGrid.innerHTML = ""; // Clear existing grid

    // Filter logic
    const filteredProducts = filterCategory === "all" 
        ? products 
        : products.filter(product => product.category === filterCategory);

    // Generate HTML for each product
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="discount-badge">${product.discount}</div>
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-qty">${product.qty}</span>
                <div class="product-price-row">
                    <span class="current-price">₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// 4. Cart Logic
function addToCart() {
    cartItemsCount++;
    cartCountElement.innerText = cartItemsCount;
    
    // Simple popup feedback
    const btn = event.target;
    btn.innerText = "Added!";
    btn.style.backgroundColor = "#e67e22";
    
    setTimeout(() => {
        btn.innerText = "Add to Cart";
        btn.style.backgroundColor = "#2ecc71";
    }, 1000);
}

// 5. Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');

        // Get filter category from data attribute
        const category = btn.getAttribute('data-filter');
        displayProducts(category);
    });
});

// Initialize page with 'all' products
window.onload = () => {
    displayProducts('all');
};
