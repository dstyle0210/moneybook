# moneybook
가계부 v1.28
- 구글로그인 (firebase auth)
- firebase DB , hosting 이용
- 붙여넣기 : 국민카드 , 현대카드(네이버,스마일) 문자내역
- 빠른입력(현금) 지원

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