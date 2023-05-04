export const stringIsNullOrEmpty = (string) => {
    if (string === null || string === "") {
        return true;
    }
    return false;
};

export const stringIsNullEmptyOrWhiteSpace = (string) => {
    if (!string) return true;
    else if (string.trim() === "") return true;
    else return false;
};

export const stringsAreEqual = (firstString, secondString) => {
    return firstString == secondString;
};

export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    var re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return re.test(phone);
};

export const isInvalidEmptyString = string => stringIsNullOrEmpty(string);

export const isInvalidEmail = string => !validateEmail(string);

export const isNonEqualStrings = (firstString, secondString) => !stringsAreEqual(firstString, secondString);

