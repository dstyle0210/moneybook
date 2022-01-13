let Receipt, // 대상 영수증, 
setReceiptState, // 영수증 State Change 함수
receiptIdx; // 대상 영수증 인덱스 번호

$(function () {
  firebase.auth(); // 인증체크

  firebase.database().ref("/receipt").on("value", snapshot => {
    const url = new URL(location.href);
    receiptIdx = url.searchParams.get("idx");
    Receipt = snapshot.val()[receiptIdx]; // 영수증 저장

    console.log(Receipt);
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
  }), /*#__PURE__*/React.createElement(M_receiptUpdatePrice, {
    label: "\uAE08\uC561",
    value: Receipt.price
  }), /*#__PURE__*/React.createElement(M_receiptUpdateMethod, {
    label: "\uACB0\uC81C\uC218\uB2E8",
    value: Receipt.method
  }), /*#__PURE__*/React.createElement(M_receiptUpdateComment, {
    label: "\uC0C1\uC138\uB0B4\uC5ED",
    value: Receipt.comment
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "\uC9C0\uCD9C\uC131\uACA9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
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
    htmlFor: "update_store"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "update_store",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        store: e.target.value
      });
    }
  }));
};

const M_receiptUpdatePrice = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -price"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "update_price"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "update_price",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        price: e.target.value
      });
    }
  }));
};

const M_receiptUpdateMethod = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -method"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "update_method"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "update_method",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        method: e.target.value
      });
    }
  }));
};

const M_receiptUpdateComment = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptUpdate -comment"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "update_comment"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "update_comment",
    defaultValue: value,
    onChange: e => {
      setReceipt({
        comment: e.target.value
      });
    }
  }));
};

const M_receiptUpdateOutCategory = ({
  label,
  value
}) => {
  return /*#__PURE__*/React.createElement("fieldset", {
    className: "m-receiptUpdate -outCategory"
  }, /*#__PURE__*/React.createElement("legend", null, label), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    value: "",
    onChange: e => {
      setReceipt({
        outCategory: e.target.value
      });
    }
  }), " \uACE0\uC815"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    onChange: e => {
      setReceipt({
        outCategory: e.target.value
      });
    }
  }), " \uD544\uC218"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    onChange: e => {
      setReceipt({
        outCategory: e.target.value
      });
    },
    defaultChecked: true
  }), " \uBCC0\uB3D9"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "write_outgoingsType",
    onChange: e => {
      setReceipt({
        outCategory: e.target.value
      });
    }
  }), " \uAE30\uD0C0"));
};