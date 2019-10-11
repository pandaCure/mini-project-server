const handleError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.log.error(e.stack)
  }
}
module.exports = handleError
