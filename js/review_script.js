// Card number formatting
document.getElementById("cardnumber").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, "").slice(0, 16); // Remove non-digits and limit to 16
    this.value = this.value.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
  });
  
  // CVV input restriction
  document.getElementById('cvv').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 3); // Remove non-digits and limit to 3
  });
  
  // Payment handler
  document.getElementById('payButton').addEventListener('click', payNow);
  
  function payNow() {
    const inputs = document.querySelectorAll("#reviewForm input");
    let isValid = true;
  
    // Validate all fields
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = '#ddd';
      }
    });
  
    if (!isValid) {
      alert("Please fill out all required fields correctly.");
      return;
    }
  
    // Validate card number (must be 16 digits after removing spaces)
    const cardNumber = document.getElementById('cardnumber').value.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
      alert("Please enter a valid 16-digit card number.");
      document.getElementById('cardnumber').style.borderColor = 'red';
      return;
    }
  
    // Validate CVV (must be 3 digits)
    const cvv = document.getElementById('cvv').value;
    if (cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV.");
      document.getElementById('cvv').style.borderColor = 'red';
      return;
    }
  
    // Calculate delivery date (3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  
    // Show success message
    document.getElementById("message").innerHTML = `
      ✅ Thank you for your purchase!<br>
      Your items will be delivered by <strong>${formattedDate}</strong>.
    `;
  
    // Redirect to thank you page after 2.5 seconds
    setTimeout(() => {
      window.location.href = "Thank_You.html";
    }, 2500);
  }