$(function () {
  firebase.auth().onAuthStateChanged(user => {
    firebase.database().ref(getReceiptsUrl()).on("value", snapshot => {
      const origins = snapshot.val() || [];
      let receipts = origins.filter(function (receipt) {
        return receipt.useYn == "Y" && getTagCode(receipt.tag) != "b";
      }).map(function (receipt) {
        return {
          date: receipt.datetime.split("T")[0].replace(/-/gi, "."),
          store: receipt.store ? receipt.store : "",
          comment: receipt.comment ? receipt.comment : "",
          method: receipt.method ? receipt.method : "",
          price: receipt.price ? receipt.price : 0,
          tag: receipt.tag ? receipt.tag : ""
        };
      });
      ReactDOM.render( /*#__PURE__*/React.createElement(ExportData, {
        origin: JSON.stringify(receipts)
      }), $("#data").get(0));
    });
  });
});

const ExportData = ({
  origin
}) => {
  return /*#__PURE__*/React.createElement("div", null, origin);
};