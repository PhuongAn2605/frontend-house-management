import { HeaderStyle, ProductStyle } from "./ExpireProduct.js";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { connect } from "react-redux";
import { useEffect } from "react";
import isEmpty from "is-empty";
import { getExpireProductNoti } from "../../redux/notification/notification.actions.js";
import moment from "moment";

const ExpireProduct = ({
  products,
  getExpireProductNoti,
  expireProducts,
  visit,
}) => {
  useEffect(() => {
    if (!isEmpty(products)) {
      getExpireProductNoti(products);
    }
  }, [products, visit, getExpireProductNoti]);

  return (
    <div>
      <HeaderStyle>Sản phẩm sắp hết hạn</HeaderStyle>
      {!isEmpty(expireProducts) ? (
        expireProducts.map((p) => (
          <ProductStyle key={p._id}>
            <FiberManualRecordIcon color="info" />
            <div className="product-name">{p.productName}</div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div className="product-date">
              {moment(p.expiration).format("DD-MM-YYYY")}
            </div>
          </ProductStyle>
        ))
      ) : (
        <ProductStyle>
          Không tìm thấy sản phẩm nào sắp hết hạn trong vòng 30 ngày.
        </ProductStyle>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  expireProducts: state.notification.expireProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getExpireProductNoti: (products) => dispatch(getExpireProductNoti(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpireProduct);
