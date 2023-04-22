import styles from "./Home.module.scss";
import { useCallback, useState } from "react";
import SelectFilters from "./SelectFilters";
import { Skeleton } from "antd";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeFilters,
  IAdvertisementItemStore,
  IDropDownSelect,
} from "../types";
import {
  setFilters,
  setPage,
  setSearchValue,
  setSortBy,
  setType,
} from "../store/AdvertisementSlice";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  const { filters, items, isLoading } = useSelector<
    any,
    IAdvertisementItemStore
  >((state) => state.advertisementStore);

  const onFiltersChange = useCallback(
    (value: string, field: string) => {
      if (field !== HomeFilters.PAGE) {
        dispatch(
          setFilters({
            ...filters,
            [field]: value,
          })
        );
        return;
      }
      dispatch(setPage(Number(value)));
    },
    [dispatch, filters]
  );

  const onSearchButtonClick = useCallback(() => {
    dispatch(setSearchValue(search));
    onFiltersChange(search, HomeFilters.SEARCH);
  }, [dispatch, onFiltersChange, search]);

  const onSortByChange = useCallback(
    (e: IDropDownSelect) => {
      dispatch(setSortBy(e?.value));
      console.log(e);
      onFiltersChange(e?.value, HomeFilters.SORT_BY);
    },
    [dispatch, onFiltersChange]
  );

  const onTypeChange = useCallback(
    (e: IDropDownSelect) => {
      dispatch(setType(e?.value));
      onFiltersChange(e?.value, HomeFilters.TYPE);
    },
    [dispatch, onFiltersChange]
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterSelectTopBorder}>
        <div className={styles.filterSelectContainer}>
          <SelectFilters
            onSortByChange={onSortByChange}
            onTypeChange={onTypeChange}
            onReset={function (): void {
              throw new Error("Function not implemented...");
            }}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Search
          value={search}
          onEnter={onSearchButtonClick}
          isLoading={isLoading}
          onClick={onSearchButtonClick}
          onChange={(e) => setSearch(e)}
          hideButton={false}
        />
        <div className={styles.advertisementContainer}>
          {!isLoading &&
            items.map((item) => (
              <div className={styles.advertisementListContainer} key={item.id}>
                {isLoading ? (
                  <Skeleton
                    active
                    avatar={{ shape: "square" }}
                    paragraph={{ rows: 3 }}
                  />
                ) : (
                  <List item={item} search={search} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
