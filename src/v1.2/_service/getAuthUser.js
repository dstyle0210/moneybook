function getAuthUser(uid){
    if(uid==config.uidp){
        return "마봉아빠";
    }else if(uid==config.uidm){
        return "마봉엄마";
    };
    return null;
};

function isPinMode(uid){
    return (uid==config.uidp);
};