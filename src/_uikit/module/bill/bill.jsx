class M_Bill extends React.Component{
    render(h){
        return (<M_Bill2 name="nameValue" />);
    }
};




const M_Bill2 = ({name}) => {
    return <div>{name}</div>;
}; 