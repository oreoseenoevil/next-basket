import useUserCart from '../../hooks/useUserCart';
import { formatCurrency } from '../../utils';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, changeQuantity } = useUserCart();

  return (
    <div className={styles.cart}>
      <div className={styles.cart_content}>
        {cart.length <= 0 && (
          <div className={styles.cart_empty}>
            <div className={styles.empty_message}>
              Continue shopping to enjoy the best discounts applied automatically to your items!
            </div>
            <Link className={styles.empty_button} to="/">
              Continue Shopping
            </Link>
          </div>
        )}
        {cart.length > 0 &&
          cart.map((item) => (
            <div className={styles.cart_row} key={item.id}>
              <div className={styles.item_left}>
                <div className={styles.cart_image}>
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className={styles.item_info}>
                  <span className={styles.item_title}>{item.title}</span>
                  <span className={styles.row}>
                    <input
                      type="number"
                      value={item.quantity}
                      className={styles.item_qty}
                      onChange={(e) => changeQuantity(item.id, +e.target.value)}
                    />
                    <span className={styles.item_price}>
                      x {formatCurrency(item.price - item.price * (item.discountPercentage / 100))}
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.item_right}>
                <span className={styles.item_total}>
                  {formatCurrency((item.price - item.price * (item.discountPercentage / 100)) * item.quantity)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
