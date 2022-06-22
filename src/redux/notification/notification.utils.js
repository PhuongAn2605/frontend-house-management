import moment from "moment";

export const filterExpireProducts = (products) => {
  const filteredProducts = products.filter((p) => isExpire(p) && p);
  return filteredProducts;
};

export const isExpire = (product) => {
  return (
    moment(product.expiration).isBefore(moment()) ||
    (moment(product.expiration).isBefore(moment().add(30, "days")))
      
  );
};
