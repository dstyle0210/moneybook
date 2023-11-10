$(function () {
  setHeader("가계부수정"); // 헤더삽입
  firebase.auth().onAuthStateChanged(user => {
    setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
    firebase.database().ref(getReceiptsUrl()).on("value", snapshot => {
      const url = new URL(location.href);
      const Idx = url.searchParams.get("idx"); // 작성될 영수증 번호(PK)
      const Receipt = snapshot.val()[Idx]; // 영수증 저장
      const totalLength = snapshot.val().length; // 영수증 전체갯수

      const $reactRoot = $("#updatePage");
      ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsUpdateForm, {
        _receipt: Receipt,
        receiptIdx: Idx,
        user: user,
        totalLength: totalLength
      }), $reactRoot.get(0));
    });
  });
});