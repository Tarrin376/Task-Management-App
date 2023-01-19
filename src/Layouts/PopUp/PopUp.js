import React, { useRef, useContext } from "react";
import popUpStyles from '../../Layouts/PopUp/PopUp.module.css';
import { closeContainer } from '../../utils/TraverseChildren';
import { ThemeContext } from '../../Wrappers/Theme';

function PopUp(props) {
    const popUpRef = useRef();
    const themeContext = useContext(ThemeContext);

    return (
        <div className={popUpStyles.bg} id={popUpStyles[`popUp${themeContext.theme}`]}
            onClick={(e) => closeContainer(e, popUpRef.current, props.setWindow)}>
            <section className={popUpStyles.popUp} ref={popUpRef}>
                {props.children}
            </section>
        </div>
    );
}

export default PopUp;
