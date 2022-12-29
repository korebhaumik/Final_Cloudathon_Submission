import data from "../data";

export const dataReducer = (state = [], actions) => {
  switch (actions.type) {
    case "FETCH_BOOKS_DATA": {
      const payload = actions.payload;
      const state = payload.map((item) => {
        return { ...item, quantity: 0 };
      });
      // let temp = [...payload];
      return state;
    }

    case "REMOVE_ITEM": {
      const bookId = actions.payload.id;
      let temp = state;
      state = temp.filter((book) => {
        return book.id != bookId;
      });
      return state;
    }
    default: {
      return state;
    }
  }
};
