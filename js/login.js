function validateAccount(e) {
    'use strict';
    //checks to see if the e value is functional
    if (typeof e == 'undefined') e = window.event;

    //get refrences to the form
    var email = localStorage.key(0);
    var username = U.$('username').value;
    var password = U.$('password').value;

    var storageuser = JSON.parse(localStorage.getItem(email));
    var storagename = storageuser.storedusername;
    var storagepwd = storageuser.storedpassword;


    //var to check that all areas are validated
    var key = 0;
    var error = 0;

    if (username == storagename) {
        key++;
        removeErrorMessage('username');
    } else {
        addErrorMessage('username', 'Please enter the correct username');
        error++;
    }

    if (password == storagepwd) {
        key++;
        removeErrorMessage('password');
    } else {
        addErrorMessage('password', 'Please enter the correct password');
        error++;
    }

    if (error > 0) {
        return false;
    }

    //while this is a solution that worked for this assignment with scale this would be unmanagable based on how long of a form is, I would like to think of a more future proof solution.
    if (key == 2) {
        alert("Thanks for logging in.");
        return true;
    }




} // end of validate form

window.onload = function() {
    'use strict';
    var submit = U.$('submit');


    //I don't know why but doing event handling the proper W3C way failed for my program both times, the program works semi-properly with this event handling structure.
    if (document && U.$) {
        submit.onclick = validateAccount;
    }
}