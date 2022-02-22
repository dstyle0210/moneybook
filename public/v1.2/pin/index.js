$(function () {
  try {
    setHeader("용돈목록"); // 헤더삽입

    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
      }

      ;
    });
    firebase.database().ref(getReceiptsUrl()).on("value", snapshot => {
      Receipts = snapshot.val();

      if (Receipts) {
        // 표시할 영수증 목록
        const useReceipts = Receipts.filter(receipt => {
          receipt.price = receipt.price * 1;
          receipt.paytime = new Date(receipt.datetime).getTime();
          return receipt.useYn == "Y" && getTagCode(receipt.tag) == "b";
        });
        useReceipts.sort((a, b) => parseFloat(b.paytime) - parseFloat(a.paytime)); // 결제시간 기준 정렬

        bookReceiptsUI(useReceipts);
        bookNowMonthTotal(useReceipts);
      } else {
        Receipts = [];
        bookNowMonthTotal(Receipts);
      }

      ;
    });
  } catch (e) {
    alert(e);
  }

  ;
});

function bookReceiptsUI(receipts) {
  const $reactRoot = $("#receiptsList");
  ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsList, {
    _receipts: receipts
  }), $reactRoot.get(0));
}

function bookNowMonthTotal(receipts) {
  const $reactRoot = $("#nowMonthTotal");
  ReactDOM.render( /*#__PURE__*/React.createElement(S_nowMonthTotal, {
    receipts: receipts
  }), $reactRoot.get(0));
}