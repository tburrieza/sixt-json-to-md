import path from 'path'
import fs from 'fs'
// import TextMarkdownResolver from './resolvers/page_elements/text'
import { CountryElement } from './model/model'
import CountryResolver from './resolvers/page_elements/country'

export const main = async () => {

  // delete previous output
  fs.unlinkSync(path.join(__dirname, 'output/markdown.md'))

  // loads domain_es_ES.json that contains the input to be processed
  const inputData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'input/domain_es_ES.json')
    ).toString()
  ).countries as CountryElement[]

  // map as promises to improve resolution speed
  const data = await Promise.all(
    // filtered only countries and ordered by country_iso2_code
    inputData.filter(id => id.country_iso2_code.length > 0).sort((a, b) => { return a.country_iso2_code.localeCompare(b.country_iso2_code)}).map(async(country) => {
      return await CountryResolver(country)
    })
  )

  fs.writeFileSync(path.join(__dirname, 'output/markdown.md'), data.join(""))

  console.log("✨ Data saved to output/markdown.md 🎉 🚗")
}
