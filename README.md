# moneybook
가계부 v1.3.4

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
### v1.3.4
- 신규발급 국민카드 추가
- 자동입력 일부추가(편의점 , 주차)

### v1.3.3
- 로그인 검증 변경 (firebase)
- 삼성카드 추가

### v1.3.2
- 새로입력 안되는 현상 오류 수정
- 담배 갯수 정상으로 표시되도록 수정

### v1.3.1
- 자동입력 인경우, 수정페이지가 아닌, 목록으로 리다이렉트 처리
- 주차 붙여넣기 변경
- 소스 리팩토링(간소화)

### v1.3.0
- 은행내역에서, 보험료 내역 붙여넣기 지원


### v1.29.2
- 스마일카드 : SMS 형식 변경에 따른 수집로직 변경
- "고정/통신료" -> "고정/구독통신료" 로 명칭변경
- 멜론 , 쿠팡 자동추적 기능 추가(구독통신료)

### v1.29.1
- 결제방식(method)별 총합표시(실적확인용)
- "용돈 > 상계" 영역 삭제(무의미)
- 표시 로직 일부 변경

### v1.29.0
- 결제방식(method) : 국민카드 마이포인트 카드 추가

### v1.28.1
- 상세자동입력 : 장소 + 금액 + 카드로 주로 사용하는 것들은 상세도 기본으로 채워서 바로 저장 가능하도록
  - 주차비, 통신비(LG U+) 외



  ## 아이디어(추가할거)
- 장소변환 : 자주가는 곳들

