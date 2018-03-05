/**
 * Created by edeity on 2018/3/1.
 */
import appState from '../constants/appState';
import compState from '../constants/compState'

export default(state=appState, action={}) => {
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
        case 'ChangeHeight': {
            let compCollection = Object.assign([], state.compCollection)
            compCollection[state.focusIndex].height = action.payload.height
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
        case 'changeBgColor': {
            let compCollection = Object.assign([], state.compCollection)
            compCollection[state.focusIndex].bgColor = action.payload.bgColor
            return {
                ...state,
                compCollection
            }
        }
        default:
            return state;
    }
}