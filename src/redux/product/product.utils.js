export const editProducts = (products, productToEdit) => {
  const existingProduct = products.filter((p) => p._id === productToEdit._id);
  const index = products.indexOf(existingProduct[0]);
  return [
    ...products.slice(0, index),
    {
      ...productToEdit,
    },
    ...products.slice(index + 1),
  ];
};

export const deleteProduct = (products, id) => {
  return products.filter((p) => JSON.stringify(p._id) !== JSON.stringify(id));
};
