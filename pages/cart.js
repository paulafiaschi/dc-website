import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { incrementQuantity, decrementQuantity, removeFromCart } from "./redux/cart.slice";

import getStripe from "../lib/getStripe";

import styles from "../styles/Cart.module.scss";

export default function Cart() {
  async function handleCheckout() {
    const stripe = await getStripe();
    console.log("handle checkout");
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: `price_1MD1S6GDi8cV7qeJ3uwoluIS`,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: "customer@email.com",
    });
    console.warn(error.message);
  }

  // Extracting cart state from redux store
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  function getTotalPrice() {
    return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
  }

  return (
    <>
      <h1>Cart</h1>
      <div className={styles.cart_section}>
        {cart.length === 0 ? (
          <div className={styles.empty_cart}>Your Cart is Empty!</div>
        ) : (
          <>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
              {cart.map((item) => (
                <tr className={styles.cart_item} key={item._id}>
                  <td className={styles.cart_image}>
                    <Image src={item.img} height="90" width="90" alt={item.name} responsive />

                    <p>{item.name}</p>
                  </td>
                  <td>{item.price}</td>

                  <td>
                    <div className={styles.cart_quantity}>
                      <button onClick={() => dispatch(decrementQuantity(item._id))}>-</button> <span>{item.quantity}</span> <button onClick={() => dispatch(incrementQuantity(item._id))}>+</button>
                    </div>
                  </td>
                  <td>{item.quantity * item.price} dkk</td>
                  <td className={styles.cart_remove}>
                    <button onClick={() => dispatch(removeFromCart(item._id))}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <aside className={styles.cart_summary}>
              <h2>Summary</h2>
              <p>Subtotal: {getTotalPrice()} dkk</p>
              <p>Delivery: 0 dkk</p>
            </aside>
          </>
        )}

        <button onClick={handleCheckout}>Go to checkout</button>
      </div>
    </>
  );
}
