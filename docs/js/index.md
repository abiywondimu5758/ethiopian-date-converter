# Ethiopian Date Converter - JavaScript Documentation

## Overview

The Ethiopian Date Converter JavaScript library provides comprehensive functionality for converting between Ethiopian and Gregorian calendars, with rich date manipulation, formatting, and cultural features. This is a **pure JavaScript implementation** focused on Node.js and browser environments.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [API Reference](#api-reference)
   - [Date Classes](#date-classes)
   - [Legacy Functions](#legacy-functions)
   - [Utility Classes](#utility-classes)
   - [Constants](#constants)
4. [Examples](#examples)
5. [Advanced Usage](#advanced-usage)
6. [Performance](#performance)
7. [Browser Support](#browser-support)
8. [TypeScript Alternative](#typescript-alternative)

## Installation

```bash
npm install @ethiopian-date-converter/js
```

## Quick Start

### Basic Usage

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Create Ethiopian date
const ethiopicNewYear = new EthiopicDate(2017, 1, 1);

// Convert to Gregorian
const gregorian = ethiopicNewYear.toGregorian();
console.log(gregorian.toString()); // "2024-09-11"

// Create current dates
const today = EthiopicDate.today();
console.log(today.format('DD MMMM YYYY')); // "28 Nehase 2017"
```

### ES6 Modules

```javascript
import { EthiopicDate, GregorianDate, CalendarUtils } from '@ethiopian-date-converter/js';

const date = new EthiopicDate(2017, 4, 29); // Ethiopian Christmas
console.log(date.isHoliday()); // true
console.log(date.getHoliday()); // "Ethiopian Christmas"
```

## API Reference

### Date Classes

#### EthiopicDate

The main class for working with Ethiopian calendar dates.

##### Constructor

```javascript
new EthiopicDate(year, month, day)
```

- `year` (number): Ethiopian year (e.g., 2017)
- `month` (number): Ethiopian month (1-13, where 13 is Pagume)
- `day` (number): Day of month (1-30, or 1-6 for Pagume)

##### Static Methods

###### `EthiopicDate.today()`
Returns the current date in Ethiopian calendar.

```javascript
const today = EthiopicDate.today();
```

###### `EthiopicDate.parse(dateString)`
Parses a date string into an EthiopicDate object.

```javascript
const date = EthiopicDate.parse('2017-01-15');
const date2 = EthiopicDate.parse('2017/1/15');
const date3 = EthiopicDate.parse('15/1/2017');
```

##### Instance Methods

###### Date Information

```javascript
const date = new EthiopicDate(2017, 1, 1);

// Basic properties
date.year        // 2017
date.month       // 1
date.day         // 1

// Validation
date.isValid()   // true

// Day of week
date.getDayOfWeek()      // 0-6 (0=Monday, 6=Sunday)
date.getDayName()        // "Wednesday" (English)
date.getDayName('am')    // "ረቡዕ" (Amharic)

// Month information
date.getMonthName()      // "Meskerem" (English)
date.getMonthName('am')  // "መስከረም" (Amharic)
date.getMonthName('gez') // "መስከረም" (Ge'ez)
```

###### Date Conversion

```javascript
const ethiopic = new EthiopicDate(2017, 1, 1);
const gregorian = ethiopic.toGregorian(); // Returns GregorianDate object
```

###### Date Arithmetic

```javascript
const date = new EthiopicDate(2017, 1, 1);

// Add/subtract time periods
const nextWeek = date.addDays(7);
const lastMonth = date.addMonths(-1);
const nextYear = date.addYears(1);

// Calculate differences
const days = date.daysDifference(otherDate);
```

###### Date Comparison

```javascript
const date1 = new EthiopicDate(2017, 1, 1);
const date2 = new EthiopicDate(2017, 1, 2);

date1.isBefore(date2)  // true
date1.isAfter(date2)   // false
date1.isSame(date2)    // false
date1.isToday()        // false (unless it's actually today)
```

###### Cultural Features

```javascript
const date = new EthiopicDate(2017, 1, 1);

// Holiday detection
date.isHoliday()         // true (Ethiopian New Year)
date.getHoliday()        // "Ethiopian New Year"
date.getHoliday('am')    // "እንቁጣጣሽ"

// Season detection
date.getSeason()         // "Bega"
date.getSeason('am')     // "በጋ"

// Age calculation
const birthDate = new EthiopicDate(2000, 5, 15);
const age = birthDate.getAge(); // Current age in years
```

###### Formatting

```javascript
const date = new EthiopicDate(2017, 1, 5);

// Basic formats
date.toString()                    // "2017-01-05 EC"
date.format('YYYY-MM-DD')         // "2017-01-05"
date.format('D MMMM YYYY')        // "5 Meskerem 2017"
date.format('dddd, D MMMM YYYY')  // "Wednesday, 5 Meskerem 2017"

// Localized formats
date.format('D MMMM YYYY', 'am')  // "5 መስከረም 2017"
date.format('dddd', 'am')         // "ረቡዕ"

// Format patterns:
// YYYY - 4-digit year
// YY   - 2-digit year  
// MMMM - Full month name
// MMM  - Short month name
// MM   - 2-digit month with leading zero
// M    - Month number
// DD   - 2-digit day with leading zero
// D    - Day number
// dddd - Full day name
// ddd  - Short day name
```

###### Relative Dates

```javascript
const date = new EthiopicDate(2017, 1, 1);
date.getRelativeDateString(); // "tomorrow", "yesterday", "in 3 days", etc.
```

###### Utility Methods

```javascript
const date = new EthiopicDate(2017, 1, 1);

date.clone()     // Creates a copy
date.toObject()  // { year: 2017, month: 1, day: 1 }
date.getJDN()    // Julian Day Number for advanced calculations
```

#### GregorianDate

Similar to EthiopicDate but for Gregorian calendar dates.

##### Constructor

```javascript
new GregorianDate(year, month, day)
```

##### Key Methods

```javascript
const date = new GregorianDate(2024, 9, 11);

// Conversion
date.toEthiopic()        // Returns EthiopicDate object
date.toJSDate()          // Returns JavaScript Date object

// Leap year
date.isLeapYear()        // true/false

// Similar methods as EthiopicDate:
// addDays(), addMonths(), addYears()
// isBefore(), isAfter(), isSame()
// format(), getDayName(), getMonthName()
// getAge(), clone(), toObject()
```

### Legacy Functions

For backward compatibility, the library provides function-based API:

```javascript
const { 
  ethiopicToGregorian, 
  gregorianToEthiopic,
  isValidEthiopicDate,
  isValidGregorianDate,
  isGregorianLeap
} = require('@ethiopian-date-converter/js');

// Convert dates (returns plain objects)
const gregorian = ethiopicToGregorian(2017, 1, 1);
// Returns: { year: 2024, month: 9, day: 11 }

const ethiopic = gregorianToEthiopic(2024, 9, 11);
// Returns: { year: 2017, month: 1, day: 1 }

// Validation
isValidEthiopicDate(2017, 1, 1);  // true
isValidGregorianDate(2024, 2, 29); // true (leap year)
isGregorianLeap(2024);            // true
```

### Utility Classes

#### CalendarUtils

Static utility methods for calendar operations.

```javascript
const { CalendarUtils } = require('@ethiopian-date-converter/js');

// Generate calendar month view
const calendar = CalendarUtils.generateEthiopicCalendar(2017, 1);
console.log(calendar);
// {
//   year: 2017,
//   month: 1,
//   monthName: "Meskerem",
//   daysInMonth: 30,
//   weeks: [ /* array of week arrays */ ]
// }

// Business days calculation
const start = new GregorianDate(2024, 9, 9);  // Monday
const end = new GregorianDate(2024, 9, 13);   // Friday
const businessDays = CalendarUtils.getBusinessDaysBetween(start, end); // 5
```

#### DateConverter

Enhanced converter class with additional utilities:

```javascript
const { DateConverter } = require('@ethiopian-date-converter/js');

// Get current dates in both calendars
const today = DateConverter.today();
// Returns: { ethiopic: EthiopicDate, gregorian: GregorianDate }

// Julian Day Number utilities (for advanced calculations)
const jdn = DateConverter.gregorianToJDN(2024, 9, 11);
const dayOfWeek = DateConverter.getDayOfWeek(jdn); // 0-6
```

### Constants

The library provides various constants for cultural and linguistic features:

```javascript
const { 
  MONTH_NAMES, 
  DAY_NAMES, 
  ETHIOPIAN_HOLIDAYS, 
  ETHIOPIAN_SEASONS,
  EPOCHS 
} = require('@ethiopian-date-converter/js');

// Month names in different languages
MONTH_NAMES.ethiopic.en[0]  // "Meskerem"
MONTH_NAMES.ethiopic.am[0]  // "መስከረም"

// Day names
DAY_NAMES.en[0]             // "Monday"
DAY_NAMES.am[0]             // "ሰኞ"

// Ethiopian holidays
ETHIOPIAN_HOLIDAYS.fixed    // Array of fixed holidays
ETHIOPIAN_SEASONS          // Array of season information

// Epoch constants for advanced calculations
EPOCHS.AMETE_MIHRET        // Most common era
EPOCHS.AMETE_ALEM          // World era
```

## Examples

### Basic Date Operations

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Create and convert dates
const ethiopicBirthday = new EthiopicDate(1995, 3, 15);
const gregorianBirthday = ethiopicBirthday.toGregorian();

console.log(`Ethiopian: ${ethiopicBirthday.format('D MMMM YYYY')}`);
console.log(`Gregorian: ${gregorianBirthday.format('D MMMM YYYY')}`);
console.log(`Age: ${ethiopicBirthday.getAge()} years old`);
```

### Holiday Calendar Application

```javascript
function getEthiopianHolidays(year) {
  const holidays = [];
  
  // Check each day of the year for holidays
  for (let month = 1; month <= 13; month++) {
    const daysInMonth = month === 13 ? 6 : 30; // Simplified
    for (let day = 1; day <= daysInMonth; day++) {
      try {
        const date = new EthiopicDate(year, month, day);
        if (date.isHoliday()) {
          holidays.push({
            date: date,
            holiday: date.getHoliday(),
            holidayAm: date.getHoliday('am')
          });
        }
      } catch (e) {
        // Skip invalid dates
      }
    }
  }
  
  return holidays;
}

const holidays2017 = getEthiopianHolidays(2017);
holidays2017.forEach(h => {
  console.log(`${h.date.format('D MMMM')} - ${h.holiday}`);
});
```

### Date Range Calculations

```javascript
function getWorkingDays(startDate, endDate) {
  const { CalendarUtils } = require('@ethiopian-date-converter/js');
  
  // Convert to Gregorian for business day calculation
  const startGregorian = startDate.toGregorian();
  const endGregorian = endDate.toGregorian();
  
  return CalendarUtils.getBusinessDaysBetween(startGregorian, endGregorian);
}

const projectStart = new EthiopicDate(2017, 1, 1);
const projectEnd = new EthiopicDate(2017, 3, 30);
const workingDays = getWorkingDays(projectStart, projectEnd);
console.log(`Project duration: ${workingDays} working days`);
```

### Multilingual Date Display

```javascript
function formatDateMultilingual(date) {
  return {
    english: date.format('dddd, D MMMM YYYY', 'en'),
    amharic: date.format('dddd, D MMMM YYYY', 'am'),
    dayOfWeek: date.getDayOfWeek(),
    season: {
      en: date.getSeason('en'),
      am: date.getSeason('am')
    },
    isHoliday: date.isHoliday(),
    holiday: date.isHoliday() ? {
      en: date.getHoliday('en'),
      am: date.getHoliday('am')
    } : null
  };
}

const ethiopicNewYear = new EthiopicDate(2017, 1, 1);
console.log(formatDateMultilingual(ethiopicNewYear));
```

### Calendar Widget Data

```javascript
function generateCalendarData(year, month) {
  const { CalendarUtils, DAY_NAMES } = require('@ethiopian-date-converter/js');
  
  const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
  
  return {
    title: `${calendar.monthName} ${calendar.year}`,
    dayHeaders: DAY_NAMES.short, // ['Mon', 'Tue', 'Wed', ...]
    weeks: calendar.weeks.map(week => 
      week.map(day => day ? {
        day: day.day,
        isToday: day.isToday,
        isHoliday: day.isHoliday,
        holiday: day.holiday,
        ethiopicDate: day.date.toString(),
        gregorianDate: day.date.toGregorian().toString()
      } : null)
    )
  };
}

const calendarData = generateCalendarData(2017, 1);
```

## Advanced Usage

### Custom Date Validation

```javascript
function isValidBusinessDate(date) {
  if (!date.isValid()) return false;
  
  const dayOfWeek = date.getDayOfWeek();
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday
  const isHoliday = date.isHoliday();
  
  return !isWeekend && !isHoliday;
}

const date = new EthiopicDate(2017, 1, 1);
if (!isValidBusinessDate(date)) {
  console.log('This is not a business day');
}
```

### Date Calculations with Leap Years

```javascript
function calculatePagumeDays(ethiopicYear) {
  // Create a date in Pagume to check maximum days
  try {
    new EthiopicDate(ethiopicYear, 13, 6);
    return 6; // Leap year
  } catch (e) {
    return 5; // Regular year
  }
}

function isEthiopicLeapYear(year) {
  return calculatePagumeDays(year) === 6;
}

console.log(`2015 is leap year: ${isEthiopicLeapYear(2015)}`); // true
console.log(`2016 is leap year: ${isEthiopicLeapYear(2016)}`); // false
```

### Performance Optimization

```javascript
// Cache JDN for repeated calculations
class OptimizedEthiopicDate extends EthiopicDate {
  constructor(year, month, day) {
    super(year, month, day);
    this._cachedJDN = null;
  }
  
  getJDN() {
    if (this._cachedJDN === null) {
      this._cachedJDN = super.getJDN();
    }
    return this._cachedJDN;
  }
}

// Batch operations
function convertManyDates(ethiopicDates) {
  return ethiopicDates.map(({ year, month, day }) => {
    const ethiopic = new EthiopicDate(year, month, day);
    return {
      ethiopic: ethiopic.toString(),
      gregorian: ethiopic.toGregorian().toString(),
      dayOfWeek: ethiopic.getDayName()
    };
  });
}
```

## TypeScript Alternative

**For TypeScript projects**, we recommend using the dedicated TypeScript package which provides full type safety and native TypeScript implementation:

```bash
npm install @ethiopian-date-converter/ts
```

The TypeScript package includes:
- **Full type safety** with comprehensive interfaces
- **Native TypeScript implementation** (not just definitions)
- **Better IDE support** with IntelliSense and autocomplete
- **Compile-time error detection** for invalid dates
- **Modern ES6+ syntax** and features

```typescript
// TypeScript package usage
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
const gregorian: GregorianDate = date.toGregorian();
```

**This JavaScript package** remains focused on pure JavaScript environments without TypeScript dependencies.

## Performance

### Benchmarks

The library is optimized for performance:

- **Basic conversion**: ~1μs per operation
- **Date arithmetic**: ~2μs per operation  
- **Formatting**: ~5μs per operation
- **Calendar generation**: ~100μs for full month

### Best Practices

1. **Reuse date objects** when possible instead of creating new ones
2. **Cache JDN values** for repeated calculations
3. **Use batch operations** for multiple date conversions
4. **Avoid repeated format calls** with the same pattern

## Browser Support

The library works in all modern browsers and Node.js environments:

- **Node.js**: 14.0.0+
- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

### Browser Usage

```html
<!-- Using a bundler (recommended) -->
<script src="dist/ethiopian-date-converter.min.js"></script>
<script>
  const { EthiopicDate } = EthiopianDateConverter;
  const date = new EthiopicDate(2017, 1, 1);
  console.log(date.format('D MMMM YYYY'));
</script>
```

## Error Handling

The library provides clear error messages for common issues:

```javascript
try {
  const invalidDate = new EthiopicDate(2017, 14, 1); // Invalid month
} catch (error) {
  console.error(error.message); // "Invalid Ethiopian date: 2017-14-1"
}

try {
  const invalidParse = EthiopicDate.parse('invalid-date');
} catch (error) {
  console.error(error.message); // "Unable to parse Ethiopian date: invalid-date"
}
```

## Migration Guide

### From Version 1.0 (Legacy API)

The library maintains full backward compatibility:

```javascript
// Old way (still works)
const { ethiopicToGregorian } = require('@ethiopian-date-converter/js');
const result = ethiopicToGregorian(2017, 1, 1);

// New way (recommended)
const { EthiopicDate } = require('@ethiopian-date-converter/js');
const date = new EthiopicDate(2017, 1, 1);
const gregorian = date.toGregorian();
```

## License

MIT License - see the LICENSE file for details.

## Contributing

See the main project repository for contribution guidelines.

## Support

For issues and questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with a minimal reproduction case

---

*Last updated: September 2025*
