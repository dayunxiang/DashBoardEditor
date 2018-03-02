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
