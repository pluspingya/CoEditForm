const proxy = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(proxy(['/api'], {target: 'http://localhost:8080'}))
    app.use(proxy(['/primus'], {target: 'http://localhost:8080', ws: true }))
}