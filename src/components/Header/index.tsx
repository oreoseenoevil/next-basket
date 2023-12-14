import { FC } from 'react';
import { BsCart4 } from 'react-icons/bs';
import styles from './Header.module.scss';
import useUserCart from '../../hooks/useUserCart';
import { Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '../../utils';
import heart from '../../assets/heart.svg';

interface HeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ searchValue, setSearchValue }) => {
  const { pathname } = useLocation();
  const { totalItems, total, wishlist } = useUserCart();

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <Link className={styles.header_logo} to="/">
          Next Basket
        </Link>
      </div>
      {pathname === '/' && (
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.header_search}
        />
      )}
      <div className={styles.header_right}>
        {pathname !== '/wishlist' && (
          <Link className={styles.header_wishlist} to="/wishlist">
            {wishlist.length > 0 && (
              <span className={`${styles.header_basketCount} animate__bounceIn`}>{wishlist.length}</span>
            )}
            <img src={heart} alt="wishlist" />
          </Link>
        )}
        {pathname !== '/basket' && (
          <Link className={styles.header_basket} to="/basket">
            {totalItems > 0 && <span className={`${styles.header_basketCount} animate__bounceIn`}>{totalItems}</span>}
            <BsCart4 />
          </Link>
        )}
        {pathname === '/basket' && (
          <div className={styles.header_title}>
            Basket Total: <span className={`${styles.header_total} animate__bounceIn`}>{formatCurrency(total)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
