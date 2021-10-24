import {
  endpointURL,
  endpointMethods,
  DOMElements
} from "./constants";

import { sortByNumber } from './utils';

const getCategories = url => {
  fetch(url, endpointMethods.getRequestOptions)
    .then(response => response.json())
    .then(result => {
      setCategories(result);
    })
    .catch(error => console.log('Error: ', error));
}

const setCategories = data => {
  data = sortByNumber(data, "order");
  data.forEach(element => {
    if (element.enabled === true) {
      let div = `<div class="category">
                  <div class="content">
                    <div class="image">
                      <img src="${element.imageUrl}" alt="${element.description}" class="img-fluid"/>
                    </div>
                    <div class="text">
                      <h2>${element.name}</h2>
                      <p>${element.description}</p>
                      <a class="category-cta" href="#${element.key}" data-category-id="${element.id}">Explore ${element.key}</a>
                    </div>
                  </div>
                </div>`;

      let categoryFilterMob = `<option value="${element.id}">${element.name}</option>`;

      let categoryFilterTab = `<div class="category" data-id="${element.id}">${element.name}</div>`;

      DOMElements.products.querySelector(".category-filter .form-select").innerHTML += categoryFilterMob;
      DOMElements.products.querySelector(".category-filter .categories").innerHTML += categoryFilterTab;
      DOMElements.categories.innerHTML += div;
    }
  });
}

getCategories(endpointURL.categoryURL);