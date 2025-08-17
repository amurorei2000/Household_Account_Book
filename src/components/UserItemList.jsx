import { useState } from "react";
import UserItem from "./UserItem";
import getCurrentDateFormatted from "../common/DateHelper";
import ItemFilter from "./ItemFilter";
import styles from "./UserItemList.module.css";

const UserItemList = (props) => {
  const [startDate, setStartDate] = useState(
    getCurrentDateFormatted(new Date())
  );
  const [endDate, setEndDate] = useState(getCurrentDateFormatted(new Date()));

  const onStartDateChange = (event) => {
    setStartDate(event.target.value);
    props.onChangedFilter[2](event.target.value);
  };

  const onEndDateChange = (event) => {
    setEndDate(event.target.value);
    props.onChangedFilter[3](event.target.value);
  };

  return (
    <div>
      <div className={styles.Filter}>
        <ItemFilter
          filterList={props.filterList[0]}
          selectedFilter={props.selectedList[0]}
          onChangedFilter={props.onChangedFilter[0]}
        />
        <ItemFilter
          filterList={props.filterList[1]}
          selectedFilter={props.selectedList[1]}
          onChangedFilter={props.onChangedFilter[1]}
        />
        <input
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          className={styles.Filter__selection}
        />
        <input
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          className={styles.Filter__selection}
        />
      </div>
      <div className={styles.ListBox}>
        <ul>
          {props.productList.map((product, idx) => (
            <UserItem key={`${product.productName}_${idx}`} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserItemList;

