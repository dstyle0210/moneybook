const A_user = ({uid}) => {
    console.log(uid);
    let name = getAuthUser(uid);
    console.log(name);
    return (
        <span className="a-user">{name}</span>
    );
};