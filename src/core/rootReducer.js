// khai bao cac type action, update state

export const initialState = {
  cart: [],
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case "orders/post": {
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "payment/post": {
      return { ...state };
    }

    default: {
      return state;
    }
  }
};
