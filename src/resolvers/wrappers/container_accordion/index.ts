// Resolve Accordion and Container, both goes together.

import { hyphen_separator, SingleElement } from "../../../model/model";
import Output from "../../../utils/output";
import HTMLMarkupMatcher from "../../html_markup/matcher";

const ContainerAccordionResolver = async(elements: SingleElement[]): Promise<Output> => {
    let output = new Output("")

    for (let element of elements) {
        if (element.CType == 'container') {
            output.add(hyphen_separator)
            output.withNewLine()
            output.add(`# ${element.title}`)
            output.withNewParagraph()
        } else if (element.CType == 'accordion') {
            if (element.elements && element.elements.length > 0) {
                for (let singleElement of element.elements) {
                    output.add(`## ${singleElement.title}`)
                    output.withNewParagraph()
                    output.add(await HTMLMarkupMatcher(singleElement.description))
                }
            }
        }
    }

    return output
}

export default ContainerAccordionResolver