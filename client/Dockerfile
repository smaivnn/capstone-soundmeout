FROM node:18.15.0-alpine as builder	
# 노드버전 15.7.0
WORKDIR /app	
# 작업 위치 지정
ENV PATH /app/node_modules/.bin:$PATH	
# 환경변수 지정

COPY . /app	
#현재 파일을 이미지의 /app 위치에 복사
RUN npm install	
#package.json에 명시된 의존성 설치
RUN npm run build	
#빌드시작!


#nginx 
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d	
#기존 환경설정 제거
COPY conf /etc/nginx	
#내 디렉토리의 conf폴더 내용을 복사
	#현재위치/conf/conf.d/default.conf 가 존재해야합니다.
COPY --from=builder /app/build /usr/share/nginx/html

#builder로 부터 /app/build를 복사해옵니다.

# 80번 포트를 노출한다고 써놨지만, 이는 명시하기 위한 것으로 반드시 docker run의 옵션으로 포트
# 매핑을 해야합니다.

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]