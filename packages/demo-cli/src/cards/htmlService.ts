import ReactDOMServer from "react-dom/server";
import {SizeOptions} from "./types.js";
import {JSX} from 'react'
import {getFile} from "./utils.js";



export class HtmlService {
  private stylesheet = getFile('css', 'output.css').toString();

  jsxToHTML(elm: JSX.Element, op: SizeOptions) {
    return this.wrapHTMLCard(ReactDOMServer.renderToStaticMarkup(elm), op);
  }

  jsxToWidget(elm: JSX.Element, op: SizeOptions) {
    const body = ReactDOMServer.renderToStaticMarkup(elm);

    return {
      stylesheet: this.stylesheet,
      body: body,
      width: op.width,
      height: op.height
    }
  }

  wrapHTMLCard(bodyHtml: string, op: SizeOptions) {

    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${this.stylesheet}</style>
    </head>
    <body style="width: ${op.width}px; height: ${op.height}px; background-color: black; margin: 80px auto;">${bodyHtml}</body>
    </html>`;
  }
}

export const htmlService = new HtmlService();