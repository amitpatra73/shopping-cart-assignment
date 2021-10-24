import $ from "jquery";

import {
  endpointURL,
  endpointMethods,
  DOMElements
} from "./constants";

import { sortByNumber } from './utils';

$(function () {

  const intializeCarousal = () => {
    $('#main-content #carousal').slick({
      autoplay: true,
      dots: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          arrows: false
        }
      }]
    });
  }

  const setBanners = data => {
    data = sortByNumber(data, "order");
    DOMElements.carousal.innerHTML = "";
    data.forEach(element => {
      if (element.isActive === true) {
        let div = `<div class="carousal-item"><a href="#products"><img src="${element.bannerImageUrl}" alt="${element.bannerImageAlt}" class="img-fluid carousal-img" /></a></div>`;
        DOMElements.carousal.innerHTML += div;
      }
    });

    intializeCarousal();

  }

  const getBanners = url => {
    fetch(url, endpointMethods.getRequestOptions)
      .then(response => response.json())
      .then(result => {
        setBanners(result);
      })
      .catch(error => console.log('Error: ', error));
  }

  getBanners(endpointURL.bannerURL);
});