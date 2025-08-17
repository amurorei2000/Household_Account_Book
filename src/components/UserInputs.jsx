import { useState } from "react";
import getCurrentDateFormatted from "../common/DateHelper";
import styles from "./UserInputs.module.css";

const UserInputs = (props) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productType, setProductType] = useState("식료품");
  const [date, setDate] = useState(getCurrentDateFormatted(new Date()));
  const [isMemo, setIsMemo] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [isPurchase, setIsPurchase] = useState(false);

  const onChangedName = (event) => {
    setProductName(event.target.value);
  };

  const onChangedPrice = (event) => {
    const value =
      event.target.value === "" ? 0 : Number.parseInt(event.target.value);
    setProductPrice(value);
  };

  const onChangedType = (event) => {
    setProductType(event.target.value);
  };

  const onChangedDate = (event) => {
    setDate(event.target.value);
  };

  const onChangedMemo = () => {
    setIsMemo(!isMemo);
  };

  const onChangedMemoText = (event) => {
    if (isMemo) {
      setMemoText(event.target.value);
    }
  };

  const onChangedPurchase = (event) => {
    setIsPurchase(event.target.value === "positive" ? true : false);
  };

  const addProductHandler = (event) => {
    event.preventDefault();

    props.onAddProduct({
      productName: productName,
      productPrice: productPrice,
      productType: productType,
      date: date,
      memo: memoText,
      purchase: isPurchase ? "재구매 의사 있음" : "재구매 의사 없음",
    });
  };

  return (
    <div className={styles.InputBox}>
      <form onSubmit={addProductHandler}>
        <div>
          <label htmlFor="product-name" className={styles.Label}>
            이름
          </label>
          <input
            type="text"
            className="product-name"
            value={productName}
            onChange={onChangedName}
          />
        </div>
        <div>
          <label htmlFor="product-price" className={styles.Label}>
            가격
          </label>
          <input
            type="text"
            className="product-price"
            value={productPrice}
            onChange={onChangedPrice}
          />
        </div>
        <div>
          <label htmlFor="product-type" className={styles.Label}>
            유형
          </label>
          <select
            className="product-type"
            value={productType}
            onChange={onChangedType}
          >
            {props.typeList.map((item, idx) => {
              return (
                <option key={`${item}_${idx}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={styles.Label}>
            구입 날짜
          </label>
          <input
            type="date"
            className="date"
            value={date}
            onChange={onChangedDate}
          />
        </div>
        <div>
          <label htmlFor="memo" className={styles.Label}>
            메모
            <input
              type="checkbox"
              className="memo"
              value={isMemo}
              onChange={onChangedMemo}
            />
          </label>
          <input
            type="text"
            className="memo-text"
            value={memoText}
            disabled={!isMemo}
            onChange={onChangedMemoText}
          />
        </div>
        <div>
          <label htmlFor="purchase" className={styles.Label}>
            재구매 의사
          </label>
          <label>
            <input
              type="radio"
              className="purchase__positive"
              value="positive"
              checked={isPurchase}
              onChange={onChangedPurchase}
            />
            한다
          </label>
          <label>
            <input
              type="radio"
              className="purchase_negative"
              value="negative"
              checked={!isPurchase}
              onChange={onChangedPurchase}
            />
            안한다
          </label>
        </div>
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default UserInputs;

