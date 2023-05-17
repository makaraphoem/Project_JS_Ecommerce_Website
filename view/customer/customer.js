const dom_list_product = document.querySelector('.list-product');
const dom_span = document.querySelector('.count-cart');
// const dom_form_dialog_detail_product = document.createElement('#form-dialog-detail-product')
let listProducts = [];

// _____________________________show and hide element____________________
function show(element) {
    element.style.display = "block";
};

function hide(element) {
    element.style.display = "none";
};

// ____________________________________________save and load product in local storage
function saveProductsInCart(products) {
    localStorage.setItem("carts", JSON.stringify(products));
};

function loadProducts() {
    let listProductStorage = JSON.parse(localStorage.getItem("listProducts"));
    if (listProductStorage !== null) {
        listProducts = listProductStorage;
    }
};

// _______________________________creat product_______________________
function creatProduct() {
    loadProducts();
    let index = 0;
    for (let listProduct of listProducts) {
        let div_img_product = document.createElement('div');
        div_img_product.setAttribute('class', 'img-product');

        let img_product_photo = document.createElement('img');
        img_product_photo .setAttribute('id', "product-photo");
        img_product_photo .src = listProduct.img;
        div_img_product.appendChild(img_product_photo );

        let p_name = document.createElement('p');
        p_name.id = 'name';
        p_name.textContent = listProduct.name;

        let p_price = document.createElement('p');
        p_price.id = 'price';
        p_price.textContent = "$" + listProduct.price;

 
        let btnBuy = document.createElement('button');
        btnBuy.setAttribute('class', 'btn-buy');
        btnBuy.textContent = 'Add Cart';
        btnBuy.addEventListener('click', addCart)

        let div_card_product = document.createElement('div');
        div_card_product.setAttribute('class', 'card-product');

        div_card_product.setAttribute('index', index);

        div_card_product.appendChild(div_img_product);
        div_card_product.appendChild(p_name);
        div_card_product.appendChild(p_price);
        
        div_card_product.appendChild(btnBuy);
        dom_list_product.appendChild(div_card_product);
        index++;

    };
};

// ______________________________search product_____________________________
function searchProduct(event) {
    input_search = document.querySelector('#search').value.toUpperCase();
    let cardProducts = document.querySelectorAll(".card-product");

    for (let card of cardProducts) {
        let nameProduct = card.firstElementChild.nextElementSibling.textContent;
        let descriptionProduct = card.firstElementChild.nextElementSibling.nextElementSibling.textContent;

        let isVIsible = nameProduct.toUpperCase().indexOf(input_search) > -1 || descriptionProduct.toLocaleUpperCase().indexOf(input_search) > -1
        if (isVIsible) {
            show(card)
        } else {
            hide(card)
        }
    };
};

// add card to buy page
function addCart(event) { 
    let indexProduct = event.target.parentElement.getAttribute('index');
    indexProduct = parseInt(indexProduct)
    let listProduct = listProducts[indexProduct]
    let cartProductStorage = JSON.parse(localStorage.getItem('carts'))
    cartProductStorage.push(listProduct)

    saveProductsInCart(cartProductStorage)
    loadProducts()
};

loadProducts();
creatProduct();
