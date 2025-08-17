import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import UserInputs from "./components/UserInputs";
import UserItemList from "./components/UserItemList";

function App() {
  // 화면 표시용
  const [productList, setProductList] = useState([]);
  const [selectedType, setSelectedType] = useState("유형 필터");
  const [selectedSort, setSelectedSort] = useState("정렬 기준");
  const [selectedStartDate, setSelectedStartDate] = useState("시작 기간");
  const [selectedEndDate, setSelectedEndDate] = useState("종료 기간");

  // 전체 목록 저장용
  const productListAll = useRef([]);

  // 필터 실행
  useEffect(() => {
    doFilter();
  }, [selectedType, selectedSort, selectedStartDate, selectedEndDate]);

  const productTypes = ["식료품", "잡화", "가전/전자"];
  const typeFilter = [
    { name: "유형 필터", val: "all" },
    { name: "식료품", val: "food" },
    { name: "잡화", val: "item" },
    { name: "가전/전자", val: "homeAppliances" },
  ];
  const sortFilter = [
    { name: "정렬 기준", val: "all" },
    { name: "가격 높은 순", val: "priceDesc" },
    { name: "가격 낮은 순", val: "priceAsc" },
    { name: "최신 순", val: "dateDesc" },
    { name: "오래된 순", val: "dateAsc" },
  ];

  const addProductHandler = (product) => {
    productListAll.current = [...productListAll.current, product];
    setProductList(productListAll.current);
  };

  const typeChangeHandler = (event) => {
    setSelectedType(event.target.value);
  };

  const sortChangeHandler = (event) => {
    setSelectedSort(event.target.value);
  };

  const startDateHandler = (startDate) => {
    setSelectedStartDate(new Date(startDate));
  };

  const endDateHandler = (endDate) => {
    setSelectedEndDate(new Date(endDate));
  };

  const doFilter = () => {
    let sortedList = productListAll.current;

    // 정렬
    if (selectedSort === "가격 높은 순") {
      sortedList.sort((a, b) => {
        return b.productPrice - a.productPrice;
      });
    } else if (selectedSort === "가격 낮은 순") {
      sortedList.sort((a, b) => {
        return a.productPrice - b.productPrice;
      });
    } else if (selectedSort === "최신 순") {
      sortedList.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (selectedSort === "오래된 순") {
      sortedList.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
    // 전체 리스트 갱신
    productListAll.current = sortedList;

    // 타입 필터
    const filteredList = sortedList.filter((item) => {
      if (selectedType && productTypes.includes(selectedType)) {
        console.log("필터 체크");
        return item.productType === selectedType;
      } else {
        // 선택된 필터가 없을 때는 필터 안하기
        return true;
      }
    });

    // 기간 필터
    let typeFilteredList = filteredList;
    const dateFilteredList = typeFilteredList.filter((item) => {
      if (
        selectedStartDate instanceof Date &&
        selectedEndDate instanceof Date
      ) {
        const itemDate = new Date(item.date);
        return itemDate >= selectedStartDate && itemDate <= selectedEndDate;
      } else {
        // 선택된 날짜가 없을 때는 필터 안하기
        return true;
      }
    });

    // 필터링 된 리스트 갱신
    setProductList(dateFilteredList);
  };

  return (
    <div className={styles.Wrapper}>
      <UserInputs typeList={productTypes} onAddProduct={addProductHandler} />
      <UserItemList
        productList={productList}
        filterList={[typeFilter, sortFilter]}
        selectedList={[selectedType, selectedSort]}
        onChangedFilter={[
          typeChangeHandler,
          sortChangeHandler,
          startDateHandler,
          endDateHandler,
        ]}
      />
    </div>
  );
}

export default App;

