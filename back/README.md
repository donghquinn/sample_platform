# MVPType 은 constants의 리스트의 키를 가지고 만들어 두었다.

# 감정 요소에 따른 음식 리스트 뽑아오기

- 각 요소 별 1위 점수 = 사전 설문조사에서 응답 받은 빈도 수 만큼 부여


# 환경변수 설명

- DB_HOST: DB 서버 IP주소
- DB_NAM: 사용할 데이터베이스 이름
- DB_USER: DB 데이터베이스 유저 이름
- DB_PASSWD: DB 유저 비밀번호
- DB_PORT: DB 서버 포트 번호

- NODE_ENV: 실행환경 development | production

- CLIENT_TABLE: 유저 정보 테이블
- MVP_TABLE: 입맛 유형 테이블
- EMOTION_TABLE: 감정 음식 리스트 테이블
- NORMAL_TALBE: 일반 음식 리스트 테이블
- MVP_PERCENT_TABLE: 유형 퍼센트 테이블

- APP_PORT: 사용할 포트 번호

# 로그인 세션

### 회원가입

회원가입 필수 정보

- email : 로그인 이메일
- password : 패스워드
- gender : 성별
- dateOfBirth : 출생연도

> pawword는 프론트단에서 인코딩하여 전달

### 로그인

이메일과 인코딩된 패스워드를 바디에 담아 요청 전송.

응답으로 토큰 값과 로그인 성공 담아 리턴


> 로그인 이후 요청 헤더에 jwt 담아 전송. 미들웨어에서 jwt 인증 과정 거쳐서 요청 검증