let Receipts; // 전체 영수증 목록

let Idx; // 작성될 영수증 번호(PK)

let Receipt = {
  // 작성될 영수증 정보
  datetime: getSmsDateTime(),
  // 현재시간
  store: "",
  price: "",
  method: "현금",
  comment: "",
  tag: "",
  useYn: "Y"
};
$(function () {
  var auth = firebase.auth(); // 인증체크

  firebase.database().ref("/receipt").on("value", snapshot => {
    Receipts = snapshot.val();
    Idx = Receipts ? Receipts.length : 0;
    firebase.auth().onAuthStateChanged(user => {
      Receipt.writer = user.email.replace("@gmail.com", ""); // createPage

      const $reactRoot = $("#createPage");
      ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsCreateForm, {
        _receipt: Receipt,
        receiptIdx: Idx
      }), $reactRoot.get(0));
      setTimeout(function () {
        $("#pasteReceiptBtn").on("click", createReceipt);
      }, 1000);
    });
  });
});
alert("v1");

function createReceipt() {
  alert("test");
  navigator.clipboard.readText().then(text => {
    return text;
  }).then(function (origin) {
    let receipt = {};
    receipt.datetime = getSmsDateTime(origin);
    receipt.price = getSmsPrice(origin);
    Object.assign(receipt, {
      comment: "코멘트",
      tag: "",
      method: "",
      store: "",
      useYn: "N",
      origin: origin
    });
    return firebase.database().ref("/receipt/" + Receipts.length).set(receipt);
  }).then(function () {
    setTimeout(function () {
      location.href = "update.html?idx=" + (Receipts.length - 1);
    }, 200);
  });
}

;