const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        index: '/client/index.js',
        dashboard: '/client/dashboard.js',
        register: '/client/register.js',
        services: '/client/services.js',
        "admin-panel": '/client/admin-panel.js',
        reviews: '/client/reviews.js',
        "professional-requests": "/client/professional-requests",
        "professional-request-pending": "/client/professional-request-pending",
        "professional-request-declined": "/client/professional-request-declined",
        "account-blocked": "/client/account-blocked",
        "professional-service-not-found": "/client/professional-service-not-found",
        "service-requests": "/client/service-requests",
        account: "/client/account.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js'),
        publicPath: 'static/js/'
    }
};