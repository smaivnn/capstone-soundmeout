const swaggerJSDoc = require("swagger-jsdoc");

// Swagger 문서 정보를 정의합니다.
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "soundmeout",
      version: "1.0.0",
      description:
        "강원대학교 캡스톤 프로젝트-soundmeout(떠나보내기)의 API 문서",
    },
    license: {
      name: "MIT",
      url: "http://localhost:3500/api-docs/",
    },
    contact: {
      name: "smaivnn",
      url: "https://github.com/smaivnn",
      email: "smaivnn@kakao.com",
    },
    servers: [
      {
        url: "http://localhost:3500", // 요청 URL
        description: "local Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "API for Auth in the system",
      },
      {
        name: "User",
        description: "API for User in the system",
      },
      {
        name: "Topic",
        description: "API for Topic in the system",
      },
      {
        name: "Paper",
        description: "API for Paper in the system",
      },
      {
        name: "Comment",
        description: "API for Comment in the system",
      },
      {
        name: "Follow",
        description: "API for Follow in the system",
      },
      {
        name: "Noti",
        description: "API for Notification in the system",
      },
    ],
    basePath: "/",
  },
  apis: ["./routes/*.js", "./swagger/*.yaml"],
};

// Swagger JSDoc 객체를 초기화합니다.
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;

// 사용법 : https://overcome-the-limits.tistory.com/101
