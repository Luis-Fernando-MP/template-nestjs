import { env } from 'process'

function OAuthLayout(message: any) {
	return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
      <script>window.opener.postMessage(${JSON.stringify(message)}, '${
		env.CLIENT_CALLBACK
	}')</script>
    </head>
    <body></body>
  </html>`
}

export default OAuthLayout
