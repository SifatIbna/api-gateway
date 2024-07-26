export default { handleRequest };

function handleRequest(r) {
  r.subrequest('/auth', function (res) {
    if (res.status === 200 || res.status === 201) {
      // Extract the 'Set-Cookie' header from the auth response
      let authCookie = res.headersOut['Set-Cookie'];

      let targetUri = r.uri.substring('/api/v1/'.length);
      let headers = {
        'Content-Length': r.headersIn['Content-Length'],
        'Content-Type': r.headersIn['Content-Type']
      };

      // Add the extracted cookie to the headers if it exists
      if (authCookie) {
        headers['Cookie'] = authCookie;
      }

      r.subrequest("/upload/process",
        {
          method: r.method,
          body: r.requestText,
          headers: headers
        },
        function (backend_res) {
          // Add response cookie back in the final response to the client
          if (authCookie) {
            r.headersOut['Set-Cookie'] = authCookie;
          }
          r.return(backend_res.status, backend_res.responseText);
        });
    } else {
      r.return(401, JSON.stringify({ error: "Unauthorized", message: "Invalid or expired token provided." }));
    }
  });
}
