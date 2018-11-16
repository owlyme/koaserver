import Koa from "koa";
import convert from "koa-convert";
import logger from "koa-logger"; // 代替console
import Static from "koa-static";
import path from "path";
import bodyparser from "koa-bodyparser";
import json from "koa-json";

// import cors from "koa2-cors";
// import onerror from "koa-onerror";
// 

// 中间件
import { hello } from "./middlewares";

// 路由
import router from "./router";

// 初始化
const app = new Koa()

// 日志
// app.use(convert(logger()));

// 中间件
app.use(logger());
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
);
// app.use(json());
app.use(hello);

//设置静态资源的路径 
app.use(Static(path.join(__dirname, "../public")));



// app.use(async (ctx, next) => {
//   console.log(ctx.say);
//   await next()
// });

// 路由
router(app)



// error-handling
app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
});

export default app