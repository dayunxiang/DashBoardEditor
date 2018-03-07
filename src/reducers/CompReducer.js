/**
 * Created by edeity on 2018/3/1.
 */
import appState from '../constants/appState';
import compState from '../constants/compState'

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

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
            newCompState.id = guid()
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
                isFull: false
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
            let focusIndex = state.focusIndex === currCloseIndex ? currCloseIndex - 1 : state.focusIndex
            return {
                ...state,
                focusIndex,
                compCollection,
                isFull: false
            }
        }
        case 'EmptyComp': {
            return {
                ...state,
                focusIndex: -1,
                compCollection: []
            }
        }
        case 'ChangeBgColor': {
            let compCollection = Object.assign([], state.compCollection)
            compCollection[state.focusIndex].bgColor = action.payload.bgColor
            return {
                ...state,
                compCollection
            }
        }
        case 'SetCompCollection': {
            return {
                ...state,
                compCollection: action.payload.compCollection
            }
        }
        case 'Full': {
            return {
                ...state,
                focusIndex: action.payload.index,
                isFull: action.payload.isFull
            }
        }
        case 'Exhange': {
            const preIndex = action.payload.preIndex
            const nextIndex = action.payload.nextIndex
            if(preIndex === nextIndex) {
                return {
                    ...state
                }
            } else {
                let compCollection = Object.assign([], state.compCollection)
                let preComp = compCollection[preIndex]
                let nextComp = compCollection[nextIndex]
                compCollection[preIndex] = nextComp
                compCollection[nextIndex] = preComp
                return {
                    ...state,
                    focusIndex: action.payload.nextIndex,
                    compCollection
                }
            }
        }
        default:
            return state;
    }
}