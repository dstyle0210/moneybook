const fs = require("fs");
const {chromium,devices, firefox} = require("playwright");
var result = [];
var browser,page;
(async () => {
    browser = await chromium.launch({
        headless:false
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

    let data2 = [];
    let data3 = JSON.stringify(data2);
    let data4 = JSON.parse(data3);
    let count = 0;
    for(let item of data4){
        item.store = (item.store).repalce("\r","");
        await test(item);
    };

    

    await browser.close();
    
})();