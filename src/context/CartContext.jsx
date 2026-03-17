import { createContext, useContext, useReducer } from "react";

// -----------------------------------------------------------
// STEP 1: The initial state
// Load from localStorage if it exists, otherwise start empty
// -----------------------------------------------------------
const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [] };
  } catch {
    return { items: [] };
  }
};

// -----------------------------------------------------------
// STEP 2: The reducer — unchanged
// -----------------------------------------------------------
function cartReducer(state, action) {
  let newState;

  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...product, quantity }],
        };
      }
      break;
    }

    case "REMOVE_ITEM": {
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      break;
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        newState = {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        };
      }
      break;
    }

    case "CLEAR_CART": {
      newState = { ...state, items: [] };
      break;
    }

    default:
      return state;
  }

  // -----------------------------------------------------------
  // NEW: Save to localStorage after every state change
  // -----------------------------------------------------------
  localStorage.setItem("cart", JSON.stringify(newState));
  return newState;
}

// -----------------------------------------------------------
// STEP 3: The CartProvider — load from localStorage on startup
// -----------------------------------------------------------
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadCart()); // UPDATED

  const addItem = (product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () =>
    dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = state.items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("P", "").replace(",", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);