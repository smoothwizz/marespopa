import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = async () => {
      return originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) =>
          function enhanceApp(props) {
            return <App {...props} />
          },
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })
    }

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        </Head>
        <body className="font-roboto">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
