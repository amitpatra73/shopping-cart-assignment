import { DOMElements } from './constants';
import { filterProducts } from './products';
import { addActive } from './utils';
import { addItem, addToCart, removeItem, showCart, hideCart } from './cart';

DOMElements.productMenu.addEventListener('click', e => {
    if (e.target && !e.target.classList.contains('active')) {
        addActive(e.target, "menu");
        filterProducts();
        hideCart();
    }
});

DOMElements.categories.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('category-cta')) {
        let category = e.target.getAttribute('data-category-id');
        let filter = document.querySelector('.category-filter .categories .category[data-id="' + category + '"]');
        addActive(DOMElements.productMenu, "menu");
        addActive(filter, "category");
        filterProducts(category);
        window.scrollTo(0, 0);
    }
});

DOMElements.carousal.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('carousal-img')) {
        addActive(DOMElements.productMenu, "menu");
        filterProducts();
    }
});

DOMElements.products.querySelector('.category-filter #category-select').addEventListener('change', e => {
    if (e.target) {
        filterProducts(e.target.value);
    }
});

DOMElements.products.querySelector('.category-filter .categories').addEventListener('click', e => {
    if (e.target && e.target.classList.contains('category') && !e.target.classList.contains('active')) {
        let category = e.target.getAttribute('data-id');
        addActive(e.target, "category");
        filterProducts(category);
    }
});

DOMElements.navLinks.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('menu') && e.target.classList.contains('active')) {
        e.preventDefault();
    }
});

DOMElements.cart.addEventListener('click', () => {
    showCart();
    DOMElements.navLinks.querySelectorAll('.menu').forEach(el => {
        el.classList.remove('active');
    });
});

DOMElements.cartSection.querySelectorAll('.cart-head .close, .cart-foot .btn-shop').forEach(item => {
    item.addEventListener('click', () => {
        hideCart();
    });
});

/* CART EVENTS */

DOMElements.products.querySelector('.product-list').addEventListener('click', e => {
    if (e.target && e.target.classList.contains('add-to-cart') || e.target.parentNode.classList.contains('add-to-cart')) {
        let product = e.target.closest(".add-to-cart");
        let image = product.parentNode.querySelector('.product-image img').src;
        let title = product.parentNode.parentNode.querySelector('.product-name').textContent;
        let price = product.querySelector('.price').textContent;
        let productId = product.getAttribute('product-id');
        addToCart(productId, image, title, price);
    }
});

DOMElements.cartSection.querySelector('.cart-added .cart-added-items').addEventListener('click', e => {
    if (e.target) {
        let classname = e.target.classList;
        let product = e.target.parentNode;
        if (product.classList.contains('quantity')) {
            let productId = product.getAttribute('data-id');
            if (classname.contains('remove-item')) {
                removeItem(productId);
            } else if (classname.contains('add-item')) {
                addItem(productId);
            }
        }
    }
});