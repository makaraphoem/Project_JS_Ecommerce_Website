// get data
const demo_diload = document.querySelector('#form-dialog');
let creat_product_edit= document.querySelector('#creat-product-edit');
const demo_btn_create = document.querySelector('.creatBtn')
const table = document.querySelector('#my-table');
const dom_btn_save_create = document.querySelector('#createEditButton');


let listProducts = [];
// let listProducts = [
//     {
//         name: "Pencil heel sandals designs for girls",
//         description: "pencil heel sandals images, pencil heel shoes with price, pencil heel sandals with price,",
//         price: "22",
//         img:'https://i.pinimg.com/736x/c1/c5/ff/c1c5ff10754dee40d0b5fa150fba261b.jpg'

//     },
//     {
//         name: "Pencil heel sandals designs for girls",
//         description: "pencil heel sandals images, pencil heel shoes with price, pencil heel sandals with price,",
//         price: 23,
//         img:'https://i.pinimg.com/736x/a7/56/6e/a7566e940ebf8ad097e8b238472fa0c0.jpg'


//     },
//     {
//         name: "Pencil heel sandals designs for girls",
//         description: "pencil heel sandals images, pencil heel shoes with price, pencil heel sandals with price,",
//         price: "24",
//         img:'https://i.pinimg.com/736x/95/e0/44/95e0441398e3aaa1e5755a0ba81e5142--high-heels-sandals-sexy-heels.jpg'

//     },
//     {
//         name: "Pencil heel sandals designs for girls",
//         description: "pencil heel sandals images, pencil heel shoes with price, pencil heel sandals with price,",
//         price: "24",
//         img:'https://i.pinimg.com/736x/5b/df/c7/5bdfc703902e89b5f76f19066479837a.jpg'

//     }
// ];

// show and hide element
function show(element){
    element.style.display = "block";
};

function hide(element){
    element.style.display = "none";
};

//  LOCAL STORAGE ---------------------------------------------------------
function saveProducts() { 
        localStorage.setItem("listProducts", JSON.stringify(listProducts));
}

function loadProducts() {
    let listProductStorage = JSON.parse(localStorage.getItem("listProducts"));
    if (listProductStorage !== null) {
        listProducts = listProductStorage;
    }
};

// loop create product
function createProduct(){
        // save date and get data from local storage
        loadProducts()
        saveProducts()
        // remove tbody
        document.querySelector('#body-table').remove();
        // create tbody and id body-table
        dom_tables = document.createElement("tbody");
        dom_tables.id = "body-table";
    
        table.appendChild(dom_tables);
        
        for(let index = 0; index < listProducts.length; index++){
            
            let listProduct = listProducts[index];
            // create td class idu
            let td1 = document.createElement('td');
            td1.id = 'idu';
            td1.textContent = index + 1;
            td1.setAttribute("index", index)
            // create td id name product
            let td2 = document.createElement('td');
            td2.id = 'name';
            td2.textContent = listProduct.name;
            // create td id description
            let td3 = document.createElement('td');
            td3.id = 'description';
            td3.textContent = listProduct.description;
             // create td class price
            let td4 = document.createElement('td');
            td4.id = 'actions';
            td4.textContent = listProduct.price + "$";
            // create td id price
            td5 = document.createElement('td');
            td5.id = 'actions';
            // create td id img-product
            td6 = document.createElement('td');
            td6.id = 'img-product';
            // create td id cloth
            let img = document.createElement('img')
            img.id = "cloth"
            img.src = listProduct.img;
            td6.appendChild(img)
           
         // create button delet and button edite 
            let img_edit = document.createElement('img')
            img_edit.id = "img-edit"
            img_edit .src = '../../img/edit.svg'
            td5.appendChild( img_edit )
            img_edit.addEventListener('click', editeProduct);

            let img_delete = document.createElement('img')
            img_delete .id = "img-delete"
            img_delete.src = '../../img/trash.png'
            td5.appendChild(img_delete)
            img_delete.addEventListener('click', removeTable);
    
            td5.appendChild(img_edit);
            td5.appendChild(img_delete);
            
            let tr = document.createElement('tr');
            tr.id = index;
            tr.className = "tr-table";
            // appenChild td to tr 
            tr.appendChild(td1);
            tr.appendChild(td6);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            // appenChild tr to tbody
            dom_tables.appendChild(tr);
        };
};

// edite table
function editeProduct(event) {
    show(demo_diload);
    //  Get the question index
    productIndex = event.target.parentElement.parentElement.children[0].getAttribute('index');
    productIndex = parseInt(productIndex)

    let getIndexProduct = listProducts[productIndex];
    document.getElementById("photo-product").value = getIndexProduct.img;
    document.getElementById("product-name").value = getIndexProduct.name
    document.getElementById("descriptions").value = getIndexProduct.description;
    document.getElementById("prices").value = getIndexProduct.price;
 
    // Show the dialog
    dom_btn_save_create.textContent = "EDIT";
    creat_product_edit.textContent = "Edite new product";
    saveProducts();
}
// ________________________remove table___________________
function removeTable(event) {
    //  Get index
    let index = event.target.parentElement.parentElement.children[0].getAttribute('index');
    // Remove product
    listProducts.splice(index, 1);

    // Save to local storage
    saveProducts();
    // Update the view
    createProduct();
};

// _______________________click create_____________________
function addBtn(){
    // show diload
    show(demo_diload);
    // clear data
    clearProduct();
    productIndex = null;
    dom_btn_save_create.textContent = "Save";
    creat_product_edit.textContent = "Create new product";
    
};

function onCancel(e) {
    //   clicking on ADD button, hide the dialog
    hide(demo_diload);
};

// ________________________creat product_____________________
function onCreate() {
    hide(demo_diload);
    // dedit product and create product
    if (productIndex !== null){
        let editProduct = listProducts[productIndex];;
        editProduct.img = document.getElementById("photo-product").value;
        editProduct.name = document.getElementById('product-name').value;
        editProduct.description = document.getElementById('descriptions').value;
        editProduct.price = document.getElementById('prices').value;
    }else{
        let newProduct = {};
        newProduct.img = document.getElementById("photo-product").value;
        newProduct.name = document.getElementById('product-name').value;
        newProduct.description = document.getElementById('descriptions').value;
        newProduct.price = document.getElementById('prices').value;
        if(newProduct.img == "" ||  newProduct.name == "" || newProduct.description == "" || newProduct.price == ""){
            confirm('you must be input all in put')
        }else{
            listProducts.push(newProduct);
        }
    }
    // Save product
    saveProducts();
    // Update the view
    createProduct();
};

// clear product
function clearProduct(){
    document.getElementById('photo-product').value  = "";
    document.getElementById('product-name').value  = "";
    document.getElementById('descriptions').value  = "";
    document.getElementById('prices').value  = "";
};
// main
// saveProducts();
createProduct();
loadProducts();
