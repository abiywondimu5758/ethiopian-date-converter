/**
 * TypeScript tests for Ethiopian Date Converter
 */

import { 
    EthiopicDate, 
    GregorianDate, 
    CalendarUtils, 
    DateConverter,
    MONTH_NAMES,
    DAY_NAMES,
    ETHIOPIAN_HOLIDAYS
} from '../index';

interface TestResult {
    name: string;
    passed: boolean;
    error?: string;
}

class TestRunner {
    private results: TestResult[] = [];

    test(name: string, fn: () => boolean | void): void {
        try {
            const result = fn();
            this.results.push({
                name,
                passed: result !== false
            });
            console.log(`PASS ${name}`);
        } catch (error) {
            this.results.push({
                name,
                passed: false,
                error: error instanceof Error ? error.message : String(error)
            });
            console.log(`FAIL ${name} - Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    summary(): void {
        const passed = this.results.filter(r => r.passed).length;
        const total = this.results.length;
        const percentage = ((passed / total) * 100).toFixed(1);

        console.log('\n=== TypeScript Test Results ===');
        console.log(`Passed: ${passed}/${total} tests`);
        console.log(`Success Rate: ${percentage}%`);

        if (passed === total) {
            console.log('All TypeScript tests passed!');
        } else {
            console.log(`${total - passed} tests failed`);
        }
    }
}

function runTests(): void {
    console.log('=== Ethiopian Date Converter TypeScript Tests ===\n');
    
    const runner = new TestRunner();

    // Test Date Classes
    console.log('--- Date Class Tests ---');
    
    runner.test('EthiopicDate creation and validation', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.year === 2017 && date.month === 1 && date.day === 1 && date.isValid();
    });

    runner.test('GregorianDate creation and validation', () => {
        const date = new GregorianDate(2024, 9, 11);
        return date.year === 2024 && date.month === 9 && date.day === 11 && date.isValid();
    });

    runner.test('Ethiopian to Gregorian conversion', () => {
        const ethiopic = new EthiopicDate(2017, 1, 1);
        const gregorian = ethiopic.toGregorian();
        return gregorian.year === 2024 && gregorian.month === 9 && gregorian.day === 11;
    });

    runner.test('Gregorian to Ethiopian conversion', () => {
        const gregorian = new GregorianDate(2024, 9, 11);
        const ethiopic = gregorian.toEthiopic();
        return ethiopic.year === 2017 && ethiopic.month === 1 && ethiopic.day === 1;
    });

    // Test Date Arithmetic
    console.log('\n--- Date Arithmetic Tests ---');

    runner.test('Add days to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 1, 1);
        const newDate = date.addDays(30);
        return newDate.month === 2 && newDate.day === 1;
    });

    runner.test('Add months to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 1, 15);
        const newDate = date.addMonths(2);
        return newDate.month === 3 && newDate.day === 15;
    });

    runner.test('Add years to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 5, 10);
        const newDate = date.addYears(3);
        return newDate.year === 2020 && newDate.month === 5 && newDate.day === 10;
    });

    // Test Date Comparison
    console.log('\n--- Date Comparison Tests ---');

    runner.test('Date comparison - isBefore', () => {
        const date1 = new EthiopicDate(2017, 1, 1);
        const date2 = new EthiopicDate(2017, 1, 2);
        return date1.isBefore(date2);
    });

    runner.test('Date comparison - isAfter', () => {
        const date1 = new EthiopicDate(2017, 1, 2);
        const date2 = new EthiopicDate(2017, 1, 1);
        return date1.isAfter(date2);
    });

    runner.test('Cross-calendar date comparison', () => {
        const ethiopic = new EthiopicDate(2017, 1, 1);
        const gregorian = new GregorianDate(2024, 9, 11);
        return ethiopic.isSame(gregorian);
    });

    // Test Formatting
    console.log('\n--- Formatting Tests ---');

    runner.test('Ethiopian date formatting - basic', () => {
        const date = new EthiopicDate(2017, 1, 5);
        return date.format('YYYY-MM-DD') === '2017-01-05';
    });

    runner.test('Ethiopian date formatting - with month name', () => {
        const date = new EthiopicDate(2017, 1, 5);
        const formatted = date.format('D MMMM YYYY');
        return formatted === '5 Meskerem 2017';
    });

    runner.test('Gregorian date formatting', () => {
        const date = new GregorianDate(2024, 9, 11);
        return date.format('D MMMM YYYY') === '11 September 2024';
    });

    // Test String Parsing
    console.log('\n--- String Parsing Tests ---');

    runner.test('Parse Ethiopian date - YYYY-MM-DD', () => {
        const date = EthiopicDate.parse('2017-01-05');
        return date.year === 2017 && date.month === 1 && date.day === 5;
    });

    runner.test('Parse Gregorian date - YYYY-MM-DD', () => {
        const date = GregorianDate.parse('2024-09-11');
        return date.year === 2024 && date.month === 9 && date.day === 11;
    });

    // Test Localization
    console.log('\n--- Localization Tests ---');

    runner.test('Ethiopian month names - English', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.getMonthName('en') === 'Meskerem';
    });

    runner.test('Ethiopian month names - Amharic', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.getMonthName('am') === 'መስከረም';
    });

    runner.test('Day of week calculation', () => {
        const date = new EthiopicDate(2017, 1, 1);
        const dayOfWeek = date.getDayOfWeek();
        return typeof dayOfWeek === 'number' && dayOfWeek >= 0 && dayOfWeek <= 6;
    });

    // Test Holiday Detection
    console.log('\n--- Holiday Tests ---');

    runner.test('Ethiopian New Year holiday detection', () => {
        const newYear = new EthiopicDate(2017, 1, 1);
        return newYear.isHoliday() && newYear.getHoliday() === 'Ethiopian New Year';
    });

    runner.test('Ethiopian Christmas holiday detection', () => {
        const christmas = new EthiopicDate(2017, 4, 29);
        return christmas.isHoliday() && christmas.getHoliday() === 'Ethiopian Christmas';
    });

    // Test Calendar Utils
    console.log('\n--- Calendar Utilities Tests ---');

    runner.test('Generate Ethiopian calendar month', () => {
        const calendar = CalendarUtils.generateEthiopicCalendar(2017, 1);
        return calendar.year === 2017 && calendar.month === 1 && calendar.monthName === 'Meskerem';
    });

    runner.test('Business days calculation', () => {
        const start = new GregorianDate(2024, 9, 9); // Monday
        const end = new GregorianDate(2024, 9, 13);   // Friday
        const businessDays = CalendarUtils.getBusinessDaysBetween(start, end);
        return businessDays === 5;
    });

    // Test Current Dates
    console.log('\n--- Current Date Tests ---');

    runner.test('Get current dates', () => {
        const today = DateConverter.today();
        return today.ethiopic instanceof EthiopicDate && today.gregorian instanceof GregorianDate;
    });

    // Test Type Safety
    console.log('\n--- TypeScript Type Safety Tests ---');

    runner.test('Type-safe date creation', () => {
        const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
        const gregorian: GregorianDate = date.toGregorian();
        const formatted: string = date.format('D MMMM YYYY');
        return typeof formatted === 'string' && formatted.length > 0;
    });

    runner.test('Constants type safety', () => {
        const monthName: string = MONTH_NAMES.ethiopic.en[0];
        const dayName: string = DAY_NAMES.en[0];
        const holidayCount: number = ETHIOPIAN_HOLIDAYS.fixed.length;
        return monthName === 'Meskerem' && dayName === 'Monday' && holidayCount > 0;
    });

    // Test Error Handling
    console.log('\n--- Error Handling Tests ---');

    runner.test('Invalid Ethiopian date throws error', () => {
        try {
            new EthiopicDate(2017, 14, 1); // Invalid month
            return false;
        } catch (error) {
            return error instanceof Error && error.message.includes('Invalid Ethiopian date');
        }
    });

    runner.test('Invalid date string parsing throws error', () => {
        try {
            EthiopicDate.parse('invalid-date');
            return false;
        } catch (error) {
            return error instanceof Error && error.message.includes('Unable to parse');
        }
    });

    runner.summary();
}

// Demo TypeScript-specific features
function showTypeScriptFeatures(): void {
    console.log('\n\n=== TypeScript-Specific Features Demo ===\n');

    console.log('--- Type-Safe Date Operations ---');
    const date: EthiopicDate = new EthiopicDate(2017, 1, 1);
    const gregorian: GregorianDate = date.toGregorian();
    
    // Compile-time type checking
    const formattedDate: string = date.format('dddd, D MMMM YYYY');
    const dayOfWeek: number = date.getDayOfWeek();
    const isHoliday: boolean = date.isHoliday();
    
    console.log(`Formatted: ${formattedDate}`);
    console.log(`Day of week: ${dayOfWeek}`);
    console.log(`Is holiday: ${isHoliday}`);

    console.log('\n--- Generic Calendar Operations ---');
    interface CalendarEvent {
        date: EthiopicDate;
        title: string;
        type: 'holiday' | 'meeting' | 'reminder';
    }

    const events: CalendarEvent[] = [
        {
            date: new EthiopicDate(2017, 1, 1),
            title: 'Ethiopian New Year',
            type: 'holiday'
        },
        {
            date: new EthiopicDate(2017, 1, 15),
            title: 'Team Meeting',
            type: 'meeting'
        }
    ];

    events.forEach(event => {
        console.log(`${event.date.format('D MMMM')}: ${event.title} (${event.type})`);
    });

    console.log('\n--- Type-Safe Constants ---');
    const monthNames: string[] = MONTH_NAMES.ethiopic.en;
    const dayNames: string[] = DAY_NAMES.am;
    
    console.log(`Ethiopian months: ${monthNames.slice(0, 3).join(', ')}...`);
    console.log(`Amharic days: ${dayNames.slice(0, 3).join(', ')}...`);
}

// Run tests if this file is executed directly
if (require.main === module) {
    try {
        runTests();
        showTypeScriptFeatures();
    } catch (error) {
        console.error('Test execution failed:', error);
        process.exit(1);
    }
}

export { runTests, showTypeScriptFeatures };

