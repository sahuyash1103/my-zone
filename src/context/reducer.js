export const initialState = {
  user: null,
};

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              cart: [...state.user.cart, action.item],
            },
          }
        : { user: null };

    case "REMOVE_FROM_CART":
      const index = state.user.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.user?.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in cart!`
        );
      }

      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              cart: newCart,
            },
          }
        : { user: null };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      console.log("default");
      return state;
  }
}

export default reducer;
