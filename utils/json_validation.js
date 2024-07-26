export default { parseRequestBody, validateAuth,checkTokens };

function parseRequestBody(r) {
    try {
        if (r.variables.request_body) {
            JSON.parse(r.variables.request_body);
        }
        return r.variables.upstream;
    } catch (e) {
        r.error('JSON.parse exception');
        return '127.0.0.1:10415'; // Address for error response
    }
}

function validateAuth(r) {
    var auth_response = JSON.parse(r.responseBody);
    if (auth_response.isValid) {
        r.internalRedirect("/path-to-bank-service");  // Adjust as necessary
    } else {
        r.return(401, "Invalid token");
    }
}

function checkTokens(r) {
    r.return(200,r.headersIn.Authorization)
    // try {
    //     var payload = JSON.parse(r.responseBody);
    //     if (payload.email && payload.password) {
    //         r.log("Email and password are present.");
    //         return true;  // Valid payload
    //     } else {
    //         r.log("Email or password is missing.");
    //         return false;  // Invalid payload
    //     }
    // } catch (e) {
    //     r.error("JSON parsing error: " + e.toString());
    //     return false;  // Parsing error
    // }
}


