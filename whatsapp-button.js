
// whatsapp-button.js - WhatsApp Sticky Floating Button

// WhatsApp Click Handler
function openWhatsApp() {
    // ⚠️ IMPORTANT: CHANGE THIS TO YOUR REAL PHONE NUMBER!
    const phoneNumber = '918978679781'; // ← CHANGE THIS NUMBER!
    
    const message = 'Hello Pro Car Care Hub! I would like to know more about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Create WhatsApp button
document.addEventListener('DOMContentLoaded', function() {
    // Check if button already exists (prevent duplicates)
    if (document.getElementById('whatsapp-icon')) {
        return;
    }
    
    // Create WhatsApp button
    const whatsappButton = document.createElement('img');
    whatsappButton.id = 'whatsapp-icon';
    whatsappButton.alt = 'WhatsApp';
    whatsappButton.title = 'Chat with us on WhatsApp';
    
    // ⭐ YOUR 800×800 PNG FILE - CHANGE FILENAME IF NEEDED
    // Example: If your file is "whatsapp.png" or "whatsapp-logo.png"
    whatsappButton.src = '36948.png'; // ← YOUR FILE NAME HERE
    
    // ⭐ FIX FOR BIG 800×800 IMAGE
    whatsappButton.style.width = '60px';
    whatsappButton.style.height = '60px';
    whatsappButton.style.objectFit = 'cover';
    
    // ⭐ MAKE IT CIRCULAR
    whatsappButton.style.borderRadius = '50%';
    whatsappButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    whatsappButton.style.background = 'white';
    
    // Click handler
    whatsappButton.onclick = openWhatsApp;
    
    // ⭐ FORCE STICKY POSITION (backup in JavaScript too)
    whatsappButton.style.position = 'fixed';
    whatsappButton.style.bottom = '30px';
    whatsappButton.style.right = '30px';
    whatsappButton.style.zIndex = '9999';
    
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
