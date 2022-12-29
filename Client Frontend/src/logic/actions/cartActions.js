export const incre = (payload) => {
  return {
    type: "ADD_ITEM",
    payload,
  };
};

export const decre = (payload) => {
  return {
    type: "REMOVE_ITEM",
    payload,
  };
};
export const fetchData = (payload) => {
  return {
    type: "FETCH_DATA",
    payload,
  };
};


