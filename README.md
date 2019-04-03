<div align="center">
  <a href="https://www.npmjs.com/package/@vkontakte/vk-qr">
    <img width="100" height="100" src="https://pp.userapi.com/c854128/v854128442/183a0/rtZx2fxUV4w.jpg">
  </a>
  <br>
  <br>

</div>

## Example
You can use simple API:
```js
import qrCodeGenerator from '@vkontakte/vk-qr';

const svg = qrCodeGenerator.createQR(url, 256, 'classCode');

return <span dangerouslySetInnerHTML={{__html: svg}}/>;
```

Or use low-level API for more control
```js
import qrCodeGenerator from '@vkontakte/vk-qr';

const segs = qrCodeGenerator.QrSegment.makeSegments(url);
const svg = qrCodeGenerator.QrCode.encodeSegments(segs, qrCodeGenerator.QrCode.Ecc.QUARTILE, 1, 40, -1, true).toSvgString();

return <span dangerouslySetInnerHTML={{__html: svg}}/>;`
```