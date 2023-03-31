const swaggerJSDoc = require("swagger-jsdoc");

// Swagger 문서 정보를 정의합니다.
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "soundmeout",
      version: "1.0.0",
      description:
        "강원대학교 캡스톤 프로젝트-soundmeout(떠나보내기)의 API 문서",
    },
    license: {
      name: "MIT",
      url: "http://localhost:3001/api-docs/",
    },
    contact: {
      name: "smaivnn",
      url: "https://github.com/smaivnn",
      email: "smaivnn@kakao.com",
    },
    servers: [
      {
        url: "http://localhost:3500",
        description: "local Server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "API for users in the system",
      },
      {
        name: "Admin",
        description: "API for admin in the system",
      },
    ],
  },
  // API 엔드포인트에 대한 설정 정보를 작성한 파일을 불러옵니다.
  apis: ["./routes/*.js", "./swagger/*.yaml"], // 라우트 파일 경로
};

// Swagger JSDoc 객체를 초기화합니다.
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;

// 사용법 : https://overcome-the-limits.tistory.com/101
