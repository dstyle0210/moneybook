const fs = require("fs");
const {chromium,devices, firefox} = require("playwright");
var result = [];
var browser,page;
(async () => {
    browser = await chromium.launch({
        headless:false,
        executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    });
    page = await browser.newPage();

    // await page.goto("https://docs.google.com/spreadsheets/d/1vruON1NQIwR_8ibTbJeu_IYXxdowmKayWHHb8kufdcM/edit?usp=sharing");
    await page.goto("https://www.naver.com/");
    await new Promise((res)=>{setTimeout(res,15000)});
    console.log("가계부로 이동");
    await page.goto("https://moneybook.naver.com/");
    await new Promise((res)=>{setTimeout(res,2000)});
    console.log("입력시작");

    // 아래키 누르고, 엔터
    let ArrowDown = async function(count){
        for(let i=0;i<count;i++){
            await new Promise((res)=>{setTimeout(res,200)});
            await page.keyboard.press('ArrowDown');
        }
        await new Promise((res)=>{setTimeout(res,200)});
        await page.keyboard.press('Enter');
        return true;
    };

    let Tab = async function(){
        await new Promise((res)=>{setTimeout(res,200)});
        await page.keyboard.press(`Tab`);
    };

    let Type = async function(text){
        await new Promise((res)=>{setTimeout(res,200)});
        await page.keyboard.type(text+"");
        await Tab();
    };
    
    

    let test = async function(receipt){
        await page.keyboard.down('Shift');
        await page.keyboard.press(`Tab`);
        await page.keyboard.press(`Tab`);
        await page.keyboard.up('Shift');

        console.log(receipt);
        // 날짜 입력 시작
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await page.keyboard.press(`Backspace`);
        await Type(receipt.date);

        // 사용처
        await Type(receipt.store);

        // 사용내역
        await Type(receipt.comment);


        // 현금 , 카드 금액 넣기
        if(receipt.type=="card"){
            await Tab(); // 현금 넘어감
            await Type(receipt.price); // 카드 넣음
        }else{
            await Type(receipt.price); // 현금 넣음
            await Tab(); // 카드 넘어감
        }

        if(receipt.method=="현금"){
            await ArrowDown(1);
        }else if(receipt.method=="계좌이체"){
            await ArrowDown(2);
        }else if(receipt.method=="김포페이"){
            await ArrowDown(3);
        }else if(receipt.method=="네이버페이"){
            await ArrowDown(4);
        }else if(receipt.method=="카카오페이"){
            await ArrowDown(5);
        };
        await Tab();
        
        
        // 카드분류
        if(receipt.method=="현대스마일"){
            await ArrowDown(1);
        }else if(receipt.method=="국민마올림"){
            await ArrowDown(2);
        }else if(receipt.method=="현대네이버"){
            await ArrowDown(3);
        }else if(receipt.method=="국민봉올림"){
            await ArrowDown(4);
        }
        await Tab();



        // 분류(입력못함)
        await Tab();

        // 태그
        await Type(receipt.tag); // 카드 넣음

        // 저장처리
        await new Promise((res)=>{setTimeout(res,200)});
        await page.evaluate(async function(){
            var b = document.getElementsByClassName("ant-btn ant-btn-primary");
            b[0].click();
        });
        await new Promise((res)=>{setTimeout(res,1000)});

        // 새로고침(포커스 초기화 , 스크롤 버그 회피)
        await page.evaluate(async function(){
            location.reload();
        });
        await new Promise((res)=>{setTimeout(res,1000)});
        
        return true;
    };

    let data2 = [{"date":"2023.11.03","store":"태광상사주식회","comment":"휘발유 1665","method":"국민봉올림","price":"50000","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.01","store":"포도약국","comment":"이비인후과 약","method":"국민봉올림","price":"3900","tag":"변동,의료비","type":"card"},{"date":"2023.11.01","store":"참좋은이비인후과","comment":"왼쪽 고막 절개술","method":"국민봉올림","price":"29900","tag":"변동,의료비","type":"card"},{"date":"2023.11.01","store":"카카오 T 주차 ","comment":"디지털큐브 주차","method":"국민봉올림","price":"13900","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.01","store":"네이버페이\r","comment":"도진 지갑","method":"현대네이버","price":"8390","tag":"기타,그외,뭐지","type":"card"},{"date":"2023.11.03","store":"카카오 T 주차","comment":"다지털큐브","method":"국민봉올림","price":"13900","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.03","store":"하남정","comment":"해장국2 , 돈까스","method":"국민봉올림","price":"33000","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.04","store":"예손약국","comment":"지르세틴","method":"국민봉올림","price":"3000","tag":"변동,의료비","type":"card"},{"date":"2023.11.04","store":"파리바게뜨(김포","comment":"소세지빵 ","method":"국민봉올림","price":"710","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.04","store":"롯데슈퍼 김포전","comment":"도진 우유","method":"국민봉올림","price":"890","tag":"필수,음료수,간식","type":"card"},{"date":"2023.11.04","store":"김영화 부대찌개","comment":"김포페이 , 부대찌개2, 어린이불고기","method":"김포페이","price":"28000","tag":"변동,외식,커피","type":"cash"},{"date":"2023.11.04","store":"김포시청","comment":"공영주차비","method":"국민봉올림","price":"1800","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.04","store":"동보민나 주식회 팔각도","comment":"장인어른 장모님 외식","method":"국민봉올림","price":"117500","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.04","store":"동보민나 주식회 팔각도","comment":"라면 추가","method":"국민봉올림","price":"13000","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.05","store":"알리익스프레스","comment":"아버님 모니터","method":"국민봉올림","price":"39325","tag":"기타,그외,뭐지","type":"card"},{"date":"2023.11.05","store":"트레이더스","comment":"콤비피자, 음료","method":"현대스마일","price":"17800","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.05","store":"트레이더스 식료품","comment":"냉동식품 외","method":"현대스마일","price":"152170","tag":"필수,주식,식재료","type":"card"},{"date":"2023.11.05","store":"JL마켓탑","comment":"식료품","method":"국민봉올림","price":"5700","tag":"필수,주식,식재료","type":"card"},{"date":"2023.11.05","store":"정이가마트","comment":"식료품, 계란 등","method":"국민봉올림","price":"13940","tag":"필수,주식,식재료","type":"card"},{"date":"2023.11.06","store":"카카오 T 주차","comment":"디지털큐브 주차","method":"국민봉올림","price":"13900","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.06","store":"주식회사위메프\r","comment":"도진 옷","method":"현대네이버","price":"9060","tag":"기타,미용,패션","type":"card"},{"date":"2023.11.07","store":"감탄떡볶이","comment":"떡볶이 1인분","method":"김포페이","price":"3500","tag":"변동,외식,커피","type":"cash"},{"date":"2023.11.07","store":"11번가-SK PAY","comment":"화장품","method":"국민봉올림","price":"19805","tag":"기타,미용,패션","type":"card"},{"date":"2023.11.07","store":"엄마손찬방","comment":"김밥","method":"국민봉올림","price":"6000","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.07","store":"(주)프린팅박스","comment":"마용 여권사진","method":"국민봉올림","price":"2000","tag":"기타,그외,뭐지","type":"card"},{"date":"2023.11.07","store":"도로교통공단 안","comment":"마용운전면허갱신","method":"국민봉올림","price":"13800","tag":"기타,그외,뭐지","type":"card"},{"date":"2023.11.07","store":"김포감정주유소","comment":"휘발유 1645","method":"국민봉올림","price":"50000","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.07","store":"김포감정주유소","comment":"세차비","method":"국민봉올림","price":"5000","tag":"변동,자동차,택시","type":"card"},{"date":"2023.11.07","store":"예향정김포걸포","comment":"제육, 김치찌개, 새우볶음밥","method":"국민봉올림","price":"34000","tag":"변동,외식,커피","type":"card"},{"date":"2023.11.07","store":"참좋은이비인후","comment":"고믹진료, 독감주사","method":"국민봉올림","price":"44700","tag":"변동,의료비","type":"card"},{"date":"2023.11.07","store":"당근거래","comment":"흔한남매 6-10","method":"현금","price":"25000","tag":"변동,문화,여행","type":"cash"}];
    let data3 = JSON.stringify(data2);
    let data4 = JSON.parse(data3);
    let count = 0;
    for(let item of data4){
        item.store = (item.store).replace("\r","");
        await test(item);
    };

    

    await browser.close();
    
})();