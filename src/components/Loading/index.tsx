import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_circular} />
    </div>
  );
};

export default Loading;
