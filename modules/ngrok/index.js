import chalk from 'chalk'
import ngrok from 'ngrok'

export default () => {
  const { nuxt } = this

  // Don't start NGROK in production mode
  // nuxt.options is the nuxt.config.js merged with the default values
  if (nuxt.options.dev === false) {
    return
  }

  // Start NGROK when Nuxt server is listening
  let url

  nuxt.hook('listen', async (server, { port }) => {
    const options = nuxt.options.ngrok || {}

    const token = process.env.NGROK_TOKEN || options.authtoken
    await ngrok.authtoken(token || '')

    url = await ngrok.connect(port)

    nuxt.options.publicRuntimeConfig.ngrok = { url }
    nuxt.options.cli.badgeMessages.push(
      `Public URL: ${chalk.underline.yellow(url)}`
    )
  })

  // Disconnect ngrok connection when closing nuxt
  nuxt.hook('close', () => {
    url && ngrok.disconnect(url)
  })
}
