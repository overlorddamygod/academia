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
      setValue(data.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return [value, loading, error];
};

export { useCollection };
