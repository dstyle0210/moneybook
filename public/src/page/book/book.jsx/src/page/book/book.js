$(function () {
  const $reactRoot = $("#receipts");
  ReactDOM.render( /*#__PURE__*/React.createElement(M_receipt, {
    name: "test222"
  }), $reactRoot.get(0));
});