const initialState = {
  selected: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
