/**
 * Created by edeity on 2018/3/1.
 */
const defaultState = {
    compType: ''
}

export default(state=defaultState, action={}) => {
    switch(action.type) {
        case 'Drag': {
            return {
                ...state,
                compType: action.payload.compType
            }
        }
        case 'Drop': {
            return {
                ...state,
                compType: action.payload.compType
            }
        }
        default:
            return state;
    }
}