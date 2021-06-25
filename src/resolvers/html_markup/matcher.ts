import { MarkdownEquivalence, string_new_line, string_new_paragraph } from "../../model/model"
import AnchorResolver from "./complex/anchor"

const replace_with_nothing = [/(\r\n|\n|\r|\s\t|\t|&nbsp;)/gm, "<div>", "</div>"]

const equivalences = [
    {
        opening_tag: '<li>',
        closing_tag: '</li>',
        opening_markdown: '- ',
        closing_markdown: string_new_line
    } as MarkdownEquivalence,
    {
       opening_tag: "<ul>",
       closing_tag: "</ul>",
       opening_markdown: '',
       closing_markdown: string_new_line
    } as MarkdownEquivalence,
    { // composed tag
        opening_tag: '<p><strong>',
        closing_tag: '</strong></p>',
        opening_markdown: '## ',
        closing_markdown: string_new_paragraph
    } as MarkdownEquivalence,
    {
        opening_tag: '<p>',
        closing_tag: '</p>',
        opening_markdown: '',
        closing_markdown: string_new_paragraph
    } as MarkdownEquivalence,
    {
        opening_tag: '<strong>',
        closing_tag: '</strong>',
        opening_markdown: '**',
        closing_markdown: '**'
    } as MarkdownEquivalence,
]

const HTMLMarkupMatcher = async(htmlContent?: string): Promise<string> => {
    let internalContent = htmlContent || ""

    // First, resolve the complex transformation. In this case Anchors Objects are the only one.
    internalContent = await AnchorResolver(internalContent)

    // Replace Junk characters, symbols, spaces and unsued HTML elements
    for (let singleReplacement of replace_with_nothing) {
        internalContent = internalContent.replaceAll(singleReplacement, '')
    }

    // Transform from Markup to Markdown doing an iteration from `equivalences` array
    for (let equivalence of equivalences) {
        internalContent = internalContent
            .replaceAll(equivalence.opening_tag, equivalence.opening_markdown)
            .replaceAll(equivalence.closing_tag || '', equivalence.closing_markdown || '')
    }

    return internalContent
}

export default HTMLMarkupMatcher