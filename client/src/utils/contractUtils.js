const isInList = (list, key) => {
    let index = list.findIndex((item) => {
        return item.address === key;
    });
    if (index === -1) {
        return false;
    }
    return true;
};
export {isInList};