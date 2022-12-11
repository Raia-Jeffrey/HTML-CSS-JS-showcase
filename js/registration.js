function validateAccount(e) {
    'use strict';
    //checks to see if the e value is functional
    if (typeof e == 'undefined') e = window.event;

    //get refrences to the form
    var username = U.$('username');
    var password = U.$('password');
    var email = U.$('email');
    var phone = U.$('phone');
    var address = U.$('address');
    var city = U.$('city');
    var state = U.$('state');
    var zip = U.$('zip');
    var contact = U.$('contact');
    var terms = U.$('terms');

    //var to check that all areas are validated
    var key = 0;
    var error = 0;

    //array for table generation
    var errordata = [];

    const User = {};

    if (/^[a-z\d\-_\s]+$/i.test(username.value)) {
        key++;
        removeErrorMessage('username');
        errordata.push(username.value);
        User.storedusername = username.value;
    } else {
        addErrorMessage('username', 'Please enter a username');
        error++;
        errordata.push("Please enter a username");
    }

    if (/^[0-9a-zA-Z]{8,}$/i.test(password.value)) {
        key++;
        removeErrorMessage('password');
        errordata.push("Password was created.");
        User.storedpassword = password.value;
    } else {
        addErrorMessage('password', 'Please enter in a password');
        error++;
        errordata.push("Please enter a password");
    }

    //email validator
    if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email.value)) {
        key++;
        removeErrorMessage('email');
        errordata.push(email.value);
        User.storedemail = email.value;
    } else {
        addErrorMessage('email', 'Please enter a valid email address.');
        error++;
        errordata.push("Email failed to validate");
    }

    //phone validator
    if (/\d{3}[ \-\.]?\d{3}[ \-\.]?\d{4}/.test(phone.value)) {
        key++;
        removeErrorMessage('phone');
        errordata.push(phone.value);
        User.storedphone = phone.value;
    } else {
        addErrorMessage('phone', 'Please enter your phone number.');
        error++;
        errordata.push("phone failed to validate");
    }

    //address validator
    /*I couldn't find a street address regex that wasn't flawed and confusing
        this should allow for any text string with underscores, dashes and whitespaces. I couldn't get comma's to work for some reason. */
    if (/^[a-z\d\-_\s]+$/i.test(address.value)) {
        key++;
        removeErrorMessage('address');
        errordata.push(address.value);
        User.storedaddress = address.value;
    } else {
        addErrorMessage('address', 'Please enter in a valid address');
        error++;
        errordata.push("address failed to validate");
    }

    //city validator
    if (/^[A-Z \.\-']{2,20}$/i.test(city.value)) {
        key++;
        removeErrorMessage('city');
        errordata.push(city.value);
        User.storedcity = city.value;
    } else {
        addErrorMessage('city', 'Please enter your city.');
        error++;
        errordata.push("city failed to validate");
    }

    //state validator
    if (state.selectedIndex != 0) {
        key++;
        removeErrorMessage('state');
        errordata.push(state.value);
        User.storedstate = state.value;
    } else {
        addErrorMessage('state', 'Please chose a state.');
        error++;
        errordata.push("Please select a state");
    }

    //zip code validator
    if (/^\d{5}(-\d{4})?$/.test(zip.value)) {
        key++;
        removeErrorMessage('zip');
        errordata.push(zip.value);
        User.storedzip = zip.value;
    } else {
        addErrorMessage('zip', 'Please enter your zip code.');
        error++;
        errordata.push("Zip code failed to validate");
    }

    //contact validator
    if (contact.selectedIndex != 0) {
        key++;
        removeErrorMessage('contact');
        errordata.push(contact.value);
        User.storedcontact = contact.value;
    } else {
        addErrorMessage('contact', 'Please select a contact option');
        error++;
        errordata.push("Please select a contact option");
    }

    if (terms.checked) {
        key++;
    } else {
        error++;
        errordata.push("Error at TOS");
    }

    //prints error table if the validation fails, afterwards prevents the page from being submitted
    if (error > 0) {
        removeErrortable();
        printErrortable(errordata);
        localStorage.clear();
        return false;
    }

    //new user object
    /* user_username: goodusername,
        user_password: goodpassword,
        user_email: goodemail,
        user_phone: goodphone,
        user_address: goodaddress,
        user_city: goodcity,
        user_state: goodstate,
        user_zip: goodzip,
        user_contact: goodcontact
    }*/

    //while this is a solution that worked for this assignment with scale this would be unmanagable based on how long of a form is, I would like to think of a more future proof solution.
    if (key == 10) {
        alert("Thanks for creating an account.");
        localStorage.setItem(email.value, JSON.stringify(User));
        return true;
    }




} // end of validate form

//disables the register button until the TOS checkbox is checked
/*function toggleSubmit() {
    'use strict';

    if (U.$('terms').checked) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}*/

//A very simple array to HTML conversion function.
function printErrortable(data) {
    var perrow = 1;
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


function removeErrortable() {
    var oldtable = U.$("newtable");
    var div = U.$("container");
    if (div.contains(oldtable)) {
        oldtable.remove();
    }

}

window.onload = function() {
    'use strict';
    var submit = U.$('submit');


    //I don't know why but doing event handling the proper W3C way failed for my program both times, the program works semi-properly with this event handling structure.
    if (document && U.$) {
        submit.onclick = validateAccount;
        console.log(localStorage);
    }
}