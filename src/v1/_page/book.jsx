let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        Receipts = snapshot.val();
        console.log(Receipts);
        if(Receipts){
            bookReceiptsUI(Receipts);
        }else{
            Receipts = [];
        };
    });

    $("#createReceipt").on("click",createReceipt);
});

function bookReceiptsUI(receipts){
    const $reactRoot = $("#receipts");
    ReactDOM.render( <C_receiptList receipts={receipts} /> ,$reactRoot.get(0));
}