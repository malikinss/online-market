import React, { useState, useContext } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Order from "./Order";

const showOrders = (props) => {
    let summa = 0;
    props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));
    return (
        <div>
            {props.orders.map((el) => (
                <Order onDelete={props.onDelete} key={el.id} item={el} />
            ))}
            <p className="summa">
                Total price: {props.totalPrice.toFixed(2)} ₪
            </p>
        </div>
    );
};

const showNothing = () => {
    return (
        <div className="empty">
            <h2>Basket is empty</h2>
        </div>
    );
};

export default function Header(props) {
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        setAuth(null); // Reset Authorization State
        navigate("/"); // Redirect to the main page
    };

    return (
        <header>
            <div>
                <span className="logo">OnlineMarket</span>
                <ul className="nav">
                    <li onClick={() => navigate("/")}>Home</li>
                    {auth ? (
                        <>
                            <li onClick={() => navigate("/account")}>
                                Account
                            </li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <li onClick={() => navigate("/login")}>Login</li>
                    )}
                </ul>
                <TiShoppingCart
                    onClick={() => setCartOpen(!cartOpen)}
                    className={`shop-cart-button ${cartOpen && "active"}`}
                />

                {cartOpen && (
                    <div className="shop-cart">
                        {props.orders.length > 0
                            ? showOrders(props)
                            : showNothing()}
                    </div>
                )}
            </div>
            <div className="presentation"></div>
        </header>
    );
}
