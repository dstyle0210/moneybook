const S_nowMonthTotal = ({receipts}) =>{
    return (
        <React.Fragment>
            <C_monthTotal receipts={receipts}></C_monthTotal>
            <div className="-writeBtn">
                <a href="/v1/create/" className="a-btn -l">등록</a>
            </div>
        </React.Fragment>
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
            <h2>2022년 1월 지출금액</h2>
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