// whatsapp-button.js - Draggable WhatsApp Button

// WhatsApp Click Handler
function openWhatsApp() {
    const phoneNumber = '1234567890'; // ⚠️ CHANGE TO YOUR NUMBER!
    const message = 'Hello Pro Car Care Hub! I would like to know more about your services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ⭐ DRAGGING FUNCTIONALITY
function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    // ⭐ TOUCH EVENTS FOR MOBILE
    element.addEventListener("touchstart", dragStart);
    element.addEventListener("touchend", dragEnd);
    element.addEventListener("touchmove", drag);
    
    // ⭐ MOUSE EVENTS FOR DESKTOP
    element.addEventListener("mousedown", dragStart);
    element.addEventListener("mouseup", dragEnd);
    element.addEventListener("mousemove", drag);
    
    function dragStart(e) {
        // ⭐ PREVENT DEFAULT TO AVOID UNWANTED BEHAVIOR
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        // ⭐ CHECK IF USER IS DRAGGING OR CLICKING
        if (e.target === element) {
            isDragging = true;
            element.classList.add("dragging");
            
            // ⭐ IF USER HOLDS FOR 0.3s, IT'S A DRAG
            setTimeout(() => {
                if (isDragging) {
                    element.classList.add("moving");
                }
            }, 300);
        }
    }
    
    function dragEnd(e) {
        if (!isDragging) {
            // ⭐ SHORT TAP = OPEN WHATSAPP
            if (e.type === "touchend" || e.type === "mouseup") {
                openWhatsApp();
            }
            return;
        }
        
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        
        element.classList.remove("dragging");
        element.classList.remove("moving");
        
        // ⭐ SAVE POSITION TO LOCALSTORAGE
        savePosition(xOffset, yOffset);
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, element);
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    // ⭐ LOAD SAVED POSITION
    function loadPosition() {
        const savedX = localStorage.getItem('whatsappPosX');
        const savedY = localStorage.getItem('whatsappPosY');
        
        if (savedX && savedY) {
            xOffset = parseInt(savedX);
            yOffset = parseInt(savedY);
            setTranslate(xOffset, yOffset, element);
        }
    }
    
    // ⭐ SAVE POSITION
    function savePosition(x, y) {
        localStorage.setItem('whatsappPosX', x.toString());
        localStorage.setItem('whatsappPosY', y.toString());
    }
    
    // ⭐ DOUBLE-CLICK TO RESET POSITION
    element.addEventListener("dblclick", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, element);
        element.style.bottom = "30px";
        element.style.right = "30px";
        savePosition(0, 0);
        
        // ⭐ SHOW RESET MESSAGE
        showMessage("Position reset!");
    });
    
    // ⭐ LOAD SAVED POSITION ON START
    loadPosition();
}

// ⭐ SHOW TEMPORARY MESSAGE
function showMessage(text) {
    // Remove existing message
    const existingMsg = document.getElementById('whatsapp-message');
    if (existingMsg) existingMsg.remove();
    
    // Create new message
    const message = document.createElement('div');
    message.id = 'whatsapp-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #25D366;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeOut 2s ease-in-out;
    `;
    
    // Add fade-out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove after animation
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 2000);
}

// ⭐ CREATE WHATSAPP BUTTON
document.addEventListener('DOMContentLoaded', function() {
    // Check if button already exists
    if (document.getElementById('whatsapp-icon')) {
        return;
    }
    
    // Create WhatsApp button
    const whatsappButton = document.createElement('img');
    whatsappButton.id = 'whatsapp-icon';
    whatsappButton.alt = 'WhatsApp';
    whatsappButton.title = 'Click to chat • Hold & drag to move • Double-click to reset';
    
    // ⭐ YOUR 800×800 PNG FILE
    whatsappButton.src = '36948.png'; // ← CHANGE TO YOUR FILE NAME
    
    // ⭐ FIX FOR BIG 800×800 IMAGE
    whatsappButton.style.width = '60px';
    whatsappButton.style.height = '60px';
    whatsappButton.style.objectFit = 'cover';
    
    // Add to page
    document.body.appendChild(whatsappButton);
    
    // ⭐ MAKE IT DRAGGABLE
    makeDraggable(whatsappButton);
    
    // ⭐ KEYBOARD SUPPORT
    whatsappButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            openWhatsApp();
        }
    });
    
    // Make it focusable
    whatsappButton.tabIndex = 0;
    
    // ⭐ INITIAL MESSAGE
    setTimeout(() => {
        showMessage("Hold & drag to move me anywhere!");
    }, 2000);
});
