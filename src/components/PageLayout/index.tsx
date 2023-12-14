import { Outlet } from 'react-router-dom';
import styles from './PageLayout.module.scss';
import Header from '../Header';
import useProducts from '../../hooks/useProducts';

const PageLayout = () => {
  const { searchValue, setSearchValue } = useProducts();

  return (
    <div className={styles.page_layout}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
