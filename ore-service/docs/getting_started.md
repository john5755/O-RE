# Getting Started

아래 과정을 통해 O:RE 서비스의 서버를 생성할 수 있습니다.

## 필수 사항

    1. Docker 및 Docker Compose 설치
        https://docs.docker.com/engine/install/
        https://docs.docker.com/compose/install/
        
    2. S3 bucket & IAM 생성


## 설치 가이드

#### 1. Git Clone

    git clone https://lab.ssafy.com/s07-final/S07P31A504
    cd S07B31A504/server

#### 2. `env.example` 환경 변수 설정

     # Domain of service
    DOMAIN=도메인주소

     # Mysql
    MYSQL_ROOT_PASSWORD=root 계정 비밀번호
    MYSQL_USER=신규 생성 유저명
    MYSQL_PASSWORD=유저 비밀번호
    MYSQL_DATABASE=DATABASE 이름

     # S3
    REGION=s3 지역
    ACCESS_KEY=S3 IAM access key
    SECRET_KEY=S3 IAM secret key
    BUCKET=S3 Bucket이름

     # mail - naver 계정만 가능
    MAIL_USERNAME=naver 아이디
    MAIL_PASSWORD=naver 비밀번호

#### 3. `.env` 파일 생성

    cp env.example .env

#### 4. docker image 빌드 및 컨테이너 실행

    docker-compose up -d