# Ethiopian Date Converter for TypeScript

High-performance Ethiopian calendar date conversion for TypeScript applications with full type safety and native C implementation.

## Installation

```bash
npm install ethiopian-date-converter-ts
```

## Quick Start

```typescript
import { 
  EthiopicDate, 
  GregorianDate, 
  ethiopicToGregorian, 
  gregorianToEthiopic 
} from 'ethiopian-date-converter-ts';

// Using typed date classes
const ethiopicDate = new EthiopicDate(2017, 1, 1);
const gregorianDate = ethiopicDate.toGregorian();
console.log(gregorianDate.toString()); // "2024-09-11"

// Using conversion functions
const converted = ethiopicToGregorian(2017, 1, 1);
console.log(converted); // { year: 2024, month: 9, day: 11 }

// Type-safe validation
if (EthiopicDate.isValid(2017, 13, 5)) {
  const date = new EthiopicDate(2017, 13, 5);
  console.log(date.isHoliday()); // Check if it's a holiday
}
```

## Main Functionalities

### Type-Safe Date Classes
Work with strongly-typed date objects:

```typescript
// Ethiopian date with full type safety
const newYear = new EthiopicDate(2017, 1, 1);
console.log(newYear.getMonthName()); // "Meskerem"
console.log(newYear.getDayOfWeek()); // "Wednesday"
console.log(newYear.toGregorian().toString()); // "2024-09-11"

// Gregorian date operations
const christmas = new GregorianDate(2025, 1, 7);
console.log(christmas.toEthiopic().toString()); // "2017-04-29"
```

### Date Arithmetic
Perform date calculations with type safety:

```typescript
const date = new EthiopicDate(2017, 1, 1);

// Add/subtract time periods
const nextWeek = date.addDays(7);
const nextMonth = date.addMonths(1);
const nextYear = date.addYears(1);

// Calculate differences
const ethiopicChristmas = new EthiopicDate(2017, 4, 29);
const daysBetween = ethiopicChristmas.diff(date, 'days');
console.log(daysBetween); // Number of days between dates
```

### Holiday Detection
Identify Ethiopian holidays automatically:

```typescript
const newYear = new EthiopicDate(2017, 1, 1);
console.log(newYear.isHoliday()); // true
console.log(newYear.getHolidayName()); // "Ethiopian New Year"

const christmas = new EthiopicDate(2017, 4, 29);
console.log(christmas.isHoliday()); // true
console.log(christmas.getHolidayName()); // "Ethiopian Christmas"
```

### Formatting and Localization
Format dates with built-in localization:

```typescript
const date = new EthiopicDate(2017, 1, 1);

// English formatting
console.log(date.format('YYYY-MM-DD')); // "2017-01-01"
console.log(date.format('DD MMMM YYYY')); // "1 Meskerem 2017"

// Amharic formatting
console.log(date.format('DD MMMM YYYY', 'am')); // "1 መስከረም 2017"
console.log(date.getDayOfWeek('am')); // "ረቡዕ"
```

## All Available Features

### Date Classes
- `EthiopicDate` - Ethiopian calendar date with full functionality
- `GregorianDate` - Gregorian calendar date with conversion capabilities

### Conversion Functions
- `ethiopicToGregorian(year, month, day, era?)` - Convert Ethiopian to Gregorian
- `gregorianToEthiopic(year, month, day)` - Convert Gregorian to Ethiopian

### Validation Functions
- `EthiopicDate.isValid(year, month, day)` - Validate Ethiopian date
- `GregorianDate.isValid(year, month, day)` - Validate Gregorian date
- `isGregorianLeap(year)` - Check Gregorian leap year

### Date Arithmetic Methods
- `addDays(days)` - Add/subtract days
- `addMonths(months)` - Add/subtract months  
- `addYears(years)` - Add/subtract years
- `diff(other, unit)` - Calculate date differences

### Formatting Methods
- `format(pattern, locale?)` - Format date with pattern
- `toString()` - Default string representation
- `toISO()` - ISO date string format

### Calendar Information
- `getMonthName(locale?)` - Get month name
- `getDayOfWeek(locale?)` - Get day of week name
- `getDaysInMonth()` - Get number of days in month
- `isLeapYear()` - Check if year is leap year

### Holiday Functions
- `isHoliday()` - Check if date is a holiday
- `getHolidayName()` - Get holiday name if applicable
- `getHolidays(year)` - Get all holidays in a year

### Utility Functions
- `getCurrentEthiopicDate()` - Get current Ethiopian date
- `getCurrentGregorianDate()` - Get current Gregorian date
- `generateCalendar(year, month)` - Generate calendar month
- `getBusinessDays(start, end)` - Calculate business days

### Julian Day Functions
- `toJDN()` - Convert to Julian Day Number
- `fromJDN(jdn, era?)` - Create date from Julian Day Number

### Constants and Types
- `ETHIOPIC_MONTHS` - Ethiopian month names
- `GREGORIAN_MONTHS` - Gregorian month names  
- `WEEKDAYS` - Day names in multiple languages
- `DateFormat`, `Locale`, `Holiday` - TypeScript interfaces

## Type Definitions

```typescript
interface DateObject {
  year: number;
  month: number;
  day: number;
}

interface Holiday {
  name: string;
  date: EthiopicDate;
  type: 'religious' | 'national' | 'cultural';
}

type Locale = 'en' | 'am';
type DateUnit = 'days' | 'months' | 'years';
```

## Calendar Systems

### Ethiopian Calendar
- 13 months (12 months of 30 days + Pagume)
- Pagume: 5 days (normal year), 6 days (leap year)
- Leap year: `year % 4 === 3`
- Era: Amete Mihret (default) or Amete Alem

### Gregorian Calendar
- Standard Gregorian calendar rules
- Leap year: Standard algorithm including century rules
- Full compatibility with JavaScript Date object

## Error Handling

Type-safe error handling with custom error types:

```typescript
try {
  const invalidDate = new EthiopicDate(2017, 13, 7);
} catch (error) {
  if (error instanceof InvalidDateError) {
    console.error('Invalid date:', error.message);
  }
}
```

## Performance

- Native C implementation for core calculations
- TypeScript wrapper with zero runtime overhead
- Optimized for both single conversions and bulk operations
- Immutable date objects for thread safety

## Documentation

For comprehensive documentation, advanced usage examples, TypeScript guides, and API reference, visit:
https://github.com/abiywondimu5758/ethiopian-date-converter/tree/main/docs/ts

## License

MIT License - see LICENSE file for details.
