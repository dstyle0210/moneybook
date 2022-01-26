function getSmsPrice(text){ 
    try{

        const price = text.match( (new RegExp("")) )[0];
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

console.log( getSmsPrice("123,123원") );