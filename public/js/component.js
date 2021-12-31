const C_receiptList = ({
  receipts
}) => {
  const receiptList = receipts.map(function (receipt, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement(M_receipt, {
      receipts: receipt
    })));
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: "c_receiptList"
  }, receiptList); // return <React.Fragment>{receiptList}</React.Fragment>;
};

const M_receipt = ({
  receipts
}) => {
  console.log(receipts);
  return /*#__PURE__*/React.createElement("article", {
    className: "m-receipt"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "a-price"
  }, receipts.price), /*#__PURE__*/React.createElement("span", {
    className: "a-date"
  }, receipts.datetime), /*#__PURE__*/React.createElement("span", {
    className: "a-time"
  }, receipts.datetime), /*#__PURE__*/React.createElement("span", {
    className: "a-store"
  }, receipts.store), /*#__PURE__*/React.createElement("span", {
    className: "a-payment"
  }, receipts.payment), /*#__PURE__*/React.createElement("span", {
    className: "a-comment"
  }, receipts.comment), /*#__PURE__*/React.createElement("span", {
    className: "a-outgoingsType -fixed"
  }, receipts.outCategory));
};