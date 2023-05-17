
const dom_container = document.querySelector('.container');
const dom_product_buy = document.querySelector('.product-buy');
let carts = [];
var total = 0;

// ________________________sav cart to local storage___________________
function saveCart() {
    localStorage.setItem("carts", JSON.stringify(carts));
}
// ___________________________load cart from local storage____________________
function loadCart() {
    let listProductStorage = JSON.parse(localStorage.getItem("carts"));
    if (listProductStorage !== null) {
        carts = listProductStorage;
    }
};

//____________________________________display cart__________________________
function displayCart() {
    loadCart()
    for (let index = 0; index < carts.length; index++) {
        // creat div and class img-product-buy
        let img_product_buy = document.createElement('div');
        img_product_buy.setAttribute('class', 'img-product-buy');
        // creat div and id photo-buy
        let photo_buy = document.createElement('img');
        photo_buy.setAttribute('id', "photo-buy");
        photo_buy.src = carts[index].img;
        img_product_buy.appendChild(photo_buy)
        // creat div and class price-description
        let price_decription = document.createElement('div');
        price_decription.setAttribute('class', 'price-description');
        // create p and id name-buy
        let name_buy = document.createElement('p');
        name_buy.id = 'name-buy';
        name_buy.textContent = carts[index].name;
        price_decription.appendChild(name_buy)
        // // creat p and id description_buy
        let description_buy = document.createElement('p');
        description_buy.id = 'description-buy';
        description_buy.textContent = carts[index].description;
        price_decription.appendChild(description_buy)
        // // creat p and id price-buy
        let price_buy = document.createElement('p');
        price_buy.id = 'price-buy';
        price_buy.textContent = carts[index].price + "$";
        price_decription.appendChild(price_buy)
        // create star
        for(let index = 0; index < 5; index++)  {
            let icon_star = document.createElement('i')
            icon_star.id = 'icon-star'
            icon_star.setAttribute('class','material-icons')
            icon_star.innerHTML = 'star'
            price_decription.appendChild(icon_star)
        };
        // creat p and class input-delete
        let input_delete = document.createElement('div');
        input_delete.setAttribute('class', 'input-delete');
        // // create input and id input-number
        let input = document.createElement("input");
        input.type = "number";
        input.value = 1;
        input.id = "input-number";
        input.className = 'input-price'
        input.addEventListener('keyup', renderTotal)
        input_delete.appendChild(input)
        // // create div and class total-btn-buy
        let total_btn_buy = document.createElement('div')
        total_btn_buy.setAttribute('class', 'total-btn-buy')
        // create h2 and id total
        let h2 = document.createElement('h2');
        h2.setAttribute('id', 'total');
        h2.textContent = carts[index].price + "$";
        total_btn_buy.appendChild(h2)
        // create button and id btn-buy-now
        let btnBuy = document.createElement('button');
        btnBuy.setAttribute('id', 'btn-delete');
        btnBuy.textContent = 'delete';
        btnBuy.addEventListener('click', removeCart)
        total_btn_buy.appendChild(btnBuy)
        // create div and class card-buy
        let card_buy = document.createElement('div')
        card_buy.setAttribute('class', 'card-buy');
        card_buy.id = index;
        //appendChild input-delet to price-decription 
        price_decription.appendChild(input_delete)
        // append  img_product_buy and price_decription and total_btn_buy to card-buy
        card_buy.appendChild(img_product_buy)
        card_buy.appendChild(price_decription)
        card_buy.appendChild(total_btn_buy)
        // appenChild card-buy to dom-product-buy
        dom_product_buy.appendChild(card_buy);

    };
};

//__________________________________________ loop create card total______________
for (let index = 0; index < 1; index++) {
    loadCart()
    // create div and class card-total
    let div_card_total = document.createElement('div');
    div_card_total.className = 'card-total';
    // create div and class total
    let div_total = document.createElement('div');
    div_total.className = 'total';
    div_total.textContent =   '0' + "$";
    div_card_total.appendChild(div_total);
    // create button delete
    let btn_buy_now = document.createElement('button');
    btn_buy_now.className = 'buy-now';
    btn_buy_now.textContent = 'buy-now';
    div_card_total.appendChild(btn_buy_now);
    dom_container.appendChild(div_card_total);
};

// ______________________________________total sum_____________________________
// 
// render total price
function renderTotal(event) {
    let sub_total = 0;
    // get index of cart
    let indexCart = event.target.parentElement.parentElement.parentElement.id;
    let index_price = document.querySelectorAll('#total')[indexCart];
    let total_price = document.querySelector('.total');
    let input_number = document.querySelectorAll("#input-number");
    input_number = (input_number[indexCart].value);
    input_number = parseInt(input_number);
    price = parseInt(carts[indexCart].price) ;
    sub_total = sub_total + ( price * input_number);
    total = total + sub_total;
    index_price.textContent =   sub_total  + "$";
    console.log(total)
    total_price.textContent = total + "$";
};

// ______________________________remove cart___________________
function removeCart(event) {
    // get index cart
    let indexCart = event.target.parentElement.parentElement.id;
    // console.log(indexCart)
    // remove cart
    carts.splice(indexCart, 1);
    window.location.reload();
    // // savecart
    saveCart();
    // // dispaly cart
    displayCart();

}


// _________________________________main____________

loadCart();
saveCart();
displayCart();


