export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

const notification = (state = [], action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export default notification