export const closeContainer = (e, popUpRef, exitButtonRef, setContainer) => {
    const foundChild = traverseChildren(popUpRef, e.target);
    if (!foundChild || e.target === exitButtonRef) {
        setContainer(false);
    }
};

export const traverseChildren = (curElement, target) => {
    const children = [...curElement.children];
    if (curElement === target) {
        return true;
    }

    for (let child of children) {
        const containsChild = traverseChildren(child, target);
        if (containsChild) {
            return true;
        }
    }

    return false;
}