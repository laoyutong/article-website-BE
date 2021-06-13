const router = require("koa-router")();
const svgCaptcha = require("svg-captcha");
const { User } = require("../modal/modal");
const { sucModal, errModal } = require("../utils");

router.get("/captcha", async (ctx) => {
  const { data, text } = svgCaptcha.create({
    size: 4,
    width: 100,
    height: 40,
    fontSize: 50,
    ignoreChars: "0oO1ilI",
    noise: 2,
    color: true,
    background: "#eee",
  });
  ctx.session.captchaText = text.toLowerCase();
  ctx.body = sucModal(data);
});

router.post("/register", async (ctx) => {
  const { username, password, captcha } = ctx.request.body;
  if (captcha !== ctx.session.captchaText) {
    ctx.body = errModal("验证码错误");
    return;
  }
  const instance = await User.findOne({
    where: {
      username,
    },
  });
  if (instance) {
    ctx.body = errModal("该用户名已经被注册");
    return;
  }
  await User.create({ username, password });
  ctx.body = sucModal("注册成功");
});

router.post("/login", async (ctx) => {
  const { username, password, captcha } = ctx.request.body;
  if (captcha !== ctx.session.captchaText) {
    ctx.body = errModal("验证码错误");
    return;
  }
  const instance = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (instance) {
    ctx.body = sucModal("登录成功");
  } else {
    ctx.body = errModal("用户名或者密码错误");
  }
});

module.exports = router;
