export const hideOptions = (e, optionsRef, toggleOptions, setToggleOptions) => {
    const containsEventRaiser = [...optionsRef.current.children].includes(e.target);
    if (!containsEventRaiser && toggleOptions) setToggleOptions(false);
}