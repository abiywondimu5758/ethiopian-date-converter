# Ethiopian Date Converter for JavaScript

High-performance Ethiopian calendar date conversion for JavaScript applications using native C implementation.

## Installation

```bash
npm install ethiopian-date-converter-js
```

## Quick Start

```javascript
const { 
  ethiopicToGregorian, 
  gregorianToEthiopic, 
  isValidEthiopicDate, 
  isGregorianLeap 
} = require('ethiopian-date-converter-js');

// Convert Ethiopian to Gregorian
const gregorian = ethiopicToGregorian(2017, 1, 1);
console.log(gregorian); // { year: 2024, month: 9, day: 11 }

// Convert Gregorian to Ethiopian
const ethiopic = gregorianToEthiopic(2024, 9, 11);
console.log(ethiopic); // { year: 2017, month: 1, day: 1 }

// Validate dates
console.log(isValidEthiopicDate(2017, 13, 5)); // true
console.log(isGregorianLeap(2024)); // true
```

## Main Functionalities

### Date Conversion
Convert dates between Ethiopian and Gregorian calendars with high accuracy:

```javascript
// Ethiopian New Year 2017 to Gregorian
ethiopicToGregorian(2017, 1, 1);   // { year: 2024, month: 9, day: 11 }

// Ethiopian Christmas 2017 to Gregorian  
ethiopicToGregorian(2017, 4, 29);  // { year: 2025, month: 1, day: 7 }

// Reverse conversion
gregorianToEthiopic(2025, 1, 7);   // { year: 2017, month: 4, day: 29 }
```

### Date Validation
Validate dates in both calendar systems:

```javascript
// Ethiopian date validation
isValidEthiopicDate(2017, 1, 1);   // true
isValidEthiopicDate(2017, 13, 7);  // false (Pagume has max 6 days)
isValidEthiopicDate(2015, 13, 6);  // true (leap year)

// Gregorian date validation  
isValidGregorianDate(2024, 2, 29); // true (leap year)
isValidGregorianDate(2023, 2, 29); // false (not leap year)
```

### Leap Year Detection
Check leap years in both calendar systems:

```javascript
// Gregorian leap years
isGregorianLeap(2024); // true
isGregorianLeap(2023); // false

// Ethiopian leap year pattern: year % 4 == 3
// 2015, 2019, 2023 EC are leap years
```

## All Available Functions

### Core Conversion Functions
- `ethiopicToGregorian(year, month, day, era?)` - Convert Ethiopian date to Gregorian
- `gregorianToEthiopic(year, month, day)` - Convert Gregorian date to Ethiopian

### Validation Functions  
- `isValidEthiopicDate(year, month, day)` - Validate Ethiopian date
- `isValidGregorianDate(year, month, day)` - Validate Gregorian date
- `isGregorianLeap(year)` - Check if Gregorian year is leap year

### Julian Day Number Functions
- `ethiopicToJDN(year, month, day, era?)` - Convert Ethiopian date to Julian Day Number
- `gregorianToJDN(year, month, day)` - Convert Gregorian date to Julian Day Number
- `jdnToEthiopic(jdn, era?)` - Convert Julian Day Number to Ethiopian date
- `jdnToGregorian(jdn)` - Convert Julian Day Number to Gregorian date

### Utility Functions
- `getDayOfWeek(jdn)` - Get day of week from Julian Day Number (0=Monday, 6=Sunday)

### Constants
- `JD_EPOCH_OFFSET_AMETE_ALEM` - Julian Day offset for Amete Alem era
- `JD_EPOCH_OFFSET_AMETE_MIHRET` - Julian Day offset for Amete Mihret era  
- `JD_EPOCH_OFFSET_GREGORIAN` - Julian Day offset for Gregorian calendar

## Date Object Format

All functions return date objects in this format:
```javascript
{
  year: number,    // Full year (e.g., 2017, 2024)
  month: number,   // Month 1-12 (Gregorian), 1-13 (Ethiopian)
  day: number      // Day of month
}
```

## Supported Date Ranges

- **Ethiopian Years**: 1000 - 3000 EC (recommended range)
- **Gregorian Years**: 1007 - 4007 AD
- **Modern Era**: 1900 - 2100 AD (optimal accuracy)

## Error Handling

Invalid dates throw descriptive errors:
```javascript
try {
  ethiopicToGregorian(2017, 13, 7); // Invalid date
} catch (error) {
  console.error(error.message); // "Invalid Ethiopian date"
}
```

## Performance

- Native C implementation for maximum speed
- Zero external dependencies beyond Node.js addon API
- Thread-safe operations
- Optimized for high-frequency conversions

## Documentation

For comprehensive documentation, advanced usage examples, and API reference, visit:
https://github.com/abiywondimu5758/ethiopian-date-converter/tree/main/docs/js

## License

MIT License - see LICENSE file for details.