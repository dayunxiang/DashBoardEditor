export function newDashPanel(panelName) {
    return dispatch => {
        return dispatch({
            type: 'NewPanel',
            payload: {
                panelName: panelName
            }
        })
    }
}