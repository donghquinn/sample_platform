declare global {
  namespace NodeJs {
    interface ProcessEnv {
      // DB 접속 환경변수
      DB_HOST: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWD: string;
      DB_PORT: string;

      NODE_ENV: string;

      // DB 테이블 환경변수
      CLIENT_TABLE: string;
      MVP_TABLE: string;
      MVP_PERCENT_TABLE: string;
      EMOTION_TABLE: string;
      NORMAL_TALBE: string;

      APP_PORT: string;

      NODE_ENV: string;
    }
  }
}

export {};
