import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setItems, setLoading, setError } from "./AdvertisementSlice";

export const RootStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetch("/items")
      .then((response) => response.json())
      .then((items) => {
        dispatch(setItems(items));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const loading = useSelector((state: any) => state.advertisement.loading);
  const items = useSelector((state: any) => state.advertisement.items);
  const error = useSelector((state: any) => state.advertisement.error);

  return { loading, items, error };
};
