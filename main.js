let carticon = document.querySelector('#cardicon');
let cart = document.querySelector('.cart');
let closecart = document.querySelector('#cloce-card');

carticon.onclick = () => {
    cart.classList.add('active')
}
closecart.onclick = () => {
    cart.classList.remove('active')
};

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('card-remove')
    console.log(removeCartButtons, "nimabbu");

    for (var i = 0; i < removeCartButtons.length; i++) {
        var buttonadd = removeCartButtons[i];
        buttonadd.addEventListener('click', removeCardItem);
    }

    var quantityInputs = document.getElementsByClassName('card-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantitychanged);
    }

    var addcardto = document.getElementsByClassName('addcard');

    for (var i = 0; i < addcardto.length; i++) {
        var button = addcardto[i];
        button.addEventListener('click', addCartCliced);
    }

    // document.getElementsByClassName('btn-buy')[0].addEventListener('click', buybuttonclicked);
}


// function buybuttonclicked() {
    
//     alert('tolovingiz uchun rahmat');
//     var cartcontentadd = document.getElementsByName('card-box')[0];
//     while (cartcontentadd.hasChildNodes) {
//         cartcontentadd.removeChild(cartcontentadd.firstChild);
//     }
//     updatetotal();
// }

var buy_btn = document.querySelector('.btn-buy');
buy_btn.addEventListener("click", handleBuyorder)

function removeCardItem(event) {
    var buttonOnclicked = event.target
    buttonOnclicked.parentElement.remove();
    updatetotal();
}

function quantitychanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updatetotal();
}

function addCartCliced() {
    var button = event.target;
    var shopproducts = button.parentElement;
    var title = shopproducts.getElementsByClassName('producttitle')[0].innerText;
    var price = shopproducts.getElementsByClassName('price')[0].innerText;
    var img1 = shopproducts.getElementsByClassName('productimg')[0].src;
    addproducttocard(title, price, img1);

    updatetotal()
}

function addproducttocard(title, price, img1) {
    var cardshopbox = document.createElement('div')
    cardshopbox.classList.add('card-box');
    var carditems = document.getElementsByClassName('card-content')[0];
    var carditemsname = carditems.getElementsByClassName('card-product-title');

    for (let i = 0; i < carditemsname.length; i++) {
        if (carditemsname[i].textContent == title) {
            alert('Bu mahsulotni kiritgansiz');
            return;
        }
    }


var cardboxcontent = `<img src="${img1}" alt="" class="cartimg">

<div class="detail-box">
    <div class="card-product-title">${title}</div>
    <div class="card-price">${price}</div>
    <input type="number" value="1" class="card-quantity">
</div>

<i class="bi bi-trash3 card-remove2"></i>`;

cardshopbox.innerHTML = cardboxcontent;
carditems.append(cardshopbox);

cardshopbox.
getElementsByClassName('card-remove2')[0]
.addEventListener('click', removeCardItem);
cardshopbox.
getElementsByClassName('card-quantity')[0]
.addEventListener('change', quantitychanged);

}

function updatetotal() {
    var cartcontent = document.getElementsByClassName('card-content')[0];
    var cardboxes = cartcontent.getElementsByClassName('card-box');
    var total = 0;

    for (let i = 0; i < cardboxes.length; i++) {
        var cardbox = cardboxes[i];
        var priceElement = cardbox.getElementsByClassName('card-price')[0];
        var quantityelement = cardbox.getElementsByClassName('card-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityelement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}