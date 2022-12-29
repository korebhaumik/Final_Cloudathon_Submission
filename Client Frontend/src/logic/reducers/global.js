export const globalBoolReducer = (state = false, actions) => {
  switch (actions.type) {
    case "FLIP_BOOL": {
      state = true;
      return state;
    }
    case "MAINTAIN_BOOL": {
      state = true;
      return state;
    }
    default:
      return state;
  }
};
export const orderDataReducer = (state = [], actions) => {
  switch (actions.type) {
    case "SET_ORDER_DATA": {
      state = actions.payload;
      return state;
    }
    case "CLEAR_ORDER_DATA": {
      state = [];
      return state;
    }
    default:
      return state;
  }
};
