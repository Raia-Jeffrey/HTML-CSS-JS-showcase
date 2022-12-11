function addErrorMessage(id, msg) {
    'use strict';

    var elem = U.$(id);

    var newId = id + 'Error';

    //check for previous error messege
    var span = U.$(newId);
    if (span) {
        span.firstChild.value = msg;
    } else {
        span = document.createElement('span');
        span.id = newId;
        span.className = 'error';
        span.appendChild(document.createTextNode(msg));

        elem.parentNode.appendChild(span);
        elem.previousSibling.className = 'error';
    }
}

function removeErrorMessage(id) {
    var span = U.$(id + 'Error');
    if (span) {
        span.previousSibling.previousSibling.className = null;
        span.parentNode.removeChild(span);
    }
}