import { createPortal } from 'react-dom';
import ProductCard from '../../components/ProductCard';
import styles from './Wishlist.module.scss';
import useUserCart from '../../hooks/useUserCart';
import { useState } from 'react';
import { Product } from '../../context/Products';
import { formatCurrency } from '../../utils';
import close from '../../assets/close.svg';
import 'animate.css';

type NotificationState = {
  message: string;
  item: Product;
} | null;

function Wishlist() {
  const { addToCart, wishlist } = useUserCart();
  const [notification, setNotification] = useState<NotificationState>(null);

  return (
    <div className={styles.wishlist}>
      <div className={styles.wishlist_title}>Your Wishlist</div>
      <div className={styles.products}>
        {!!notification &&
          createPortal(
            <div className={`${styles.notification} animate__animated animate__bounceInRight animate__delay`}>
              <div className={styles.notification_message}>
                {notification.message}{' '}
                <div className={styles.notification_close} onClick={() => setNotification(null)}>
                  <img src={close} alt="close" />
                </div>
              </div>
              <div className={styles.notification_info}>
                <div className={styles.image}>
                  <img src={notification?.item.thumbnail} alt={notification?.item.title} />
                </div>
                <div className={styles.notification_details}>
                  <span className={styles.notification_title}>{notification?.item.title}</span>
                  <span className={styles.notification_price}>
                    {formatCurrency(
                      notification?.item.price - notification.item.price * (notification?.item.discountPercentage / 100)
                    )}
                  </span>
                </div>
              </div>
            </div>,
            document.getElementById('notification')!
          )}
        {wishlist.length > 0 &&
          wishlist.map((item) => (
            <ProductCard
              title={item.title}
              src={item.thumbnail}
              key={item.id}
              brand={item.brand}
              price={item.price}
              discountPercentage={item.discountPercentage}
              rating={item.rating}
              stock={item.stock}
              addToBasket={() => {
                addToCart({ ...item, quantity: 1 });
                setNotification({
                  message: 'Successfully added to basket',
                  item
                });
                setTimeout(() => {
                  setNotification(null);
                }, 5000);
              }}
              className="animate__animated animate__fadeIn"
            />
          ))}
      </div>
    </div>
  );
}

export default Wishlist;
