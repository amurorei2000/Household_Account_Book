import styles from "./UserItem.module.css";

const UserItem = ({ product }) => {
  return (
    <li className={styles.ItemBox}>
      <div className={styles.Item}>{product.productType}</div>
      <div className={styles.Item}>{product.productName}</div>
      <div className={styles.Item}>{product.productPrice}원</div>
      <div className={styles.Item}>{product.date}</div>
      <div className={styles.Item}>{product.purchase}</div>
    </li>
  );
};

export default UserItem;

