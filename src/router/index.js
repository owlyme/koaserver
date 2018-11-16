import Router from "koa-router";
import multer from "koa-multer";
import path from 'path'
const router = new Router();

console.log(path.resolve(__dirname, "../../public"))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public"));
    },
    filename: function (req, file, cb) {
        const fileFormat = file.originalname.split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    },
});
const upload = multer({ storage: storage });


// outer.get|put|post|patch|delete|del ⇒ Router
router.post("/user", async (ctx, next) => {
  console.log(2222, ctx.request.body);
  ctx.body = ctx.request.body;
});

router.post("/submitform",
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'file', maxCount: 1 },
        { name: 'fileList', maxCount: 12 },
    ]),
    async ctx => {
        console.log(1231, ctx.req.files["avatar"]);
    ctx.body = ctx.request.body;
});

export default function (app) {
    console.log("router")
    app.use(router.routes()).use(router.allowedMethods());
}