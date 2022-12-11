function validateAccount(e) {
    'use strict';
    //checks to see if the e value is functional
    if (typeof e == 'undefined') e = window.event;

    //get refrences to the form
    var loginobject = localStorage.key(0);
    var username = U.$('username').value;
    var newpwd = U.$('password').value;
    var confirmpwd = U.$('confirm').value;

    var storageuser = JSON.parse(localStorage.getItem(loginobject));
    var storagename = storageuser.storedusername;

    //var to check that all areas are validated
    var key = 0;
    var error = 0;

    if (username == storagename) {
        key++;
        removeErrorMessage('username');
    } else {
        addErrorMessage('username', 'Please enter a registered username');
        error++;
    }

    if (/^[0-9a-zA-Z]{8,}$/i.test(newpwd)) {
        key++;
        removeErrorMessage('password');
    } else {
        addErrorMessage('password', 'Please enter in a password');
        error++;
    }


    if (newpwd == confirmpwd) {
        key++;
        removeErrorMessage('password');
    } else {
        addErrorMessage('password', 'Please enter the a matching password');
        error++;
    }

    if (error > 0) {
        return false;
    }

    //while this is a solution that worked for this assignment with scale this would be unmanagable based on how long of a form is, I would like to think of a more future proof solution.
    if (key == 3) {
        alert("password has been reset");
        storageuser.storedpassword = newpwd;
        var updated_user = loginobject;
        localStorage.removeItem(loginobject);
        localStorage.setItem(updated_user, JSON.stringify(storageuser));
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