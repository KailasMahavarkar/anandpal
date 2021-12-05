import * as ActionTypes from "../actions/ActionTypes";
import produce from "immer";

const initalCartState = {
	cart: {},
    lastorder: {},
	total: 0,
	subtotal: 0,
	quantity: 0,
	discount: 0,
};

export const cartReducer = (state = initalCartState, action) => {
	switch (action.type) {
		case ActionTypes.CARD_ADD_SINGLE_ITEM:
			// add item to cart
			return produce(state, (draft) => {
				const item = action.payload;

				// item not in state.cart
				if (!(item._id in state.cart)) {
					draft["cart"][item._id] = {
						...item,
						itemQuantity: 1,
						itemTotal: item.discount_price,
						timeAdded: new Date(),
					};

					// global total
					draft.total += item.discount_price;

					// global subtotal
					draft.subtotal += item.price;

					draft.discount += item.price - item.discount_price;

					// gloabl quantity
					draft.quantity += 1;
				}
			});

		case ActionTypes.CART_INCREMENT_ITEM:
			return produce(state, (draft) => {
				const payload_id = action.payload.id;
				const itemCheck = payload_id in draft.cart;
				const item = draft.cart[payload_id];

				if (itemCheck && item.available_quantity > item.itemQuantity) {
					item.itemQuantity += 1;
					draft.cart[payload_id]["itemTotal"] =
						item.discount_price * item.itemQuantity;
					draft.itemTotal += item.discount_price;

					// global total
					draft.total += item.discount_price;

					// global subtotal
					draft.subtotal += item.price;

					// gloabl quantity
					draft.quantity += 1;

					// global discount
					draft.discount += item.price - item.discount_price;
				}
			});

		case ActionTypes.CART_DECREMENT_ITEM:
			return produce(state, (draft) => {
				const payload_id = action.payload.id;
				const itemCheck = payload_id in draft.cart;
				const item = draft.cart[payload_id];

				if (itemCheck && item.itemQuantity >= 0) {
					console.log("x -->", item.itemQuantity);

					if (item.itemQuantity === 1) {
						delete draft.cart[payload_id];

						// global total
						draft.total -= item.discount_price;

						// global subtotal
						draft.subtotal -= item.price;

						// gloabl quantity
						draft.quantity -= 1;

						// global discount
						draft.discount -= item.price - item.discount_price;
						return;
					}

					item.itemQuantity -= 1;
					draft.cart[payload_id]["itemTotal"] =
						item.discount_price * item.itemQuantity;

					// global total
					draft.total -= item.discount_price;

                    // global subtotal
                    draft.subtotal -= item.price;

					// gloabl quantity
					draft.quantity -= 1;

					// global discount
					draft.discount -= item.price - item.discount_price;
				}
			});

		case ActionTypes.CART_CLEAR:
			return initalCartState;

        case ActionTypes.LAST_ORDER:
            return state.lastorder;
            
		default:
			return state;
	}
};
