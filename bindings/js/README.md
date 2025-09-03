# Ethiopian Date Converter - JavaScript

JavaScript binding for high-performance Ethiopian calendar date conversion using the proven Beyene-Kudlek algorithm.

## Installation

```bash
npm install @ethiopian-date-converter/js
```

## Quick Start

```javascript
const { DateConverter, ethiopicToGregorian, gregorianToEthiopic } = require('@ethiopian-date-converter/js');

// Convert Ethiopian to Gregorian
const gregorian = ethiopicToGregorian(2017, 1, 1);  // {year: 2024, month: 9, day: 11}

// Convert Gregorian to Ethiopian  
const ethiopic = gregorianToEthiopic(2024, 9, 11);  // {year: 2017, month: 1, day: 1}

// Validation
DateConverter.isValidEthiopicDate(2015, 13, 6);     // true (leap year)
DateConverter.isGregorianLeap(2024);                // true
```

## API Reference

### Core Functions
- `ethiopicToGregorian(year, month, day, era?)` - Convert Ethiopian date to Gregorian
- `gregorianToEthiopic(year, month, day)` - Convert Gregorian date to Ethiopian
- `isValidEthiopicDate(year, month, day)` - Validate Ethiopian date
- `isValidGregorianDate(year, month, day)` - Validate Gregorian date
- `isGregorianLeap(year)` - Check if Gregorian year is leap year

### Date Object Format
```javascript
{
  year: number,    // Full year (e.g., 2017, 2024)
  month: number,   // Month 1-12 (Gregorian), 1-13 (Ethiopian)
  day: number      // Day of month
}
```

## Supported Date Ranges

### Fully Supported (100% Accuracy)
- **Ethiopian Years**: 1000 - 3000 EC
- **Gregorian Years**: 1007 - 4007 AD
- **Modern Era**: 1900 - 2100 AD (recommended range)

### Limited Support
- **Ancient dates** (< 1000 EC): May have systematic offsets
- **Far future** (> 3000 EC): Theoretical calculations only
- **Era boundaries**: Year 5500 EC transitions may need manual era specification

## Features

### Leap Year Handling
- Ethiopian leap years: `year % 4 == 3`
- Gregorian leap years: Standard rules including century exceptions
- Pagume month: 5 days (normal), 6 days (leap year)

### Round-Trip Consistency
All dates within supported ranges maintain perfect round-trip consistency:
```javascript
const original = { year: 2017, month: 7, day: 15 };
const converted = gregorianToEthiopic(
  ...Object.values(ethiopicToGregorian(original.year, original.month, original.day))
);
// converted equals original
```

### Performance
- Native C implementation for maximum speed
- Zero external dependencies
- Thread-safe operations

## Known Limitations

1. **Era Detection**: Automatic era switching around 5500 EC may require manual specification
2. **Historical Accuracy**: Pre-1000 EC dates use astronomical calculations, not historical records
3. **Extreme Ranges**: Dates beyond supported ranges may accumulate calculation errors
4. **Reference Epochs**: Some historical date references may use different epoch values

## Examples

```javascript
// Ethiopian New Year
ethiopicToGregorian(2017, 1, 1);   // {year: 2024, month: 9, day: 11}

// Ethiopian Christmas
ethiopicToGregorian(2017, 4, 29);  // {year: 2025, month: 1, day: 7}

// Leap year Pagume
ethiopicToGregorian(2015, 13, 6);  // {year: 2023, month: 9, day: 11}

// Validation examples
DateConverter.isValidEthiopicDate(2017, 13, 7);  // false (too many days)
DateConverter.isValidEthiopicDate(2015, 13, 6);  // true (leap year)
```

## Error Handling

Invalid dates throw descriptive errors:
```javascript
try {
  ethiopicToGregorian(2017, 13, 7);  // Invalid Ethiopian date
} catch (error) {
  console.error(error.message);
}
```

## License

MIT License - see LICENSE file for details.