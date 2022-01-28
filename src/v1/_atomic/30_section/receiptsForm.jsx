const S_receiptsUpdateForm = ({_receipt,receiptIdx}) => { 
    let receipt,setReceiptState;
    [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        Object.assign(receipt,updateData);
        setReceiptState(receipt);
    };
    const updateReceipt = function(){ 
        firebase.database().ref("/receipt/"+receiptIdx).set(receipt);
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
            <a href="#" className="a-btn -s" onClick={updateReceipt}>수정</a>
        </div>
    </React.Fragment>; 
};

const S_receiptsCreateForm = ({_receipt,receiptIdx}) => { 
    let receipt,setReceiptState;
    [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        console.log(receipt);
        Object.assign(receipt,updateData);
        setReceiptState(receipt); 
    };
    const initReceipt = function(){ 
        firebase.database().ref("/receipt/"+receiptIdx).set(receipt);
        location.href = "/v1/book/";
        return false; 
    };
    const back = function(){ 
        history.back(); 
        return false; 
    };
    const pasteReceipt = function(){
        // createReceipt();
        /*
        navigator.clipboard.readText().then((text) => {
            return text;
        }).then(function(origin){
            alert(origin);
            setReceipt({ 
                datetime:getSmsDateTime(origin),
                price:getSmsPrice(origin),
                useYn:"N",
                origin:origin
            });
            alert(receipt);
            firebase.database().ref("/receipt/"+receiptIdx).set(receipt);
        }).then(function(){
            setTimeout(function(){
                location.href = "/v1/update/?idx="+receiptIdx;
            },200);
        });
        */
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
            <a href="#" className="a-btn -a" id="pasteReceiptBtn">붙여넣기</a>
        </div>
    </React.Fragment>; 
};