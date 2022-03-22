const S_receiptsUpdateForm = ({_receipt,receiptIdx,user,totalLength}) => {
    let [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    let [tag,tagState] = React.useState( _receipt.tag ); // 태그 체크용

    const setReceipt = function(updateData){
        Object.assign(receipt,updateData);
        setReceiptState(receipt);
        tagState(receipt.tag);
        return receipt;
    };
    const updateReceipt = function(){ 
        receipt.useYn = "Y";
        uploadReceipt();
    };
    const book = function(){
        location.href = "/v1.2/book/";
        return false; 
    };
    const deleteReceipt = function(){
        if( confirm("삭제하시겠습니까?") ){
            receipt.useYn = "N";
            uploadReceipt();
        };
    }
    const uploadReceipt = function(){
        // 상세내역 재정리(빈값 인 경우)
        if(!receipt.comment && getTagCode(receipt.tag)=="b"){
            receipt.comment = receipt.tag.split("/")[1];
        };
        firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
        location.href = "/v1.2/book/";
        return false;
    }
    const btnSet = function(){
        return (getTagCode(tag)=="b") ? (<a href="#" className="a-btn -lg -b" onClick={cigaUpdateReceipt}>담배포함</a>) : "";
    }
    const cigaUpdateReceipt = function(){
        receipt.useYn = "Y"; 

        // 작성된 소스 업로드
        receipt.price -= 4500;
        firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);

        // 담배값 추출 및 마지막 인덱스 업로드
        receipt.price = 4500;
        receipt.tag = "용돈/담배";
        receipt.comment = "담배";
        receipt.idx = totalLength;
        firebase.database().ref(getReceiptsUrl(totalLength)).set(receipt);

        location.href = "/v1.2/book/";
    }

    // 담배값 포함 인 경우 처리
    return <React.Fragment>
        <M_receiptFormDateTime receipt={receipt} setReceipt={setReceipt}></M_receiptFormDateTime>
        <M_receiptFormStore receipt={receipt} setReceipt={setReceipt}></M_receiptFormStore>
        <M_receiptFormPrice receipt={receipt} setReceipt={setReceipt}></M_receiptFormPrice>
        <M_receiptFormMethod receipt={receipt} setReceipt={setReceipt}></M_receiptFormMethod>
        <M_receiptFormComment receipt={receipt} setReceipt={setReceipt}></M_receiptFormComment>
        <M_receiptFormTag receipt={receipt} setReceipt={setReceipt} user={user}></M_receiptFormTag>
        <div className="m-btnsWrap">
            <a href="#" className="a-btn -lg -d" onClick={deleteReceipt}>삭제</a>
            <a href="#" className="a-btn -lg -c" onClick={book}>목록</a>
            {btnSet()}
            <a href="#" className="a-btn -lg -s" onClick={updateReceipt}>수정</a> 
        </div>
    </React.Fragment>;
};

const S_receiptsCreateForm = ({_receipt,receiptIdx,user}) => {
    let receipt,setReceiptState;
    [receipt,setReceiptState] = React.useState( _receipt ); // 상태 관리용 HOOK
    const setReceipt = function(updateData){
        Object.assign(receipt,updateData);
        setReceiptState(receipt);
        return receipt;
    };
    const initReceipt = function(){
        receipt.idx = receiptIdx;
        // 상세내역 재정리(빈값 인 경우)
        if(!receipt.comment && getTagCode(receipt.tag)=="b"){
            receipt.comment = receipt.tag.split("/")[1];
        };
        firebase.database().ref(getReceiptsUrl(receiptIdx)).set(receipt);
        location.href = "/v1.2/book/";
        return false; 
    };
    const book = function(){
        location.href="/v1.2/book/";
        return false; 
    };
    return <React.Fragment>
        <M_receiptFormDateTime receipt={receipt} setReceipt={setReceipt}></M_receiptFormDateTime>
        <M_receiptFormStore receipt={receipt} setReceipt={setReceipt}></M_receiptFormStore>
        <M_receiptFormPrice receipt={receipt} setReceipt={setReceipt}></M_receiptFormPrice>
        <M_receiptFormMethod receipt={receipt} setReceipt={setReceipt}></M_receiptFormMethod>
        <M_receiptFormComment receipt={receipt} setReceipt={setReceipt}></M_receiptFormComment>
        <M_receiptFormTag receipt={receipt} setReceipt={setReceipt} user={user}></M_receiptFormTag>
        <div className="m-btnsWrap">
            <a href="#" className="a-btn -lg -c" onClick={book}>목록</a>
            <a href="#" className="a-btn -lg -s" onClick={initReceipt}>저장</a>
        </div>
    </React.Fragment>;
};