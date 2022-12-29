export const fetchData = (payload) => {
  return {
    type: "FETCH_BOOKS_DATA",
    payload,
  };
};

export const fetchOrder = (payload) => {
  return {
    type: "FETCH_ORDER_DATA",
    payload,
  };
};

export const removeOrder = (payload) => {
  return {
    type: "REMOVE_ORDER",
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: "REMOVE_ITEM",
    payload,
  };
};
