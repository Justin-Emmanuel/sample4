// whatsapp-button.js - WhatsApp Floating Button

// WhatsApp Click Handler
function openWhatsApp() {
    // ⚠️ IMPORTANT: CHANGE THIS TO YOUR REAL PHONE NUMBER!
    // Remove +, spaces, and parentheses
    // Example: If your number is +1 (234) 567-8900
    // Change to: 12345678900
    const phoneNumber = '1234567890'; // ← CHANGE THIS NUMBER!
    
    const message = 'Hello Pro Car Care Hub! I would like to know more about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Create WhatsApp button HTML
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp button
    const whatsappButton = document.createElement('img');
    whatsappButton.id = 'whatsapp-icon';
    whatsappButton.alt = 'WhatsApp';
    whatsappButton.title = 'Chat with us on WhatsApp';
    
    // ⚠️ IMPORTANT: CHANGE THIS TO YOUR WHATSAPP ICON IMAGE!
    // Option 1: Use your own image (recommended)
    whatsappButton.src = 'whatsapp-icon.png'; // ← CHANGE THIS IF YOU HAVE YOUR OWN ICON
    
    // Option 2: Use Font Awesome icon (if you don't have an image)
    // Uncomment the next 3 lines and comment the line above if you want to use Font Awesome
    /*
    whatsappButton.src = 'https://cdn-icons-png.flaticon.com/512/733/733585.png';
    whatsappButton.style.borderRadius = '50%';
    whatsappButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    */
    
    whatsappButton.onclick = openWhatsApp;
    
    // Add to page
    document.body.appendChild(whatsappButton);
    
    // Add keyboard support
    whatsappButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            openWhatsApp();
        }
    });
    
    // Make it focusable for accessibility
    whatsappButton.tabIndex = 0;
});
