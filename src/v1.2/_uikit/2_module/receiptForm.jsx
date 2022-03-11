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
                    <option value="현대네이버">현대카드 - 네이버</option>
                    <option value="김포페이">김포페이</option>
                    <option value="네이버페이">네이버페이</option>
                    <option value="카카오페이">카카오페이</option>
                    <option value="계좌이체">계좌이체</option>
                    <option value="국민하이패스">국민카드 - 하이패스</option>
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

const M_receiptFormTag = ({receipt,setReceipt,user}) => {
    let [tag,setTag] = React.useState( (receipt.tag).split("/")[0] || "" );
    let [subTag,setSubTag] = React.useState( (receipt.tag).split("/")[1] || "" );
    const changeTag = function(value){
        setTag( (value).split("/")[0] || "" );
        setReceipt({tag:value});
    };
    const bong = isPinMode(user.uid) ? (<A_tagBtn name="용돈" inputName="tag" _tag={tag} _changeTag={changeTag} tagClassName="b"></A_tagBtn>) : "";
    return (
        <React.Fragment>
        <div className="m-receiptForm -tag">
            <label>지출항목</label>
            <div className="m-receiptForm__tags">
                <A_tagBtn name="고정" inputName="tag" _tag={tag} _changeTag={changeTag} tagClassName="f"></A_tagBtn>
                <A_tagBtn name="필수" inputName="tag" _tag={tag} _changeTag={changeTag} tagClassName="r"></A_tagBtn>
                <A_tagBtn name="변동" inputName="tag" _tag={tag} _changeTag={changeTag} tagClassName="c"></A_tagBtn>
                <A_tagBtn name="기타" inputName="tag" _tag={tag} _changeTag={changeTag} tagClassName="o"></A_tagBtn>
                {bong}
            </div>
        </div>
        <M_receiptFormSubTag _tag={receipt.tag} _changeTag={changeTag}></M_receiptFormSubTag> 
        </React.Fragment>
    );
};

const M_receiptFormSubTag = ({_tag,_changeTag}) => {
    let initTag = (_tag).split("/")[0] || "";
    let initSubTag = (_tag).split("/")[1] || "";
    let subTags = {
        "":[],
        "고정":["세금","공과금","보험","용돈","교육비","통신비"],
        "필수":["주식,식재료","음료수,간식","생활필수품","대중교통","경조사비"],
        "변동":["외식,커피","의료비","문화,여행","자동차,택시"],
        "기타":["미용,패션","가구,가전","그외,뭐지"],
        "용돈":["식비","담배","음료수","그외"]
    };
    const changeTag = function(value){
        _changeTag(initTag+"/"+value);
    };
    return (
        <div className="m-receiptForm -subtag">
            <label>세부지출항목</label>
            <div className="m-receiptForm__tags">
                {subTags[initTag].map((subTag,index)=>{
                    return <A_tagBtn key={index.toString()} name={subTag} inputName="subtag" _tag={initSubTag} _changeTag={changeTag} tagClassName={getTagCode(initTag)}></A_tagBtn>
                })}
            </div>
        </div>
    );
};

const A_tagBtn = ({name,inputName,_tag,_changeTag,tagClassName}) => {
    // console.log(_tag);
    return(<label className="a-tagBtn"><input type="radio" name={inputName} value={name} onChange={(e) => {_changeTag(e.target.value)}} defaultChecked={_tag==name} /> <span className={"a-tagbtn -"+tagClassName}>{name}</span></label>);
}

// "[Web발신]\n네이버 현대카드 승인\r\n원*봉\r\n29,700원 일시불\r\n02/11 08:51\r\n네이버페이\r\n누적272,890원"