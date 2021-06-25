// ViewMore Element Resolver
// CType: view_more

import { title_markdown_opening_tag, ViewMoreElement } from "../../../model/model";
import Output from "../../../utils/output";
import HTMLMarkupMatcher from "../../html_markup/matcher";


const ViewMoreElementResolver = async (viewMoreElement: ViewMoreElement): Promise<Output> => {
    let output = new Output("")

    // Convert the Title and description
    output.add(`${title_markdown_opening_tag} ${viewMoreElement.title}`)
    output.withNewParagraph()
    output.add(await HTMLMarkupMatcher(viewMoreElement.description))

    // Then individually every children on `Elements`
    for (let singleElement of viewMoreElement.elements) {
        output.add(`${title_markdown_opening_tag} ${singleElement.title}`)
        output.withNewParagraph()
        output.add(await HTMLMarkupMatcher(singleElement.description))
        output.withNewParagraph()
    }

    return output
}

export default ViewMoreElementResolver