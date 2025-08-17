import styles from "./UserItemList.module.css";

const ItemFilter = ({ filterList, selectedFilter, onChangedFilter }) => {
  return (
    <select
      className={styles.Filter__selection}
      value={selectedFilter}
      onChange={onChangedFilter}
    >
      {filterList.map((filter, idx) => (
        <option key={`${filter.name}_${idx}`} value={filter.name}>
          {filter.name}
        </option>
      ))}
    </select>
  );
};

export default ItemFilter;

