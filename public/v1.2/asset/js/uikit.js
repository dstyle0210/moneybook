const M_receiptFormDateTime = ({
  receipt,
  setReceipt
}) => {
  let initValue = receipt.datetime;
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -dateTime"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form_dateTime"
  }, "\uACB0\uC81C\uC2DC\uAC04"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__inputs"
  }, /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    id: "form_dateTime",
    defaultValue: initValue,
    onChange: e => {
      setReceipt({
        datetime: e.target.value
      });
    }
  })));
};
const M_receiptFormStore = ({
  receipt,
  setReceipt
}) => {
  let initValue = receipt.store || "";
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -store"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form_store"
  }, "\uC0AC\uC6A9\uCC98"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__inputs"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "form_store",
    defaultValue: initValue,
    onChange: e => {
      setReceipt({
        store: e.target.value
      });
    }
  })));
};
const M_receiptFormPrice = ({
  receipt,
  setReceipt
}) => {
  let initValue = receipt.price || "";
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -price"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form_price"
  }, "\uAE08\uC561"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__inputs"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "form_price",
    defaultValue: initValue,
    onChange: e => {
      setReceipt({
        price: e.target.value
      });
    }
  })));
};
const M_receiptFormMethod = ({
  receipt,
  setReceipt
}) => {
  let initValue = receipt.method || "";
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -method"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form_method"
  }, "\uACB0\uC81C\uC218\uB2E8"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__inputs"
  }, /*#__PURE__*/React.createElement("select", {
    onChange: e => {
      setReceipt({
        method: e.target.value
      });
    },
    defaultValue: initValue
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\uACB0\uC81C\uC218\uB2E8 \uC120\uD0DD\uD558\uAE30"), /*#__PURE__*/React.createElement("option", {
    value: "\uD604\uAE08"
  }, "\uD604\uAE08"), /*#__PURE__*/React.createElement("option", {
    value: "\uAD6D\uBBFC\uBD09\uC62C\uB9BC"
  }, "\uAD6D\uBBFC\uCE74\uB4DC - \uBD09\uC62C\uB9BC"), /*#__PURE__*/React.createElement("option", {
    value: "\uAD6D\uBBFC\uB9C8\uC62C\uB9BC"
  }, "\uAD6D\uBBFC\uCE74\uB4DC - \uB9C8\uC62C\uB9BC"), /*#__PURE__*/React.createElement("option", {
    value: "\uD604\uB300\uC2A4\uB9C8\uC77C"
  }, "\uD604\uB300\uCE74\uB4DC - \uC2A4\uB9C8\uC77C"), /*#__PURE__*/React.createElement("option", {
    value: "\uD604\uB300\uB124\uC774\uBC84"
  }, "\uD604\uB300\uCE74\uB4DC - \uB124\uC774\uBC84"), /*#__PURE__*/React.createElement("option", {
    value: "\uAE40\uD3EC\uD398\uC774"
  }, "\uAE40\uD3EC\uD398\uC774"), /*#__PURE__*/React.createElement("option", {
    value: "\uB124\uC774\uBC84\uD398\uC774"
  }, "\uB124\uC774\uBC84\uD398\uC774"), /*#__PURE__*/React.createElement("option", {
    value: "\uCE74\uCE74\uC624\uD398\uC774"
  }, "\uCE74\uCE74\uC624\uD398\uC774"), /*#__PURE__*/React.createElement("option", {
    value: "\uACC4\uC88C\uC774\uCCB4"
  }, "\uACC4\uC88C\uC774\uCCB4"), /*#__PURE__*/React.createElement("option", {
    value: "\uAD6D\uBBFC\uD558\uC774\uD328\uC2A4"
  }, "\uAD6D\uBBFC\uCE74\uB4DC - \uD558\uC774\uD328\uC2A4"))));
};
const M_receiptFormComment = ({
  receipt,
  setReceipt
}) => {
  let initValue = receipt.comment || "";
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -comment"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "form_comment"
  }, "\uC0C1\uC138\uB0B4\uC5ED"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__inputs"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "form_comment",
    defaultValue: initValue,
    onChange: e => {
      setReceipt({
        comment: e.target.value
      });
    }
  })));
};
const M_receiptFormTag = ({
  receipt,
  setReceipt,
  user
}) => {
  let [tag, setTag] = React.useState(receipt.tag.split("/")[0] || "");
  const changeTag = function (value) {
    setTag(value.split("/")[0] || "");
    setReceipt({
      tag: value
    });
  };
  const bong = isPinMode(user.uid) ? /*#__PURE__*/React.createElement(A_tagBtn, {
    name: "\uC6A9\uB3C8",
    inputName: "tag",
    _tag: tag,
    _changeTag: changeTag,
    tagClassName: "b"
  }) : "";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -tag"
  }, /*#__PURE__*/React.createElement("label", null, "\uC9C0\uCD9C\uD56D\uBAA9"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__tags"
  }, /*#__PURE__*/React.createElement(A_tagBtn, {
    name: "\uACE0\uC815",
    inputName: "tag",
    _tag: tag,
    _changeTag: changeTag,
    tagClassName: "f"
  }), /*#__PURE__*/React.createElement(A_tagBtn, {
    name: "\uD544\uC218",
    inputName: "tag",
    _tag: tag,
    _changeTag: changeTag,
    tagClassName: "r"
  }), /*#__PURE__*/React.createElement(A_tagBtn, {
    name: "\uBCC0\uB3D9",
    inputName: "tag",
    _tag: tag,
    _changeTag: changeTag,
    tagClassName: "c"
  }), /*#__PURE__*/React.createElement(A_tagBtn, {
    name: "\uAE30\uD0C0",
    inputName: "tag",
    _tag: tag,
    _changeTag: changeTag,
    tagClassName: "o"
  }), bong)), /*#__PURE__*/React.createElement(M_receiptFormSubTag, {
    _tag: receipt.tag,
    _changeTag: changeTag
  }));
};
const A_tagBtn = ({
  name,
  inputName,
  _tag,
  _changeTag,
  tagClassName
}) => {
  return /*#__PURE__*/React.createElement("label", {
    className: "a-tagBtn"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: inputName,
    value: name,
    onChange: e => {
      _changeTag(e.target.value);
    },
    defaultChecked: _tag == name
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-tagbtn -" + tagClassName
  }, name));
};
const M_receiptFormSubTag = ({
  _tag,
  _changeTag
}) => {
  let initTag = _tag.split("/")[0] || "";
  let initSubTag = _tag.split("/")[1] || "";
  let subTags = {
    "": [],
    "고정": ["세금", "공과금", "보험", "용돈", "교육비", "통신비"],
    "필수": ["주식,식재료", "음료수,간식", "생활필수품", "대중교통", "경조사비"],
    "변동": ["외식,커피", "의료비", "문화,여행", "자동차,택시"],
    "기타": ["미용,패션", "가구,가전", "그외,뭐지"],
    "용돈": ["식비", "담배", "음료수", "그외"]
  };
  const changeTag = function (value) {
    _changeTag(initTag + "/" + value);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm -subtag"
  }, /*#__PURE__*/React.createElement("label", null, "\uC138\uBD80\uC9C0\uCD9C\uD56D\uBAA9"), /*#__PURE__*/React.createElement("div", {
    className: "m-receiptForm__tags"
  }, subTags[initTag].map((subTag, index) => {
    return /*#__PURE__*/React.createElement(A_subTagBtn, {
      key: index.toString(),
      name: subTag,
      inputName: "subtag",
      _tag: initSubTag,
      _changeTag: changeTag,
      tagClassName: getTagCode(initTag)
    });
  })));
};
const A_subTagBtn = ({
  name,
  inputName,
  _changeTag,
  tagClassName
}) => {
  React.useEffect(() => {
    $("input[name=subtag]").prop("checked", false);
  }, [tagClassName]);
  return /*#__PURE__*/React.createElement("label", {
    className: "a-tagBtn"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: inputName,
    value: name,
    onChange: e => {
      _changeTag(e.target.value);
    }
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-tagbtn -" + tagClassName
  }, name));
};

// "[Web발신]\n네이버 현대카드 승인\r\n원*봉\r\n29,700원 일시불\r\n02/11 08:51\r\n네이버페이\r\n누적272,890원"
const S_nowMonthTotal = ({
  receipts,
  user,
  origins
}) => {
  const pasteReceipt = function () {
    navigator.clipboard.readText().then(text => {
      return text;
    }).then(async function (origin) {
      let pasteReceipt = {};
      pasteReceipt.idx = origins.length;
      pasteReceipt.datetime = getSmsDateTime(origin);
      pasteReceipt.price = getSmsPrice(origin);
      pasteReceipt.method = getSmsMethod(origin);
      pasteReceipt.store = getSmsStore(origin).replace(/\\r/gi, "");
      pasteReceipt.useYn = "N";
      pasteReceipt.tag = "";
      pasteReceipt.origin = origin;

      // 금액에 따른 자동변환

      // 디지털큐브 주차
      console.log(pasteReceipt);
      if (pasteReceipt.method == "국민봉올림" && pasteReceipt.price == 13900 && pasteReceipt.store == "카카오 T 주차") {
        pasteReceipt.comment = "디지털큐브 주차";
        pasteReceipt.tag = "변동/자동차,택시";
      }
      ;

      // 담배값
      if (pasteReceipt.method == "현대네이버" && pasteReceipt.price == 4800) {
        pasteReceipt.comment = "담배";
        pasteReceipt.tag = "용돈/담배";
      }
      ;
      if (pasteReceipt.method == "현대네이버" && pasteReceipt.price == 9600) {
        pasteReceipt.comment = "담배 2갑";
        pasteReceipt.tag = "용돈/담배";
      }
      ;

      // 통신요금
      if (/LGUPLUS 통신요금/.test(pasteReceipt.origin)) {
        pasteReceipt.store = "LGUPLUS";
        pasteReceipt.comment = "운양집 통신요금";
        pasteReceipt.tag = "고정/통신비";
      }
      return await firebase.database().ref(getReceiptsUrl(origins.length)).set(pasteReceipt);
    }).then(function () {
      setTimeout(function () {
        location.href = "/v1.2/update/?idx=" + origins.length;
      }, 200);
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "s-nowMonthTotal"
  }, /*#__PURE__*/React.createElement(C_monthTotal, {
    receipts: receipts,
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "-writeBtn"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/v1.2/create/",
    className: "a-btn -l"
  }, "\uC0C8\uB85C\uB4F1\uB85D"), /*#__PURE__*/React.createElement("a", {
    className: "a-btn -l",
    onClick: pasteReceipt
  }, "\uBD99\uC5EC\uB123\uAE30")));
};
const C_monthTotal = ({
  receipts,
  user
}) => {
  let monthTotal = 0;
  let pinTotal = 0;
  const tagTotal = {
    f: 0,
    r: 0,
    c: 0,
    o: 0,
    b: 0
  };
  if (receipts) {
    for (receipt of receipts) {
      tagTotal[getTagCode(receipt.tag)] += receipt.price;
      monthTotal += getTagCode(receipt.tag) != "b" ? receipt.price : 0;
      pinTotal += getTagCode(receipt.tag) == "b" && receipt.method != "계좌이체" ? receipt.price : 0;
    }
    ;
  }
  const pinVD = isPinMode(user.uid) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -b"
  }, "\uC6A9\uB3C8"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, tagTotal.b.toLocaleString())), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -b"
  }, "\uC0C1\uACC4"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, pinTotal.toLocaleString()))) : "";
  return /*#__PURE__*/React.createElement("article", {
    className: "c-monthTotal"
  }, /*#__PURE__*/React.createElement("h2", null, "2022\uB144 ", new Date().getMonth() + 1, "\uC6D4 \uC9C0\uCD9C\uAE08\uC561"), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", null, /*#__PURE__*/React.createElement("span", {
    className: "a-price -xl"
  }, monthTotal.toLocaleString())), /*#__PURE__*/React.createElement("ul", {
    className: "m-tagByTotal"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -f"
  }, "\uACE0\uC815"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, tagTotal.f.toLocaleString())), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -r"
  }, "\uD544\uC218"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, tagTotal.r.toLocaleString())), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -c"
  }, "\uBCC0\uB3D9"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, tagTotal.c.toLocaleString())), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("label", {
    className: "a-tag -o"
  }, "\uAE30\uD0C0"), " ", /*#__PURE__*/React.createElement("span", {
    className: "a-price"
  }, tagTotal.o.toLocaleString())), pinVD)));
};
const S_receiptsUpdateForm = ({
  _receipt,
  receiptIdx,
  user,
  totalLength
}) => {
  let [receipt, setReceiptState] = React.useState(_receipt); // 상태 관리용 HOOK
  let [tag, tagState] = React.useState(_receipt.tag); // 태그 체크용

  const setReceipt = function (updateData) {
    Object.assign(receipt, updateData);
    setReceiptState(receipt);
    tagState(receipt.tag);
    return receipt;
  };
  const updateReceipt = function () {
    receipt.useYn = "Y";
    uploadReceipt();
  };
  const book = function () {
    location.href = "/v1.2/book/";
    return false;
  };
  const deleteReceipt = function () {
    if (confirm("삭제하시겠습니까?")) {
      receipt.useYn = "N";
      uploadReceipt();
    }
    ;
  };
  const uploadReceipt = function () {
    // 상세내역 재정리(빈값 인 경우)
    if (!receipt.comment && getTagCode(receipt.tag) == "b") {
      receipt.comment = receipt.tag.split("/")[1];
    }
    ;
    firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
    location.href = "/v1.2/book/";
    return false;
  };
  const btnSet = function () {
    return getTagCode(tag) == "b" ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "a-btn -lg -b",
      onClick: cigaUpdateReceipt
    }, "\uB2F4\uBC30\uD3EC\uD568") : "";
  };
  const cigaUpdateReceipt = function () {
    receipt.useYn = "Y";

    // 작성된 소스 업로드
    receipt.price -= 4800;
    firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);

    // 담배값 추출 및 마지막 인덱스 업로드
    receipt.price = 4800;
    receipt.tag = "용돈/담배";
    receipt.comment = "담배";
    receipt.idx = totalLength;
    firebase.database().ref(getReceiptsUrl(totalLength)).set(receipt);
    location.href = "/v1.2/book/";
  };

  // 담배값 포함 인 경우 처리
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(M_receiptFormDateTime, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormStore, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormPrice, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormMethod, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormComment, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormTag, {
    receipt: receipt,
    setReceipt: setReceipt,
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-btnsWrap"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "a-btn -lg -d",
    onClick: deleteReceipt
  }, "\uC0AD\uC81C"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "a-btn -lg -c",
    onClick: book
  }, "\uBAA9\uB85D"), btnSet(), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "a-btn -lg -s",
    onClick: updateReceipt
  }, "\uC218\uC815")));
};
const S_receiptsCreateForm = ({
  _receipt,
  receiptIdx,
  user
}) => {
  let receipt, setReceiptState;
  [receipt, setReceiptState] = React.useState(_receipt); // 상태 관리용 HOOK
  const setReceipt = function (updateData) {
    Object.assign(receipt, updateData);
    setReceiptState(receipt);
    return receipt;
  };
  const initReceipt = function () {
    receipt.idx = receiptIdx;
    // 상세내역 재정리(빈값 인 경우)
    if (!receipt.comment && getTagCode(receipt.tag) == "b") {
      receipt.comment = receipt.tag.split("/")[1];
    }
    ;
    firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
    location.href = "/v1.2/book/";
    return false;
  };
  const book = function () {
    location.href = "/v1.2/book/";
    return false;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(M_receiptFormDateTime, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormStore, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormPrice, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormMethod, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormComment, {
    receipt: receipt,
    setReceipt: setReceipt
  }), /*#__PURE__*/React.createElement(M_receiptFormTag, {
    receipt: receipt,
    setReceipt: setReceipt,
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-btnsWrap"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "a-btn -lg -c",
    onClick: book
  }, "\uBAA9\uB85D"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "a-btn -lg -s",
    onClick: initReceipt
  }, "\uC800\uC7A5")));
};
const S_receiptsList = ({
  _receipts
}) => {
  let receipts, setReceiptsState;
  [receipts, setReceiptsState] = React.useState({
    sort: "recent",
    list: _receipts
  }); // 상태 관리용 HOOK

  const updateReceipt = function (idx) {
    location.href = "/v1.2/update/?idx=" + idx;
    return false;
  };
  const updateList = function (type) {
    // setReceiptsState();
  };
  if (receipts.list) {
    const receiptList = receipts.list.map(function (receipt, index) {
      return /*#__PURE__*/React.createElement("li", {
        key: index
      }, /*#__PURE__*/React.createElement("a", {
        onClick: updateReceipt.bind(this, receipt.idx)
      }, /*#__PURE__*/React.createElement(M_receipt, {
        receipt: receipt
      })));
    });
    return /*#__PURE__*/React.createElement("section", {
      className: "s-receiptsList"
    }, /*#__PURE__*/React.createElement("ul", null, receiptList));
  } else {
    return /*#__PURE__*/React.createElement("section", {
      className: "s-receiptsList"
    });
  }
  ;
};
const M_receipt = ({
  receipt
}) => {
  return /*#__PURE__*/React.createElement("article", {
    className: "m-receipt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "a-date"
  }, getMonthDate(receipt.datetime)), /*#__PURE__*/React.createElement("div", {
    className: "-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "a-comment"
  }, receipt.comment), /*#__PURE__*/React.createElement("span", {
    className: "a-store"
  }, receipt.store), /*#__PURE__*/React.createElement("span", {
    className: "a-payment"
  }, receipt.method)), /*#__PURE__*/React.createElement("div", {
    className: "-price"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "a-price"
  }, (receipt.price * 1).toLocaleString()), /*#__PURE__*/React.createElement("label", {
    className: "a-tag -" + getTagCode(receipt.tag)
  }, receipt.tag)));
};