export const orderReducer = (state = [], actions) => {
  switch (actions.type) {
    case "FETCH_ORDER_DATA": {
      state = actions.payload;
      return state;
    }
    case "REMOVE_ORDER": {
      const orderId = actions.payload;
      let temp = state;
      state = temp.filter((order) => {
        return order.orderId != orderId;
      });
      return state;
    }
    default: {
      return state;
    }
  }
};

export const boolReducer = (state = false, actions) => {
  switch (actions.type) {
    case "MAINTAIN_BOOL": {
      state = false;
      return state;
    }
    case "CHANGE_BOOL": {
      state = true;
      return state;
    }
    default: {
      return state;
    }
  }
};
