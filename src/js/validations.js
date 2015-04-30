function isRequired(content) {
    if (content === '' || content === undefined) {
        return 'Field is Required.';
    } else {
        return '';
    }
}

function onlyNumbers(content) {
    var regex = /^[0-9+]*$/;
    if (!regex.test(content)) {
        return 'Illegal characters. You can input only numbers.';
    } else {
        return '';
    }
}

function onlyLetters(content) {
    var regex = /^[a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1 ]*$/;
    if (!regex.test(content)) {
        return 'Illegal characters. You can input only letters.';
    } else {
        return '';
    }
}

function onlyUpperCaseLetters(content) {
    var regex = /^[A-Z]{2}$/;
    if (!regex.test(content)) {
        return 'Only upper case letters are allowed.';
    } else {
        return '';
    }
}

function onlyLettersNumbers(content) {
    var regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(content)) {
        return 'Illegal characters. You can input only letters or numbers.';
    } else {
        return '';
    }
}

function isEmail(content) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(content)) {
        return 'Invalid Email.';
    } else {
        return '';
    }
}

function inRange(content, min, max) {
    if (content.length < min || content.length > max) {
        return 'Write between ' + min + ' and ' + max + ' characters.';
    } else {
        return '';
    }
}

function checkInvalidCharacters(content) {
    if (content) {
        if (content.indexOf('<') > -1 || content.indexOf('>') > -1 || content.indexOf('=') > -1) {
            return 'Invalid input.';
        }
    }
    return '';
}

function checkErrors(error, min, max, content) {
    if ((content === '') || (content === undefined)) {
        return '';
    }

    var errorFound = false;
    var errorMessage;
    if ((error.split(' ').indexOf('range') !== -1)) {
        if (!errorFound) {
            errorMessage = inRange(content, min, max);
        }
        errorFound = (errorMessage !== '');
    }

    if ((error.split(' ').indexOf('letters-only') !== -1)) {
        if (!errorFound) {
            errorMessage = onlyLetters(content);
        }
        errorFound = (errorMessage !== '');
    }

    if ((error.split(' ').indexOf('valid-email') !== -1)) {
        if (!errorFound) {
            errorMessage = isEmail(content);
        }
        errorFound = (errorMessage !== '');
    }

    if ((error.split(' ').indexOf('upper-case') !== -1)) {
        if (!errorFound) {
            errorMessage = onlyUpperCaseLetters(content);
        }
        errorFound = (errorMessage !== '');
    }

    if ((error.split(' ').indexOf('letters-numbers-only') !== -1)) {
        if (!errorFound) {
            errorMessage = onlyLettersNumbers(content);
        }
        errorFound = (errorMessage !== '');
    }

    if ((error.split(' ').indexOf('special-characters') !== -1)) {
        if (!errorFound) {
            errorMessage = checkInvalidCharacters(content);
        }
    }
    return errorMessage;
}

function checkDates(small, big) {
    if (small && big && (small > big)) {
        return 'Invalid date range.';
    }
    return '';
}

function greaterThanZero(value) {
    if (value > 0) {
        return '';
    }
    return '> 0';
}
