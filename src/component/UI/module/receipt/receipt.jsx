const M_receipt = ({receipts}) => {
    return (<article className="m-receipt">
    <strong className="a-price">{receipts.price}</strong>
    <span className="a-date">{receipts.datetime}</span>
    <span className="a-time">{receipts.datetime}</span>
    <span className="a-store">{receipts.store}</span>
    <span className="a-payment">{receipts.payment}</span>
    <span className="a-comment">{receipts.comment}</span>
    <span className="a-outgoingsType -fixed">{receipts.outCategory}</span>
  </article>);
};