# @ethiopian-date-converter/js

High-performance Ethiopian-Gregorian date converter for JavaScript/Node.js with native C bindings.

## Installation

```bash
npm install @ethiopian-date-converter/js
```

## Quick Start

```javascript
const DateConverter = require('@ethiopian-date-converter/js');

const gregorian = DateConverter.convertEthiopianToGregorian('2016-01-23');
console.log(gregorian); // { year: 2023, month: 9, day: 30 }

const ethiopian = DateConverter.convertGregorianToEthiopian('2023-09-30');
console.log(ethiopian); // { year: 2016, month: 1, day: 23 }
```

## API

### Core Functions

- `convertEthiopianToGregorian(date)` - Convert Ethiopian to Gregorian
- `convertGregorianToEthiopian(date)` - Convert Gregorian to Ethiopian
- `validateEthiopianDate(date)` - Validate Ethiopian date
- `validateGregorianDate(date)` - Validate Gregorian date

### Utility Functions

- `formatEthiopianDate(date, format)` - Format Ethiopian date
- `getEthiopianMonthName(month)` - Get Ethiopian month name
- `isEthiopianLeapYear(year)` - Check Ethiopian leap year
- `isGregorianLeapYear(year)` - Check Gregorian leap year

## Input Formats

```javascript
// String format
DateConverter.convertEthiopianToGregorian('2016-01-23');

// Object format
DateConverter.convertEthiopianToGregorian({
    year: 2016,
    month: 1,
    day: 23,
    hour: 14,
    minute: 30,
    second: 0
});
```

## Calendar Rules

- **Ethiopian Calendar**: 13 months (12 months of 30 days + 1 month of 5-6 days)
- **Leap years**: Every 4 years (no century rule)
- **New Year**: September 11 (Gregorian)

## License

MIT License - see LICENSE file for details.
