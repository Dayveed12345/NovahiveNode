// import swaggerJsdoc from 'swagger-jsdoc';
// import dotenv from 'dotenv';

// dotenv.config();

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Novahive',
//       version: '1.0.0',
//       description: 'API documentation for Novahive',
//       contact: {
//         name: 'The_last_php_bender',
//         email: 'nwinyinyadavid123@gmail.com',
//       },
//     },
//     servers: [
//       {
//         url: process.env.BASE_URL, // Change to your API's base URL
//       },
//     ],
//   },
//   apis: ['./src/api/docs/*.js'], // Path to the API docs
// };

// const specs = swaggerJsdoc(options);

// export default specs;
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Novahive',
      version: '1.0.0',
      description: 'API documentation for Novahive',
      contact: {
        name: 'The_last_php_bender',
        email: 'nwinyinyadavid123@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL, // Change to your API's base URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/api/docs/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
