const productsHandler = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    return { success: true, data: json };
  } catch (e) {
    return { success: false, error: e?.message || 'Unknown error' };
  }
};

export default productsHandler;
