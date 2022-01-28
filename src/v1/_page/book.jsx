let Receipts; // 전체 영수증 목록
$(function(){
    try{
        firebase.auth(); // 인증체크
        firebase.database().ref("/receipt").on("value", (snapshot) => {
            Receipts = snapshot.val();
            if(Receipts){
                // 표시할 영수증 목록
                const useReceipts = Receipts.filter((receipt)=>{
                    receipt.price = receipt.price*1;
                    return receipt.useYn=="Y" && receipt.tag!="용돈";
                });
                bookReceiptsUI(useReceipts.reverse());
                bookNowMonthTotal(useReceipts);
            }else{
                Receipts = [];
                bookNowMonthTotal(Receipts);
            };
        });
        firebase.auth().onAuthStateChanged(user => {
            // alert(user.email);
        });
    }catch(e){
        alert(e);
    };
});

function bookReceiptsUI(receipts){
    const $reactRoot = $("#receiptsList");
    ReactDOM.render( <S_receiptsList receipts={receipts} /> ,$reactRoot.get(0));
}

function bookNowMonthTotal(receipts){
    const $reactRoot = $("#nowMonthTotal");
    ReactDOM.render( <S_nowMonthTotal receipts={receipts} /> ,$reactRoot.get(0));
}