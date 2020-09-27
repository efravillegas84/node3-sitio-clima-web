const https =require('https')

var secretKey = "6LeZn74ZAAAAAHnPwT73JcZlN_eCnWMtW6rfc8bj";

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
