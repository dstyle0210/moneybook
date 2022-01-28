function getMonthDate(datetime){
    var dateObj = new Date(datetime);
    var month = ((dateObj.getMonth()+1) < 9) ? "0"+(dateObj.getMonth()+1) : ""+(dateObj.getMonth()+1);
    var date = (dateObj.getDate()<9) ? "0"+dateObj.getDate() : ""+dateObj.getDate();
    return month+"."+date;
};
function getSmsDateTime(text){ 
    const num = "[0-9]{2}";
    const date = new Date();
    try{
        const dateText = text.match( (new RegExp(num+"/"+num,"gi")) )[0];
        const timeText = text.match( (new RegExp(num+":"+num,"gi")) )[0];
        const dateTimeText = dateText+" "+timeText;
        const tics = dateTimeText.match((new RegExp(num,"gi")));

        date.setMonth((tics[0]*1)-1);
        date.setDate((tics[1]*1));
        date.setHours((tics[2]*1));
        date.setMinutes((tics[3]*1));
    }catch(e){
        
    }finally{ 
        date.setSeconds(0);
        date.setHours( date.getHours() + 9 ); // ISO 시간규칙 적용
        return date.toISOString().split(":00.")[0];
    }
};
function getSmsPrice(text){ 
    try{
        const price = text.match( (new RegExp("")) )[0];
    }catch(e){
        
    }finally{
        
    }
}; 
function getTagCode(tag){ 
    if(tag=="고정"){return "f"};
    if(tag=="필수"){return "r"};
    if(tag=="변동"){return "c"};
    if(tag=="기타"){return "o"};
    if(tag=="용돈"){return "b"};
};