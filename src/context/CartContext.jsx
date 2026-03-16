// ============================================================
// src/context/CartContext.jsx
// ------------------------------------------------------------
// This file creates the "Cart Brain" for the whole app.
//
// Think of Context like a shared whiteboard that ANY component
// in your app can read from or write to — without having to
// pass props through every parent component manually.
//
// useReducer is like a traffic controller for state changes.
// Instead of calling setState directly, you dispatch an
// "action" (like { type: "ADD_ITEM" }) and the reducer
// function decides how the state should change.
// ============================================================

import { createContext, useContext, useReducer } from "react";

// -----------------------------------------------------------
// STEP 1: Create the Context object.
// This is like creating the whiteboard. It starts empty (null).
// -----------------------------------------------------------
const CartContext = createContext(null);

// -----------------------------------------------------------
// STEP 2: The Reducer Function
//
// A reducer takes two arguments:
//   - state: the current cart data
//   - action: an object describing what happened
//             (e.g. { type: "ADD_ITEM", payload: product })
//
// It must return the NEW state. It never changes the old
// state directly — it always returns a fresh copy.
// -----------------------------------------------------------
function cartReducer(state, action) {
  switch (action.type) {

    // -------------------------------------------------------
    // ADD_ITEM: User clicked "Add to Cart"
    // -------------------------------------------------------
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;

      // Check if this product is already in the cart
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Product is already in cart → just increase its quantity
        return {
          ...state, // keep everything else the same
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity } // update this one
              : item // leave all others unchanged
          ),
        };
      } else {
        // Product is NOT in cart yet → add it as a new entry
        return {
          ...state,
          items: [...state.items, { ...product, quantity }],
          // [...state.items, newItem] means: copy all existing items + add the new one
        };
      }
    }

    // -------------------------------------------------------
    // REMOVE_ITEM: User clicked the remove/delete button
    // -------------------------------------------------------
    case "REMOVE_ITEM": {
      return {
        ...state,
        // Keep every item EXCEPT the one with this id
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    // -------------------------------------------------------
    // UPDATE_QUANTITY: User changed the qty number in cart
    // -------------------------------------------------------
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      // If they set quantity to 0 or less, just remove the item
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    // -------------------------------------------------------
    // CLEAR_CART: Empty the whole cart (useful after checkout)
    // -------------------------------------------------------
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    // If an unknown action type is dispatched, return state unchanged
    default:
      return state;
  }
}

// -----------------------------------------------------------
// STEP 3: The CartProvider Component
//
// This wraps around your whole app (in main.jsx) so that
// every child component can access the cart.
// -----------------------------------------------------------
export function CartProvider({ children }) {
  // useReducer(reducerFunction, initialState)
  // state   = the current cart data
  // dispatch = the function you call to trigger changes
  const [state, dispatch] = useReducer(cartReducer, {
    items: [], // The cart starts empty
  });

  // -----------------------------------------------------------
  // These are the "action creators" — friendly functions that
  // components can call instead of writing dispatch({...}) manually.
  // -----------------------------------------------------------

  // Add a product to the cart (quantity defaults to 1 if not specified)
  const addItem = (product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  // Remove a product from the cart by its id
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  // Change the quantity of a specific item
  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  // Empty the whole cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // -----------------------------------------------------------
  // Derived values — calculated from state, not stored separately.
  // These update automatically whenever state.items changes.
  // -----------------------------------------------------------

  // Total number of items (e.g. 3 wines + 2 roses = 5)
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Total price as a number — we strip "P" and commas first
  // e.g. "P1,890.00" → 1890.00
  const totalPrice = state.items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("P", "").replace(",", ""));
    return sum + price * item.quantity;
  }, 0);

  // -----------------------------------------------------------
  // STEP 4: Provide all the cart data and functions to children.
  // Any component that calls useCart() will get this object.
  // -----------------------------------------------------------
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// -----------------------------------------------------------
// STEP 5: Custom hook — useCart()
//
// Instead of writing useContext(CartContext) everywhere,
// components just call useCart() for a cleaner import.
// -----------------------------------------------------------
export function useCart() {
  return useContext(CartContext);
}