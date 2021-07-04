import { useState, useEffect } from "react";

const useCollection = (collection) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setLoading(true);
    try {
      const data = await collection.get();
      setLoading(false);
      setValue(docsAddId(data));
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return [value, loading, error];
};

const useCollectionLazy = (collection,orderBy, direction = "desc",limit = 10) => {
  const [query, setQuery] = useState(collection)
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getInitialData();
  }, [query]);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const data = await query.orderBy(orderBy, direction).limit(limit).get();
      setValue(docsAddId(data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error(err)
    }
  };

  const getMoreData = async () => {
    console.log("GETTING MORE DATA")
    try {
      const data = await query.orderBy(orderBy, direction).startAfter(value[value.length-1][orderBy]).limit(limit).get();
      setValue(prevValue=>[...prevValue,...docsAddId(data)]);
    } catch (err) {
      setError(err);
      console.error(err)
    }
  };

  const onRefresh = async () => {
    getInitialData()
  }

  return {value, loading, error, getMoreData, onRefresh, setQuery};
};

const docsAddId = (data) => data.docs.map((d) => ({ id: d.id, ...d.data() }))

export { useCollection, useCollectionLazy };
