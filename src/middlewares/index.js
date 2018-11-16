export async function hello(ctx, next) {
    ctx.say = 'hello'
    await next()
} 