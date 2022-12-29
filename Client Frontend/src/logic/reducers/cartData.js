export const cartReducer = (state = [], actions) => {
  switch (actions.type) {
    case "ADD_ITEM": {
      const newQuantity = actions.payload.quantity + 1;
      actions.payload.quantity = newQuantity;
      if (newQuantity - 1 == 0) {
        state = [...state, actions.payload];
        return state;
      } else {
        let temp = state;
        state = temp.map((book) => {
          if (book.id === actions.payload.id) {
            return { ...book, quantity: newQuantity };
          } else return book;
        });
        return state;
      }
    }
    case "REMOVE_ITEM": {
      const newQuantity = actions.payload.quantity - 1;
      actions.payload.quantity = newQuantity;
      if (newQuantity == 0) {
        let temp = state;
        // console.log(temp)
        temp = temp.filter((ele) => {
          return ele.id !== actions.payload.id;
        });
        // console.log(temp);
        state = [...temp];
        return state;
      } else {
        let temp = state;
        state = temp.map((book) => {
          if (book.id === actions.payload.id) {
            return { ...book, quantity: newQuantity };
          } else return book;
        });
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
