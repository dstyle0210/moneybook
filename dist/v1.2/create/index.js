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
  useYn: "Y",
  origin: ""
};
$(function () {
  setHeader("가계부작성"); // 헤더삽입

  firebase.auth().onAuthStateChanged(user => {
    setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
    firebase.database().ref(getReceiptsUrl()).on("value", snapshot => {
      Receipts = snapshot.val();
      Idx = Receipts ? Receipts.length : 0;

      // createPage
      const $reactRoot = $("#createPage");
      ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsCreateForm, {
        _receipt: Receipt,
        receiptIdx: Idx,
        user: user
      }), $reactRoot.get(0));
      setTimeout(function () {
        $("#pasteReceiptBtn").on("click", createReceipt);
      }, 1000);
    });
  });
});
function createReceipt() {
  navigator.clipboard.readText().then(text => {
    return text;
  }).then(function (origin) {
    Receipt.idx = Idx;
    Receipt.datetime = getSmsDateTime(origin);
    Receipt.price = getSmsPrice(origin);
    Receipt.method = getSmsMethod(origin);
    Receipt.store = getSmsStore(origin);
    Receipt.useYn = "N";
    Receipt.origin = origin;
    return firebase.database().ref(getReceiptsUrl(Idx)).set(Receipt);
  }).then(function () {
    setTimeout(function () {
      location.href = "/v1/update/?idx=" + (Receipts.length - 1);
    }, 200);
  });
}
;