import {ProfileOptions, SizeOptions} from "./types.js";
import {htmlService} from "./htmlService.js";
import templateSolidMember from "./templates/template-solid-member.js";

export class CardService {

  renderCard(profile: ProfileOptions, op: SizeOptions) {
    const widget = htmlService.jsxToWidget(templateSolidMember(profile), op);
    const html = htmlService.wrapHTMLCard(widget.body, op);
    return {
      html: html,
      widget: widget
    }
  }
}

export const cardService = new CardService();