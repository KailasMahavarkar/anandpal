import ACTIONS from "./actions";

function blogReducer(state, action) {
	let newState = { ...state };
	switch (action.type) {
        case ACTIONS.BLOG_STATE:
            newState = action.payload;
            break;
		case ACTIONS.BLOG_UPDATE_TITLE:
			newState["title"] = action.payload;
			break;
		case ACTIONS.BLOG_UPDATE_AUTHOR:
			newState["author"] = action.payload;
			break;
        case ACTIONS.BLOG_UPDATE_STATUS:
            newState["status"] =  action.payload ? false : true 
            break;
		default:
			return newState;
	}
	return newState;
}

export default blogReducer;