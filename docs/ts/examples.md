# Examples - Ethiopian Date Converter TypeScript

This document provides comprehensive TypeScript examples showcasing the full type safety and modern development features of the Ethiopian Date Converter TypeScript library.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Type-Safe Date Operations](#type-safe-date-operations)
3. [Advanced TypeScript Features](#advanced-typescript-features)
4. [Generic Programming](#generic-programming)
5. [Enterprise Applications](#enterprise-applications)
6. [Calendar Applications](#calendar-applications)
7. [Business Logic](#business-logic)
8. [Error Handling](#error-handling)

## Basic Usage

### Type-Safe Date Creation

```typescript
import { EthiopicDate, GregorianDate, DateObject } from '@ethiopian-date-converter/ts';

// Direct creation with compile-time validation
const date1: EthiopicDate = new EthiopicDate(2017, 1, 1);

// From object with type checking
const dateObj: DateObject = { year: 2017, month: 1, day: 1 };
const date2: EthiopicDate = new EthiopicDate(
    dateObj.year, 
    dateObj.month, 
    dateObj.day
);

// This would cause a TypeScript compilation error:
// const badDate = new EthiopicDate("2017", 1, 1); // Type error
```

### Basic Date Conversion

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Ethiopian to Gregorian with full type safety
const ethiopic: EthiopicDate = new EthiopicDate(2017, 1, 1);
const gregorian: GregorianDate = ethiopic.toGregorian();

console.log(`Ethiopian: ${ethiopic.format('D MMMM YYYY')}`);     // "1 Meskerem 2017"
console.log(`Gregorian: ${gregorian.format('D MMMM YYYY')}`);    // "11 September 2024"

// Reverse conversion
const gregDate: GregorianDate = new GregorianDate(2024, 12, 25);
const ethDate: EthiopicDate = gregDate.toEthiopic();

console.log(`Gregorian Christmas: ${gregDate.format('D MMMM YYYY')}`);
console.log(`In Ethiopian: ${ethDate.format('D MMMM YYYY')}`);
```

## Type-Safe Date Operations

### Strongly Typed Method Calls

```typescript
import { EthiopicDate, LanguageCode, FormatPattern } from '@ethiopian-date-converter/ts';

const date: EthiopicDate = new EthiopicDate(2017, 1, 1);

// All return types are known at compile time
const dayOfWeek: number = date.getDayOfWeek();
const monthName: string = date.getMonthName('en');
const isHoliday: boolean = date.isHoliday();
const holiday: string | null = date.getHoliday(); // Explicitly nullable
const age: number = date.getAge();

// Type-safe language codes
const validLangs: LanguageCode[] = ['en', 'am', 'gez', 'short'];
validLangs.forEach(lang => {
    const dayName: string = date.getDayName(lang);
    console.log(`${lang}: ${dayName}`);
});

// This would cause a TypeScript error:
// const invalidLang: LanguageCode = 'fr'; // Not assignable to LanguageCode
```

### Type-Safe Date Arithmetic

```typescript
import { EthiopicDate } from '@ethiopian-date-converter/ts';

const startDate: EthiopicDate = new EthiopicDate(2017, 1, 1);

// Method chaining with guaranteed return types
const futureDate: EthiopicDate = startDate
    .addDays(30)
    .addMonths(2)
    .addYears(1);

// Type-safe comparisons
const isAfter: boolean = futureDate.isAfter(startDate);
const daysDiff: number = startDate.daysDifference(futureDate);

console.log(`Future date: ${futureDate.format('D MMMM YYYY')}`);
console.log(`Days difference: ${daysDiff}`);
```

## Advanced TypeScript Features

### Interface-Based Development

```typescript
import { EthiopicDate, GregorianDate, DateObject, CalendarMonth } from '@ethiopian-date-converter/ts';

// Define custom interfaces that extend library types
interface Employee {
    id: string;
    name: string;
    birthDate: EthiopicDate;
    hireDate: EthiopicDate;
    department: string;
}

interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    date: EthiopicDate;
    type: 'holiday' | 'meeting' | 'personal' | 'deadline';
    priority: 'low' | 'medium' | 'high';
}

interface DateRange {
    start: EthiopicDate;
    end: EthiopicDate;
    includeWeekends: boolean;
    includeHolidays: boolean;
}

// Type-safe factory functions
function createEmployee(
    id: string,
    name: string,
    birthDate: DateObject,
    hireDate: DateObject,
    department: string
): Employee {
    return {
        id,
        name,
        birthDate: new EthiopicDate(birthDate.year, birthDate.month, birthDate.day),
        hireDate: new EthiopicDate(hireDate.year, hireDate.month, hireDate.day),
        department
    };
}

function createEvent(
    id: string,
    title: string,
    date: EthiopicDate,
    type: CalendarEvent['type'],
    priority: CalendarEvent['priority'] = 'medium'
): CalendarEvent {
    return { id, title, date, type, priority };
}

// Usage with full type safety
const employee: Employee = createEmployee(
    'E001',
    'Ahmed Ali',
    { year: 1990, month: 5, day: 15 },
    { year: 2015, month: 1, day: 1 },
    'Engineering'
);

const event: CalendarEvent = createEvent(
    'EV001',
    'Team Meeting',
    new EthiopicDate(2017, 1, 15),
    'meeting',
    'high'
);
```

### Union Types and Type Guards

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Union types for flexible date handling
type AnyDate = EthiopicDate | GregorianDate;

// Type guards for runtime type checking
function isEthiopicDate(date: AnyDate): date is EthiopicDate {
    return date instanceof EthiopicDate;
}

function isGregorianDate(date: AnyDate): date is GregorianDate {
    return date instanceof GregorianDate;
}

// Type-safe processing function
function processAnyDate(date: AnyDate): string {
    if (isEthiopicDate(date)) {
        // TypeScript knows this is EthiopicDate
        const season = date.getSeason();
        const holiday = date.getHoliday();
        return `Ethiopian: ${date.format('D MMMM YYYY')} - Season: ${season || 'Unknown'} - Holiday: ${holiday || 'None'}`;
    } else {
        // TypeScript knows this is GregorianDate
        const isLeap = date.isLeapYear();
        return `Gregorian: ${date.format('D MMMM YYYY')} - ${isLeap ? 'Leap year' : 'Regular year'}`;
    }
}

// Usage
const dates: AnyDate[] = [
    new EthiopicDate(2017, 1, 1),
    new GregorianDate(2024, 9, 11)
];

dates.forEach(date => {
    console.log(processAnyDate(date));
});
```

## Generic Programming

### Generic Date Utilities

```typescript
import { EthiopicDate, GregorianDate, FormatPattern } from '@ethiopian-date-converter/ts';

// Generic function that works with both date types
function formatAnyDate<T extends EthiopicDate | GregorianDate>(
    date: T,
    pattern: FormatPattern = 'D MMMM YYYY'
): string {
    return date.format(pattern);
}

// Generic date converter with conditional types
function convertDate<T extends EthiopicDate | GregorianDate>(
    date: T
): T extends EthiopicDate ? GregorianDate : EthiopicDate {
    if (date instanceof EthiopicDate) {
        return date.toGregorian() as any;
    } else {
        return (date as GregorianDate).toEthiopic() as any;
    }
}

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

    filter(predicate: (date: T) => boolean): T[] {
        return this.toArray().filter(predicate);
    }

    map<U>(transformer: (date: T) => U): U[] {
        return this.toArray().map(transformer);
    }
}

// Usage with type inference
const ethiopic = new EthiopicDate(2017, 1, 1);
const gregorian = new GregorianDate(2024, 9, 11);

const ethiopicFormatted = formatAnyDate(ethiopic); // T is inferred as EthiopicDate
const gregorianFormatted = formatAnyDate(gregorian); // T is inferred as GregorianDate

const converted = convertDate(ethiopic); // Type: GregorianDate

// Generic range operations
const yearStart = new EthiopicDate(2017, 1, 1);
const yearEnd = new EthiopicDate(2017, 13, 6);
const range = new DateRange(yearStart, yearEnd, 'days', 1);

const holidays = range.filter(date => date.isHoliday());
const holidayNames = holidays.map(date => date.getHoliday()).filter(Boolean);

console.log(`Holidays in 2017: ${holidayNames.join(', ')}`);
```

### Advanced Generic Patterns

```typescript
import { EthiopicDate, GregorianDate, CalendarUtils } from '@ethiopian-date-converter/ts';

// Mapped types for date transformations
type DateTransforms<T> = {
    [K in keyof T]: T[K] extends EthiopicDate ? GregorianDate : 
                    T[K] extends GregorianDate ? EthiopicDate : T[K];
};

// Generic calendar processor
abstract class CalendarProcessor<T extends EthiopicDate | GregorianDate> {
    abstract createDate(year: number, month: number, day: number): T;
    abstract formatDate(date: T): string;
    
    processCalendarMonth(year: number, month: number): {
        dates: T[];
        formatted: string[];
        holidays: T[];
    } {
        const dates: T[] = [];
        const formatted: string[] = [];
        const holidays: T[] = [];
        
        const daysInMonth = month === 13 ? 6 : 30; // Simplified for example
        
        for (let day = 1; day <= daysInMonth; day++) {
            try {
                const date = this.createDate(year, month, day);
                dates.push(date);
                formatted.push(this.formatDate(date));
                
                if (date instanceof EthiopicDate && date.isHoliday()) {
                    holidays.push(date);
                }
            } catch (e) {
                // Skip invalid dates
            }
        }
        
        return { dates, formatted, holidays };
    }
}

// Concrete implementations
class EthiopicCalendarProcessor extends CalendarProcessor<EthiopicDate> {
    createDate(year: number, month: number, day: number): EthiopicDate {
        return new EthiopicDate(year, month, day);
    }
    
    formatDate(date: EthiopicDate): string {
        return date.format('D MMMM YYYY', 'am');
    }
}

class GregorianCalendarProcessor extends CalendarProcessor<GregorianDate> {
    createDate(year: number, month: number, day: number): GregorianDate {
        return new GregorianDate(year, month, day);
    }
    
    formatDate(date: GregorianDate): string {
        return date.format('D MMMM YYYY');
    }
}

// Usage
const ethiopicProcessor = new EthiopicCalendarProcessor();
const gregorianProcessor = new GregorianCalendarProcessor();

const ethiopicMonth = ethiopicProcessor.processCalendarMonth(2017, 1);
const gregorianMonth = gregorianProcessor.processCalendarMonth(2024, 9);

console.log(`Ethiopian holidays: ${ethiopicMonth.holidays.length}`);
console.log(`Gregorian dates: ${gregorianMonth.dates.length}`);
```

## Enterprise Applications

### Human Resources System

```typescript
import { EthiopicDate, GregorianDate, CalendarUtils } from '@ethiopian-date-converter/ts';

interface EmployeeRecord {
    id: string;
    personalInfo: {
        firstName: string;
        lastName: string;
        birthDate: EthiopicDate;
        nationalId: string;
    };
    employment: {
        employeeId: string;
        hireDate: EthiopicDate;
        department: string;
        position: string;
        salary: number;
    };
    benefits: {
        pensionEligible: boolean;
        medicalCoverage: boolean;
        leaveBalance: number;
    };
}

interface PayrollPeriod {
    id: string;
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    year: number;
    month: number;
    workingDays: number;
    holidays: Array<{
        date: EthiopicDate;
        name: string;
        isPaid: boolean;
    }>;
}

interface LeaveRequest {
    id: string;
    employeeId: string;
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    type: 'annual' | 'sick' | 'maternity' | 'emergency';
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
}

class EthiopianHRSystem {
    calculateAge(employee: EmployeeRecord, asOf?: EthiopicDate): number {
        return employee.personalInfo.birthDate.getAge(asOf);
    }

    calculateServiceYears(employee: EmployeeRecord, asOf?: EthiopicDate): number {
        return employee.employment.hireDate.getAge(asOf);
    }

    isRetirementEligible(employee: EmployeeRecord): boolean {
        const age = this.calculateAge(employee);
        const serviceYears = this.calculateServiceYears(employee);
        
        // Ethiopian retirement rules: 65 years or 55+ with 20+ years service
        return age >= 65 || (age >= 55 && serviceYears >= 20);
    }

    isPensionEligible(employee: EmployeeRecord): boolean {
        const serviceYears = this.calculateServiceYears(employee);
        return serviceYears >= 10; // Minimum 10 years for pension
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
        const holidays: PayrollPeriod['holidays'] = [];
        let current = startDate.clone();
        
        while (current.isBefore(endDate) || current.isSame(endDate)) {
            if (current.isHoliday()) {
                const holiday = current.getHoliday();
                if (holiday) {
                    holidays.push({
                        date: current.clone(),
                        name: holiday,
                        isPaid: true // Most Ethiopian holidays are paid
                    });
                }
            }
            current = current.addDays(1);
        }
        
        return {
            id: `PAY-${year}-${month.toString().padStart(2, '0')}`,
            startDate,
            endDate,
            year,
            month,
            workingDays,
            holidays
        };
    }

    validateLeaveRequest(request: LeaveRequest, employee: EmployeeRecord): {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    } {
        const errors: string[] = [];
        const warnings: string[] = [];
        
        // Basic date validation
        if (request.startDate.isAfter(request.endDate)) {
            errors.push('Start date cannot be after end date');
        }
        
        // Check if dates are in the past
        const today = EthiopicDate.today();
        if (request.startDate.isBefore(today)) {
            warnings.push('Leave request starts in the past');
        }
        
        // Calculate leave duration
        const leaveDays = request.startDate.daysDifference(request.endDate) + 1;
        
        // Check leave balance
        if (leaveDays > employee.benefits.leaveBalance) {
            errors.push(`Insufficient leave balance. Requested: ${leaveDays}, Available: ${employee.benefits.leaveBalance}`);
        }
        
        // Check for holidays in leave period
        let current = request.startDate.clone();
        const holidaysInPeriod: string[] = [];
        
        while (current.isBefore(request.endDate) || current.isSame(request.endDate)) {
            if (current.isHoliday()) {
                const holiday = current.getHoliday();
                if (holiday) holidaysInPeriod.push(holiday);
            }
            current = current.addDays(1);
        }
        
        if (holidaysInPeriod.length > 0) {
            warnings.push(`Leave period includes holidays: ${holidaysInPeriod.join(', ')}`);
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    generateEmployeeReport(employee: EmployeeRecord): {
        summary: {
            fullName: string;
            age: number;
            serviceYears: number;
            nextBirthday: EthiopicDate;
            retirementDate: EthiopicDate;
        };
        benefits: {
            pensionEligible: boolean;
            retirementEligible: boolean;
            yearsToRetirement: number;
        };
        currentPeriod: PayrollPeriod;
    } {
        const age = this.calculateAge(employee);
        const serviceYears = this.calculateServiceYears(employee);
        
        // Calculate next birthday
        const today = EthiopicDate.today();
        const thisYearBirthday = new EthiopicDate(
            today.year,
            employee.personalInfo.birthDate.month,
            employee.personalInfo.birthDate.day
        );
        
        const nextBirthday = thisYearBirthday.isBefore(today) ? 
            thisYearBirthday.addYears(1) : thisYearBirthday;
        
        // Calculate retirement date (assume age 65)
        const retirementDate = employee.personalInfo.birthDate.addYears(65);
        const yearsToRetirement = Math.max(0, today.daysDifference(retirementDate) / 365);
        
        // Get current payroll period
        const currentPeriod = this.generatePayrollPeriod(today.year, today.month);
        
        return {
            summary: {
                fullName: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
                age,
                serviceYears,
                nextBirthday,
                retirementDate
            },
            benefits: {
                pensionEligible: this.isPensionEligible(employee),
                retirementEligible: this.isRetirementEligible(employee),
                yearsToRetirement: Math.round(yearsToRetirement)
            },
            currentPeriod
        };
    }
}

// Usage example
const hrSystem = new EthiopianHRSystem();

const employee: EmployeeRecord = {
    id: 'EMP001',
    personalInfo: {
        firstName: 'Ahmed',
        lastName: 'Ali',
        birthDate: new EthiopicDate(1985, 3, 15),
        nationalId: 'ET001234567'
    },
    employment: {
        employeeId: 'E001',
        hireDate: new EthiopicDate(2010, 1, 1),
        department: 'Information Technology',
        position: 'Senior Developer',
        salary: 25000
    },
    benefits: {
        pensionEligible: true,
        medicalCoverage: true,
        leaveBalance: 21
    }
};

const report = hrSystem.generateEmployeeReport(employee);

console.log(`Employee: ${report.summary.fullName}`);
console.log(`Age: ${report.summary.age}, Service: ${report.summary.serviceYears} years`);
console.log(`Pension eligible: ${report.benefits.pensionEligible}`);
console.log(`Retirement eligible: ${report.benefits.retirementEligible}`);
console.log(`Years to retirement: ${report.benefits.yearsToRetirement}`);

// Validate a leave request
const leaveRequest: LeaveRequest = {
    id: 'LR001',
    employeeId: employee.id,
    startDate: new EthiopicDate(2017, 2, 1),
    endDate: new EthiopicDate(2017, 2, 7),
    type: 'annual',
    status: 'pending',
    reason: 'Family vacation'
};

const validation = hrSystem.validateLeaveRequest(leaveRequest, employee);
console.log(`Leave request valid: ${validation.isValid}`);
if (validation.errors.length > 0) {
    console.log(`Errors: ${validation.errors.join(', ')}`);
}
if (validation.warnings.length > 0) {
    console.log(`Warnings: ${validation.warnings.join(', ')}`);
}
```

## Calendar Applications

### Multi-Calendar Event System

```typescript
import { 
    EthiopicDate, 
    GregorianDate, 
    CalendarUtils, 
    CalendarMonth,
    ETHIOPIAN_HOLIDAYS 
} from '@ethiopian-date-converter/ts';

interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    date: EthiopicDate;
    endDate?: EthiopicDate;
    type: 'personal' | 'work' | 'holiday' | 'birthday' | 'appointment';
    priority: 'low' | 'medium' | 'high';
    reminder?: {
        enabled: boolean;
        daysBefore: number;
    };
    recurrence?: {
        type: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endDate?: EthiopicDate;
    };
}

interface CalendarSettings {
    defaultView: 'month' | 'week' | 'day';
    startOfWeek: 'monday' | 'sunday';
    showHolidays: boolean;
    showSeasons: boolean;
    timeZone: string;
    language: 'en' | 'am' | 'gez';
}

class EthiopianCalendarSystem {
    private events: Map<string, CalendarEvent> = new Map();
    
    constructor(private settings: CalendarSettings) {}

    addEvent(event: CalendarEvent): void {
        this.events.set(event.id, event);
    }

    removeEvent(eventId: string): boolean {
        return this.events.delete(eventId);
    }

    getEvent(eventId: string): CalendarEvent | undefined {
        return this.events.get(eventId);
    }

    getEventsForDate(date: EthiopicDate): CalendarEvent[] {
        return Array.from(this.events.values()).filter(event => {
            if (event.endDate) {
                return (date.isSame(event.date) || date.isAfter(event.date)) &&
                       (date.isSame(event.endDate) || date.isBefore(event.endDate));
            }
            return date.isSame(event.date);
        });
    }

    getEventsForMonth(year: number, month: number): Map<string, CalendarEvent[]> {
        const monthEvents = new Map<string, CalendarEvent[]>();
        const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
        
        calendar.weeks.forEach(week => {
            week.forEach(day => {
                if (day) {
                    const dayKey = day.date.toString();
                    const events = this.getEventsForDate(day.date);
                    if (events.length > 0) {
                        monthEvents.set(dayKey, events);
                    }
                }
            });
        });
        
        return monthEvents;
    }

    generateRecurringEvents(baseEvent: CalendarEvent, endDate: EthiopicDate): CalendarEvent[] {
        if (!baseEvent.recurrence) return [baseEvent];
        
        const events: CalendarEvent[] = [baseEvent];
        let currentDate = baseEvent.date.clone();
        const maxEndDate = baseEvent.recurrence.endDate || endDate;
        
        while (currentDate.isBefore(maxEndDate)) {
            switch (baseEvent.recurrence.type) {
                case 'daily':
                    currentDate = currentDate.addDays(baseEvent.recurrence.interval);
                    break;
                case 'weekly':
                    currentDate = currentDate.addDays(7 * baseEvent.recurrence.interval);
                    break;
                case 'monthly':
                    currentDate = currentDate.addMonths(baseEvent.recurrence.interval);
                    break;
                case 'yearly':
                    currentDate = currentDate.addYears(baseEvent.recurrence.interval);
                    break;
            }
            
            if (currentDate.isBefore(maxEndDate) || currentDate.isSame(maxEndDate)) {
                const recurringEvent: CalendarEvent = {
                    ...baseEvent,
                    id: `${baseEvent.id}-${currentDate.toString()}`,
                    date: currentDate.clone(),
                    endDate: baseEvent.endDate ? 
                        baseEvent.endDate.addDays(currentDate.daysDifference(baseEvent.date)) : 
                        undefined
                };
                events.push(recurringEvent);
            }
        }
        
        return events;
    }

    getUpcomingEvents(days: number = 7): CalendarEvent[] {
        const today = EthiopicDate.today();
        const futureDate = today.addDays(days);
        
        return Array.from(this.events.values())
            .filter(event => {
                return event.date.isAfter(today) && 
                       (event.date.isBefore(futureDate) || event.date.isSame(futureDate));
            })
            .sort((a, b) => a.date.daysDifference(b.date));
    }

    getReminders(date: EthiopicDate): Array<{
        event: CalendarEvent;
        daysUntil: number;
        message: string;
    }> {
        const reminders: Array<{
            event: CalendarEvent;
            daysUntil: number;
            message: string;
        }> = [];
        
        this.events.forEach(event => {
            if (event.reminder?.enabled) {
                const daysUntil = date.daysDifference(event.date);
                if (daysUntil <= event.reminder.daysBefore && daysUntil >= 0) {
                    reminders.push({
                        event,
                        daysUntil,
                        message: this.generateReminderMessage(event, daysUntil)
                    });
                }
            }
        });
        
        return reminders.sort((a, b) => a.daysUntil - b.daysUntil);
    }

    private generateReminderMessage(event: CalendarEvent, daysUntil: number): string {
        const dayText = daysUntil === 0 ? 'today' : 
                       daysUntil === 1 ? 'tomorrow' : 
                       `in ${daysUntil} days`;
        
        return `Reminder: "${event.title}" is ${dayText} (${event.date.format('D MMMM YYYY')})`;
    }

    generateCalendarWidget(year: number, month: number): {
        calendar: CalendarMonth;
        events: Map<string, CalendarEvent[]>;
        holidays: Array<{
            date: EthiopicDate;
            name: string;
            nameAm: string;
        }>;
        summary: {
            totalDays: number;
            workingDays: number;
            holidays: number;
            events: number;
        };
    } {
        const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
        const events = this.getEventsForMonth(year, month);
        
        // Get holidays for the month
        const holidays: Array<{
            date: EthiopicDate;
            name: string;
            nameAm: string;
        }> = [];
        
        calendar.weeks.forEach(week => {
            week.forEach(day => {
                if (day?.isHoliday && day.date instanceof EthiopicDate) {
                    const holiday = day.date.getHoliday();
                    const holidayAm = day.date.getHoliday('am');
                    if (holiday && holidayAm) {
                        holidays.push({
                            date: day.date,
                            name: holiday,
                            nameAm: holidayAm
                        });
                    }
                }
            });
        });
        
        // Calculate working days
        const startDate = new EthiopicDate(year, month, 1);
        const endDate = new EthiopicDate(year, month, calendar.daysInMonth);
        const workingDays = CalendarUtils.getBusinessDaysBetween(
            startDate.toGregorian(),
            endDate.toGregorian()
        );
        
        return {
            calendar,
            events,
            holidays,
            summary: {
                totalDays: calendar.daysInMonth,
                workingDays,
                holidays: holidays.length,
                events: Array.from(events.values()).flat().length
            }
        };
    }

    exportToJSON(): string {
        const exportData = {
            settings: this.settings,
            events: Array.from(this.events.values()).map(event => ({
                ...event,
                date: event.date.toObject(),
                endDate: event.endDate?.toObject()
            }))
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    importFromJSON(json: string): void {
        const importData = JSON.parse(json);
        
        this.settings = importData.settings;
        this.events.clear();
        
        importData.events.forEach((eventData: any) => {
            const event: CalendarEvent = {
                ...eventData,
                date: new EthiopicDate(eventData.date.year, eventData.date.month, eventData.date.day),
                endDate: eventData.endDate ? 
                    new EthiopicDate(eventData.endDate.year, eventData.endDate.month, eventData.endDate.day) : 
                    undefined
            };
            this.events.set(event.id, event);
        });
    }
}

// Usage example
const calendarSettings: CalendarSettings = {
    defaultView: 'month',
    startOfWeek: 'monday',
    showHolidays: true,
    showSeasons: true,
    timeZone: 'Africa/Addis_Ababa',
    language: 'am'
};

const calendar = new EthiopianCalendarSystem(calendarSettings);

// Add some events
const events: CalendarEvent[] = [
    {
        id: 'ev1',
        title: 'Weekly Team Meeting',
        description: 'Regular team sync meeting',
        date: new EthiopicDate(2017, 1, 5),
        type: 'work',
        priority: 'medium',
        reminder: {
            enabled: true,
            daysBefore: 1
        },
        recurrence: {
            type: 'weekly',
            interval: 1,
            endDate: new EthiopicDate(2017, 13, 5)
        }
    },
    {
        id: 'ev2',
        title: 'Birthday - Ahmed Ali',
        date: new EthiopicDate(2017, 5, 15),
        type: 'birthday',
        priority: 'high',
        reminder: {
            enabled: true,
            daysBefore: 3
        },
        recurrence: {
            type: 'yearly',
            interval: 1
        }
    },
    {
        id: 'ev3',
        title: 'Project Deadline',
        description: 'Final submission for the calendar project',
        date: new EthiopicDate(2017, 2, 30),
        type: 'work',
        priority: 'high',
        reminder: {
            enabled: true,
            daysBefore: 7
        }
    }
];

events.forEach(event => calendar.addEvent(event));

// Generate calendar widget for Meskerem 2017
const widget = calendar.generateCalendarWidget(2017, 1);

console.log(`Calendar for ${widget.calendar.monthName} ${widget.calendar.year}`);
console.log(`Total days: ${widget.summary.totalDays}`);
console.log(`Working days: ${widget.summary.workingDays}`);
console.log(`Holidays: ${widget.summary.holidays}`);
console.log(`Events: ${widget.summary.events}`);

console.log('\nHolidays:');
widget.holidays.forEach(holiday => {
    console.log(`  ${holiday.date.format('D MMMM')} - ${holiday.name} (${holiday.nameAm})`);
});

console.log('\nUpcoming events:');
const upcoming = calendar.getUpcomingEvents(14);
upcoming.forEach(event => {
    console.log(`  ${event.date.format('D MMMM')} - ${event.title} (${event.type})`);
});

// Get reminders
const today = EthiopicDate.today();
const reminders = calendar.getReminders(today);
console.log('\nReminders:');
reminders.forEach(reminder => {
    console.log(`  ${reminder.message}`);
});
```

## Business Logic

### Financial Calendar System

```typescript
import { EthiopicDate, CalendarUtils } from '@ethiopian-date-converter/ts';

interface FiscalYear {
    year: number;
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    quarters: FiscalQuarter[];
    totalWorkingDays: number;
}

interface FiscalQuarter {
    quarter: 1 | 2 | 3 | 4;
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    workingDays: number;
    holidays: string[];
}

interface BusinessPeriod {
    id: string;
    name: string;
    startDate: EthiopicDate;
    endDate: EthiopicDate;
    type: 'fiscal-year' | 'quarter' | 'month' | 'custom';
    isActive: boolean;
}

interface FinancialDeadline {
    id: string;
    title: string;
    description: string;
    dueDate: EthiopicDate;
    type: 'tax' | 'audit' | 'reporting' | 'payment' | 'review';
    priority: 'critical' | 'high' | 'medium' | 'low';
    reminderDays: number[];
    isRecurring: boolean;
    associatedPeriod?: string;
}

class EthiopianFinancialCalendar {
    private fiscalYears: Map<number, FiscalYear> = new Map();
    private deadlines: Map<string, FinancialDeadline> = new Map();
    
    generateFiscalYear(year: number): FiscalYear {
        // Ethiopian fiscal year typically runs from Hamle to Sene (July to June)
        const startDate = new EthiopicDate(year - 1, 11, 1); // Hamle 1
        const endDate = new EthiopicDate(year, 10, 30);      // Sene 30
        
        const quarters: FiscalQuarter[] = [
            this.generateQuarter(1, new EthiopicDate(year - 1, 11, 1), new EthiopicDate(year - 1, 13, 6)),
            this.generateQuarter(2, new EthiopicDate(year, 1, 1), new EthiopicDate(year, 3, 30)),
            this.generateQuarter(3, new EthiopicDate(year, 4, 1), new EthiopicDate(year, 6, 30)),
            this.generateQuarter(4, new EthiopicDate(year, 7, 1), new EthiopicDate(year, 10, 30))
        ];
        
        const totalWorkingDays = CalendarUtils.getBusinessDaysBetween(
            startDate.toGregorian(),
            endDate.toGregorian()
        );
        
        const fiscalYear: FiscalYear = {
            year,
            startDate,
            endDate,
            quarters,
            totalWorkingDays
        };
        
        this.fiscalYears.set(year, fiscalYear);
        return fiscalYear;
    }
    
    private generateQuarter(
        quarter: 1 | 2 | 3 | 4, 
        startDate: EthiopicDate, 
        endDate: EthiopicDate
    ): FiscalQuarter {
        const workingDays = CalendarUtils.getBusinessDaysBetween(
            startDate.toGregorian(),
            endDate.toGregorian()
        );
        
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
            quarter,
            startDate,
            endDate,
            workingDays,
            holidays
        };
    }
    
    addFinancialDeadline(deadline: FinancialDeadline): void {
        this.deadlines.set(deadline.id, deadline);
    }
    
    getUpcomingDeadlines(days: number = 30): FinancialDeadline[] {
        const today = EthiopicDate.today();
        const futureDate = today.addDays(days);
        
        return Array.from(this.deadlines.values())
            .filter(deadline => {
                return deadline.dueDate.isAfter(today) && 
                       (deadline.dueDate.isBefore(futureDate) || deadline.dueDate.isSame(futureDate));
            })
            .sort((a, b) => today.daysDifference(a.dueDate) - today.daysDifference(b.dueDate));
    }
    
    getDeadlineReminders(date: EthiopicDate): Array<{
        deadline: FinancialDeadline;
        daysUntil: number;
        urgency: 'overdue' | 'critical' | 'warning' | 'info';
    }> {
        const reminders: Array<{
            deadline: FinancialDeadline;
            daysUntil: number;
            urgency: 'overdue' | 'critical' | 'warning' | 'info';
        }> = [];
        
        this.deadlines.forEach(deadline => {
            const daysUntil = date.daysDifference(deadline.dueDate);
            
            if (deadline.reminderDays.includes(daysUntil) || daysUntil <= 0) {
                let urgency: 'overdue' | 'critical' | 'warning' | 'info';
                
                if (daysUntil < 0) {
                    urgency = 'overdue';
                } else if (daysUntil <= 3) {
                    urgency = 'critical';
                } else if (daysUntil <= 7) {
                    urgency = 'warning';
                } else {
                    urgency = 'info';
                }
                
                reminders.push({
                    deadline,
                    daysUntil,
                    urgency
                });
            }
        });
        
        return reminders.sort((a, b) => a.daysUntil - b.daysUntil);
    }
    
    generateComplianceReport(fiscalYear: number): {
        fiscalYear: FiscalYear;
        deadlines: FinancialDeadline[];
        compliance: {
            totalDeadlines: number;
            upcomingDeadlines: number;
            overdueDeadlines: number;
            criticalDeadlines: number;
        };
        recommendations: string[];
    } {
        const fy = this.fiscalYears.get(fiscalYear);
        if (!fy) {
            throw new Error(`Fiscal year ${fiscalYear} not found`);
        }
        
        const deadlines = Array.from(this.deadlines.values())
            .filter(deadline => {
                return deadline.dueDate.isAfter(fy.startDate) && deadline.dueDate.isBefore(fy.endDate);
            });
        
        const today = EthiopicDate.today();
        const upcomingDeadlines = deadlines.filter(d => d.dueDate.isAfter(today)).length;
        const overdueDeadlines = deadlines.filter(d => d.dueDate.isBefore(today)).length;
        const criticalDeadlines = deadlines.filter(d => {
            const daysUntil = today.daysDifference(d.dueDate);
            return daysUntil >= 0 && daysUntil <= 7;
        }).length;
        
        const recommendations: string[] = [];
        
        if (overdueDeadlines > 0) {
            recommendations.push(`${overdueDeadlines} deadlines are overdue and require immediate attention`);
        }
        
        if (criticalDeadlines > 0) {
            recommendations.push(`${criticalDeadlines} deadlines are due within the next 7 days`);
        }
        
        if (upcomingDeadlines > 10) {
            recommendations.push('Consider spreading deadlines more evenly throughout the fiscal year');
        }
        
        return {
            fiscalYear: fy,
            deadlines,
            compliance: {
                totalDeadlines: deadlines.length,
                upcomingDeadlines,
                overdueDeadlines,
                criticalDeadlines
            },
            recommendations
        };
    }
}

// Usage example
const financialCalendar = new EthiopianFinancialCalendar();

// Generate fiscal year 2017
const fy2017 = financialCalendar.generateFiscalYear(2017);

console.log(`Fiscal Year ${fy2017.year}`);
console.log(`Period: ${fy2017.startDate.format('D MMMM YYYY')} to ${fy2017.endDate.format('D MMMM YYYY')}`);
console.log(`Total working days: ${fy2017.totalWorkingDays}`);

fy2017.quarters.forEach(quarter => {
    console.log(`Q${quarter.quarter}: ${quarter.workingDays} working days, ${quarter.holidays.length} holidays`);
});

// Add financial deadlines
const deadlines: FinancialDeadline[] = [
    {
        id: 'tax-q1',
        title: 'Q1 Tax Filing',
        description: 'Submit quarterly tax returns',
        dueDate: new EthiopicDate(2017, 3, 30),
        type: 'tax',
        priority: 'critical',
        reminderDays: [30, 15, 7, 3, 1],
        isRecurring: true,
        associatedPeriod: 'Q1-2017'
    },
    {
        id: 'audit-annual',
        title: 'Annual Audit Preparation',
        description: 'Prepare financial statements for annual audit',
        dueDate: new EthiopicDate(2017, 11, 15),
        type: 'audit',
        priority: 'high',
        reminderDays: [60, 30, 15, 7],
        isRecurring: true
    },
    {
        id: 'payroll-monthly',
        title: 'Monthly Payroll Processing',
        description: 'Process monthly employee payroll',
        dueDate: new EthiopicDate(2017, 2, 25),
        type: 'payment',
        priority: 'critical',
        reminderDays: [5, 3, 1],
        isRecurring: true
    }
];

deadlines.forEach(deadline => financialCalendar.addFinancialDeadline(deadline));

// Get upcoming deadlines
const upcoming = financialCalendar.getUpcomingDeadlines(60);
console.log('\nUpcoming Financial Deadlines:');
upcoming.forEach(deadline => {
    const daysUntil = EthiopicDate.today().daysDifference(deadline.dueDate);
    console.log(`  ${deadline.dueDate.format('D MMMM')} - ${deadline.title} (${daysUntil} days)`);
});

// Get reminders for today
const today = EthiopicDate.today();
const reminders = financialCalendar.getDeadlineReminders(today);
console.log('\nToday\'s Reminders:');
reminders.forEach(reminder => {
    console.log(`  [${reminder.urgency.toUpperCase()}] ${reminder.deadline.title} - ${reminder.daysUntil} days until due`);
});

// Generate compliance report
const complianceReport = financialCalendar.generateComplianceReport(2017);
console.log('\nCompliance Report:');
console.log(`Total deadlines: ${complianceReport.compliance.totalDeadlines}`);
console.log(`Upcoming: ${complianceReport.compliance.upcomingDeadlines}`);
console.log(`Overdue: ${complianceReport.compliance.overdueDeadlines}`);
console.log(`Critical (due within 7 days): ${complianceReport.compliance.criticalDeadlines}`);

if (complianceReport.recommendations.length > 0) {
    console.log('\nRecommendations:');
    complianceReport.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
    });
}
```

## Error Handling

### Type-Safe Error Handling

```typescript
import { EthiopicDate, GregorianDate } from '@ethiopian-date-converter/ts';

// Result type for error handling
type Result<T, E = Error> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};

// Custom error types
class DateValidationError extends Error {
    constructor(
        message: string,
        public readonly year: number,
        public readonly month: number,
        public readonly day: number
    ) {
        super(message);
        this.name = 'DateValidationError';
    }
}

class DateParsingError extends Error {
    constructor(
        message: string,
        public readonly input: string
    ) {
        super(message);
        this.name = 'DateParsingError';
    }
}

class DateRangeError extends Error {
    constructor(
        message: string,
        public readonly startDate: EthiopicDate | GregorianDate,
        public readonly endDate: EthiopicDate | GregorianDate
    ) {
        super(message);
        this.name = 'DateRangeError';
    }
}

// Type-safe date creation functions
function createSafeEthiopicDate(
    year: number, 
    month: number, 
    day: number
): Result<EthiopicDate, DateValidationError> {
    try {
        const date = new EthiopicDate(year, month, day);
        return { success: true, data: date };
    } catch (error) {
        return { 
            success: false, 
            error: new DateValidationError(
                `Invalid Ethiopian date: ${year}-${month}-${day}`,
                year,
                month,
                day
            )
        };
    }
}

function createSafeGregorianDate(
    year: number, 
    month: number, 
    day: number
): Result<GregorianDate, DateValidationError> {
    try {
        const date = new GregorianDate(year, month, day);
        return { success: true, data: date };
    } catch (error) {
        return { 
            success: false, 
            error: new DateValidationError(
                `Invalid Gregorian date: ${year}-${month}-${day}`,
                year,
                month,
                day
            )
        };
    }
}

function parseSafeEthiopicDate(
    dateString: string
): Result<EthiopicDate, DateParsingError> {
    try {
        const date = EthiopicDate.parse(dateString);
        return { success: true, data: date };
    } catch (error) {
        return {
            success: false,
            error: new DateParsingError(
                `Unable to parse Ethiopian date: ${dateString}`,
                dateString
            )
        };
    }
}

// Type-safe date range validation
function validateDateRange(
    startDate: EthiopicDate | GregorianDate,
    endDate: EthiopicDate | GregorianDate
): Result<{ start: typeof startDate; end: typeof endDate }, DateRangeError> {
    if (startDate.isAfter(endDate)) {
        return {
            success: false,
            error: new DateRangeError(
                'Start date cannot be after end date',
                startDate,
                endDate
            )
        };
    }
    
    return {
        success: true,
        data: { start: startDate, end: endDate }
    };
}

// Batch operations with error handling
function createMultipleDates(
    dates: Array<{ year: number; month: number; day: number }>
): {
    successful: EthiopicDate[];
    failed: Array<{ input: typeof dates[0]; error: DateValidationError }>;
} {
    const successful: EthiopicDate[] = [];
    const failed: Array<{ input: typeof dates[0]; error: DateValidationError }> = [];
    
    dates.forEach(dateInput => {
        const result = createSafeEthiopicDate(dateInput.year, dateInput.month, dateInput.day);
        
        if (result.success) {
            successful.push(result.data);
        } else {
            failed.push({ input: dateInput, error: result.error });
        }
    });
    
    return { successful, failed };
}

// Usage examples
const dateInputs = [
    { year: 2017, month: 1, day: 1 },   // Valid
    { year: 2017, month: 14, day: 1 },  // Invalid month
    { year: 2017, month: 1, day: 35 },  // Invalid day
    { year: 2017, month: 4, day: 29 },  // Valid
];

const batchResult = createMultipleDates(dateInputs);

console.log(`Successfully created ${batchResult.successful.length} dates`);
console.log(`Failed to create ${batchResult.failed.length} dates`);

batchResult.failed.forEach(failure => {
    console.log(`Error for ${failure.input.year}-${failure.input.month}-${failure.input.day}: ${failure.error.message}`);
});

// Safe date parsing with type guards
const dateStrings = ['2017-01-01', '2017-13-45', 'invalid-date', '2017/1/1'];

dateStrings.forEach(dateString => {
    const result = parseSafeEthiopicDate(dateString);
    
    if (result.success) {
        // TypeScript knows result.data is EthiopicDate
        console.log(`Parsed: ${result.data.format('D MMMM YYYY')}`);
    } else {
        // TypeScript knows result.error is DateParsingError
        console.log(`Parse error: ${result.error.message}`);
        console.log(`  Input: "${result.error.input}"`);
    }
});

// Safe date range validation
const startDate = new EthiopicDate(2017, 1, 1);
const endDate = new EthiopicDate(2016, 12, 30); // Before start date

const rangeValidation = validateDateRange(startDate, endDate);

if (rangeValidation.success) {
    console.log('Date range is valid');
    // TypeScript knows rangeValidation.data contains start and end dates
} else {
    console.log(`Date range error: ${rangeValidation.error.message}`);
    console.log(`Start: ${rangeValidation.error.startDate.toString()}`);
    console.log(`End: ${rangeValidation.error.endDate.toString()}`);
}

// Comprehensive error handling in a service class
class DateService {
    createDateSafely(
        year: number, 
        month: number, 
        day: number
    ): Result<EthiopicDate> {
        try {
            // Pre-validation
            if (year < 1 || year > 9999) {
                throw new Error('Year must be between 1 and 9999');
            }
            
            if (month < 1 || month > 13) {
                throw new Error('Month must be between 1 and 13');
            }
            
            if (day < 1) {
                throw new Error('Day must be positive');
            }
            
            // Ethiopian calendar specific validation
            if (month <= 12 && day > 30) {
                throw new Error('Regular Ethiopian months have maximum 30 days');
            }
            
            if (month === 13 && day > 6) {
                throw new Error('Pagume has maximum 6 days');
            }
            
            const date = new EthiopicDate(year, month, day);
            return { success: true, data: date };
            
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('Unknown error')
            };
        }
    }
    
    formatDateSafely(
        date: EthiopicDate | GregorianDate, 
        pattern: string = 'D MMMM YYYY'
    ): Result<string> {
        try {
            const formatted = date.format(pattern);
            return { success: true, data: formatted };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('Formatting failed')
            };
        }
    }
    
    calculateAgeSafely(
        birthDate: EthiopicDate, 
        asOfDate?: EthiopicDate
    ): Result<number> {
        try {
            const referenceDate = asOfDate || EthiopicDate.today();
            
            if (birthDate.isAfter(referenceDate)) {
                throw new Error('Birth date cannot be in the future');
            }
            
            const age = birthDate.getAge(referenceDate);
            return { success: true, data: age };
            
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('Age calculation failed')
            };
        }
    }
}

// Usage of the service
const dateService = new DateService();

const dateResult = dateService.createDateSafely(2017, 1, 1);
if (dateResult.success) {
    const formatResult = dateService.formatDateSafely(dateResult.data, 'dddd, D MMMM YYYY');
    
    if (formatResult.success) {
        console.log(`Formatted date: ${formatResult.data}`);
        
        const ageResult = dateService.calculateAgeSafely(dateResult.data);
        if (ageResult.success) {
            console.log(`Age: ${ageResult.data} years`);
        } else {
            console.error(`Age calculation error: ${ageResult.error.message}`);
        }
    } else {
        console.error(`Formatting error: ${formatResult.error.message}`);
    }
} else {
    console.error(`Date creation error: ${dateResult.error.message}`);
}
```

This comprehensive TypeScript examples document demonstrates the full power of the Ethiopian Date Converter TypeScript library, showcasing type safety, modern language features, and real-world application patterns.

