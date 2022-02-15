const S_nowMonthTotal = ({receipts}) =>{
    const pasteReceipt = function(){
        navigator.clipboard.readText().then((text) => {
            return text;
        }).then(function(origin){
            let pasteReceipt = {};
            pasteReceipt.idx = Receipts.length;
            pasteReceipt.datetime = getSmsDateTime(origin);
            pasteReceipt.price = getSmsPrice(origin);
            pasteReceipt.method = getSmsMethod(origin);
            pasteReceipt.store = getSmsStore(origin);
            pasteReceipt.useYn = "N";
            pasteReceipt.tag = "";
            pasteReceipt.origin = origin;
            return firebase.database().ref(getReceiptsUrl(Receipts.length)).set(pasteReceipt);
        }).then(function(){
            setTimeout(function(){
                location.href = "/v1.1/update/?idx="+(Receipts.length-1); // set이 된 후 라, length가 하나 올라갔음.
            },200);
        });
    };

    return (
        <section className="s-nowMonthTotal">
            <C_monthTotal receipts={receipts}></C_monthTotal>
            <div className="-writeBtn">
                <a href="/v1.2/create/" className="a-btn -l">새로등록</a>
                <a className="a-btn -l" onClick={pasteReceipt}>붙여넣기</a>
            </div>
        </section>
    );
};

const C_monthTotal = ({receipts}) => {
    let monthTotal = 0;
    const tagTotal = {f:0,r:0,c:0,o:0};
    for(receipt of receipts){
        tagTotal[getTagCode(receipt.tag)] += receipt.price; 
        monthTotal += receipt.price;
    };
    return (
        <article className="c-monthTotal">
            <h2>2022년 2월 지출금액</h2>
            <details>
                <summary><span className="a-price -xl">{monthTotal.toLocaleString()}</span></summary>
                <ul className="m-tagByTotal">
                    <li><label className="a-tag -f">고정</label> <span className="a-price">{tagTotal.f.toLocaleString()}</span></li>
                    <li><label className="a-tag -r">필수</label> <span className="a-price">{tagTotal.r.toLocaleString()}</span></li>
                    <li><label className="a-tag -c">변동</label> <span className="a-price">{tagTotal.c.toLocaleString()}</span></li>
                    <li><label className="a-tag -o">기타</label> <span className="a-price">{tagTotal.o.toLocaleString()}</span></li>
                </ul>
            </details>
        </article>
    );
};