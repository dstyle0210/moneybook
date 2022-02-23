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
        await page.keyboard.type(receipt.date);
        await page.keyboard.press(`Tab`);
        // 사용처
        await new Promise((res)=>{setTimeout(res,500)});
        await page.keyboard.type(receipt.store);
        await new Promise((res)=>{setTimeout(res,500)});
        await page.keyboard.press(`Tab`);
        // 사용내역
        await new Promise((res)=>{setTimeout(res,500)});
        await page.keyboard.type(receipt.comment);
        await new Promise((res)=>{setTimeout(res,500)});
        await page.keyboard.press(`Tab`);
        if(receipt.method=="현대스마일"){
            //현금
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.type(receipt.price);
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 출금통장
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드분류
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

        }else if(receipt.method=="국민봉올림"){
            //현금
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.type(receipt.price);
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 출금통장
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드분류
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

        }else if(receipt.method=="네이버페이"){
            //현금
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.type(receipt.price);
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
            // 카드
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 출금통장
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드분류
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
        }else if(receipt.method=="김포페이"){
            //현금
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.type(receipt.price);
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
            // 카드
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 출금통장
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('ArrowDown');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press('Enter');
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드분류
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
        }else{
            //현금
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
            // 카드
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 출금통장
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);

            // 카드분류
            await new Promise((res)=>{setTimeout(res,500)});
            await page.keyboard.press(`Tab`);
        }
        // 분류(입력못함)
        await page.keyboard.press(`Tab`);
        // 태그
        await new Promise((res)=>{setTimeout(res,500)});
        await page.keyboard.type(receipt.tag);

        await new Promise((res)=>{setTimeout(res,500)});
        await page.evaluate(async function(){
            var b = document.getElementsByClassName("ant-btn ant-btn-primary");
            b[0].click();
        });
        await new Promise((res)=>{setTimeout(res,2000)});
        await page.evaluate(async function(){
            location.reload();
        });
        await new Promise((res)=>{setTimeout(res,1000)});
        
        return true;
    };


    let data = [{
        date:"2022.02.01",
        store:"중화파워공판장",
        comment:"맥주 4캔",
        method:"국민봉올림",
        price:"100",
        tag:"기타"
    },{
        date:"2022.02.22",
        store:"운양 이마트24",
        comment:"히츠 두갑",
        method:"김포페이",
        price:"9000",
        tag:"용돈담배"
    },{
        date:"2022.02.10",
        store:"운양 이마트24",
        comment:"히츠 두갑22",
        method:"네이버페이",
        price:"10000",
        tag:"용돈담배"
    }];


    let data2 = [{"date":"2022.02.15","store":"현금_용처","comment":"현금현금","method":"현금","price":"100","tag":"고정/세금"},{"date":"2022.02.15","store":"김포페이_용처","comment":"김포페이김포페이","method":"김포페이","price":"100","tag":"고정/보험"},{"date":"2022.02.23","store":"국민봉올림_용처","comment":"국민봉올림국민봉올림","method":"국민봉올림","price":"100","tag":"필수/생활필수품"},{"date":"2022.02.23","store":"국민마올림_용처","comment":"국민마올림국민마올림","method":"국민마올림","price":"1000","tag":"변동/자동차,택시"},{"date":"2022.02.23","store":"현대스마일_용처","comment":"현대스마일현대스마일","method":"현대스마일","price":"300","tag":"기타/미용,패션"},{"date":"2022.02.23","store":"현대네이버_용처","comment":"현대네이버현대네이버","method":"현대네이버","price":"400","tag":"필수/경조사비"}];
    let data3 = JSON.stringify(data2);
    let data4 = JSON.parse(data3);
    let count = 0;
    for(let item of data4){
        await test(item);
    };

    

    await browser.close();
    
})();