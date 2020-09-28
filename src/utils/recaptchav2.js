const https =require('https')

var secretKey = process.env.RECAPTCHAV2_SECRET_KEY

function verificarCaptcha(key, callback) {
        const url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + key
        https.get(url, function(res) {
            var data = "";
            res.on('data', function (chunk) {
                    data += chunk.toString();
            });
            res.on('end', function() {
                    try {
                            var parsedData = JSON.parse(data);
                            callback(parsedData.success);
                    } catch (e) {
                            callback(false);
                    }
            });
    });
}

module.exports = verificarCaptcha
