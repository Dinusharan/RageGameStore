// Product prices (in LKR)
const productPrices = {
    "Intel i3": 12000,
    "Intel i7 Ultra": 55000,
    "Intel i9": 98000,
    "Ryzen 5 5600X": 21000,
    "Ryzen 5 8500G": 48000,
    "AMD Ryzen 9": 98000,
    "Asus Geforce GTX 1650 4GB": 35500,
    "Asus RTX 3050 8GB": 45000,
    "Asus Dual RTX 4060 8GB": 58000,
    "MSI GT 710 2GB": 18000,
    "MSI GT 1030 4GB": 26000,
    "AMD RX 6800 4GB": 30000,
    "ASUS Prime B550": 30000,
    "ASUS Z790 MAG": 40000,
    "NZXT A520": 22000,
    "NZXT Z790": 30000,
    "NZXT X570": 32000,
    "NZXT X610": 40000,
    "Corsair 32GB": 50000,
    "Corsair 16GB DDR4": 38000,
    "Crucial 32GB DDR4": 40000,
    "Crucial 64GB DDR4": 50000,
    "ADATA 16GB DDR5 5600Hz": 20000,
    "MSI Spatium 1TB SSD": 70000,
    "Seagate 1TB HDD": 30000,
    "Seagate 2TB HDD": 45000,
    "Seagate 4TB HDD": 90000,
    "Kingston 500GB NVME": 12000
};

function addToTable() {
    const form = document.getElementById('orderForm');
    const tableBody = document.querySelector('#cartTable tbody');
    let total = 0;
    
    // Clear existing table rows
    tableBody.innerHTML = '';
    
    // Loop through all input elements
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const productName = input.name;
            const price = productPrices[productName] || 0;
            const subtotal = quantity * price;
            
            // Add row to table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>${subtotal.toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
            
            total += subtotal;
        }
    });
    
    // Update total
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}

function saveFavourite() {
    const form = document.getElementById('orderForm');
    const favourites = {};
    
    // Get all quantities
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        favourites[input.name] = input.value;
    });
    
    // Save to localStorage
    localStorage.setItem('favouriteOrder', JSON.stringify(favourites));
    alert('Order saved as favourite!');
}

function applyFavourite() {
    const form = document.getElementById('orderForm');
    const favourites = JSON.parse(localStorage.getItem('favouriteOrder'));
    
    if (favourites) {
        // Apply all quantities
        const inputs = form.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            if (favourites[input.name]) {
                input.value = favourites[input.name];
            }
        });
        alert('Favourite order applied!');
    } else {
        alert('No favourite order found!');
    }
}

function proceedToReview() {
    // Check if cart is not empty
    const total = parseInt(document.getElementById('totalPrice').textContent.replace(/,/g, ''));
    if (total > 0) {
        // Save cart to localStorage before redirecting
        const cartItems = [];
        const rows = document.querySelectorAll('#cartTable tbody tr');
        rows.forEach(row => {
            const cells = row.cells;
            cartItems.push({
                name: cells[0].textContent,
                quantity: cells[1].textContent,
                price: cells[2].textContent
            });
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', total);
        
        // Redirect to review page
        window.location.href = 'Order_Review_Page.html';
    } else {
        alert('Your cart is empty. Please add some items before proceeding.');
    }
}