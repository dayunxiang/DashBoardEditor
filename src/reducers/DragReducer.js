/**
 * Created by edeity on 2018/3/1.
 */
const defaultState = {
    compType: '',
    compCollection: [],
    focusIndex: -1,
}

const compState = {
    compType: '',
    col: 12
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
            let compCollection = state.compCollection
            let newCompState = Object.assign({}, compState)
            newCompState.compType = state.compType
            compCollection.push(newCompState)
            let focusIndex = compCollection.length - 1
            return {
                ...state,
                compType: '',
                focusIndex,
                compCollection,
            }
        }
        case 'Focus': {
            return {
                ...state,
                focusIndex: action.payload.index,
            }
        }
        case 'ChangeCol': {
            let compCollection = Object.assign([], state.compCollection)
            compCollection[state.focusIndex].col = action.payload.col
            return {
                ...state,
                compCollection
            }
        }
        case 'ChangeComp': {
            let compCollection = Object.assign([], state.compCollection)
            compCollection[state.focusIndex].compType = action.payload.compType
            return {
                ...state,
                compCollection
            }
        }
        case 'CloseComp': {
            let currCloseIndex = action.payload.index
            let compCollection = Object.assign([], state.compCollection)
            compCollection.splice(currCloseIndex, 1)
            console.log(compCollection)
            let focusIndex = state.focusIndex === currCloseIndex ? currCloseIndex - 1 : state.focusIndex
            return {
                ...state,
                focusIndex,
                compCollection
            }
        }
        case 'EmptyComp': {
            return {
                ...state,
                focusIndex: -1,
                compCollection: []
            }
        }
        default:
            return state;
    }
}