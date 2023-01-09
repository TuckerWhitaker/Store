import React from "react";

// create the context
const CartContext = React.createContext();

// create a provider component
class CartProvider extends React.Component {
	state = {
		cart: [],
	};

	addToCart = (item) => {
		this.setState((prevState) => ({
			cart: [...prevState.cart, item],
		}));
	};

	removeFromCart = (item) => {
		this.setState((prevState) => ({
			cart: prevState.cart.filter((i) => i !== item),
		}));
	};

	render() {
		return (
			<CartContext.Provider
				value={{
					cart: this.state.cart,
					addToCart: this.addToCart,
					removeFromCart: this.removeFromCart,
				}}
			>
				{this.props.children}
			</CartContext.Provider>
		);
	}
}

// create a consumer component
const CartConsumer = CartContext.Consumer;

export { CartProvider, CartConsumer };
