function getSmsDateTime(origin,type){ 
    const num = "[0-9]{2,4}";
    const date = new Date();
    const isBank = type=="bank";
    const dateSep = (isBank) ? "." : "/"; // 날짜 구분자
    const origin_ = (isBank) ? origin.replace(/[0-9]{4}\./g,"") : origin; // 년 구분 삭제
    try{
        const dateText = (origin_.match( (new RegExp(num+dateSep+num,"gi")) )[0]).replace(/\./g,"/");
        const timeText = origin_.match( (new RegExp(num+":"+num,"gi")) )[0];
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