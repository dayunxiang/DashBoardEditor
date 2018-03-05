/**
 * Created by edeity on 2018/3/1.
 */
export function dragComponent(type) {
    return dispatch => {
        return dispatch({
            type: 'Drag',
            payload: {
                compType: type
            }
        })
    }
}

export function dropComponent(type) {
    return dispatch => {
        return dispatch({
            type: 'Drop',
            payload: {
                compType: type
            }
        })
    }
}

export function focusComponent(index) {
    return dispatch => {
        return dispatch({
            type: 'Focus',
            payload: {
                index: index
            }
        })
    }
}

export function changeCol(col) {
    return dispatch => {
        return dispatch({
            type: 'ChangeCol',
            payload: {
                col: col
            }
        })
    }
}

export function changeHeight(height) {
    return dispatch => {
        return dispatch({
            type: 'ChangeHeight',
            payload: {
                height: height
            }
        })
    }
}

export function changeBgColor(bgColor) {
    return dispatch => {
        return dispatch({
            type: 'changeBgColor',
            payload: {
                bgColor: bgColor
            }
        })
    }
}

export function changeComp(compType) {
    return dispatch => {
        return dispatch({
            type: 'ChangeComp',
            payload: {
                compType: compType
            }
        })
    }
}

export function closeComp(index) {
    return dispatch => {
        return dispatch({
            type: 'CloseComp',
            payload: {
                index: index
            }
        })
    }
}

export function emptyComp() {
    return dispatch => {
        return dispatch({
            type: 'EmptyComp',
        })
    }
}