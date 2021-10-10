const cartItems = (state = [], action) => {
  switch (action.type) {
    case "add":
      if (!state.some((item) => item.name === action.payload.name)) {
        state.push(action.payload);
      }
      return [...state];
    case "remove":
      return [];
    case "quantity":
      state[action.payload.index].quantity += action.payload.quantity;
      if (state[action.payload.index].quantity === 0) {
        state.splice(action.payload.index, 1);
      }
      return [...state];
    default:
      return state;
  }
};

export default cartItems;
