// login.js - COMPLETE WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // Show loading
        const submitBtn = document.querySelector('#loginForm .btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password 
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // ✅ SUCCESS
                alert('✅ Login successful!\n\nWelcome ' + data.user.firstName + '!');
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Clear form
                document.getElementById('loginForm').reset();
                
                // Redirect to home page after 1 second
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
                
            } else {
                // ❌ ERROR
                alert('❌ Login failed: ' + data.message);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            
        } catch (error) {
            alert('❌ Network error. Please check server connection.');
            console.error('Error:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Enter key support
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    });
    
    console.log('Login form loaded successfully! ✅');
});