"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express = require("express");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: "*" });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.use('/uploads', express.static(path.join(process.cwd(), 'upload')));
    await app.listen(5000);
    console.log("Server on port :5000");
}
bootstrap();
//# sourceMappingURL=main.js.map