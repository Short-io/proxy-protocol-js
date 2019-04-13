proxy-protocol-js
==

A PROXY protocol builder and parser for JavaScript

Usage
--

### Build

#### JavaScript

```JavaScript
const proxyProtocol = require('proxy-protocol');

const src = new proxyProtocol.Host('127.0.0.1', 12345);
const dst = new proxyProtocol.Host('192.0.2.1', 54321);
const protocolText = new proxyProtocol.V1ProxyProtocol(
  proxyProtocol.INETProtocol.TCP4,
  src,
  dst,
).build();
console.log(protocolText); // => PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n
```

#### TypeScript

```TypeScript
import { Host, INETProtocol, V1ProxyProtocol } from 'proxy-protocol';

const src = new Host('127.0.0.1', 12345);
const dst = new Host('192.0.2.1', 54321);
const protocolText = new V1ProxyProtocol(
  INETProtocol.TCP4,
  src,
  dst,
).build();
console.log(protocolText); // => PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n
```

### Parse

#### JavaScript

```JavaScript
const proxyProtocol = require('proxy-protocol');

const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
const proto = proxyProtocol.V1ProxyProtocol.parse(protocolText);
console.log(proto);
// => V1ProxyProtocol {
//      inetProtocol: 'TCP4',
//      source: Host { ipAddress: '127.0.0.1', port: 12345 },
//      destination: Host { ipAddress: '192.0.2.1', port: 54321 },
//      data: '' }
```

#### TypeScript

```TypeScript
import { V1ProxyProtocol } from 'proxy-protocol';

const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
const proto = V1ProxyProtocol.parse(protocolText);
console.log(proto);
// => V1ProxyProtocol {
//      inetProtocol: 'TCP4',
//      source: Host { ipAddress: '127.0.0.1', port: 12345 },
//      destination: Host { ipAddress: '192.0.2.1', port: 54321 },
//      data: '' }
```

Todo
--

- [ ] V2 PROXY protocol support

Author
--

moznion (<moznion@gmail.com>)

License
--

[MIT](./LICENSE)

