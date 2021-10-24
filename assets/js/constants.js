const endpoint = "http://localhost:5000/";

export const isDesktop = window.matchMedia('(min-width: 992px)').matches;

export const endpointURL = {
    'bannerURL': endpoint + "banners",
    'categoryURL': endpoint + "categories",
    'productURL': endpoint + "products"
};

export const endpointMethods = {
    'getRequestOptions': {
        method: 'GET'
    },
    'postRequestOptions': {
        method: 'POST'
    }
}

export const defaultCategory = "5b6899953d1a866534f516e2";

export const DOMElements = {
    "navLinks": document.querySelector('.navbar .nav-links'),
    "productMenu": document.querySelector('.nav-links .products-menu'),
    'carousal': document.querySelector('#main-content #carousal'),
    'categories': document.querySelector('#main-content #category-list'),
    'products': document.querySelector('#main-content #products'),
    'cart': document.querySelector('header .navbar .cart'),
    'cartSection': document.querySelector('#main-content #cart-section'),
    "headerCart": document.querySelector('header .navbar .cart .total-cart-items'),
    "shopCart": document.querySelector('#main-content #cart-section .cart-added .total-cart-items'),
    "checkoutPrice": document.querySelector('#main-content #cart-section .checkout .final-price .price'),
    "overlay": document.querySelector('#main-content .overlay')
}