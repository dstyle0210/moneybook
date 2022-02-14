const S_receiptsUpdateForm = ({_receipt,receiptIdx}) => {
    let receipt,setReceiptState;
    [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        Object.assign(receipt,updateData);
        setReceiptState(receipt); 
    };
    const updateReceipt = function(){ 
        receipt.useYn = "Y";
        uploadReceipt();
    };
    const book = function(){
        location.href = "/v1.1/book/";
        return false; 
    };
    const deleteReceipt = function(){
        if( confirm("삭제하시겠습니까?") ){
            receipt.useYn = "N";
            uploadReceipt();
        };
    }
    const uploadReceipt = function(){
        firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
        location.href = "/v1.1/book/";
        return false; 
    }
    return <React.Fragment>
        <M_receiptFormDateTime receipt={Receipt} setReceipt={setReceipt}></M_receiptFormDateTime>
        <M_receiptFormStore receipt={Receipt} setReceipt={setReceipt}></M_receiptFormStore>
        <M_receiptFormPrice receipt={Receipt} setReceipt={setReceipt}></M_receiptFormPrice>
        <M_receiptFormMethod receipt={Receipt} setReceipt={setReceipt}></M_receiptFormMethod>
        <M_receiptFormComment receipt={Receipt} setReceipt={setReceipt}></M_receiptFormComment>
        <M_receiptFormTag receipt={Receipt} setReceipt={setReceipt}></M_receiptFormTag>
        <div className="m-btnsWrap">
            <a href="#" className="a-btn -d" onClick={deleteReceipt}>삭제</a>
            <a href="#" className="a-btn -c" onClick={book}>목록</a>
            <a href="#" className="a-btn -s" onClick={updateReceipt}>수정</a>
        </div>
    </React.Fragment>; 
};

const S_receiptsCreateForm = ({_receipt,receiptIdx}) => {
    let receipt,setReceiptState;
    [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        Object.assign(receipt,updateData);
        setReceiptState(receipt);
    };
    const initReceipt = function(){
        receipt.idx = receiptIdx;
        firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
        location.href = "/v1.1/book/";
        return false; 
    };
    const book = function(){
        location.href="/v1.1/book/";
        return false; 
    };
    return <React.Fragment>
        <M_receiptFormDateTime receipt={receipt} setReceipt={setReceipt}></M_receiptFormDateTime>
        <M_receiptFormStore receipt={receipt} setReceipt={setReceipt}></M_receiptFormStore>
        <M_receiptFormPrice receipt={receipt} setReceipt={setReceipt}></M_receiptFormPrice>
        <M_receiptFormMethod receipt={receipt} setReceipt={setReceipt}></M_receiptFormMethod>
        <M_receiptFormComment receipt={receipt} setReceipt={setReceipt}></M_receiptFormComment>
        <M_receiptFormTag receipt={receipt} setReceipt={setReceipt}></M_receiptFormTag>
        <div className="m-btnsWrap">
            <a href="#" className="a-btn -c" onClick={book}>목록</a>
            <a href="#" className="a-btn -s" onClick={initReceipt}>저장</a>
        </div>
    </React.Fragment>;
};