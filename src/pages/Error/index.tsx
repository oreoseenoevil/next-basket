import styles from './Error.module.scss';
import { Link } from 'react-router-dom';
import { CiUndo } from 'react-icons/ci';

const ErrorPage = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfound_content}>
        <h1>404 | Page not Found</h1>
        <p>This is not the page you&apos;re looking for.</p>
        <Link to="/">
          <CiUndo /> Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
