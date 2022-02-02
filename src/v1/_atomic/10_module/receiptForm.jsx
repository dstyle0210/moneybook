const M_receiptFormDateTime = ({receipt,setReceipt}) => {
    let initValue = receipt.datetime;
    return (
        <div className="m-receiptForm -dateTime">
            <label htmlFor="form_dateTime">결제시간</label>
            <div className="m-receiptForm__inputs"><input type="datetime-local" id="form_dateTime" defaultValue={initValue} onChange={(e) => {setReceipt({datetime:e.target.value})}} /></div>
        </div>
    );
}

const M_receiptFormStore = ({receipt,setReceipt}) => {
    console.log(setReceipt);
    let initValue = receipt.store || "";
    return (
        <div className="m-receiptForm -store">
            <label htmlFor="form_store">사용처</label>
            <div className="m-receiptForm__inputs"><input type="text" id="form_store" defaultValue={initValue} onChange={(e) => {setReceipt({store:e.target.value})}} /></div>
        </div>
    );
};

const M_receiptFormPrice = ({receipt,setReceipt}) => {
    let initValue = receipt.price || "";
    return (
        <div className="m-receiptForm -price">
            <label htmlFor="form_price">금액</label>
            <div className="m-receiptForm__inputs"><input type="number" id="form_price" defaultValue={initValue} onChange={(e) => {setReceipt({price:e.target.value})}} /></div>
        </div>
    );
};

const M_receiptFormMethod = ({receipt,setReceipt}) => {
    let initValue = receipt.method || "";
    return (
        <div className="m-receiptForm -method">
            <label htmlFor="form_method">결제수단</label>
            <div className="m-receiptForm__inputs">
                <select onChange={(e) => {setReceipt({method:e.target.value})}} defaultValue={initValue}>
                    <option value="">결제수단 선택하기</option>
                    <option value="현금">현금</option>
                    <option value="국민봉올림">국민카드 - 봉올림</option>
                    <option value="국민마올림">국민카드 - 마올림</option>
                    <option value="현대스마일">현대카드 - 스마일</option>
                    <option value="김포페이">김포페이</option>
                    <option value="네이버페이">네이버페이</option>
                    <option value="카카오페이">카카오페이</option>
                    <option value="계좌이체">계좌이체</option>
                </select>
            </div>
        </div>
    );
};

const M_receiptFormComment = ({receipt,setReceipt}) => {
    let initValue = receipt.comment || "";
    return (
        <div className="m-receiptForm -comment">
            <label htmlFor="form_comment">상세내역</label>
            <div className="m-receiptForm__inputs"><input type="text" id="form_comment" defaultValue={initValue} onChange={(e) => {setReceipt({comment:e.target.value})}} /></div>
        </div>
    );
};

const M_receiptFormTag = ({receipt,setReceipt}) => {
    let initValue = receipt.tag || "";
    return (
        <div className="m-receiptForm -tag">
            <label>지출항목</label>
            <div className="m-receiptForm__tags">
                <label><input type="radio" name="tag" value="고정" onChange={(e) => {setReceipt({tag:e.target.value})}} defaultChecked={initValue=="고정"} /> <span className="a-tag -f">고정</span></label>
                <label><input type="radio" name="tag" value="필수" onChange={(e) => {setReceipt({tag:e.target.value})}} defaultChecked={initValue=="필수"} /> <span className="a-tag -r">필수</span></label>
                <label><input type="radio" name="tag" value="변동" onChange={(e) => {setReceipt({tag:e.target.value})}} defaultChecked={initValue=="변동"} /> <span className="a-tag -c">변동</span></label>
                <label><input type="radio" name="tag" value="기타" onChange={(e) => {setReceipt({tag:e.target.value})}} defaultChecked={initValue=="기타"} /> <span className="a-tag -o">기타</span></label>
            </div>
        </div>
    );
};