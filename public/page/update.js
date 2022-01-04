let Receipts; // 전체 영수증 목록

$(function () {
  firebase.auth(); // 인증체크

  console.log("test");
  firebase.database().ref("/receipt").on("value", snapshot => {
    var url = new URL(location.href);
    Receipts = snapshot.val();
    const $reactRoot = $("#receiptsUpdateForm");
    ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsUpdate, {
      receipt: Receipts[url.searchParams.get("idx")]
    }), $reactRoot.get(0));
  });
});

const M_receiptUpdateDateTime = ({
  label,
  datetime,
  setDatetime
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -dateTime"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "update_dateTime"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    id: "update_dateTime",
    defaultValue: datetime,
    onChange: e => {
      setDatetime(e.target.value);
    }
  }));
};

var test = {};

const S_receiptsUpdate = ({
  receipt
}) => {
  const [datetime, setDatetime] = React.useState(receipt.datetime); // 상태 관리용 HOOK

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(M_receiptUpdateDateTime, {
    label: "\uACB0\uC81C\uC2DC\uAC04",
    datetime: datetime,
    setDatetime: setDatetime
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_store"
  }, "\uC0AC\uC6A9\uCC98", datetime), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_store",
    defaultValue: receipt.store
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_price"
  }, "\uAE08\uC561"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_price",
    defaultValue: receipt.price
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_method"
  }, "\uACB0\uC81C\uC218\uB2E8"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_method",
    defaultValue: receipt.method
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_comment"
  }, "\uC0C1\uC138\uB0B4\uC5ED"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_comment",
    defaultValue: receipt.comment
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "\uC9C0\uCD9C\uC131\uACA9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uACE0\uC815"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uD544\uC218"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    defaultChecked: true
  }), " \uBCC0\uB3D9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType"
  }), " \uAE30\uD0C0")));
};