export const addActive = (element, classname) => {
    element.parentElement.querySelectorAll('.' + classname).forEach(el => {
        el.classList.remove('active');
    });
    element.classList.add('active');
}

export const sortByNumber = (arr, keyword) => {
    return arr.sort((a, b) => {
        return a[keyword] - b[keyword];
    });
}

export const checkStorage = () => {
    if (Storage) {
        return true;
    }
}