const router = require("koa-router")();
const svgCaptcha = require("svg-captcha");
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

module.exports = router;
