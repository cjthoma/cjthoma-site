import React from 'react';

import Aux from '../Aux';
import style from './MouseCursor.module.css';

const mouseCursor = (props) => {
    return(
        <Aux>
            <div 
                className={style.MouseCursor} 
                style={{
                    left: (props.MouseX-40), 
                    top: (props.MouseY-130),
                    border: '1px solid '+props.color
                    }}></div>
        </Aux>
    );
};

export default mouseCursor;