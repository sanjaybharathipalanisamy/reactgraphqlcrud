let initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return action.data;
    default: return state
  }
};

export default userReducer;