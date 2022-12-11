function validateForm(e) {
    'use strict';
    //checks to see if the e value is functional
    if (typeof e == 'undefined') e = window.event;

    //get refrences to the form
    var email = U.$('email');
    var emailVer = U.$('emailVer');
    var name = U.$('firstName');

    //var to check that all areas are validated
    var key = 0;
    var error = 0;

    //validate
    if (/^[A-Z \.\-']{2,20}$/i.test(name.value)) {
        //adds to the confirmation
        key++;
        removeErrorMessage('firstName');
    } else {
        addErrorMessage('firstName', 'This field is required.');
        error++;
    }

    if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email.value)) {
        key++;
        removeErrorMessage('email');
    } else {
        addErrorMessage('email', 'This field is required.');
        error++;
    }

    //Checks to see if re-entered email is the same as the first one, if the first isn't verfived, then this will not register the form
    if (email.value == emailVer.value) {
        key++;
        removeErrorMessage('emailVer');
    } else {
        addErrorMessage('emailVer', 'This entry must equal the first entry.');
        error++;
    }

    //prevents the form from being submitted
    if (error > 0) {
        return false;
    }

    //submits the form and alert once all the fields have been filled out properly
    if (key == 3 && error == 0) {
        alert("Thanks for joining our list.");
        return true;
    }

} // end of validate form

//onload event that starts the form
window.onload = function() {
    'use strict';

    if (document && document.getElementById) {
        var loginForm = U.$('marketing_list');
        U.$('submit').onclick = validateForm;
    }
}