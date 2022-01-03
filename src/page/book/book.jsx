let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        Receipts = snapshot.val();
        bookReceiptsUI(Receipts);
    });

    $("#createReceipt").on("click",createReceipt);
});

function bookReceiptsUI(receipts){
    const $reactRoot = $("#receipts");
    ReactDOM.render( <C_receiptList receipts={receipts} /> ,$reactRoot.get(0));
}



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
var _sms = "[Web발신]\nKB국민카드9*4*승인\n원*봉\n4,900원 일시불\n12/27 14:05\n리디 주식회사\n누적2,854,464원";
var receipt = {
    comment:"comment",
    datetime:"2022-01-03T16:05",
    outCategory:"outCategory",
    method:"결제방법",
    price:9999999,
    store:"가게명(쇼핑몰)",
    useYn:"Y"
};

function createReceipt(){
    navigator.clipboard.readText().then((text) => {

    }).then(function(){
        console.log(Receipts.length);
        firebase.database().ref("/receipt/"+Receipts.length).set(receipt);
        location.href = "update.html?idx="+(Receipts.length-1); 
    });
};

function convertISODateTime(text){
    // var text =  "12/31 16:26"; // MM:DD hh:mm
    var tics = text.split(/([\/\s\:])/);
    const date = new Date();
    date.setMonth((tics[0]*1)-1);
    date.setDate(tics[2]);
    date.setHours(tics[4]);
    date.setMinutes(tics[6]);
    date.setSeconds(0);
    date.setHours( date.getHours() + 9 ); // ISO 시간규칙 적용
    return date.toISOString().split(":00.")[0];
}; 