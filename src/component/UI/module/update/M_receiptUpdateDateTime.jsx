/**
 * 
 * @param {} param0 
 * @returns {React.component}
 */
const M_receiptUpdateDateTime = ({label="결제시간",value}) => {
    return (
    <div className="m-receiptUpdate -dateTime">
        <label for="update_dateTime">{label}</label>
        <input type="datetime-local" id="update_dateTime" value={value} /> 
    </div>
    );
}