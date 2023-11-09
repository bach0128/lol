import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "../core/hook";
import "../assets/product.scss";
import { main } from "../api/main";
import { toast } from "react-toastify";

export default function Products() {
  // const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const limit = 8;
    const { data, response } = await main.getProduct(limit);

    if (response.ok) {
      setProduct([...product, ...data.data]);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = (id, name, price) => {
    if (cart.length > 0) {
      if (cart.some((item) => item.id === id)) {
        cart.map((item) => {
          if (item.id === id) {
            item.quantity = item.quantity + 1;
          }
        });
        setCart([...cart]);
        main.postOrder([...cart]);
      } else {
        setCart([...cart, { id: id, name: name, price: price, quantity: 1 }]);
        main.postOrder([
          ...cart,
          { id: id, name: name, price: price, quantity: 1 },
        ]);
      }
    } else {
      setCart([...cart, { id: id, name: name, price: price, quantity: 1 }]);
      main.postOrder([
        ...cart,
        {
          id: id,
          name: name,
          price: price,
          quantity: 1,
        },
      ]);
    }
  };

  const handlePayment = () => {
    toast.success("Thanh toán thành công");
    setCart([]);
  };
  return (
    <Fragment key={2}>
      {/* <button onClick={getProduct}>click</button> */}
      <div className="product">
        <div className="container p-4 justify-content-center align-items-center">
          <h1 className="font-bold text-white">Welcome to Shop!</h1>
          <div className="row">
            {product.map((item) => (
              <div className="col-3 product-item" key={item._id}>
                <img
                  src="https://picsum.photos/200/300"
                  alt=""
                  className="img-item rounded"
                />
                <h2 className="item-name">{item.name}</h2>
                <div className="wrap">
                  <h3>${item.price}</h3>
                  <button
                    onClick={() => {
                      handleAddToCart(item._id, item.name, item.price);
                    }}
                    className="add btn btn-hover-bg-shade-amount"
                    type="button"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cart p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
              <th scope="col">Tổng tiền</th>
            </tr>
          </thead>
          <tbody className="table-group-divider" key={3}>
            {cart.map((item) => (
              <tr key={item.id}>
                <th className="item-name" scope="row">
                  {item.name}
                </th>
                <td className="item-quantity">{item.quantity}</td>
                <td className="item-price">{item.price}</td>
                <td className="item-total">{+item.quantity * +item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="payment btn btn-outline-primary"
          onClick={handlePayment}
        >
          Thanh toán
        </button>
      </div>
    </Fragment>
  );
}
