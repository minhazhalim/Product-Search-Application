const apiURL = 'https://course-api.com/javascript-store-products';
const productsCenter = document.querySelector('.products-center');
const fetchProducts = async () => {
     productsCenter.innerHTML = '<div class="loading"></div>';
     try {
          const response = await fetch(apiURL);
          const data = await response.json();
          return data;
     }catch(error){
          productsCenter.innerHTML = '<p class="error">there was an error</p>';
     }
};
const displayProducts = (list) => {
     const productList = list.map((product) => {
          const {id} = product;
          const {name: title,price} = product.fields;
          const {url: image} = product.fields.image[0];
          const formatPrice = price / 100;
          return `
               <a class="single-product" href="product.html?id=${id}&name=john&age=25">
                    <img src="${image}" class="image single-product-image" alt="${title}"/>
                    <footer>
                         <h5 class="name">${title}</h5>
                         <span class="price">$${formatPrice}</span>
                    </footer>
               </a>
          `;
     }).join('');
     productsCenter.innerHTML = `<div class="products-container">${productList}</div>`
};
const start = async () => {
     const data = await fetchProducts();
     displayProducts(data);
};
start();