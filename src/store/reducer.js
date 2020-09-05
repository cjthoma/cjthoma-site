import * as actionTypes from './actions/actionTypes';

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATE: {
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

        case actionTypes.SET_HOVER: {
            
            let updatedState = { 
                ...state, 
                colors: { ...state.colors }, 
                defaultColors: { ...state.defaultColors },
                altColors: { ...state.altColors },
                mask: { ...state.mask }
            }

            updatedState = { 
                ...state, 
                colors: { ...state.colors }, 
                defaultColors: { ...state.defaultColors },
                altColors: { ...state.altColors },
                mask: { ...state.mask },
                hover: action.hover
            }
            
            return updatedState
        }

        case actionTypes.FETCH_PROJECTS: {
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

        case actionTypes.NAV_CLICK_HANDLER: {
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


        case actionTypes.NAV_MOUSEOVER_HANDLER: {
            console.log('test')
            let updatedState = { 
                ...state, colors: { ...state.colors }, mask: { ...state.mask }
            }

            let test = null;

            if(action.payload.event.className.includes("Button")) {
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


        case actionTypes.NAV_MOUSEOUT_HANDLER: {
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

        case actionTypes.MOUSE_MOVE: {
            let updatedState = { 
                ...state, 
                colors: { ...state.colors }, 
                mask: { ...state.mask }
            }

            // checks browser to set mask element positioning
            const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
            const isFirefox = typeof InstallTrigger !== 'undefined';  

            // default firefox
            let y = 100;
            let x = 0;

            // chrome
            if(isChrome) {
                y = 130;
                x = 0;
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

        case actionTypes.BUTTON_CLICK_HANDLER: {
            let updatedState = { 
                ...state, 
                colors: { ...state.colors }, 
                mask: { ...state.mask }
            }

            updatedState = { 
                ...state,  
                mask: { ...state.mask },
                colors: { ...state.defaultColors },
                navFocusItem: null,
                hover: null,
                maskSize: '30px'
            }
            return updatedState;
        }

        case actionTypes.STACK_CLICK_HANDLER: {
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

        case actionTypes.ON_SCROLL_HANDLER: {
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

        default:
            return state;
    }//swicth

};

export default reducer;