let Receipts; // 전체 영수증 목록
let Idx; // 작성될 영수증 번호(PK)
let Receipt = { // 작성될 영수증 정보
    datetime:getSmsDateTime(), // 현재시간
    store:"",
    price:"",
    method:"cash",
    comment:"",
    tag:""
};
$(function () { 
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", snapshot => {
        Receipts = snapshot.val();
        if(Receipts){
            Idx = Receipts.length; 
        }else{
            Idx = 0;
        };
        console.log(Idx);
    });

    // createPage
    const $reactRoot = $("#createPage");
    ReactDOM.render( <S_receiptsForm receipt={Receipt} /> ,$reactRoot.get(0));
});

const S_receiptsForm = () => {
    [Receipt,setReceiptState] = React.useState( Receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        Object.assign(Receipt,updateData);
        setReceiptState(Receipt);
    };
    const initReceipt = function(){
        firebase.database().ref("/receipt/"+Idx).set(Receipt);
        location.href = "/v1/book/";
        return false;
    };
    const back = function(){
        history.back();
        return false;
    };
    return <React.Fragment>
        <M_receiptFormDateTime receipt={Receipt} setReceipt={setReceipt}></M_receiptFormDateTime>
        <M_receiptFormStore receipt={Receipt} setReceipt={setReceipt}></M_receiptFormStore>
        <M_receiptFormPrice receipt={Receipt} setReceipt={setReceipt}></M_receiptFormPrice>
        <M_receiptFormMethod receipt={Receipt} setReceipt={setReceipt}></M_receiptFormMethod>
        <M_receiptFormComment receipt={Receipt} setReceipt={setReceipt}></M_receiptFormComment>
        <M_receiptFormTag receipt={Receipt} setReceipt={setReceipt}></M_receiptFormTag>
        <div className="m-btnsWrap">
            <a href="#" className="a-btn -c" onClick={back}>취소</a>
            <a href="#" className="a-btn -s" onClick={initReceipt}>저장</a>
            <a href="#" className="a-btn -a">붙여넣기</a>
        </div>
    </React.Fragment>; 
};