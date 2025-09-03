# API Reference - Ethiopian Date Converter TypeScript

## Classes

### EthiopicDate

Class representing dates in the Ethiopian calendar with full TypeScript support.

#### Constructor

```typescript
new EthiopicDate(year: number, month: number, day: number): EthiopicDate
```

**Parameters:**
- `year: number` - Ethiopian year (positive integer)
- `month: number` - Ethiopian month (1-13, where 13 is Pagume)
- `day: number` - Day of month (1-30 for regular months, 1-5/6 for Pagume)

**Throws:**
- `Error` - If the date is invalid

**Example:**
```typescript
const date = new EthiopicDate(2017, 1, 1); // Ethiopian New Year 2017
```

#### Properties

##### `readonly year: number`
The Ethiopian year.

##### `readonly month: number`
The Ethiopian month (1-13).

##### `readonly day: number`
The day of the month.

#### Static Methods

##### `EthiopicDate.today(): EthiopicDate`

Returns the current date in Ethiopian calendar.

**Example:**
```typescript
const today: EthiopicDate = EthiopicDate.today();
console.log(today.toString()); // "2017-12-28 EC"
```

##### `EthiopicDate.parse(dateString: string): EthiopicDate`

Parses a date string into an EthiopicDate object.

**Parameters:**
- `dateString: string` - Date string in format YYYY-MM-DD, YYYY/MM/DD, or DD/MM/YYYY

**Returns:** `EthiopicDate` - Parsed date object

**Throws:**
- `Error` - If the date string cannot be parsed

**Example:**
```typescript
const date1 = EthiopicDate.parse('2017-01-15');
const date2 = EthiopicDate.parse('2017/1/15');
const date3 = EthiopicDate.parse('15/1/2017');
```

#### Instance Methods

##### `isValid(): boolean`

Checks if this Ethiopian date is valid.

**Returns:** `boolean` - True if valid, false otherwise

##### `toGregorian(): GregorianDate`

Converts this Ethiopian date to Gregorian calendar.

**Returns:** `GregorianDate` - Equivalent Gregorian date

##### `getJDN(): number`

Gets the Julian Day Number for this date.

**Returns:** `number` - Julian Day Number

##### `getDayOfWeek(): number`

Gets the day of week for this date.

**Returns:** `number` - Day of week (0=Monday, 1=Tuesday, ..., 6=Sunday)

##### `getDayName(lang?: LanguageCode): string`

Gets the day name in the specified language.

**Parameters:**
- `lang?: LanguageCode` - Language code ('en', 'am', 'gez', 'short'). Default: 'en'

**Returns:** `string` - Day name

**Example:**
```typescript
const date = new EthiopicDate(2017, 1, 1);
console.log(date.getDayName());      // "Wednesday"
console.log(date.getDayName('am'));  // "ረቡዕ"
console.log(date.getDayName('short')); // "Wed"
```

##### `getMonthName(lang?: 'en' | 'am' | 'gez'): string`

Gets the month name in the specified language.

**Parameters:**
- `lang?: 'en' | 'am' | 'gez'` - Language code. Default: 'en'

**Returns:** `string` - Month name

**Example:**
```typescript
const date = new EthiopicDate(2017, 1, 15);
console.log(date.getMonthName());     // "Meskerem"
console.log(date.getMonthName('am')); // "መስከረም"
```

##### `addDays(days: number): EthiopicDate`

Adds the specified number of days to this date.

**Parameters:**
- `days: number` - Number of days to add (can be negative)

**Returns:** `EthiopicDate` - New date object

##### `subtractDays(days: number): EthiopicDate`

Subtracts the specified number of days from this date.

**Parameters:**
- `days: number` - Number of days to subtract

**Returns:** `EthiopicDate` - New date object

##### `addMonths(months: number): EthiopicDate`

Adds the specified number of months to this date.

**Parameters:**
- `months: number` - Number of months to add (can be negative)

**Returns:** `EthiopicDate` - New date object

**Note:** Handles month overflow and Pagume edge cases automatically.

##### `addYears(years: number): EthiopicDate`

Adds the specified number of years to this date.

**Parameters:**
- `years: number` - Number of years to add (can be negative)

**Returns:** `EthiopicDate` - New date object

##### `daysDifference(otherDate: EthiopicDate | GregorianDate): number`

Calculates the difference in days between this date and another date.

**Parameters:**
- `otherDate: EthiopicDate | GregorianDate` - The other date to compare with

**Returns:** `number` - Difference in days (positive if otherDate is later)

##### `isBefore(otherDate: EthiopicDate | GregorianDate): boolean`

Checks if this date is before another date.

**Parameters:**
- `otherDate: EthiopicDate | GregorianDate` - The other date to compare with

**Returns:** `boolean` - True if this date is before otherDate

##### `isAfter(otherDate: EthiopicDate | GregorianDate): boolean`

Checks if this date is after another date.

**Parameters:**
- `otherDate: EthiopicDate | GregorianDate` - The other date to compare with

**Returns:** `boolean` - True if this date is after otherDate

##### `isSame(otherDate: EthiopicDate | GregorianDate): boolean`

Checks if this date is the same as another date.

**Parameters:**
- `otherDate: EthiopicDate | GregorianDate` - The other date to compare with

**Returns:** `boolean` - True if dates represent the same day

##### `isToday(): boolean`

Checks if this date is today.

**Returns:** `boolean` - True if this date is today

##### `isHoliday(): boolean`

Checks if this date is an Ethiopian holiday.

**Returns:** `boolean` - True if this date is a recognized Ethiopian holiday

##### `getHoliday(lang?: 'en' | 'am'): string | null`

Gets the holiday name if this date is a holiday.

**Parameters:**
- `lang?: 'en' | 'am'` - Language code. Default: 'en'

**Returns:** `string | null` - Holiday name or null if not a holiday

##### `getSeason(lang?: 'en' | 'am'): string | null`

Gets the Ethiopian season for this date.

**Parameters:**
- `lang?: 'en' | 'am'` - Language code. Default: 'en'

**Returns:** `string | null` - Season name ('Belg', 'Bega', 'Kiremt')

##### `getAge(asOfDate?: EthiopicDate): number`

Calculates age in years from this date (as birth date) to the reference date.

**Parameters:**
- `asOfDate?: EthiopicDate` - Reference date. Default: today

**Returns:** `number` - Age in years

##### `format(pattern?: FormatPattern, lang?: 'en' | 'am' | 'gez'): string`

Formats the date according to the specified pattern.

**Parameters:**
- `pattern?: FormatPattern` - Format pattern. Default: 'YYYY-MM-DD'
- `lang?: 'en' | 'am' | 'gez'` - Language for month/day names. Default: 'en'

**Returns:** `string` - Formatted date string

**Format Patterns:**
- `YYYY` - 4-digit year
- `YY` - 2-digit year
- `MMMM` - Full month name
- `MMM` - Short month name
- `MM` - 2-digit month with zero padding
- `M` - Month number
- `DD` - 2-digit day with zero padding
- `D` - Day number
- `dddd` - Full day name
- `ddd` - Short day name

**Example:**
```typescript
const date = new EthiopicDate(2017, 1, 5);
console.log(date.format('D MMMM YYYY'));        // "5 Meskerem 2017"
console.log(date.format('dddd, D MMMM YYYY'));  // "Wednesday, 5 Meskerem 2017"
console.log(date.format('DD/MM/YYYY'));         // "05/01/2017"
```

##### `getRelativeDateString(): string`

Gets a relative date string describing this date relative to today.

**Returns:** `string` - Relative date description

**Example:**
```typescript
const tomorrow = EthiopicDate.today().addDays(1);
console.log(tomorrow.getRelativeDateString()); // "tomorrow"

const lastWeek = EthiopicDate.today().addDays(-7);
console.log(lastWeek.getRelativeDateString()); // "1 weeks ago"
```

##### `clone(): EthiopicDate`

Creates a copy of this date.

**Returns:** `EthiopicDate` - New identical date object

##### `toObject(): DateObject`

Converts this date to a plain object.

**Returns:** `DateObject` - Object with year, month, day properties

##### `toString(): string`

Gets string representation of this date.

**Returns:** `string` - Date in format "YYYY-MM-DD EC"

---

### GregorianDate

Class representing dates in the Gregorian calendar. Has similar methods to EthiopicDate with these key differences:

#### Constructor

```typescript
new GregorianDate(year: number, month: number, day: number): GregorianDate
```

#### Key Methods

##### `toEthiopic(): EthiopicDate`

Converts this Gregorian date to Ethiopian calendar.

##### `toJSDate(): Date`

Converts this date to a JavaScript Date object.

##### `isLeapYear(): boolean`

Checks if this date's year is a leap year.

##### `getMonthName(short?: boolean): string`

Gets the Gregorian month name.

**Parameters:**
- `short?: boolean` - If true, returns short month name (e.g., "Jan"). Default: false

---

### CalendarUtils

Static utility class for calendar operations.

#### `generateEthiopicCalendar(year: number, month: number): CalendarMonth`

Generates calendar data for displaying an Ethiopian calendar month.

**Parameters:**
- `year: number` - Ethiopian year
- `month: number` - Ethiopian month (1-13)

**Returns:** `CalendarMonth` - Calendar data object

**CalendarMonth Interface:**
```typescript
interface CalendarMonth {
  year: number;
  month: number;
  monthName: string;
  daysInMonth: number;
  weeks: Array<Array<CalendarDayInfo | null>>;
}

interface CalendarDayInfo {
  date: EthiopicDate;
  day: number;
  isToday: boolean;
  isHoliday: boolean;
  holiday?: string;
}
```

#### `generateGregorianCalendar(year: number, month: number): CalendarMonth`

Generates calendar data for displaying a Gregorian calendar month.

#### `getBusinessDaysBetween(startDate: EthiopicDate | GregorianDate, endDate: EthiopicDate | GregorianDate): number`

Calculates the number of business days (Monday-Friday) between two dates.

**Parameters:**
- `startDate: EthiopicDate | GregorianDate` - Start date (inclusive)
- `endDate: EthiopicDate | GregorianDate` - End date (inclusive)

**Returns:** `number` - Number of business days

---

### DateConverter

Enhanced converter class with additional utilities.

#### `today(): { ethiopic: EthiopicDate; gregorian: GregorianDate }`

Gets current date in both calendars.

**Returns:** Object with both Ethiopian and Gregorian current dates

#### Julian Day Number Methods

##### `ethiopicToJDN(year: number, month: number, day: number, era?: number): number`
##### `gregorianToJDN(year: number, month: number, day: number): number`
##### `jdnToEthiopic(jdn: number, era?: number): DateObject`
##### `jdnToGregorian(jdn: number): DateObject`
##### `getDayOfWeek(jdn: number): number`

Low-level methods for working with Julian Day Numbers.

---

## Legacy Functions

For backward compatibility:

### `ethiopicToGregorian(year: number, month: number, day: number, era?: number): DateObject`

Converts Ethiopian date to Gregorian (returns plain object).

### `gregorianToEthiopic(year: number, month: number, day: number): DateObject`

Converts Gregorian date to Ethiopian (returns plain object).

### `isValidEthiopicDate(year: number, month: number, day: number): boolean`

Validates Ethiopian date.

### `isValidGregorianDate(year: number, month: number, day: number): boolean`

Validates Gregorian date.

### `isGregorianLeap(year: number): boolean`

Checks if Gregorian year is leap year.

---

## Type Definitions

### Core Interfaces

```typescript
interface DateObject {
  year: number;
  month: number;
  day: number;
}

interface EpochConstants {
  readonly AMETE_ALEM: number;
  readonly AMETE_MIHRET: number;
  readonly GREGORIAN: number;
}

interface CalendarMonth {
  year: number;
  month: number;
  monthName: string;
  weeks: Array<Array<CalendarDayInfo | null>>;
  daysInMonth: number;
}

interface CalendarDayInfo {
  date: EthiopicDate | GregorianDate;
  day: number;
  isToday: boolean;
  isHoliday?: boolean;
  holiday?: string;
}
```

### Type Aliases

```typescript
type LanguageCode = 'en' | 'am' | 'gez' | 'short';
type FormatPattern = string;
```

### Constants Interfaces

```typescript
interface MonthNames {
  ethiopic: {
    en: string[];
    am: string[];
    gez: string[];
  };
  gregorian: {
    en: string[];
    short: string[];
  };
}

interface DayNames {
  en: string[];
  short: string[];
  am: string[];
  gez: string[];
}

interface Holiday {
  month: number;
  day: number;
  name: string;
  nameAm: string;
}

interface EthiopianHolidays {
  fixed: Holiday[];
  variable: Array<{ name: string; nameAm: string; }>;
}

interface Season {
  name: string;
  nameAm: string;
  months: number[];
  description: string;
}
```

---

## Constants

### MONTH_NAMES
```typescript
const MONTH_NAMES: MonthNames
```

### DAY_NAMES
```typescript
const DAY_NAMES: DayNames
```

### ETHIOPIAN_HOLIDAYS
```typescript
const ETHIOPIAN_HOLIDAYS: EthiopianHolidays
```

### ETHIOPIAN_SEASONS
```typescript
const ETHIOPIAN_SEASONS: Season[]
```

### EPOCHS
```typescript
const EPOCHS: EpochConstants
```

## TypeScript-Specific Features

### Generic Functions

The TypeScript implementation includes generic functions for type-safe operations:

```typescript
// Generic date converter
function convertDate<T extends EthiopicDate | GregorianDate>(
  date: T
): T extends EthiopicDate ? GregorianDate : EthiopicDate;

// Type-safe formatting
function formatAnyDate<T extends EthiopicDate | GregorianDate>(
  date: T,
  pattern?: FormatPattern
): string;
```

### Type Guards

```typescript
function isEthiopicDate(date: any): date is EthiopicDate;
function isGregorianDate(date: any): date is GregorianDate;
```

### Strict Null Checks

All methods properly handle null/undefined values with TypeScript's strict null checks:

```typescript
const holiday: string | null = date.getHoliday(); // Explicit null handling
const season: string | null = date.getSeason();   // Type-safe nullability
```

