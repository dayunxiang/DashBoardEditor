/**
 * 拖拽
 * @param {拖拽类型hu} type 
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

/**
 * 放置
 * @param {放置类型} type 
 */
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

/**
 * 聚焦
 * @param {聚焦索引} index 
 */
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

/**
 * 
 * @param {改变列宽} col 
 */
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

/**
 * 
 * @param {改变高度} height 
 */
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

/**
 * 
 * @param {改变背景颜色} bgColor 
 */
export function changeBgColor(bgColor) {
    return dispatch => {
        return dispatch({
            type: 'ChangeBgColor',
            payload: {
                bgColor: bgColor
            }
        })
    }
}

/**
 * 
 * @param {改变组件类型} compType 
 */
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

/**
 * 
 * @param {关闭索引} index 
 */
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

/**
 * 清空所有的组件
 */
export function emptyComp() {
    return dispatch => {
        return dispatch({
            type: 'EmptyComp',
        })
    }
}

/**
 * 
 * @param {导入组件} compCollection 
 */
export function setCompCollection(compCollection) {
    return dispatch => {
        return dispatch({
            type: 'SetCompCollection',
            payload: {
                compCollection
            }
        })
    }
}

/**
 * 是否全屏模式
 */
export function setFull(isFull, index) {
    return dispatch => {
        return dispatch({
            type: 'Full',
            payload: {
                isFull,
                index
            }
        })
    }
}

/**
 * 
 * @param {交换的索引} preIndex 
 * @param {被交换的索引} nextIndex 
 */
export function exchangeComp(preIndex, nextIndex) {
    return dispatch => {
        return dispatch({
            type: 'Exhange',
            payload: {
                preIndex,
                nextIndex
            }
        })
    }
}

/**
 * 
 * @param {行维度} rowDim 
 */
export function changeRowDim(rowDim) {
    let changeRowDim = Array.isArray(rowDim) ? rowDim : [rowDim]
    return dispatch => {
        return dispatch({
            type: 'ChangeRowDim',
            payload: {
                rowDim: changeRowDim
            }
        })
    }
}

/**
 * 
 * @param {列维度} colDim 
 */
export function changeColDim(colDim) {
    let changeColDim = Array.isArray(colDim) ? colDim : [colDim]
    return dispatch => {
        return dispatch({
            type: 'ChangeColDim',
            payload: {
                colDim: changeColDim
            }
        })
    }
}

/**
 * 
 * @param {其他值} renderValue 
 */
export function changeRenderValue(renderValue) {
    return dispatch => {
        return dispatch({
            type: 'ChangeRenderValue',
            payload: {
                renderValue
            }
        })
    }
}