// Text Element Resolver
// CType: text

import { string_new_paragraph, TextElement, title_markdown_opening_tag } from "../../../model/model";
import Output from "../../../utils/output";
import HTMLMarkupMatcher from "../../html_markup/matcher";

const TextMarkdownResolver = async (textElement: TextElement): Promise<Output> => {
    let output = new Output("")

    if (!textElement.title_hidden) {

        output.add(`${title_markdown_opening_tag} ${textElement.title}`)
        output.add(string_new_paragraph)
        output.add(await HTMLMarkupMatcher(textElement.description))
    } 

    return output
}

export default TextMarkdownResolver