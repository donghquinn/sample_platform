FROM node:18-alpine

ADD . /home/taste

WORKDIR /home/taste

RUN apk --no-cache add curl && npm install -g npm

RUN npm install

RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

RUN npm run build

CMD ["npm",  "start"]