import { CountryElement, hyphen_separator, equals_sign_separator, SingleElement, TextElement, ViewMoreElement } from "../../../model/model";
import Output from "../../../utils/output";
import ContainerAccordionResolver from "../../wrappers/container_accordion";
import TextMarkdownResolver from "../text";
import ViewMoreElementResolver from "../view_more";

const accordionsAndContainers: string[] = ['container', 'accordion']

const CountryResolver = async(countryData: CountryElement) => {
    let output = new Output("")

    output.add(equals_sign_separator)
    output.withNewLine()
    output.add(countryData.country_iso2_code)
    output.withNewLine()
    output.add(hyphen_separator)
    output.withNewLine()

    // order by uid and filter by CType not container and not accordion
    const countryDataElementsPriority = countryData.page_elements.sort((a, b) => {
        if (a.uid > b.uid) {
            return 1
        }
        return -1
    }).filter(element => !accordionsAndContainers.includes(element.CType))

    output.mergeOther(await elementDispatcher(countryDataElementsPriority))

    const accordionsAndContainersElements = (countryData.page_elements.filter(
        element => accordionsAndContainers.includes(element.CType)
    ) as (SingleElement[])).filter(se => se.title_hidden == false || se.CType == 'accordion').sort(
        (a, b) => {
            if (![a.CType, b.CType].includes('container')) {
                return 1
            }

            return -1
        }
    )

    output.mergeOther(await elementDispatcher(accordionsAndContainersElements))

    return output.close()
}

const elementDispatcher = async(filteredList: (TextElement|SingleElement|ViewMoreElement)[]): Promise<Output> => {
    let output = new Output("")
    for (let element of filteredList) {
        let resolvedOutput = new Output("")
        switch (element.CType) {
            case 'text':
                resolvedOutput.mergeOther(await TextMarkdownResolver(element as TextElement))
                break;

            case 'view_more':
                resolvedOutput.mergeOther(await ViewMoreElementResolver(element as ViewMoreElement))
                break;

            case 'container':
                resolvedOutput.mergeOther(await ContainerAccordionResolver(filteredList))
                break;
        
            default:
                break;
        }

        output.mergeOther(resolvedOutput)
    }

    return output
}

export default CountryResolver