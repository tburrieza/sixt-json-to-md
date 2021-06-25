export interface CountryElement {
    country_name: string
    country_iso2_code: string
    page_elements: (TextElement|SingleElement|ViewMoreElement)[]
}

export interface TextElement {
    uid: number
    CType: string
    title: string
    title_hidden: boolean
    description: string
    cta_enalbed: number
    cta_title: string
    cta_url: string
}

export interface SingleElement {
    uid: number
    title: string
    description?: string
    CType: string
    elements?: SingleElement[]
    title_hidden?: boolean
}

export interface ViewMoreElement {
    uid: number
    CType: string
    title: string
    description: string
    elements: SingleElement[]
}

export interface MarkdownEquivalence {
    opening_tag: string
    closing_tag?: string
    opening_markdown: string
    closing_markdown?: string
}


// may be applied as a pollyfill/ponyfill
export const string_new_line = "\n"
export const string_new_paragraph = "\n\n"
export const title_markdown_opening_tag = "#"
export const equals_sign_separator = "===================================="
export const hyphen_separator = "------------------------------------"
