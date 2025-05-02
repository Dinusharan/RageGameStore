const prices = {
  "Intel i3": 12000,
  "Intel i7 Ultra": 55000,
  "Intel i9": 85000,
  "AMD Ryzen 5 5600X": 21000,
  "AMD Ryzen 5 8500G": 48000,
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
  "Corsair 32GB DDR5": 50000,
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
  const form = document.getElementById("orderForm");
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = "";
  let total = 0;

  Object.keys(prices).forEach((key) => {
    const element = form.elements[key];
    if (element) {
      const quantity = parseInt(element.value);
      if (quantity > 0) {
        const price = prices[key] * quantity;
        total += price;
        const row = `<tr><td>${key}</td><td>${quantity}</td><td>LKR ${price}</td></tr>`;
        tableBody.innerHTML += row;
      }
    }
  });

  document.getElementById("totalPrice").textContent = `LKR ${total}`;
}

function saveFavourite() {
  const form = document.getElementById("orderForm");
  const favourite = {};
  Object.keys(prices).forEach((key) => {
    const element = form.elements[key];
    if (element) {
      favourite[key] = element.value;
    }
  });
  localStorage.setItem("favouriteOrder", JSON.stringify(favourite));
  alert("Order saved as favourite!");
}

function applyFavourite() {
  const favourite = JSON.parse(localStorage.getItem("favouriteOrder"));
  if (!favourite) {
    alert("No favourite order found.");
    return;
  }
  const form = document.getElementById("orderForm");
  Object.keys(favourite).forEach((key) => {
    const element = form.elements[key];
    if (element) {
      element.value = favourite[key];
    }
  });
  addToTable();
  alert("Favourite order applied!");
}

function goToReviewPage() {
  window.location.href = "order_review_page.html";
}

function proceedToReview() {
  window.location.href = "order_review_page.html";
}
