let Receipt, // 대상 영수증, 
setReceiptState, // 영수증 State Change 함수
receiptIdx; // 대상 영수증 인덱스 번호
$(function(){
    firebase.auth(); // 인증체크
    firebase.database().ref("/receipt").on("value", (snapshot) => {
        const url = new URL(location.href);
        receiptIdx = url.searchParams.get("idx");
        Receipt = (snapshot.val())[receiptIdx]; // 영수증 저장
        
        console.log(Receipt);

        const $reactRoot = $("#receiptsUpdateForm");
        ReactDOM.render( <S_receiptsUpdate receipt={Receipt} /> ,$reactRoot.get(0));

        $("#updateReceipt").on("click",updateReceipt);
    });
});


function setReceipt(updateData){
    Object.assign(Receipt,updateData);
    setReceiptState(Receipt);
};

function updateReceipt(){
    firebase.database().ref("/receipt/"+receiptIdx).set(Receipt);
    return false;
};

const S_receiptsUpdate = ({receipt}) => {
    return (<React.Fragment>
        <M_receiptUpdateDateTime label="결제시간" value={Receipt.datetime}></M_receiptUpdateDateTime>
        <M_receiptUpdateStore label="사용처" value={Receipt.store}></M_receiptUpdateStore>
        <M_receiptUpdatePrice label="금액" value={Receipt.price}></M_receiptUpdatePrice>
        <M_receiptUpdateMethod label="결제수단" value={Receipt.method}></M_receiptUpdateMethod>
        <M_receiptUpdateComment label="상세내역" value={Receipt.comment}></M_receiptUpdateComment>
    <div>
        <label>지출성격</label>
        <label><input type="radio" name="write_outgoingsType" /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" defaultChecked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" /> 기타</label>
    </div></React.Fragment>);
};

const M_receiptUpdateDateTime = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -dateTime">
        <label htmlFor="update_dateTime">{label}</label>
        <input type="datetime-local" id="update_dateTime" defaultValue={value} onChange={(e) => {setReceipt({datetime:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdateStore = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -store">
        <label htmlFor="update_store">{label}</label>
        <input type="text" id="update_store" defaultValue={value} onChange={(e) => {setReceipt({store:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdatePrice = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -price">
        <label htmlFor="update_price">{label}</label>
        <input type="text" id="update_price" defaultValue={value} onChange={(e) => {setReceipt({price:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdateMethod = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -method">
        <label htmlFor="update_method">{label}</label>
        <input type="text" id="update_method" defaultValue={value} onChange={(e) => {setReceipt({method:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdateComment = ({label,value}) => {
    return (
    <div className="m-receiptUpdate -comment">
        <label htmlFor="update_comment">{label}</label>
        <input type="text" id="update_comment" defaultValue={value} onChange={(e) => {setReceipt({comment:e.target.value})}} />
    </div>
    );
};

const M_receiptUpdateOutCategory = ({label,value}) => {
    return (
    <fieldset className="m-receiptUpdate -outCategory">
        <legend>{label}</legend>
        <label><input type="radio" name="write_outgoingsType" value="" onChange={(e) => {setReceipt({outCategory:e.target.value})}} /> 고정</label>
        <label><input type="radio" name="write_outgoingsType" onChange={(e) => {setReceipt({outCategory:e.target.value})}} /> 필수</label>
        <label><input type="radio" name="write_outgoingsType" onChange={(e) => {setReceipt({outCategory:e.target.value})}} defaultChecked /> 변동</label>
        <label><input type="radio" name="write_outgoingsType" onChange={(e) => {setReceipt({outCategory:e.target.value})}} /> 기타</label>
    </fieldset>
    );
};