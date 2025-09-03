..lder# Getting Started - Ethiopian Date Converter TypeScript

## Installation

### TypeScript Package

Install the dedicated TypeScript package:

```bash
npm install @ethiopian-date-converter/ts
```

### Development Dependencies

For TypeScript development, ensure you have:

```bash
npm install -D typescript @types/node
```

## Project Setup

### TypeScript Configuration

Create or update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts

Add useful scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "ts-node src/test.ts"
  }
}
```

## Quick Start

### Basic Import and Usage

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Create type-safe Ethiopian date
const ethiopicNewYear: EthiopicDate = new EthiopicDate(2017, 1, 1);

// Convert to Gregorian with full type safety
const gregorian: GregorianDate = ethiopicNewYear.toGregorian();

console.log(`Ethiopian New Year: ${gregorian.format('D MMMM YYYY')}`);
// Output: "Ethiopian New Year: 11 September 2024"
```

### ES6 Module Syntax

```typescript
// Named imports with types
import { 
    EthiopicDate, 
    GregorianDate, 
    CalendarUtils,
    DateObject,
    CalendarMonth 
} from '@ethiopian-date-converter/ts';

// Default import
import EthiopianDateConverter from '@ethiopian-date-converter/ts';
```

### CommonJS Syntax (if needed)

```typescript
// For Node.js CommonJS projects
const { 
    EthiopicDate, 
    GregorianDate 
} = require('@ethiopian-date-converter/ts');
```

## First TypeScript Examples

### 1. Type-Safe Date Creation

```typescript
import { EthiopicDate, DateObject } from '@ethiopian-date-converter/ts';

// Direct creation with compile-time validation
const date1: EthiopicDate = new EthiopicDate(2017, 1, 1);

// From object with type checking
const dateObj: DateObject = { year: 2017, month: 1, day: 1 };
const date2: EthiopicDate = new EthiopicDate(
    dateObj.year, 
    dateObj.month, 
    dateObj.day
);

// This would cause a TypeScript error:
// const badDate = new EthiopicDate("2017", 1, 1); // string instead of number
```

### 2. Type-Safe Date Operations

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

const date: EthiopicDate = new EthiopicDate(2017, 1, 1);

// All return types are known at compile time
const dayOfWeek: number = date.getDayOfWeek();
const monthName: string = date.getMonthName('en');
const isHoliday: boolean = date.isHoliday();
const holiday: string | null = date.getHoliday();
const age: number = date.getAge();

// Method chaining with type safety
const futureDate: EthiopicDate = date.addDays(30).addMonths(2);
const formattedDate: string = futureDate.format('D MMMM YYYY');
```

### 3. Language-Safe Operations

```typescript
import { EthiopicDate, LanguageCode } from '@ethiopian-date-converter/ts';

const date = new EthiopicDate(2017, 1, 1);

// Type-safe language codes
const languages: LanguageCode[] = ['en', 'am', 'gez'];

languages.forEach(lang => {
    const dayName: string = date.getDayName(lang);
    const monthName: string = date.getMonthName(lang);
    console.log(`${lang}: ${dayName}, ${monthName}`);
});

// This would cause a TypeScript error:
// const badLang: LanguageCode = 'fr'; // 'fr' is not assignable to LanguageCode
```

## Working with Types

### Interface Usage

```typescript
import { 
    EthiopicDate, 
    GregorianDate, 
    DateObject, 
    CalendarMonth 
} from '@ethiopian-date-converter/ts';

// Define your own interfaces that extend library types
interface BirthRecord {
    name: string;
    birthDate: EthiopicDate;
    birthPlace: string;
}

interface CalendarEvent {
    date: EthiopicDate;
    title: string;
    description?: string;
    type: 'holiday' | 'meeting' | 'personal';
}

// Type-safe functions
function createBirthRecord(
    name: string, 
    birthDate: DateObject, 
    birthPlace: string
): BirthRecord {
    return {
        name,
        birthDate: new EthiopicDate(birthDate.year, birthDate.month, birthDate.day),
        birthPlace
    };
}

function calculateAge(record: BirthRecord): number {
    return record.birthDate.getAge();
}

// Usage
const person = createBirthRecord(
    'Ahmed Ali',
    { year: 1990, month: 5, day: 15 },
    'Addis Ababa'
);

const age: number = calculateAge(person);
console.log(`${person.name} is ${age} years old`);
```

### Generic Functions

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Generic function that works with both date types
function formatAnyDate<T extends EthiopicDate | GregorianDate>(
    date: T,
    pattern: string = 'D MMMM YYYY'
): string {
    return date.format(pattern);
}

// Type inference works correctly
const ethiopic = new EthiopicDate(2017, 1, 1);
const gregorian = new GregorianDate(2024, 9, 11);

const ethiopicFormatted = formatAnyDate(ethiopic); // T is inferred as EthiopicDate
const gregorianFormatted = formatAnyDate(gregorian); // T is inferred as GregorianDate

// Generic date converter
function convertDate<T extends EthiopicDate | GregorianDate>(
    date: T
): T extends EthiopicDate ? GregorianDate : EthiopicDate {
    if (date instanceof EthiopicDate) {
        return date.toGregorian() as any;
    } else {
        return (date as GregorianDate).toEthiopic() as any;
    }
}

const converted = convertDate(ethiopic); // Type: GregorianDate
```

## Error Handling with Types

### Type-Safe Error Handling

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

// Result type for error handling
type DateResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};

function createSafeEthiopicDate(
    year: number, 
    month: number, 
    day: number
): DateResult<EthiopicDate> {
    try {
        const date = new EthiopicDate(year, month, day);
        return { success: true, data: date };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

// Usage with type guards
const result = createSafeEthiopicDate(2017, 1, 1);

if (result.success) {
    // TypeScript knows result.data is EthiopicDate
    console.log(result.data.format('D MMMM YYYY'));
} else {
    // TypeScript knows result.error is string
    console.error(`Failed to create date: ${result.error}`);
}
```

### Validation with Types

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

interface DateValidationRule {
    name: string;
    validate: (year: number, month: number, day: number) => boolean;
    message: string;
}

const validationRules: DateValidationRule[] = [
    {
        name: 'year-range',
        validate: (year) => year >= 1 && year <= 9999,
        message: 'Year must be between 1 and 9999'
    },
    {
        name: 'month-range',
        validate: (_, month) => month >= 1 && month <= 13,
        message: 'Month must be between 1 and 13'
    },
    {
        name: 'day-range',
        validate: (_, month, day) => {
            if (month <= 12) return day >= 1 && day <= 30;
            return day >= 1 && day <= 6; // Pagume
        },
        message: 'Invalid day for the given month'
    }
];

function validateEthiopicDate(
    year: number, 
    month: number, 
    day: number
): string[] {
    const errors: string[] = [];
    
    for (const rule of validationRules) {
        if (!rule.validate(year, month, day)) {
            errors.push(rule.message);
        }
    }
    
    return errors;
}

function createValidatedDate(
    year: number, 
    month: number, 
    day: number
): EthiopicDate {
    const errors = validateEthiopicDate(year, month, day);
    
    if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return new EthiopicDate(year, month, day);
}
```

## IDE Integration

### VSCode Setup

Install recommended extensions for optimal TypeScript experience:

1. **TypeScript and JavaScript Language Features** (built-in)
2. **Auto Rename Tag**
3. **Bracket Pair Colorizer**
4. **GitLens**

### IntelliSense Features

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

const date = new EthiopicDate(2017, 1, 1);

// Hover over any method to see:
// - Parameter types
// - Return types  
// - JSDoc documentation
// - Usage examples

date.format(/* IntelliSense will show format pattern options */);
date.addDays(/* IntelliSense shows: (days: number) => EthiopicDate */);
```

### Auto-Import

```typescript
// Start typing "EthiopicDate" and VSCode will:
// 1. Show autocomplete suggestions
// 2. Auto-import when selected
// 3. Organize imports automatically

const date = new EthiopicDate// <- VSCode suggests and auto-imports
```

## Building and Testing

### Build Configuration

```bash
# Compile TypeScript
npm run build

# Watch mode for development
npm run dev

# Type checking only (no output)
npx tsc --noEmit
```

### Testing Setup

Create a test file `src/test.ts`:

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Simple test function
function test(name: string, fn: () => boolean): void {
    try {
        const result = fn();
        console.log(result ? `PASS ${name}` : `FAIL ${name}`);
    } catch (error) {
        console.log(`FAIL ${name} - Error: ${error}`);
    }
}

// Run tests
console.log('Running TypeScript tests...\n');

test('Create and convert Ethiopian date', () => {
    const ethiopic = new EthiopicDate(2017, 1, 1);
    const gregorian = ethiopic.toGregorian();
    return gregorian.year === 2024 && gregorian.month === 9 && gregorian.day === 11;
});

test('Date arithmetic works correctly', () => {
    const date = new EthiopicDate(2017, 1, 1);
    const future = date.addDays(30);
    return future.month === 2 && future.day === 1;
});

test('Type safety prevents runtime errors', () => {
    // This test passes because TypeScript prevents the error at compile time
    const date = new EthiopicDate(2017, 1, 1);
    const formatted: string = date.format('D MMMM YYYY');
    return typeof formatted === 'string' && formatted.length > 0;
});

console.log('\nTests completed!');
```

Run tests:

```bash
npx ts-node src/test.ts
```

## Best Practices

### 1. Use Strict TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
```

### 2. Leverage Type Inference

```typescript
// Good: Let TypeScript infer the type
const date = new EthiopicDate(2017, 1, 1);
const formatted = date.format('D MMMM YYYY');

// Unnecessary: Explicit typing when inference works
const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
const formatted: string = date.format('D MMMM YYYY');
```

### 3. Use Proper Type Guards

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

function processDate(date: EthiopicDate | GregorianDate): string {
    if (date instanceof EthiopicDate) {
        // TypeScript knows this is EthiopicDate
        return `Ethiopian: ${date.getSeason() || 'Unknown'}`;
    } else {
        // TypeScript knows this is GregorianDate
        return `Gregorian: ${date.isLeapYear() ? 'Leap' : 'Regular'}`;
    }
}
```

### 4. Define Clear Interfaces

```typescript
interface CalendarConfig {
    defaultLanguage: 'en' | 'am' | 'gez';
    showHolidays: boolean;
    showSeasons: boolean;
    dateFormat: string;
}

interface DateRange {
    start: EthiopicDate;
    end: EthiopicDate;
    includeWeekends: boolean;
}

class EthiopicCalendar {
    constructor(private config: CalendarConfig) {}
    
    generateRange(range: DateRange): EthiopicDate[] {
        // Implementation with full type safety
        const dates: EthiopicDate[] = [];
        let current = range.start.clone();
        
        while (current.isBefore(range.end) || current.isSame(range.end)) {
            if (range.includeWeekends || current.getDayOfWeek() < 5) {
                dates.push(current);
            }
            current = current.addDays(1);
        }
        
        return dates;
    }
}
```

## Migration Tips

### From JavaScript Version

1. **Replace require with import**:
   ```typescript
   // Before
   const { EthiopicDate } = require('@ethiopian-date-converter/js');
   
   // After
   import { EthiopicDate } from '@ethiopian-date-converter/ts';
   ```

2. **Add type annotations where helpful**:
   ```typescript
   // Before
   function formatDate(date) {
       return date.format('D MMMM YYYY');
   }
   
   // After
   function formatDate(date: EthiopicDate): string {
       return date.format('D MMMM YYYY');
   }
   ```

3. **Leverage TypeScript features**:
   ```typescript
   // Use interfaces for data structures
   interface Employee {
       name: string;
       birthDate: EthiopicDate;
       department: string;
   }
   
   // Use union types for options
   type CalendarView = 'month' | 'year' | 'day';
   ```

## Next Steps

1. **Read the [API Reference](api-reference.md)** for complete method documentation
2. **Explore [Examples](examples.md)** for real-world usage patterns
3. **Check out advanced TypeScript patterns** in the advanced usage section
4. **Set up your development environment** with proper TypeScript tooling
5. **Start building** your Ethiopian calendar application with full type safety!

## Getting Help

For TypeScript-specific issues:
1. Check TypeScript compiler errors - they're usually very helpful
2. Use your IDE's IntelliSense features for method signatures
3. Review the type definitions in the library
4. Check the examples for similar usage patterns

The TypeScript version provides the same functionality as JavaScript with the added benefits of compile-time type checking, better IDE support, and improved developer experience.

