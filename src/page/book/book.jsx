let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        Receipts = snapshot.val();
        bookReceiptsUI(Receipts);
        createReceipt(); // 등록하기 기능추가
    });
});

function bookReceiptsUI(receipts){
    const $reactRoot = $("#receipts");
    ReactDOM.render( <C_receiptList receipts={receipts} /> ,$reactRoot.get(0));
}


var _sms = "[Web발신]\nKB국민카드9*4*승인\n원*봉\n4,900원 일시불\n12/27 14:05\n리디 주식회사\n누적2,854,464원";
/*
const receiptVo = {
    comment,
    datetime:new Date(),
    outCategory,
    payment,
    price,
    store,
    useYn:"Y"
}
*/
function createReceipt(){
    var smsData = _sms.split("\n");
    var receipt = {
        comment:"",
        datetime:smsData[4],
        outCategory:"변동/문화",
        payment:smsData[1],
        price:smsData[3],
        store:smsData[5],
        useYn:"Y"
    };
    const pKey = Receipts.length;
    $("#createReceipt").on("click",function(){
        firebase.database().ref("/receipt/"+pKey).set(receipt); 
    });
};