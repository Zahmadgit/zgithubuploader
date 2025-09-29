import React, { useState, useEffect } from "react";

const Products = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const countHandler = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await window.productAPI.getProducts();
      if (result?.success) {
        setData(result.data?.products || []);
        console.log(result.data);
      } else {
        console.log(result?.error || "Failed to fetch products");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => countHandler()}>
        Press me to increment that count above me
      </button>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
