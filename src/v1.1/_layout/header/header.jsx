const LAYOUT_header = ({title}) => {
    return (<React.Fragment>
        <h1>{title}</h1><span className="version">v1.1.1</span> 
    </React.Fragment>);
}


function setHeader(title){
    const $reactRoot = $("#header"); 
    ReactDOM.render( <LAYOUT_header title={title} /> ,$reactRoot.get(0));
};