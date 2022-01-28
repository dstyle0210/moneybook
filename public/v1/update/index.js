let Idx; // 작성될 영수증 번호(PK)

let Receipt = {};
$(function () {
  var auth = firebase.auth(); // 인증체크

  firebase.database().ref("/receipt").on("value", snapshot => {
    const url = new URL(location.href);
    Idx = url.searchParams.get("idx");
    Receipt = snapshot.val()[Idx]; // 영수증 저장

    console.log(Receipt);
    const $reactRoot = $("#updatePage");
    ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsUpdateForm, {
      receipt: Receipt,
      receiptIdx: Idx
    }), $reactRoot.get(0));
  });
});