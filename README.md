# moneybook
가계부 v1.29.0






## 아이디어(추가할거)
- 장소변환 : 자주가는 곳들
- 필수/구독 영역 생성 : 쿠팡 , 멜론 , 넣어야 하나? 좀 고민됨.


## 기능들
- 구글로그인 (firebase auth)
- firebase DB , hosting 이용
- 붙여넣기 : 문자(SMS)내역 복사 붙여넣기
- 빠른입력(현금) 지원
- 네이버가계부로 반자동입력(매월 말일)

## 콘솔
### firebase login을 위한 권한변경
```powershell
Set-ExecutionPolicy RemoteSigned
```
### Git 등록 (github)
```console
git config --global user.name dstyle0210
git config --global user.email dstyle0210@gmail.com
```

### 필요모듈 설치
```console
npm i -g firebase-tools gulp-cli gulp
npm i
```

### Dev (해당버전 이동)
```console
cd ./src/v1.2
gulp dev
gulp dist
```


### Firebase Deploy
```console
firebase login
gulp deploy
```

### 네이버 가계부 자동등록
- export 를 통해 json데이터 가져온 후 실행
```console
node naverExport
```


## 업데이트 이력
### v1.29.0
- 결제방식(method) : 국민카드 마이포인트 카드 추가

### v1.28.1
- 상세자동입력 : 장소 + 금액 + 카드로 주로 사용하는 것들은 상세도 기본으로 채워서 바로 저장 가능하도록
  - 주차비, 통신비(LG U+) 외