# Ethiopian Date Converter - TypeScript Documentation

## Overview

The Ethiopian Date Converter TypeScript library provides a **native TypeScript implementation** with full type safety, modern development experience, and comprehensive functionality for converting between Ethiopian and Gregorian calendars.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [TypeScript Features](#typescript-features)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Type Definitions](#type-definitions)
7. [Advanced Usage](#advanced-usage)
8. [Migration from JavaScript](#migration-from-javascript)

## Installation

```bash
npm install @ethiopian-date-converter/ts
```

### Requirements

- **TypeScript**: 4.5+ (5.0+ recommended)
- **Node.js**: 14.0.0+
- **Native Compilation**: Automatically handled during installation

## Quick Start

### Basic TypeScript Usage

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Type-safe date creation
const ethiopicNewYear: EthiopicDate = new EthiopicDate(2017, 1, 1);
const gregorian: GregorianDate = ethiopicNewYear.toGregorian();

console.log(`Ethiopian New Year 2017 is ${gregorian.format('D MMMM YYYY')}`);
// Output: "Ethiopian New Year 2017 is 11 September 2024"
```

### With Strict Type Checking

```typescript
import { EthiopicDate, DateObject, FormatPattern } from '@ethiopian-date-converter/ts';

// Compile-time type validation
const createFormattedDate = (
    dateObj: DateObject, 
    pattern: FormatPattern = 'YYYY-MM-DD'
): string => {
    const date = new EthiopicDate(dateObj.year, dateObj.month, dateObj.day);
    return date.format(pattern);
};

const result = createFormattedDate({ year: 2017, month: 1, day: 1 });
```

## TypeScript Features

### 🎯 **Full Type Safety**

```typescript
// All methods have proper return types
const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
const dayOfWeek: number = date.getDayOfWeek();
const monthName: string = date.getMonthName('en');
const isHoliday: boolean = date.isHoliday();
const holiday: string | null = date.getHoliday();
```

### **IntelliSense & Autocomplete**

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

const date = new EthiopicDate(2017, 1, 1);
// IDE will show all available methods with documentation
date. // <- IntelliSense shows: format, addDays, toGregorian, etc.
```

### **Compile-Time Error Detection**

```typescript
// This will cause a TypeScript compilation error:
const date = new EthiopicDate("2017", 1, 1); // string instead of number

// This is type-safe:
const date = new EthiopicDate(2017, 1, 1); // correct types
```

### **Union Types & Enums**

```typescript
import { LanguageCode, FormatPattern } from '@ethiopian-date-converter/ts';

// Language codes are type-checked
const lang: LanguageCode = 'am'; // 'en' | 'am' | 'gez' | 'short'
const badLang: LanguageCode = 'fr'; // TypeScript error

// Format patterns are documented
const pattern: FormatPattern = 'DD MMMM YYYY';
```

## API Reference

### Core Classes

#### EthiopicDate

```typescript
class EthiopicDate {
    constructor(year: number, month: number, day: number);
    
    // Properties (readonly)
    readonly year: number;
    readonly month: number;
    readonly day: number;
    
    // Conversion methods
    toGregorian(): GregorianDate;
    toObject(): DateObject;
    toString(): string;
    
    // Date arithmetic
    addDays(days: number): EthiopicDate;
    addMonths(months: number): EthiopicDate;
    addYears(years: number): EthiopicDate;
    subtractDays(days: number): EthiopicDate;
    
    // Comparison methods
    isBefore(other: EthiopicDate | GregorianDate): boolean;
    isAfter(other: EthiopicDate | GregorianDate): boolean;
    isSame(other: EthiopicDate | GregorianDate): boolean;
    isToday(): boolean;
    
    // Cultural methods
    isHoliday(): boolean;
    getHoliday(lang?: 'en' | 'am'): string | null;
    getSeason(lang?: 'en' | 'am'): string | null;
    
    // Formatting
    format(pattern?: FormatPattern, lang?: LanguageCode): string;
    getRelativeDateString(): string;
    
    // Information methods
    getDayOfWeek(): number;
    getDayName(lang?: LanguageCode): string;
    getMonthName(lang?: 'en' | 'am' | 'gez'): string;
    getAge(asOfDate?: EthiopicDate): number;
    
    // Utility methods
    isValid(): boolean;
    getJDN(): number;
    clone(): EthiopicDate;
    daysDifference(other: EthiopicDate | GregorianDate): number;
    
    // Static methods
    static today(): EthiopicDate;
    static parse(dateString: string): EthiopicDate;
}
```

#### GregorianDate

```typescript
class GregorianDate {
    constructor(year: number, month: number, day: number);
    
    // Similar methods to EthiopicDate, plus:
    toEthiopic(): EthiopicDate;
    toJSDate(): Date;
    isLeapYear(): boolean;
    
    // All other methods match EthiopicDate signature
}
```

### Utility Classes

#### CalendarUtils

```typescript
class CalendarUtils {
    static generateEthiopicCalendar(year: number, month: number): CalendarMonth;
    static generateGregorianCalendar(year: number, month: number): CalendarMonth;
    static getBusinessDaysBetween(
        start: EthiopicDate | GregorianDate, 
        end: EthiopicDate | GregorianDate
    ): number;
}
```

#### DateConverter

```typescript
class DateConverter {
    static today(): { ethiopic: EthiopicDate; gregorian: GregorianDate };
    static ethiopicToGregorian(year: number, month: number, day: number, era?: number): DateObject;
    static gregorianToEthiopic(year: number, month: number, day: number): DateObject;
    static isValidEthiopicDate(year: number, month: number, day: number): boolean;
    static isValidGregorianDate(year: number, month: number, day: number): boolean;
    static isGregorianLeap(year: number): boolean;
    
    // JDN utilities
    static ethiopicToJDN(year: number, month: number, day: number, era?: number): number;
    static gregorianToJDN(year: number, month: number, day: number): number;
    static jdnToEthiopic(jdn: number, era?: number): DateObject;
    static jdnToGregorian(jdn: number): DateObject;
    static getDayOfWeek(jdn: number): number;
    
    static readonly EPOCHS: EpochConstants;
}
```

## Type Definitions

### Core Interfaces

```typescript
interface DateObject {
    year: number;
    month: number;
    day: number;
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

interface EpochConstants {
    readonly AMETE_ALEM: number;
    readonly AMETE_MIHRET: number;
    readonly GREGORIAN: number;
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
```

## Examples

### Type-Safe Date Operations

```typescript
import { EthiopicDate, GregorianDate, DateObject } from '@ethiopian-date-converter/ts';

// Generic date converter function
function convertDate<T extends EthiopicDate | GregorianDate>(
    date: T
): T extends EthiopicDate ? GregorianDate : EthiopicDate {
    if (date instanceof EthiopicDate) {
        return date.toGregorian() as any;
    } else {
        return (date as GregorianDate).toEthiopic() as any;
    }
}

const ethiopic = new EthiopicDate(2017, 1, 1);
const gregorian = convertDate(ethiopic); // Type: GregorianDate

const converted = convertDate(gregorian); // Type: EthiopicDate
```

### Calendar Application with Types

```typescript
import { 
    EthiopicDate, 
    CalendarUtils, 
    CalendarMonth, 
    CalendarDayInfo 
} from '@ethiopian-date-converter/ts';

interface HolidayEvent {
    date: EthiopicDate;
    name: string;
    nameAm: string;
    type: 'religious' | 'national' | 'cultural';
}

class EthiopicCalendarWidget {
    private year: number;
    private month: number;

    constructor(year: number, month: number) {
        this.year = year;
        this.month = month;
    }

    generateCalendar(): CalendarMonth {
        return CalendarUtils.generateEthiopicCalendar(this.year, this.month);
    }

    getHolidays(): HolidayEvent[] {
        const calendar = this.generateCalendar();
        const holidays: HolidayEvent[] = [];

        calendar.weeks.forEach(week => {
            week.forEach(day => {
                if (day?.isHoliday && day.date instanceof EthiopicDate) {
                    holidays.push({
                        date: day.date,
                        name: day.holiday || '',
                        nameAm: day.date.getHoliday('am') || '',
                        type: 'religious' // Could be determined by holiday name
                    });
                }
            });
        });

        return holidays;
    }

    formatDay(dayInfo: CalendarDayInfo | null): string {
        if (!dayInfo) return '';
        
        const date = dayInfo.date;
        let formatted = `${dayInfo.day}`;
        
        if (dayInfo.isToday) formatted += ' (Today)';
        if (dayInfo.isHoliday) formatted += ` - ${dayInfo.holiday}`;
        
        return formatted;
    }
}

// Usage
const widget = new EthiopicCalendarWidget(2017, 1);
const calendar = widget.generateCalendar();
const holidays = widget.getHolidays();

console.log(`${calendar.monthName} ${calendar.year}`);
holidays.forEach(holiday => {
    console.log(`${holiday.date.format('D MMMM')}: ${holiday.name}`);
});
```

### Business Logic with Type Safety

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

interface Employee {
    id: string;
    name: string;
    birthDate: EthiopicDate;
    hireDate: EthiopicDate;
    department: string;
}

interface PayrollPeriod {
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    workingDays: number;
    holidays: string[];
}

class EthiopicHRSystem {
    calculateAge(employee: Employee, asOf?: EthiopicDate): number {
        return employee.birthDate.getAge(asOf);
    }

    calculateServiceYears(employee: Employee, asOf?: EthiopicDate): number {
        return employee.hireDate.getAge(asOf);
    }

    isRetirementEligible(employee: Employee): boolean {
        const age = this.calculateAge(employee);
        const serviceYears = this.calculateServiceYears(employee);
        return age >= 65 || (age >= 55 && serviceYears >= 20);
    }

    generatePayrollPeriod(year: number, month: number): PayrollPeriod {
        const startDate = new EthiopicDate(year, month, 1);
        
        // Calculate last day of month
        let lastDay = 30;
        if (month === 13) {
            try {
                new EthiopicDate(year, 13, 6);
                lastDay = 6; // Leap year
            } catch {
                lastDay = 5; // Regular year
            }
        }
        
        const endDate = new EthiopicDate(year, month, lastDay);
        
        // Calculate working days
        const startGregorian = startDate.toGregorian();
        const endGregorian = endDate.toGregorian();
        const workingDays = CalendarUtils.getBusinessDaysBetween(startGregorian, endGregorian);
        
        // Find holidays in this period
        const holidays: string[] = [];
        let current = startDate.clone();
        
        while (current.isBefore(endDate) || current.isSame(endDate)) {
            if (current.isHoliday()) {
                const holiday = current.getHoliday();
                if (holiday) holidays.push(holiday);
            }
            current = current.addDays(1);
        }
        
        return {
            startDate,
            endDate,
            workingDays,
            holidays
        };
    }
}

// Usage with full type safety
const hrSystem = new EthiopicHRSystem();

const employee: Employee = {
    id: '001',
    name: 'Ahmed Ali',
    birthDate: new EthiopicDate(1985, 3, 15),
    hireDate: new EthiopicDate(2010, 1, 1),
    department: 'IT'
};

const age: number = hrSystem.calculateAge(employee);
const serviceYears: number = hrSystem.calculateServiceYears(employee);
const isEligible: boolean = hrSystem.isRetirementEligible(employee);

console.log(`${employee.name}: Age ${age}, Service ${serviceYears} years`);
console.log(`Retirement eligible: ${isEligible}`);
```

## Advanced Usage

### Custom Type Guards

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Type guards for runtime type checking
function isEthiopicDate(date: any): date is EthiopicDate {
    return date instanceof EthiopicDate;
}

function isGregorianDate(date: any): date is GregorianDate {
    return date instanceof GregorianDate;
}

function isToday(date: EthiopicDate | GregorianDate): boolean {
    return date.isToday();
}

// Generic date processor
function processDate(date: EthiopicDate | GregorianDate): string {
    if (isEthiopicDate(date)) {
        return `Ethiopian: ${date.format('D MMMM YYYY')} - ${date.getSeason() || 'Unknown season'}`;
    } else {
        return `Gregorian: ${date.format('D MMMM YYYY')} - ${date.isLeapYear() ? 'Leap year' : 'Regular year'}`;
    }
}
```

### Generic Calendar Utilities

```typescript
import { EthiopicDate, GregorianDate, CalendarUtils } from '@ethiopian-date-converter/ts';

// Generic date range iterator
class DateRange<T extends EthiopicDate | GregorianDate> {
    constructor(
        private start: T,
        private end: T,
        private increment: 'days' | 'months' | 'years' = 'days',
        private step: number = 1
    ) {}

    *[Symbol.iterator](): Iterator<T> {
        let current = this.start.clone() as T;
        
        while (current.isBefore(this.end) || current.isSame(this.end)) {
            yield current;
            
            switch (this.increment) {
                case 'days':
                    current = current.addDays(this.step) as T;
                    break;
                case 'months':
                    current = current.addMonths(this.step) as T;
                    break;
                case 'years':
                    current = current.addYears(this.step) as T;
                    break;
            }
        }
    }

    toArray(): T[] {
        return Array.from(this);
    }
}

// Usage
const start = new EthiopicDate(2017, 1, 1);
const end = new EthiopicDate(2017, 1, 30);
const range = new DateRange(start, end, 'days', 1);

const holidays = range.toArray().filter(date => date.isHoliday());
console.log(`Holidays in Meskerem 2017: ${holidays.length}`);
```

## Migration from JavaScript

### Before (JavaScript)

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

// No type checking
const date = new EthiopicDate("2017", 1, 1); // Runtime error
const formatted = date.format(); // Unknown return type
```

### After (TypeScript)

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

// Compile-time type checking
const date = new EthiopicDate(2017, 1, 1); // Type-safe
const formatted: string = date.format(); // Known return type
```

### Migration Steps

1. **Install TypeScript package**: `npm install @ethiopian-date-converter/ts`
2. **Update imports**: Change `require()` to `import`
3. **Add type annotations**: Leverage TypeScript's type system
4. **Enable strict mode**: For maximum type safety

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

## Development Setup

### Building from Source

```bash
git clone <repository>
cd Date-converter/bindings/ts
npm install
npm run build
```

### Running Tests

```bash
npm test              # Run compiled tests
npm run test:ts       # Run TypeScript tests directly
```

### Development Mode

```bash
npm run dev           # Watch mode with TypeScript compilation
```

## Performance

The TypeScript implementation provides the same performance as the JavaScript version with additional compile-time optimizations:

- **Zero runtime overhead** for type annotations
- **Compile-time dead code elimination**
- **Better bundling** with tree-shaking support
- **Optimized imports** with ES modules

## Browser Support

When compiled to JavaScript, supports all modern browsers:

- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

## License

MIT License - see the LICENSE file for details.

---

*TypeScript implementation provides the same functionality as the JavaScript version with full type safety and modern development experience.*

