/**
 * Noodle Flow Ramen - Interactive Cart & Order Manager
 */
const RamenCart = (function () {
    'use strict';

    const STORAGE_KEY = 'noodle_ramen_cart_v1';
    let cart = [];

    // Load saved cart from localStorage
    function loadCart() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            cart = saved ? JSON.parse(saved) : [];
        } catch (e) {
            cart = [];
        }
        updateCartBadge();
    }

    // Save cart state
    function saveCart() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart state', e);
        }
        updateCartBadge();
    }

    // Update navbar badge count
    function updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        badges.forEach(b => {
            b.textContent = totalCount;
            b.style.display = totalCount > 0 ? 'inline-block' : 'none';
        });
    }

    // Add item to cart
    function addItem(id, name, price, category) {
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: parseFloat(price),
                category: category,
                quantity: 1
            });
        }
        saveCart();
        showToast(`¡${name} agregado a tu pedido! 🍜`);
    }

    // Update quantity
    function updateQuantity(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        renderCartModal();
    }

    // Remove item completely
    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCartModal();
    }

    // Clear cart
    function clearCart() {
        cart = [];
        saveCart();
        renderCartModal();
    }

    // Toast notification
    function showToast(message) {
        let toastContainer = document.getElementById('ramenToastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'ramenToastContainer';
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '9999';
            document.body.appendChild(toastContainer);
        }

        const toastEl = document.createElement('div');
        toastEl.className = 'toast align-items-center text-white border-0 show';
        toastEl.style.backgroundColor = 'var(--ramen-surface-card)';
        toastEl.style.border = '1px solid var(--ramen-gold)';
        toastEl.setAttribute('role', 'alert');
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body font-weight-bold">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        toastContainer.appendChild(toastEl);
        setTimeout(() => {
            toastEl.remove();
        }, 3000);
    }

    // Render HTML inside Cart Modal
    function renderCartModal() {
        const container = document.getElementById('cartModalItems');
        const footerTotal = document.getElementById('cartModalTotal');
        const checkoutBtn = document.getElementById('cartCheckoutBtn');
        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <div class="fs-1 mb-2">🍜</div>
                    <p class="fs-5">Tu pedido está vacío.</p>
                    <small>Explora nuestro Menú de Ramen y agrega tus platillos favoritos.</small>
                </div>
            `;
            if (footerTotal) footerTotal.textContent = '$0 CLP';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        let html = '<div class="list-group list-group-flush bg-transparent">';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            html += `
                <div class="list-group-item bg-transparent text-white border-bottom border-secondary d-flex align-items-center justify-content-between py-3">
                    <div>
                        <h6 class="mb-1 text-warning font-weight-bold">${item.name}</h6>
                        <small class="text-muted">${item.category} | $${item.price.toLocaleString('es-CL')} c/u</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="btn-group btn-group-sm me-3" role="group">
                            <button type="button" class="btn btn-outline-warning" onclick="RamenCart.updateQuantity(${item.id}, -1)">-</button>
                            <span class="btn btn-outline-light disabled px-3 text-white font-weight-bold">${item.quantity}</span>
                            <button type="button" class="btn btn-outline-warning" onclick="RamenCart.updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <span class="font-weight-bold me-3" style="min-width: 80px; text-align: right;">$${itemTotal.toLocaleString('es-CL')}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="RamenCart.removeItem(${item.id})">✕</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        if (footerTotal) footerTotal.textContent = `$${total.toLocaleString('es-CL')} CLP`;
        if (checkoutBtn) checkoutBtn.disabled = false;
    }

    // Process order simulation
    function submitOrder() {
        if (cart.length === 0) return;

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`¡Gracias por tu pedido en Noodle Flow Ramen! 🎉\n\nTotal a Pagar: $${total.toLocaleString('es-CL')} CLP\nTu orden ha sido enviada a nuestra cocina artesanal.`);
        clearCart();

        // Close modal if bootstrap is defined
        const modalEl = document.getElementById('cartModal');
        if (modalEl && window.bootstrap) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        loadCart();

        const modalEl = document.getElementById('cartModal');
        if (modalEl) {
            modalEl.addEventListener('show.bs.modal', renderCartModal);
        }

        const checkoutBtn = document.getElementById('cartCheckoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', submitOrder);
        }
    });

    return {
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        renderCartModal,
        getCart: () => cart
    };
})();
