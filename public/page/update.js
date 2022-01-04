let Receipt, // 대상 영수증, 
setReceiptState, // 영수증 State Change 함수
receiptIdx; // 대상 영수증 인덱스 번호

$(function () {
  firebase.auth(); // 인증체크

  firebase.database().ref("/receipt").on("value", snapshot => {
    const url = new URL(location.href);
    receiptIdx = url.searchParams.get("idx");
    Receipt = snapshot.val()[receiptIdx]; // 영수증 저장

    const $reactRoot = $("#receiptsUpdateForm");
    ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsUpdate, {
      receipt: Receipt
    }), $reactRoot.get(0));
    $("#updateReceipt").on("click", updateReceipt);
  });
});

function setReceipt(updateData) {
  Object.assign(Receipt, updateData);
  setReceiptState(Receipt);
}

;

function updateReceipt() {
  firebase.database().ref("/receipt/" + receiptIdx).set(Receipt);
  return false;
}

;

const S_receiptsUpdate = ({
  receipt
}) => {
  [Receipt, setReceiptState] = React.useState(receipt); // 상태 관리용 HOOK

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(M_receiptUpdateDateTime, {
    label: "\uACB0\uC81C\uC2DC\uAC04",
    value: Receipt.datetime
  }), /*#__PURE__*/React.createElement(M_receiptUpdateStore, {
    label: "\uC0AC\uC6A9\uCC98",
    value: Receipt.store
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_price"
  }, "\uAE08\uC561"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_price",
    defaultValue: Receipt.price
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_method"
  }, "\uACB0\uC81C\uC218\uB2E8"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_method",
    defaultValue: Receipt.method
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_comment"
  }, "\uC0C1\uC138\uB0B4\uC5ED"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_comment",
    defaultValue: Receipt.comment
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

const M_receiptUpdateDateTime = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -dateTime"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "update_dateTime"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    id: "update_dateTime",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        datetime: e.target.value
      });
    }
  }));
};

const M_receiptUpdateStore = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -store"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "write_store"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "write_store",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        store: e.target.value
      });
    }
  }));
};