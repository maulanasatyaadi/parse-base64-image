import fs from 'fs'
import path from 'path'
import ParseBase64Images from '../src/ParseBase64Image'

const destinationFolder = path.join(__dirname, './extracted-image')

beforeAll(() => {
  fs.mkdirSync(destinationFolder)
})

test('Parse empty HTML input', async done => {
  return ParseBase64Images('', destinationFolder, 'extracted-image').then(HTMLOutput => {
    expect(HTMLOutput).toEqual('')
    done()
  })
})

test('Parse base64 image from HTML input', async done => {
  const HTMLContent = fs.readFileSync(path.join(__dirname, './base64-contained.html'))

  return ParseBase64Images(HTMLContent.toString('utf-8'), destinationFolder, 'extracted-image').then(HTMLOutput => {
    expect(fs.existsSync(path.join(__dirname, './extracted-image/Sample.png'))).toEqual(true)
    expect(HTMLOutput).toContain("src=\"extracted-image/Sample.png\"")
    done()
  })
})

test('Parse non base64 image from HTML input', async done => {
  const HTMLContent = fs.readFileSync(path.join(__dirname, './no-base64-contained.html'))
  return ParseBase64Images(HTMLContent.toString('utf-8'), destinationFolder, 'extracted-image').then(HTMLOutput => {
    expect(HTMLOutput).toContain("src=\"https://via.placeholder.com")
    done()
  })
})

afterAll(() => {
  fs.rmSync(destinationFolder, {
    force: true,
    recursive: true
  })
})
