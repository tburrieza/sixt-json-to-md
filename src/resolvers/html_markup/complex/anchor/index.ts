const anchor_tag_regex = /((?=\<a).*?(?<=\<\/a>))/g
const href_attribbute_regex = /(?<=(href=("|'))).*?(?=">)/
const anchor_content_regex = /(?<=">).*?(?=<\/a)/

const AnchorResolver = async(data: string): Promise<string> => {

    let inputDataCopy = data

    const anchorList = data.match(anchor_tag_regex) || []

    for (let anchor of anchorList) {
        const hrefMatch = anchor.match(href_attribbute_regex)
        const href = (hrefMatch && hrefMatch[0]) || ''

        const contentMatch = anchor.match(anchor_content_regex)
        const content = (contentMatch && contentMatch[0]) || ''

        inputDataCopy = inputDataCopy.replace(anchor, `[${content}](${href})`)
    }

    return inputDataCopy
}

export default AnchorResolver