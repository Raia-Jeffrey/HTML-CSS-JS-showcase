//product class
class Product {
    constructor(price, name, descript, id) {
        this.price = price;
        this.name = name;
        this.descript = descript;
        this.id = id;
    }
}

//basket class
class Basket {
    constructor() {
        this.basket = [];
    }
    add(productID) {
        this.basket.push(productID);
    }
    remove(productID) {
            //confirm to see if the item is in the cart
            var itemcheck = this.basket.includes(productID);
            var lowercounter = false;
            //if item is in cart, remove the first instance of it
            if (itemcheck) {
                var removeItem = this.basket.indexOf(productID);
                this.basket.splice(removeItem, 1);
                lowercounter = true;
            }
            return lowercounter;
        }
        //create an HTML table that displays what items are in cart at checkout
    receipt(array) {
        var data = array;
        var perrow = 2;
        var table = document.createElement("table")
        table.id = 'newtable';
        var row = table.insertRow();

        for (var i = 0; i < data.length; i++) {
            var cell = row.insertCell();
            cell.innerHTML = data[i];
            var next = i + 1;
            if (next % perrow == 0 && next != data.length) {
                row = table.insertRow();
            }
        }

        U.$("container").appendChild(table);
    }
}


/*The form validation was the last thing i implemented, unfortunatly i ran out of time to implement a solution.
I believe the problem is im using one script for two seperate HTML pages, and im pretty sure that's what broke the script.
I was unsure if i was supposed to generate a second JS file for the checkout page, but I stayed with one.*/
function validatePurchase(e) {
    'use strict';
    //checks to see if the e value is functional
    if (typeof e == 'undefined') e = window.event;

    //get refrences to the form
    var name = U.$('name').value;
    var email = U.$('email').value;
    var phone = U.$('phone').value;
    var card = U.$('card').value;

    //var to check that all areas are validated
    var key = 0;
    var error = 0;

    if (/^[a-z\d\-_\s]+$/i.test(name)) {
        key++;
        removeErrorMessage('name');
    } else {
        addErrorMessage('name', 'Please enter a valid username');
        error++;
    }

    if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email)) {
        key++;
        removeErrorMessage('email');
    } else {
        addErrorMessage('email', 'Please enter a valid email');
        error++;
    }

    if (/\d{3}[ \-\.]?\d{3}[ \-\.]?\d{4}/.test(phone)) {
        key++;
        removeErrorMessage('phone');
    } else {
        addErrorMessage('phone', 'Please enter a valid Phone Number');
        error++;
    }

    /*^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([-\s]?)\d{4}\1\d{4}\1\d{3,4}$ 
    this regex is for capturing spaces and dashes with visa cards
    However this only covers those variety of cards
    I couldn't find a regex for all credit cards that included spaces and dashes
    And yes, I did put my credit card in to test both and both worked, but I don't know what the card the user would have.
    ---------
    (/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    this was the regex i found that covered the most varties of cards, the first two regex's are very simple for demonstration purposes, but if you input a number over 16 digits, then you this one to fall back on. 
    */

    if (/[0-9]{4}[- ][0-9]{4}[- ][0-9]{4}[- ][0-9]{4}/.test(card) || /^[0-9]{16}?/.test(card) || /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}/.test(card)) {
        key++;
        removeErrorMessage('card');
    } else {
        addErrorMessage('card', 'Please enter a valid credit card number');
        error++;
    }

    if (error > 0) {
        return false;
    }

    //while this is a solution that worked for this assignment with scale this would be unmanagable based on how long of a form is, I would like to think of a more future proof solution.
    if (key == 4) {
        alert("Thank you for your purchase.");
        return true;
    }

}


window.onload = function() {
    //create a new basket
    var cart = new Basket();

    //the products to populate the store
    var product0 = new Product(4.00, "football", "leather", 0);
    var product1 = new Product(3.50, "baseball", "hide", 1);
    var product2 = new Product(7.75, "soccor ball", "Plastic", 2);
    var product3 = new Product(9.00, "baseball bat", "Wooden", 3);
    var product4 = new Product(12.00, "helmet", "Hardend plastic", 4);

    //check to see if on storepage by seeing if elementID buy_product0 exist
    var buyproduct0 = U.$('buy_product0');

    //if elementID buy_product0 does exist then run rest of this script. i.e. run the storepage script
    if (buyproduct0 !== null) {
        var buyproduct1 = U.$('buy_product1');
        var buyproduct2 = U.$('buy_product2');
        var buyproduct3 = U.$('buy_product3');
        var buyproduct4 = U.$('buy_product4');

        var sellproduct0 = U.$('sell_product0');
        var sellproduct1 = U.$('sell_product1');
        var sellproduct2 = U.$('sell_product2');
        var sellproduct3 = U.$('sell_product3');
        var sellproduct4 = U.$('sell_product4');

        var counter = U.$('counter');
        var itemsincart = 0;

        buyproduct0.onclick = function() {
            itemsincart++;
            counter.innerHTML = "(" + itemsincart + ") Cart";
            cart.add(product0);
        }
        sellproduct0.onclick = function() {
            var lowercartcount = cart.remove(product0);
            //if cart.remove is successful then lower cart count, if not, the function will return false and render this action void.
            if (lowercartcount) {
                itemsincart--;
                counter.innerHTML = "(" + itemsincart + ") Cart";
            }
        }
        buyproduct1.onclick = function() {
            itemsincart++;
            counter.innerHTML = "(" + itemsincart + ") Cart";
            cart.add(product1);
        }
        sellproduct1.onclick = function() {
            var lowercartcount = cart.remove(product1);
            if (lowercartcount) {
                itemsincart--;
                counter.innerHTML = "(" + itemsincart + ") Cart";
            }
        }
        buyproduct2.onclick = function() {
            itemsincart++;
            counter.innerHTML = "(" + itemsincart + ") Cart";
            cart.add(product2);
        }
        sellproduct2.onclick = function() {
            var lowercartcount = cart.remove(product2);
            if (lowercartcount) {
                itemsincart--;
                counter.innerHTML = "(" + itemsincart + ") Cart";
            }
        }
        buyproduct3.onclick = function() {
            itemsincart++;
            counter.innerHTML = "(" + itemsincart + ") Cart";
            cart.add(product3);
        }
        sellproduct3.onclick = function() {
            var lowercartcount = cart.remove(product3);
            if (lowercartcount) {
                itemsincart--;
                counter.innerHTML = "(" + itemsincart + ") Cart";
            }
        }
        buyproduct4.onclick = function() {
            itemsincart++;
            counter.innerHTML = "(" + itemsincart + ") Cart";
            cart.add(product4);
        }
        sellproduct4.onclick = function() {
            var lowercartcount = cart.remove(product4);
            if (lowercartcount) {
                itemsincart--;
                counter.innerHTML = "(" + itemsincart + ") Cart";
            }
        }

        //when the hyperlink is clicked, store the current basket into local storage as a string.
        counter.onclick = function() {
                localStorage.setItem('cart0', JSON.stringify(cart.basket));
            }
            //this else statement is here to prevent an error from occurring where getElementID is null because of a seperate page. If the element doesn't exist, simply do not execute any code.
    } else {};

    //check to see if were are on the checkout page
    var submit = U.$('submit');
    if (submit !== null) {
        //retrieve the basket from local storage
        var truecart = localStorage.getItem('cart0');
        //parse it back into some format of an object
        var list = JSON.parse(truecart);

        //calculates the total in the basket
        var totalprice = 0;
        for (i = 1; i < list.length; i++) {
            var itemprice = list[i].price;
            totalprice += itemprice;
        }

        //gathers the relevant strings and puts them into an array to convert into an HTML table/reciept
        var finallist = [];
        for (i = 0; i < list.length; i++) {
            var listprice = parseFloat(list[i].price);
            var finallistprice = "$" + listprice.toFixed(2);
            var listname = list[i].name;
            finallist.push(finallistprice);
            finallist.push(listname);
        }

        //simple formatting
        var finaltotal = "$" + totalprice;
        finallist.unshift("Price", "Item");
        finallist.push("Total:");
        finallist.push(finaltotal);
        cart.receipt(finallist);

        if (document && U.$) {
            submit.onclick = validatePurchase;
            console.log(localStorage);
        }
        //I don't know why but these fire off on window load

    } else {}


}