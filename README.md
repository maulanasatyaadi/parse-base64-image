# Parse Base64 Image
Parse base64 image from HTML rich text editor input. This package use

## Install
[npm: _parse-base64-image_](https://www.npmjs.com/package/parse-base64-image)
```
npm install parse-base64-image
```

```
yarn add parse-base64-image
```

## Example
```js
import fs from 'fs'
import path from 'path'
import ParseBase64Image from "parse-base64-image"

const HTMLInput = fs.readFileSync(path.join(__dirname, 'input.html'))

ParseBase64Image(HTMLInput.toString('utf-8'), path.join(__dirname, './'), '/').then(HTMLOutput => {
  console.log(HTMLOutput)
})
```

## Details
_parse-base64-image_ can parse HTML input from rich text editor that contain base64 image
on the img tag. The rule is only if you put image from rich text editor, you need to make
sure that rich editor provide the data-filename dataset like
```<img src="http://example.png" data-filename="example.png"/>```

### Test
```npm run test```

## API
### `ParseBase64Image(HTMLContent: string, localPath: string, publicPath: string)`
- `HTMLContent`: _required_. HTML input string
- `localPath`: _required_. Local path where is file will be saved
- `publicPath`: _required_. Public path that accessible from public url