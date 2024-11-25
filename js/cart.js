// Khởi tạo giỏ hàng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm thêm vào giỏ hàng
function addToCart(button) {
  const productDiv = button.closest(".product-item");
  const product = {
    id: productDiv.dataset.id,
    name: productDiv.dataset.name,
    price: parseInt(productDiv.dataset.price),
    quantity: 1,
  };

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart();

  // Tạo thông báo đẹp hơn
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.5s ease-in-out;
    `;
  notification.textContent = "Đã thêm sản phẩm vào giỏ hàng!";
  document.body.appendChild(notification);

  // Xóa thông báo sau 2 giây
  setTimeout(() => {
    notification.style.animation = "slideOut 0.5s ease-out";
    setTimeout(() => notification.remove(), 500);
  }, 2000);
}

// Lưu giỏ hàng
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Đã lưu giỏ hàng:", cart);
}

// Lấy tổng giá trị giỏ hàng
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}

// Kiểm tra khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  console.log("Giỏ hàng hiện tại:", cart); // Debug log
});

// Thêm CSS animation
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
