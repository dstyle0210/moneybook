const LAYOUT_header = ({title}) => {
    return (<h1>{title}</h1>);
}


function setHeader(title){
    const $reactRoot = $("#header"); 
    ReactDOM.render( <LAYOUT_header title={title} /> ,$reactRoot.get(0));
};