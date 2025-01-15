import { createContext, useReducer } from "react";
import { cardInitialState, cardReducer } from "../reducers/card.js";

export const CardContext = createContext();

function useCardReducer() {
  const [state, dispatch] = useReducer(cardReducer, cardInitialState);

  const addCard = (product) =>
    dispatch({
      type: "ADD",
      payload: product,
    });

  const removeCard = (product) =>
    dispatch({
      type: "REMOVE",
      payload: product,
    });

  return { state, addCard, removeCard };
}

export function CardProvider({ children }) {
  const { state, addCard, removeCard } = useCardReducer();

  return (
    <CardContext.Provider
      value={{
        cards: state,
        addCard,
        removeCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
