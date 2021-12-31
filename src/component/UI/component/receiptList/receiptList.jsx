const C_receiptList = ({receipts}) => {
    const receiptList = receipts.map(function(receipt,index){
        return (<li key={index}><a><M_receipt receipts={receipt}></M_receipt></a></li>);
    });
    return <ul className="c_receiptList">{receiptList}</ul>; 
    // return <React.Fragment>{receiptList}</React.Fragment>;
};