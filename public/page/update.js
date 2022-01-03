let Receipts; // 전체 영수증 목록

$(function () {
  firebase.auth(); // 인증체크

  firebase.database().ref("/receipt").on("value", snapshot => {
    var url = new URL(location.href);
    console.log();
    Receipts = snapshot.val();
    console.log(Receipts[url.searchParams.get("idx")]);
    const $reactRoot = $("#receiptsUpdateForm");
    ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsUpdate, {
      receipt: Receipts[url.searchParams.get("idx")]
    }), $reactRoot.get(0));
  });
});

const S_receiptsUpdate = ({
  receipt
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    for: "write_dateTime"
  }, "\uACB0\uC81C\uC2DC\uAC04"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    id: "write_dateTime",
    value: receipt.datetime
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    for: "write_store"
  }, "\uC0AC\uC6A9\uCC98"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_store"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    for: "write_price"
  }, "\uAE08\uC561"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_price"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    for: "write_payment"
  }, "\uACB0\uC81C\uC218\uB2E8"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_payment"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    for: "write_comment"
  }, "\uC0C1\uC138\uB0B4\uC5ED"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_comment"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "\uC9C0\uCD9C\uC131\uACA9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uACE0\uC815"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uD544\uC218"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    checked: true
  }), " \uBCC0\uB3D9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uAE30\uD0C0")));
};