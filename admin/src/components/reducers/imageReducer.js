import ACTIONS from "./actions";

function imageReducer(state, action) {
	let newState = [...state]
	switch (action.type) {
        case ACTIONS.PRODUCT_STATE:
            return action.payload;
		case ACTIONS.UPDATE_ZERO:
			newState[0] = action.payload;
			break;
		case ACTIONS.UPDATE_ONE:
			newState[1] = action.payload;
			break;
		case ACTIONS.UPDATE_TWO:
			newState[2] = action.payload;
			break;
		case ACTIONS.UPDATE_THREE:
			newState[3] = action.payload;
			break;
		default:
			return newState;
	}
	return newState;
}

export default imageReducer;