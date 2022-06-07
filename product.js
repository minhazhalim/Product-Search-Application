const apiURL = 'https://course-api.com/javascript-store-single-product';
const product = document.querySelector('.product');
const fetchProduct = async () => {
     try {
          product.innerHTML = '<h4 class="product-loading">loading.....</h4>';
          const searchParams = new URLSearchParams(window.location.search);
          const id = searchParams.get('id');
          const response = await fetch(`${apiURL}?id=${id}`);
          const data = await response.json();
          return data;
     }catch(error){
          product.innerHTML = '<p class="error">there was a problem loading the product. please try again later </p>';
     }
};
const displayProducts = (productItem) => {
     const {name: title,company,colors,description,price,image} = productItem.fields;
     const {url: img} = image[0];
     document.title = title.toUpperCase();
     const colorList = colors.map((color) => {
          return `<span class="product-color" style="background-color: ${color}"></span>`;
     }).join('');
     product.innerHTML = `
          <div class="product-wrapper">
               <img src="${img}" class="image" alt="${title}"/>
               <div class="product-info">
                    <h3>${title}</h3>
                    <h5>${company}</h5>
                    <span>${price / 100}</span>
                    <div class="colors">${colorList}</div>
                    <p>${description}</p>
                    <button class="button">add to cart</button>
               </div>
          </div>
     `;
};
const start = async () => {
     const data = await fetchProduct();
     displayProducts(data);
};
start();