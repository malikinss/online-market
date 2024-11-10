import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Registration from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import DeleteAccount from "./components/DeleteAccount";
import Basket from "./components/Basket";
import ChangePassword from "./components/ChangePassword";
import CreateCategory from "./components/CreateCategory";
import UpdateCategory from "./components/UpdateCategory";
import DeleteCategory from "./components/DeleteCategory";
import CreateItem from "./components/CreateItem";
import UpdateItem from "./components/UpdateItem";
import DeleteItem from "./components/DeleteItem";
import AdminPanel from "./components/AdminPanel";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import AuthContext from "./context/AuthProvider";

const App = () => {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [items, setItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/item", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched data:", data);
        setItems(data);
        setCurrentItems(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const addToOrder = (item) => {
    setOrders((prevOrders) => {
      const foundItem = prevOrders.find((el) => el.id === item.id);

      if (foundItem) {
        return prevOrders.map((order) =>
          order.id === item.id
            ? { ...order, counter: order.counter + 1 }
            : order
        );
      } else {
        return [...prevOrders, { ...item, counter: 1 }];
      }
    });
  };

  const deleteOrder = (id) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((item) =>
          item.id === id ? { ...item, counter: item.counter - 1 } : item
        )
        .filter((item) => item.counter > 0)
    );
  };

  const updateOrder = (id, newCounter) => {
    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item.id === id ? { ...item, counter: newCounter } : item
      )
    );
  };

  const chooseCategory = (category) => {
    console.log(category);
    setCurrentItems(
      category === "all"
        ? items
        : items.filter((item) => item.categoryId === category)
    );
  };

  const onShowItem = (item) => {
    setFullItem(item);
    setShowFullItem(!showFullItem);
  };

  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.counter,
    0
  );

  return (
    <Router>
      <div className="wrapper">
        <Header
          orders={orders}
          onDelete={deleteOrder}
          totalPrice={totalPrice}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories chooseCategory={chooseCategory} />
                <Items
                  onShowItem={onShowItem}
                  items={currentItems}
                  onAdd={addToOrder}
                  orders={orders}
                />
                {showFullItem && (
                  <ShowFullItem
                    onAdd={addToOrder}
                    onShowItem={onShowItem}
                    item={fullItem}
                  />
                )}
              </>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={auth ? <Account /> : <Navigate to="/login" replace />}
          />
          {/* <Route path="/account/change_password"element={<ChangePassword userId={userId} />}/> TO DO!!! */}
          <Route
            path="/account/basket"
            element={
              auth ? (
                <Basket
                  orders={orders}
                  totalPrice={totalPrice}
                  onDelete={deleteOrder}
                  onUpdate={updateOrder}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/account/admin_panel"
            element={
              auth?.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/account" replace />
              )
            }
          />
          <Route
            path="/account/update_user"
            element={auth ? <UpdateUser /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account/change_password"
            element={
              auth ? <ChangePassword /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/account/create_category"
            element={
              auth ? <CreateCategory /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/account/update_category"
            element={
              auth ? <UpdateCategory /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/account/delete_category"
            element={
              auth ? <DeleteCategory /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/account/create_item"
            element={auth ? <CreateItem /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account/update_item"
            element={auth ? <UpdateItem /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account/delete_item"
            element={auth ? <DeleteItem /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account/delete_user"
            element={auth ? <DeleteUser /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account/delete_account"
            element={
              auth ? <DeleteAccount /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
