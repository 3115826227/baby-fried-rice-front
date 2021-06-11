const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://localhost:18070/api/' : 'http://localhost:8081'
}