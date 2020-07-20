export const addItemToCart = (cartItems, cartItemToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: (cartItem.quantity + 1)} : cartItem
        ); //WILL RETURN A NEW ARRRAY : NEED TO RETURN NEW VERSIONS OF STATE SO THAT COMPONENTS KNOW TO RERENDER PROPERLY 
    }

return [...cartItems, {...cartItemToAdd, quantity: 1}];

}; 

