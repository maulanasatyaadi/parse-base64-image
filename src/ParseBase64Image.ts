import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'

export default async function ParseBase64Images(HTMLContent: string, localPath: string, publicPath: string): Promise<string> {
  const content = new JSDOM(HTMLContent)
  const img = content.window.document.querySelectorAll('img')
  let writeQueue = []

  img.forEach((imgEl, idx) => {
    const imgData = imgEl.src.split(',')

    if (imgData[0].split(';')[1] === 'base64') {
      const imgBuffer = Buffer.from(imgData[1], 'base64')
  
      writeQueue.push(fs.writeFile(path.join(localPath, imgEl.dataset.filename), imgBuffer, (err => {
        if (err) {
          throw(err)
        }
      })))

      Promise.all(writeQueue)
  
      img.item(idx).src = `${publicPath}/${imgEl.dataset.filename}`
    }
  })

  return content.window.document.body.innerHTML.toString()
}
