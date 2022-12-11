class Product {
    constructor(price, name, descript, id) {
        this.price = price;
        this.name = name;
        this.descript = descript;
        this.id = id;
    }
}

function Basket() {
    this.basket = [];
}

Basket.prototype.add = function(productID) {
    this.basket.push(productID);
}

Basket.prototype.remove = function(productID) {
    this.basket.splice(productID, 1);
}

Basket.prototype.showBasket = function() {
    var data = [];
    for (i = 0; i < basket.length; i++) {
        var itemString = JSON.stringify(basket[i]);
        var itemInCart = JSON.parse(itemString);
        data.push(itemInCart.price);
        data.push(itemInCart.name);
        data.push(itemInCart.descript);
        data.push(itemInCart.id);
    };

    //----------------------------------
    var perrow = 4;
    table = document.createElement("table"),
        table.id = 'newtable';
    row = table.insertRow();

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

/*class Basket {
    constructor() {
        this.basket = [];
    }
    addBasket(productID) {
        this.basket.push(productID);
    };
    removeBasket(productID) {
        this.basket.splice(productID, 1);
    }
    showBasket() {
        var data = [];
        for (i = 0; i < basket.length; i++) {
            var itemString = JSON.stringify(basket[i]);
            var itemInCart = JSON.parse(itemString);
            data.push(itemInCart.price);
            data.push(itemInCart.name);
            data.push(itemInCart.descript);
            data.push(itemInCart.id);
        };

        //----------------------------------
        var perrow = 4;
        table = document.createElement("table"),
            table.id = 'newtable';
        row = table.insertRow();

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

/*function addBasket(productID) {
    var itemString = JSON.stringify(productID);
    var itemInCart = JSON.parse(itemString);
    basket.push(itemInCart.price);
    basket.push(itemInCart.name);
    basket.push(itemInCart.descript);
    basket.push(itemInCart.id);
};
*/
//A very simple array to HTML conversion function.



/*function removeTable() {
    var oldtable = U.$("newtable");
    var div = U.$("container");
    if (div.contains(oldtable)) {
        oldtable.remove();
    }

}*/


window.onload = function() {
    var product0 = new Product("Price", "Name", "Description", "ID");
    add(product0);
    var product1 = new Product("$4.00", "football", "leather", 0);
    add(product1);
    var product2 = new Product("$3.00", "baseball", "hide", 1);
    add(product2);
    var product3 = new Product("$7.00", "soccorball", "Plastic", 2);
    add(product3);
    var product4 = new Product("$9.00", "baseball bat", "Wooden", 3);
    add(product4);
    var product5 = new Product("$12.00", "helmet", "Hardend plastic", 4);
    add(product5);


    var activate = U.$('trigger1');
    var reset = U.$('trigger2');
    if (document && U.$) {
        activate.onclick = Basket.showBasket
        reset.onclick = removeTable;
    }
}