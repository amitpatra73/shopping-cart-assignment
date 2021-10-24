import {
    DOMElements,
    isDesktop
} from './constants';
import {
    filterProducts
} from './products';
import {
    checkStorage
} from './utils';

export let myCart = [];

if (checkStorage) {
    let storedCart = sessionStorage.getItem('sabkabazaar-cart');
    if (storedCart) {
        myCart = JSON.parse(storedCart);
    }
}

const cart = DOMElements.cartSection.querySelector('.cart-added-items');

const buildCart = (data) => {
    if (checkStorage) {
        sessionStorage.setItem('sabkabazaar-cart', JSON.stringify(data));
    }

    loadCart();
    updateQuantityPrice();
}

export const removeItem = (id) => {
    myCart.forEach(element => {
        if (element.productId === id) {
            if (element.quantity > 1) {
                element.quantity--;
            } else {
                myCart = myCart.filter((item) => {
                    return item.productId !== id;
                });
            }
        }
    });

    buildCart(myCart);
    showCart();
}

export const addItem = (id) => {
    myCart.forEach(element => {
        if (element.productId === id) {
            element.quantity++;
        }
    });

    buildCart(myCart);
}

export const addToCart = (productId, image, title, price) => {
    let alreadyAdded = false;
    myCart.forEach(element => {
        if (element.productId === productId) {
            element.quantity++;
            alreadyAdded = true;
        }
    });

    if (!alreadyAdded) {
        myCart.push({
            "image": image,
            "title": title,
            "price": price,
            "quantity": 1,
            "productId": productId
        });
    }

    buildCart(myCart);
}

const loadCart = () => {
    if (checkStorage) {
        myCart = JSON.parse(sessionStorage.getItem('sabkabazaar-cart')) || [];
    }
    cart.innerHTML = "";
    if (myCart) {
        myCart.forEach(item => {
            let cartItems = `<div class="cart-item">
                                <div class="product-img">
                                    <img src="${item.image}" alt="${item.title}" class="img-fluid" />
                                </div>
                                <div class="product-details">
                                    <div class="product-name">
                                        <h4>${item.title}</h4>
                                    </div>
                                    <div class="quantity" data-id="${item.productId}">
                                        <button class="remove-item">-</button>
                                        <p>${item.quantity}</p>
                                        <button class="add-item">+</button>
                                        <p class="price">x Rs.${item.price}</p>
                                    </div>
                                </div>
                                <div class="product-price">
                                    <p>Rs.${item.price * item.quantity}</p>
                                </div>
                            </div>`;

            cart.innerHTML += cartItems;
        });
    }
}

export const showCart = () => {
    if (myCart.length) {
        DOMElements.cartSection.querySelector('.cart-added').classList.remove('d-none');
        DOMElements.cartSection.querySelector('.cart-empty').classList.add('d-none');
    } else {
        DOMElements.cartSection.querySelector('.cart-added').classList.add('d-none');
        DOMElements.cartSection.querySelector('.cart-empty').classList.remove('d-none');
    }
    DOMElements.cartSection.classList.remove('d-none');
    if (!isDesktop) {
        DOMElements.categories.classList.add('d-none');
        DOMElements.products.classList.add('d-none');
    } else {
        DOMElements.overlay.classList.remove('d-none');
    }
}

export const hideCart = () => {
    DOMElements.cartSection.classList.add('d-none');
    if (!isDesktop) {
        filterProducts();
        DOMElements.categories.classList.add('d-none');
        DOMElements.carousal.classList.add('d-none');
        DOMElements.products.classList.remove('d-none');
    } else {
        DOMElements.overlay.classList.add('d-none');
    }
}

const calculateTotal = () => {
    let totalQuantity = 0,
        totalPrice = 0;

    myCart.forEach(el => {
        totalQuantity = totalQuantity + parseInt(el.quantity);
        totalPrice = totalPrice + (parseInt(el.price) * parseInt(el.quantity));
    });

    return {
        totalQuantity,
        totalPrice
    };
}

const updateQuantityPrice = () => {
    let data = calculateTotal();
    DOMElements.headerCart.textContent = data.totalQuantity;
    DOMElements.shopCart.textContent = data.totalQuantity;
    DOMElements.checkoutPrice.textContent = data.totalPrice;
}

loadCart();
updateQuantityPrice();