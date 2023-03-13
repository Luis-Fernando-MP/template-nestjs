import { env } from 'process'

function OAuthLayout(message: any, anyError: boolean = false) {
	const textContent = anyError ? 'Could not create your account' : 'Login success'
	return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
      <script> window.history.replaceState({}, "", location.pathname); window.opener.postMessage(${JSON.stringify(
				message
			)}, '${env.CLIENT_CALLBACK}');</script>
    </head>
    <body><div style="margin: 20% auto;display: flex;display: 100vw;width: 300px;align-content: center;justify-content: center;align-items: center;flex-direction: column-reverse;">
      <h1 style="color: #3f5483;text-align: center;font-family:"arial";font-size: 30px;">${textContent}</h1><img src="https://res.cloudinary.com/dkbp71nof/image/upload/v1678507480/personal/plain-logo_awvyay.svg" style="width: 110px;">
    </div></body>
  </html>`
}

export default OAuthLayout
