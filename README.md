## Example

```js
import qrCodeGenerator from '@vkontakte/vk-qr';

let segs = qrCodeGenerator.QrSegment.makeSegments(url);
let svg = qrCodeGenerator.QrCode.encodeSegments(segs, qrCodeGenerator.QrCode.Ecc.QUARTILE, 1, 40, -1, true).toSvgString();

return <span dangerouslySetInnerHTML={{svg}}/>;`
```
