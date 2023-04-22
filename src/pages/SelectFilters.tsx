import { useDispatch, useSelector } from "react-redux";
import {
  ADVERTISEMENT_TYPE_FILTER_VALUES,
  SORT_BY_FILTER_VALUES,
} from "../store/AdvertisementSlice/constants";
import { IFilters, ISelectFilters } from "../types";
import { useEffect } from "react";
import { loadItems } from "../store/AdvertisementSlice";
import Select from "../components/Select/Select";
import styles from "./Home.module.scss";

function SelectFilters({ onSortByChange, onTypeChange }: ISelectFilters) {
  const handleClick = () => {
    window.location.reload();
  };
  const dispatch = useDispatch();
  const filters = useSelector<any, IFilters>(
    (state) => state.advertisementStore.filters
  );

  useEffect(() => {
    console.log(filters);
    dispatch(loadItems());
  }, [filters]);

  return (
    <>
      <Select
        onChange={onSortByChange}
        value={filters.sort_by}
        label={"Sort by"}
        options={SORT_BY_FILTER_VALUES}
      />
      <Select
        onChange={onTypeChange}
        value={filters.type}
        style={{ marginTop: "15px" }}
        label={"Type"}
        options={ADVERTISEMENT_TYPE_FILTER_VALUES}
      />
      <button className={styles.button} onClick={handleClick}>
        Reload
      </button>
    </>
  );
}

export default SelectFilters;
