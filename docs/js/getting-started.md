# Getting Started - Ethiopian Date Converter JavaScript

## Installation

### Pure JavaScript Package

Install the pure JavaScript package using npm:

```bash
npm install @ethiopian-date-converter/js
```

Or using yarn:

```bash
yarn add @ethiopian-date-converter/js
```

> **For TypeScript projects**: Use `@ethiopian-date-converter/ts` instead for full type safety and native TypeScript implementation.

### Requirements

- **Node.js**: 14.0.0 or higher
- **Operating System**: Windows, macOS, Linux
- **Architecture**: x64, arm64

The package includes pre-compiled native bindings and will automatically build from source if needed.

## Quick Start

### Basic Usage

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Create an Ethiopian date
const ethiopicNewYear = new EthiopicDate(2017, 1, 1);

// Convert to Gregorian
const gregorian = ethiopicNewYear.toGregorian();

console.log(`Ethiopian New Year 2017 is ${gregorian.format('D MMMM YYYY')}`);
// Output: "Ethiopian New Year 2017 is 11 September 2024"
```

### ES6 Modules

If you're using ES6 modules:

```javascript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/js';

const today = EthiopicDate.today();
console.log(`Today in Ethiopian calendar: ${today.format('dddd, D MMMM YYYY')}`);
```

### TypeScript Alternative

For TypeScript projects, use the dedicated TypeScript package:

```bash
npm install @ethiopian-date-converter/ts
```

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
const gregorian: GregorianDate = date.toGregorian();
```

This JavaScript package remains pure JavaScript without TypeScript definitions.

## Core Concepts

### Ethiopian Calendar System

The Ethiopian calendar has several unique characteristics:

- **13 months**: 12 months of 30 days each, plus Pagume with 5-6 days
- **Year calculation**: Ethiopian year is approximately 7-8 years behind Gregorian
- **New Year**: Starts on September 11 (September 12 in leap years)
- **Leap years**: Every 4 years, with 6 days in Pagume instead of 5

### Date Classes

The library provides two main date classes:

#### EthiopicDate
```javascript
const date = new EthiopicDate(2017, 1, 1);  // Year, Month, Day
```

#### GregorianDate  
```javascript
const date = new GregorianDate(2024, 9, 11); // Year, Month, Day
```

### Month Numbers

Ethiopian months are numbered 1-13:

1. Meskerem (መስከረም)
2. Tikemt (ጥቅምት)
3. Hidar (ኅዳር)
4. Tahsas (ታኅሳስ)
5. Tir (ጥር)
6. Yekatit (የካቲት)
7. Megabit (መጋቢት)
8. Miazia (ሚያዝያ)
9. Ginbot (ግንቦት)
10. Sene (ሰኔ)
11. Hamle (ሐምሌ)
12. Nehase (ነሐሴ)
13. Pagume (ጳጉሜን) - 5 or 6 days

## First Steps

### 1. Create Your First Ethiopian Date

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

try {
  // Ethiopian New Year 2017
  const newYear = new EthiopicDate(2017, 1, 1);
  console.log('Valid date created:', newYear.toString());
} catch (error) {
  console.error('Invalid date:', error.message);
}
```

### 2. Convert Between Calendars

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Ethiopian to Gregorian
const ethiopic = new EthiopicDate(2017, 4, 29); // Ethiopian Christmas
const gregorian = ethiopic.toGregorian();
console.log(`Ethiopian Christmas: ${gregorian.format('D MMMM YYYY')}`);

// Gregorian to Ethiopian
const gregDate = new GregorianDate(2024, 12, 25); // Gregorian Christmas
const ethDate = gregDate.toEthiopic();
console.log(`Gregorian Christmas in Ethiopian: ${ethDate.format('D MMMM YYYY')}`);
```

### 3. Get Current Dates

```javascript
const { EthiopicDate, GregorianDate, DateConverter } = require('@ethiopian-date-converter/js');

// Current Ethiopian date
const todayEthiopic = EthiopicDate.today();
console.log(`Today (Ethiopian): ${todayEthiopic.format('dddd, D MMMM YYYY')}`);

// Current Gregorian date
const todayGregorian = GregorianDate.today();
console.log(`Today (Gregorian): ${todayGregorian.format('dddd, D MMMM YYYY')}`);

// Both at once
const today = DateConverter.today();
console.log(`Ethiopian: ${today.ethiopic.toString()}`);
console.log(`Gregorian: ${today.gregorian.toString()}`);
```

### 4. Parse Dates from Strings

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Parse Ethiopian dates
const eth1 = EthiopicDate.parse('2017-01-15');
const eth2 = EthiopicDate.parse('2017/1/15');
const eth3 = EthiopicDate.parse('15/1/2017');

// Parse Gregorian dates
const greg1 = GregorianDate.parse('2024-09-11');
const greg2 = GregorianDate.parse('September 11, 2024');

console.log('Parsed dates:', eth1.toString(), greg1.toString());
```

### 5. Format Dates

```javascript
const date = new EthiopicDate(2017, 1, 5);

// Different formats
console.log(date.format());                    // "2017-01-05" (default)
console.log(date.format('D MMMM YYYY'));       // "5 Meskerem 2017"
console.log(date.format('dddd, D MMMM YYYY')); // "Wednesday, 5 Meskerem 2017"
console.log(date.format('DD/MM/YYYY'));        // "05/01/2017"

// Localized formats
console.log(date.format('D MMMM YYYY', 'am')); // "5 መስከረም 2017"
console.log(date.getDayName('am'));            // "ረቡዕ"
```

## Common Use Cases

### Birthday Calculation

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

const birthDate = new EthiopicDate(2000, 5, 15);
const age = birthDate.getAge();

console.log(`Birth date: ${birthDate.format('D MMMM YYYY')}`);
console.log(`Age: ${age} years old`);

// When is the next birthday?
const thisYear = EthiopicDate.today().year;
const nextBirthday = new EthiopicDate(thisYear, birthDate.month, birthDate.day);

if (nextBirthday.isBefore(EthiopicDate.today())) {
  nextBirthday = nextBirthday.addYears(1);
}

const daysUntil = EthiopicDate.today().daysDifference(nextBirthday);
console.log(`Next birthday in ${daysUntil} days`);
```

### Holiday Detection

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

const dates = [
  new EthiopicDate(2017, 1, 1),   // New Year
  new EthiopicDate(2017, 4, 29),  // Christmas
  new EthiopicDate(2017, 5, 11),  // Timkat
  new EthiopicDate(2017, 2, 15)   // Regular day
];

dates.forEach(date => {
  if (date.isHoliday()) {
    console.log(`${date.format('D MMMM')} - ${date.getHoliday()}`);
  } else {
    console.log(`${date.format('D MMMM')} - Regular day`);
  }
});
```

### Date Arithmetic

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

const startDate = new EthiopicDate(2017, 1, 1);

// Add time periods
const oneWeekLater = startDate.addDays(7);
const oneMonthLater = startDate.addMonths(1);
const oneYearLater = startDate.addYears(1);

console.log(`Start: ${startDate.format('D MMMM YYYY')}`);
console.log(`+7 days: ${oneWeekLater.format('D MMMM YYYY')}`);
console.log(`+1 month: ${oneMonthLater.format('D MMMM YYYY')}`);
console.log(`+1 year: ${oneYearLater.format('D MMMM YYYY')}`);

// Calculate differences
const endDate = new EthiopicDate(2017, 6, 30);
const daysDiff = startDate.daysDifference(endDate);
console.log(`Days between start and end: ${daysDiff}`);
```

### Working with Seasons

```javascript
const { EthiopicDate, ETHIOPIAN_SEASONS } = require('@ethiopian-date-converter/js');

// Check seasons for different dates
const dates = [
  new EthiopicDate(2017, 1, 15),  // Bega (dry season)
  new EthiopicDate(2017, 4, 15),  // Kiremt (main rainy season)
  new EthiopicDate(2017, 8, 15)   // Belg (small rainy season)
];

dates.forEach(date => {
  const season = date.getSeason();
  const seasonAm = date.getSeason('am');
  
  console.log(`${date.format('D MMMM')} is in ${season} (${seasonAm})`);
});

// Display all seasons
console.log('\nEthiopian Seasons:');
ETHIOPIAN_SEASONS.forEach(season => {
  console.log(`${season.name} (${season.nameAm}): ${season.description}`);
  console.log(`  Months: ${season.months.join(', ')}`);
});
```

## Error Handling

The library provides clear error messages for common mistakes:

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

// Invalid dates throw errors
try {
  const invalidDate = new EthiopicDate(2017, 14, 1); // Month 14 doesn't exist
} catch (error) {
  console.error('Error:', error.message);
  // Output: "Error: Invalid Ethiopian date: 2017-14-1"
}

try {
  const invalidDay = new EthiopicDate(2017, 1, 35); // Days > 30 not allowed
} catch (error) {
  console.error('Error:', error.message);
}

try {
  const invalidParse = EthiopicDate.parse('not-a-date');
} catch (error) {
  console.error('Parse error:', error.message);
}

// Safe validation
function createSafeDate(year, month, day) {
  try {
    return { success: true, date: new EthiopicDate(year, month, day) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const result = createSafeDate(2017, 13, 7); // Invalid Pagume day
if (result.success) {
  console.log('Created date:', result.date.toString());
} else {
  console.log('Failed to create date:', result.error);
}
```

## Best Practices

### 1. Input Validation

Always validate user input before creating dates:

```javascript
function validateEthiopicInput(year, month, day) {
  // Basic range checks
  if (year < 1 || year > 9999) return 'Year must be between 1 and 9999';
  if (month < 1 || month > 13) return 'Month must be between 1 and 13';
  if (day < 1) return 'Day must be positive';
  
  // Month-specific day validation
  if (month <= 12 && day > 30) return 'Regular months have maximum 30 days';
  if (month === 13 && day > 6) return 'Pagume has maximum 6 days';
  
  return null; // Valid
}

function createValidatedDate(year, month, day) {
  const error = validateEthiopicInput(year, month, day);
  if (error) {
    throw new Error(error);
  }
  return new EthiopicDate(year, month, day);
}
```

### 2. Performance Considerations

For bulk operations, consider caching:

```javascript
class DateCache {
  constructor() {
    this.cache = new Map();
  }
  
  getGregorianEquivalent(year, month, day) {
    const key = `${year}-${month}-${day}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const ethiopic = new EthiopicDate(year, month, day);
    const gregorian = ethiopic.toGregorian();
    
    this.cache.set(key, gregorian);
    return gregorian;
  }
}
```

### 3. Consistent Date Handling

Establish consistent patterns in your application:

```javascript
// Create a date utility module
class AppDateUtils {
  static formatUserDate(date, locale = 'en') {
    // Consistent formatting across the app
    return date.format('dddd, D MMMM YYYY', locale);
  }
  
  static parseUserInput(input, type = 'ethiopic') {
    try {
      if (type === 'ethiopic') {
        return { success: true, date: EthiopicDate.parse(input) };
      } else {
        return { success: true, date: GregorianDate.parse(input) };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static getCurrentDate() {
    return {
      ethiopic: EthiopicDate.today(),
      gregorian: GregorianDate.today()
    };
  }
}
```

## Next Steps

Now that you understand the basics, explore these advanced topics:

1. **[API Reference](api-reference.md)** - Complete method documentation
2. **[Examples](examples.md)** - Real-world usage examples
3. **Cultural Features** - Learn about holidays, seasons, and localization
4. **Calendar Applications** - Build calendar widgets and date pickers
5. **Business Applications** - Payroll, scheduling, and working day calculations

## Getting Help

If you encounter issues:

1. Check the error message - they're designed to be helpful
2. Verify your input parameters are in valid ranges
3. Review the examples for similar use cases
4. Check the API reference for method signatures
5. Create an issue in the project repository with a minimal reproduction case

## Common Pitfalls

1. **Month indexing**: Ethiopian months are 1-based (1-13), not 0-based like JavaScript Date
2. **Pagume handling**: Month 13 (Pagume) has only 5-6 days depending on leap year
3. **Date validation**: Always handle potential errors when creating dates
4. **Calendar differences**: Ethiopian year is ~7-8 years behind Gregorian
5. **Day of week**: The library uses 0=Monday, 6=Sunday (different from JavaScript Date)
