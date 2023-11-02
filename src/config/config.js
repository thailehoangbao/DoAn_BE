// biến môi trường , environment
// lưu vào trong biến toàn cục, process.env
import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env);

export default {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
}

//yarn add dotenv sử dụng biến môi trường trong file .env