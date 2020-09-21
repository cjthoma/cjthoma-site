import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mousePosX: null,
    mousePosY: null,
    hover: null,
    buttonHover: null,
    navFocusItem: null,
    stackClickItem: null,
    buttonClick: false,
    scrollPos: 0,
    maskSize: '30px',
    projects: [],
    colors: 
    {
        // primary: '#fbc4ab', // text peach
        // secondary: '#f94144', //bright red
        // altColor: '#1c2541',  // non mask bg color

        // textColor: '#714674',
        // textHighlight: '#714674',
        // textDefocus: '#faae7b',

        //alt Colors
        //secondary: '#47e7e5' //bright turquise
        //altColor: '#0d1429' // dark -v of default altColor 
    },
    defaultColors: null,
    altColors: null,
    mask: 
    {
        WebkitClipPath: 'ellipse(0px 0px at center)',
        clipPath: 'ellipse(0px 0px at center)',
        backgroundColor: null
    },
}

const setState = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }
    updatedState = { 
        ...state, 
        mask: { ...state.mask },
        // sets page color to default
        colors: { ...action.colors.default }, 
        // color scheme setup
        defaultColors: { ...action.colors.default }, 
        altColors: { ...action.colors.alt }
    }
    return updatedState
}

const setHover = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        defaultColors: { ...state.defaultColors },
        altColors: { ...state.altColors },
        mask: { ...state.mask },
        //chnaged props
        hover: action.hover,
        configPage: action.configPage
    }
    
    return updatedState
}

const fetchProjects = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    let arr = action.projects;

    updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask },
        projects: arr,
    }

    return updatedState;
}

const navClickHandler = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }
    if(action.payload.textContent === 'ABOUT' || action.payload.textContent === 'WORK' || action.payload.textContent === 'CONTACT') {
        
        updatedState = { 
            ...updatedState,
            colors: { ...state.altColors },
            mask: { ...state.mask },
            hover: null, 
            maskSize: '30px', 
            navFocusItem: action.payload.textContent 
        }
        
        if(window.innerWidth < 425) {
            updatedState = {
                ...updatedState,
                mask: { ...state.mask },
                colors: { ...state.altColors }
            }
        }
        return updatedState;
    }
    return updatedState;
}

const mouseOver = (state, action) => {
    let updatedState = { 
        ...state, colors: { ...state.colors }, mask: { ...state.mask }
    }

    if(action.payload.event.className && action.payload.event.className.includes("Button")) {
        updatedState = { 
            ...updatedState,
            mask: { ...state.mask },
            colors: { ...state.altColors },
            hover: action.payload.event.textContent,
            buttonHover: true, 
            maskSize: action.payload.maskSize, 
        }
    } else {
        updatedState = { 
            ...updatedState,
            mask: { ...state.mask },
            colors: { ...state.altColors },
            hover: action.payload.event.textContent, 
            buttonHover: false, 
            maskSize: action.payload.maskSize, 
        }
    }
    return updatedState;
}

const mouseOut = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    if(!(state.navFocusItem)) {
        updatedState = { 
            ...updatedState,
            mask: { ...state.mask },
            colors: { ...state.defaultColors },
            hover: null, 
            maskSize: '30px', 
        }
    } else {
        updatedState = { 
            ...updatedState,
            mask: { ...state.mask },
            colors:  { ...updatedState.colors },
            hover: null,
            buttonHover: false, 
            maskSize: '30px'
        }
    }
    return updatedState;
}

const mouseMove = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    // checks browser to set mask element positioning
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const isFirefox = typeof InstallTrigger !== 'undefined';  

    // default firefox
    let y = 120;
    let x = 0;

    // chrome
    if(isChrome) {
        y = 130;
        x = 40;
    };

    // safari
    if(!(isFirefox) && !(isChrome)) {
        y = 65;
    }

    updatedState = { 
        ...updatedState,
        colors: { ...state.colors },
        mask: {
            WebkitClipPath: 'ellipse('+state.maskSize +' ' +state.maskSize +' at ' +(action.payload.screenX-(y+20)) +'px ' +(action.payload.screenY-y) +'px)',
            clipPath: 'ellipse('+state.maskSize +' ' +state.maskSize +' at ' +(action.payload.screenX-(x)) +'px ' +(action.payload.screenY-y) +'px)',
            backgroundColor: state.colors.primary,
        },
        mousePosX: action.payload.screenX, 
        mousePosY: action.payload.screenY,
        windowWidth: window.innerWidth,
    }
    return updatedState;
}

const buttonClick = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    updatedState = { 
        ...state,  
        mask: { ...state.mask },
        colors: { ...state.defaultColors },
        scrollPos: null,
        navFocusItem: null,
        hover: null,
        maskSize: '30px'
    }
    return updatedState;
}

const stackClick = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    if(state.stackClickItem === action.payload.textContent) {
        updatedState = { 
            ...state, 
            colors: { ...state.colors }, 
            mask: { ...state.mask },
            stackClickItem: null
        }
    } else {
        updatedState = { 
            ...state, 
            colors: { ...state.colors }, 
            mask: { ...state.mask },
            stackClickItem: action.payload.textContent
        }
    }
    return updatedState;
}

const scrollHandler = (state, action) => {
    let updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask }
    }

    updatedState = { 
        ...state, 
        colors: { ...state.colors }, 
        mask: { ...state.mask },
        scrollPos: action.payload.scrollTop
    }
    
    return updatedState;
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATE: return setState(state, action);
        case actionTypes.SET_HOVER: return setHover(state, action);
        case actionTypes.FETCH_PROJECTS: return fetchProjects(state, action);
        case actionTypes.NAV_CLICK_HANDLER: return navClickHandler(state, action);
        case actionTypes.NAV_MOUSEOVER_HANDLER: return mouseOver(state, action)
        case actionTypes.NAV_MOUSEOUT_HANDLER: return mouseOut(state, action)
        case actionTypes.MOUSE_MOVE: return mouseMove(state, action)
        case actionTypes.BUTTON_CLICK_HANDLER: return buttonClick(state, action)
        case actionTypes.STACK_CLICK_HANDLER: return stackClick(state, action)
        case actionTypes.ON_SCROLL_HANDLER: return scrollHandler(state, action)
        default: return state;
    }
};

export default reducer;