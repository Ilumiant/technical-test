const { faker } = require('@faker-js/faker')

const generateOneNote = () => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  body: faker.commerce.productDescription()
})

const generateManyNotes = (size) => {
  const limit = size ?? 10
  const fakeNotes = []
  for (let index = 0; index < limit; index++) {
    fakeNotes.push(generateOneNote())
  }

  return [...fakeNotes]
}

module.exports = { generateOneNote, generateManyNotes }
