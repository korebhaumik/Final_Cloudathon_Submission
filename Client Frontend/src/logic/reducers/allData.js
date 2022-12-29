import data from "../data";

export const dataReducer = (state = [], actions) => {
  switch (actions.type) {
    case "FETCH_DATA": {
      const payload = actions.payload;
      const state = payload.map((item) => {
        return { ...item, quantity: 0 };
      });
      // let temp = [...payload];
      return state;
    }
    case "ADD_ITEM": {
      const newQuantity = actions.payload.quantity + 1;
      let temp = state;
      state = temp.map((book) => {
        if (book.id === actions.payload.id) {
          return { ...book, quantity: newQuantity };
        } else return book;
      });
      return state;
    }

    case "REMOVE_ITEM": {
      const newQuantity = actions.payload.quantity - 1;
      let temp = state;
      state = temp.map((book) => {
        if (book.id === actions.payload.id) {
          return { ...book, quantity: newQuantity };
        } else return book;
      });
      return state;
    }
    default: {
      return state;
    }
  }
};
