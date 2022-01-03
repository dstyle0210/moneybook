let Receipts; // 전체 영수증 목록
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        Receipts = snapshot.val();
        bookReceiptsUI(Receipts);
        createReceipt(); // 등록하기 기능추가
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
    comment:"co",
    datetime:"",
    outCategory:"",
    payment:"",
    price:0,
    store:0,
    useYn:"Y"
};
function createReceipt(){
    navigator.clipboard.readText().then((text) => {

    }).then(function(){

    })

    firebase.database().ref("/receipt/"+Receipts.length).set(receipt);

    var smsData = _sms.split("\n");
    var receipt = {
        comment:"",
        datetime:convertISODateTime(smsData[4]),
        outCategory:"변동/문화",
        payment:convertPayment(smsData[1]),
        price:smsData[3],
        store:smsData[5],
        useYn:"Y"
    };
    const pKey = Receipts.length;
    $("#createReceipt").on("click",function(){
        console.log(receipt);
        firebase.database().ref("/receipt/"+pKey).set(receipt);
    });
};


function convertPayment(text){
    if( (/9\*4\*/).test(text) ){
        return "국민봉올림";
    }else if( (/\[카카오뱅크\]/).test(text) ){
        return "카카오뱅크";
    }else{
        return "그외";
    };
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