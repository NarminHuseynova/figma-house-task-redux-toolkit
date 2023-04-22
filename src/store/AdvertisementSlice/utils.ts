import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SORT_BY_DATE_ADDED_FILTER,
  SORT_BY_HIGHEST_PRICE_FILTER,
  SORT_BY_LOWEST_PRICE_FILTER,
} from "./constants";
import { IFilters } from "../../types";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (filters: IFilters) => {
    const params = makeParams(filters);
  }
);

function makeSortByParams(filters: IFilters) {
  if (filters.sort_by === SORT_BY_DATE_ADDED_FILTER.value) {
    return {
      _sort: SORT_BY_DATE_ADDED_FILTER.param,
      _order: "desc",
    };
  } else if (filters.sort_by === SORT_BY_HIGHEST_PRICE_FILTER.value) {
    return {
      _sort: SORT_BY_HIGHEST_PRICE_FILTER.param,
      _order: "desc",
    };
  } else if (filters.sort_by === SORT_BY_LOWEST_PRICE_FILTER.value) {
    return {
      _sort: SORT_BY_LOWEST_PRICE_FILTER.param,
      _order: "asc",
    };
  } else {
    return {};
  }
}

export function makeParams(filters: IFilters) {
  const sortByParams = makeSortByParams(filters);
  const typeParams = {
    ...(filters.type && { type: filters.type }),
  };

  return {
    ...sortByParams,
    ...typeParams,
    ...(filters.search && { q: filters.search.trim() }),
    _page: filters.page - 1,
  };
}
