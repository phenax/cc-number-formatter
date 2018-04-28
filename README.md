# Card number Formatter

[![Greenkeeper badge](https://badges.greenkeeper.io/phenax/cc-number-formatter.svg)](https://greenkeeper.io/)
Formats the card number

## Getting Started

### Installing

Install this library as a dependency in your project

```
yarn add @phenax/cc-number-formatter
```
OR
```
npm i @phenax/cc-number-formatter --save
```

### Usage

Import format function into your project
```js
// formatCardNumber :: String -> String
import { formatCardNumber } from '@phenax/cc-number-formatter';
```

```js
const formattedNumber = formatCardNumber('4111111111111111'); // 4111 1111 1111 1111
```


## Running the tests

* Clone this repository to your local machine
* Run `yarn test`


## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details


## Acknowledgments
* Extracted a few pieces out of [https://github.com/faaez/creditcardutils](CreditCardUtils)
