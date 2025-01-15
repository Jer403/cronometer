export const cardInitialState = JSON.parse(localStorage.getItem("cards")) || [];

export const updateLocalStorage = (state) => {
  localStorage.setItem("cards", JSON.stringify(state));
};

export const cardReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD": {
      const newState = [
        ...state,
        {
          ...actionPayload,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    }
    case "REMOVE": {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id != id);
      updateLocalStorage(newState);
      return newState;
    }
  }
  return state;
};
