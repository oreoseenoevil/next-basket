import { forwardRef, HTMLAttributes, useMemo, useState } from 'react';
import styles from './ProductCard.module.scss';
import { formatCurrency } from '../../utils';
import heart from '../../assets/heart.svg';

import 'react-multi-carousel/lib/styles.css';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  src?: string;
  className?: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  addToBasket?: () => void;
  addToWishlist?: () => void;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { title, src, brand, className, price, discountPercentage = 0, rating = 0, stock = 0, addToBasket, addToWishlist },
    ref
  ) => {
    const [onHover, setOnHover] = useState<boolean>(false);

    const renderStars = useMemo(() => {
      const maxStars = 5;
      const filledStars = Math.floor(rating);
      const halfStar = rating - filledStars >= 0.5 ? 1 : 0;

      const starElements = Array.from({ length: filledStars }, (_, index) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" key={index}>
          <path
            d="M7.52447 1.46352C7.67415 1.00287 8.32585 1.00287 8.47553 1.46353L9.68386 5.18237C9.75079 5.38838 9.94277 5.52786 10.1594 5.52786H14.0696C14.554 5.52786 14.7554 6.14767 14.3635 6.43237L11.2001 8.73075C11.0248 8.85807 10.9515 9.08375 11.0184 9.28976L12.2268 13.0086C12.3764 13.4693 11.8492 13.8523 11.4573 13.5676L8.29389 11.2693C8.11865 11.1419 7.88135 11.1419 7.70611 11.2693L4.54267 13.5676C4.15081 13.8523 3.62357 13.4693 3.77325 13.0086L4.98157 9.28976C5.04851 9.08375 4.97518 8.85807 4.79994 8.73075L1.6365 6.43237C1.24464 6.14767 1.44603 5.52786 1.93039 5.52786H5.84062C6.05723 5.52786 6.24921 5.38838 6.31614 5.18237L7.52447 1.46352Z"
            fill="#1B1B1B"
          />
        </svg>
      ));

      if (halfStar) {
        starElements.push(
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" key="6">
            <path
              d="M8 1.46352L9.68386 5.18237C9.75079 5.38838 9.94277 5.52786 10.1594 5.52786H14.0696C14.554 5.52786 14.7554 6.14767 14.3635 6.43237L11.2001 8.73075C11.0248 8.85807 10.9515 9.08375 11.0184 9.28976L12.2268 13.0086C12.3764 13.4693 11.8492 13.8523 11.4573 13.5676L8 11.2693L4.54267 13.5676C4.15081 13.8523 3.62357 13.4693 3.77325 13.0086L4.98157 9.28976C5.04851 9.08375 4.97518 8.85807 4.79994 8.73075L1.6365 6.43237C1.24464 6.14767 1.44603 5.52786 1.93039 5.52786H5.84062C6.05723 5.52786 6.24921 5.38838 6.31614 5.18237L8 1.46352Z"
              fill="#D1D1D1"
            />
            <path
              d="M8 1.46352L8 11.2693C7.88135 11.1419 7.88135 11.1419 7.70611 11.2693L4.54267 13.5676C4.15081 13.8523 3.62357 13.4693 3.77325 13.0086L4.98157 9.28976C5.04851 9.08375 4.97518 8.85807 4.79994 8.73075L1.6365 6.43237C1.24464 6.14767 1.44603 5.52786 1.93039 5.52786H5.84062C6.05723 5.52786 6.24921 5.38838 6.31614 5.18237L8 1.46352Z"
              fill="#1B1B1B"
            />
          </svg>
        );
      }

      const remainingStars = Array.from({ length: maxStars - filledStars - halfStar }, (_, index) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" key={index + 5}>
          <path
            d="M7.52447 1.46352C7.67415 1.00287 8.32585 1.00287 8.47553 1.46353L9.68386 5.18237C9.75079 5.38838 9.94277 5.52786 10.1594 5.52786H14.0696C14.554 5.52786 14.7554 6.14767 14.3635 6.43237L11.2001 8.73075C11.0248 8.85807 10.9515 9.08375 11.0184 9.28976L12.2268 13.0086C12.3764 13.4693 11.8492 13.8523 11.4573 13.5676L8.29389 11.2693C8.11865 11.1419 7.88135 11.1419 7.70611 11.2693L4.54267 13.5676C4.15081 13.8523 3.62357 13.4693 3.77325 13.0086L4.98157 9.28976C5.04851 9.08375 4.97518 8.85807 4.79994 8.73075L1.6365 6.43237C1.24464 6.14767 1.44603 5.52786 1.93039 5.52786H5.84062C6.05723 5.52786 6.24921 5.38838 6.31614 5.18237L7.52447 1.46352Z"
            fill="#D1D1D1"
          />
        </svg>
      ));

      return [...starElements, ...remainingStars];
    }, [rating]);

    return (
      <div
        className={`${styles.card} ${className}`}
        ref={ref}
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className={styles.card_image}>
          {onHover && stock <= 0 && (
            <div className={styles.oos}>
              <span className={styles.oos_text}>Out of stock</span>
            </div>
          )}
          <img src={src} alt={title} className={`${onHover && stock <= 0 && styles.opacity}`} />
          {onHover && (
            <button className={styles.card_wishlist} onClick={addToWishlist}>
              <img src={heart} alt="wishlist" />
            </button>
          )}
        </div>
        <div className={styles.card_content}>
          {discountPercentage > 0 && <div className={styles.discount}>-{discountPercentage}%</div>}

          <div className={styles.card_info}>
            <div className={styles.card_brand}>{brand}</div>
            <div className={styles.content}>
              <h2>{title}</h2>
            </div>
          </div>
          <div className={styles.unit}>
            <div className={`${styles.unit_price} ${discountPercentage > 0 && styles.unit_strike}`}>
              {formatCurrency(price)}
            </div>
            {discountPercentage > 0 && (
              <div className={styles.unit_price}>{formatCurrency(price - price * (discountPercentage / 100))}</div>
            )}
          </div>
          <div className={styles.rating}>
            <div className={styles.rating_star}>{renderStars}</div>
            <div className={styles.rating_value}>{rating}</div>
          </div>
        </div>
        {onHover && (
          <button className={styles.buttons} onClick={addToBasket}>
            Add to Basket
          </button>
        )}
      </div>
    );
  }
);

export default ProductCard;
