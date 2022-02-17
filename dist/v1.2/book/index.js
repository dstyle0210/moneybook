$(function () {
  try {
    setHeader("가계부목록"); // 헤더삽입

    new Promise(res => {
      firebase.auth().onAuthStateChanged(user => {
        if (user.uid) {
          setUserSide(getAuthUser(user.uid)); // 유저정보 삽입
        }

        ;
        res(user);
      });
    }).then(user => {
      firebase.database().ref(getReceiptsUrl()).on("value", snapshot => {
        const origins = snapshot.val() || [];
        let useReceipts;

        if (origins.length) {
          // 표시할 영수증 목록
          useReceipts = origins.filter(receipt => {
            receipt.price = receipt.price * 1;
            receipt.paytime = new Date(receipt.datetime).getTime();

            if (isPinMode(user.uid)) {
              return receipt.useYn == "Y";
            } else {
              return receipt.useYn == "Y" && getTagCode(receipt.tag) != "b";
            }

            ;
          });
          useReceipts.sort((a, b) => parseFloat(b.paytime) - parseFloat(a.paytime)); // 결제시간 기준 정렬
        }

        ;
        ReactDOM.render( /*#__PURE__*/React.createElement(S_receiptsBook, {
          receipts: useReceipts,
          user: user
        }), $("#receiptsBook").get(0));
      });
    });
  } catch (e) {
    alert(e);
  }

  ;
});

const S_receiptsBook = ({
  receipts,
  user
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(S_receiptsList, {
    _receipts: receipts,
    user: user
  }), /*#__PURE__*/React.createElement(S_nowMonthTotal, {
    receipts: receipts,
    user: user
  }));
};