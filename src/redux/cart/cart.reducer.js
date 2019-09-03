import CartActionTypes from './cart.types';
/* Why not { CartActionTypes }? */
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM: //Add new item to array
            return{
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)                
            };
         case CartActionTypes.REMOVE_ITEM: //remove item (quantity minus 1)
            return{
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART: //remove item from array
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem =>cartItem.id!==action.payload.id)
            };
        default:
            return state; 
    }
}

export default cartReducer;
