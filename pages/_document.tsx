import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* next.js font optimization 은 IE의 User Agent 로 요청한 응답도
           가져오기 때문에 (getFontDefinitionFromNetwork) 전체 폰트를 다운로드하는 문제가 있음. */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&display=swap"
            as="style"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `</style>
                        <link
                          rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&display=swap"
                          media="print"
                          onload="this.media='all';"
                        />
                        <style>`,
            }}
          ></style>
          <noscript>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&display=swap"
            />
          </noscript>

          
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YG30TYCGWP');
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
