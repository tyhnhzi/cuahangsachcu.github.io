document.addEventListener('DOMContentLoaded', function() {
    // Lấy các form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    // Chuyển đổi giữa form đăng nhập và đăng ký
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
    });

    // Hàm tạo thông báo
    function showNotification(message, type = 'success') {
        // Xóa thông báo cũ nếu có
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Tạo thông báo mới
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.5s ease-in-out;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
        `;

        // Thiết lập màu sắc dựa trên loại thông báo
        const colors = {
            success: { bg: '#4CAF50', icon: '✓' },
            error: { bg: '#f44336', icon: '✕' },
            warning: { bg: '#ff9800', icon: '⚠' },
            info: { bg: '#2196F3', icon: 'ℹ' }
        };

        const color = colors[type] || colors.success;
        notification.style.backgroundColor = color.bg;
        notification.style.color = 'white';

        // Thêm icon
        const icon = document.createElement('span');
        icon.textContent = color.icon;
        icon.style.fontSize = '1.2em';
        
        // Thêm nội dung
        const text = document.createElement('span');
        text.textContent = message;

        notification.appendChild(icon);
        notification.appendChild(text);
        document.body.appendChild(notification);

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Xử lý đăng ký
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showNotification('Mật khẩu không trùng khớp!', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(user => user.email === email)) {
            showNotification('Email đã tồn tại!', 'warning');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Đăng ký thành công!', 'success');
        registerForm.reset();
        setTimeout(() => {
            document.getElementById('register').style.display = 'none';
            document.getElementById('login').style.display = 'block';
        }, 1500);
    });

    // Xử lý đăng nhập
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            showNotification('Đăng nhập thành công!', 'success');
            if (document.getElementById('remember').checked) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
            }
            loginForm.reset();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500); // Đợi 1.5 giây trước khi chuyển trang
        } else {
            showNotification('Email hoặc mật khẩu không đúng!', 'error');
        }
    });
}); 