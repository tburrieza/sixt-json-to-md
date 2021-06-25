import { string_new_line, string_new_paragraph } from "../../model/model";

class Output {
    tempOutput: string;
    
    constructor(initialOutput: string) {
        this.tempOutput = initialOutput
    }

    add(content: string) {
        this.tempOutput += content
    }

    withNewLine() {
        this.tempOutput += string_new_line
    }

    withNewParagraph() {
        this.tempOutput += string_new_paragraph
    }

    mergeOther(output: Output) {
        // output param will be closed
        this.add(output.close())
    }

    close() {
        return this.tempOutput
    }
}

export default Output