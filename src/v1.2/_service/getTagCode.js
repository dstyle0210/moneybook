function getTagCode(tag){ 
    if((/고정/).test(tag)){return "f"};
    if((/필수/).test(tag)){return "r"};
    if((/변동/).test(tag)){return "c"};
    if((/기타/).test(tag)){return "o"};
    if((/용돈/).test(tag)){return "b"};
};