export const paymentBool = () => {
  return {
    type: "FLIP_BOOL",
  };
};

export const setOrder = (payload) => {
  return {
    type: "SET_ORDER_DATA",
    payload,
  };
};
