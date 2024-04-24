
async function fetchdata() {
    let raw = await fetch('https://fakestoreapi.com/products');
    let data = await raw.json();
    return data;
   
}

fetchdata();

async function renderdata() {
    let data = await fetchdata();
    console.log(data)
    var clutter = ""
    data.forEach((val, index) => {

        clutter += ` <div class="card">
    <img src="${val.image}" alt="">
    <h3>${val.title}</h3>
    <h4>$${val.price}</h4>
    <button data-index="${index}" class="add">Add to cart <i data-index="${index}"  class="add ri-shopping-cart-line"></i></button>
    </div>`

    });
    document.querySelector('.container').innerHTML = clutter;
}
const cart = [];

async function addtoCart() {
    let products = await fetchdata();
    document.querySelector('.container').addEventListener('click', (details) => {
        if (details.target.classList.contains('add')) {
            if (!cart.some(p => p.id === products[details.target.dataset.index].id)) {
                cart.push(products[details.target.dataset.index])
                console.log('Product added:', products[details.target.dataset.index]);
              } 
          
            showCart();
            
        }
    })
};

function showCart() {
    let check = 0;
    document.querySelector(".expand").addEventListener('click', () => {
        if (check == 0) {
            document.querySelector('.cart-item').style.display = 'block';
            check = 1;
        } else {
            document.querySelector('.cart-item').style.display = 'none';
            check = 0;
        };
    });

    var total = 0
    var clutter = ""
    cart.forEach((prod, index) => {
        clutter += `<div class="items">
                <div class="img-container"><img id="cart-image" src="${prod.image}" alt=""></div>
       <div class="price">
           <p>${prod.title}</p>
           <p class="paisa">$${prod.price}</p>
       </div>
       <button  class="remove"><i data-index="${index}" class="remove ri-subtract-line"></i></button>
       </div>`
        total += prod.price;
    });
    const div = `<div class="total">
    <p class="paisa">Total Payable Amount:${total.toFixed(2)}</p>
   </div>`
    document.querySelector(".cart-item").innerHTML = clutter + div;
}
function removeitem() {
    document.querySelector('.cart-item').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('remove')) {
            const index = evt.target.dataset.index;
            cart.splice(index, 1);
            // console.log(cart);
        }
        showCart();
    });
    console.log(cart);
}
function searchdata() {
    const container = document.querySelector('.container');
    const btn = document.querySelector('input');

    btn.addEventListener('keyup', (e) => {
        let keyword = e.target.value.trim().toLowerCase();

        let Findcard = document.querySelectorAll('.card');
        // console.log(Findcard)

        Findcard.forEach((card) => {
            const title = card.children[1].innerText.toLowerCase();
            const description = card.children[2].innerText.toLowerCase();

            if (title.includes(keyword) || description.includes(keyword)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        })


    });
}

removeitem();
showCart();
addtoCart();
searchdata();
renderdata();

