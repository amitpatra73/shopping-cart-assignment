import {
  endpointURL,
  endpointMethods,
  DOMElements,
  isDesktop,
  defaultCategory
} from "./constants";

const getProducts = url => {
  return fetch(url, endpointMethods.getRequestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    }).catch(error => console.log('Error: ', error));
}

export const filterProducts = (category = "") => {
  let updatedData;
  getProducts(endpointURL.productURL)
    .then(data => {
      if (category) {
        updatedData = data.filter(el => {
          return el.category === category && el.stock > 0;
        });
        setProducts(updatedData);
        if (!isDesktop) {
          DOMElements.products.querySelector('.category-filter #category-select').value = category;
        }
      } else {
        updatedData = data.filter(el => {
          return el.stock > 0;
        });
        setProducts(data);
        DOMElements.products.querySelector('.category-filter #category-select').value = defaultCategory;
      }
    });
}

const setProducts = data => {
  DOMElements.products.querySelector(".product-list").innerHTML = "";
  data.forEach(element => {
    let div = `<div class="product-container">
                <div class="product">
                  <h6 class="product-name">${element.name}</h6>
                  <div class="product-content">
                    <div class="product-image col-6 col-lg-12">
                      <img src="${element.imageURL}" alt="${element.name}" class="img-fluid"/>
                    </div>
                    <div class="product-desc col-6 col-lg-12">
                      <p class="desc">${element.description}</p>
                    </div>
                    <button class="btn add-to-cart" product-id="${element.id}"><span>Buy Now</span><span> @ Rs.</span><span class="price">${element.price}</span></button>
                  </div>
                </div>
              </div>`;

    DOMElements.products.querySelector(".product-list").innerHTML += div;
  });
  showProducts();
}

const showProducts = () => {
  DOMElements.carousal.classList.add('d-none');
  DOMElements.categories.classList.add('d-none');
  DOMElements.products.classList.remove('d-none');
}