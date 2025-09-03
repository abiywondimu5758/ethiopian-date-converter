/* Copyright (c) 2025 Abiy */

const { 
    EthiopicDate, 
    GregorianDate, 
    CalendarUtils, 
    DateConverter, 
    MONTH_NAMES, 
    DAY_NAMES,
    ETHIOPIAN_HOLIDAYS,
    ETHIOPIAN_SEASONS
} = require('../index');

function runEnhancedTests() {
    console.log('=== Enhanced Ethiopian Date Converter Tests ===\n');
    
    let totalTests = 0;
    let passedTests = 0;
    
    function test(name, fn) {
        totalTests++;
        try {
            const result = fn();
            if (result) {
                console.log(`PASS ${name}`);
                passedTests++;
            } else {
                console.log(`FAIL ${name}`);
            }
        } catch (error) {
            console.log(`FAIL ${name} - Error: ${error.message}`);
        }
    }
    
    // Test Date Classes
    console.log('--- Date Class Tests ---');
    
    test('EthiopicDate creation and validation', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.year === 2017 && date.month === 1 && date.day === 1 && date.isValid();
    });
    
    test('GregorianDate creation and validation', () => {
        const date = new GregorianDate(2024, 9, 11);
        return date.year === 2024 && date.month === 9 && date.day === 11 && date.isValid();
    });
    
    test('Ethiopian to Gregorian conversion with classes', () => {
        const ethiopic = new EthiopicDate(2017, 1, 1);
        const gregorian = ethiopic.toGregorian();
        return gregorian.year === 2024 && gregorian.month === 9 && gregorian.day === 11;
    });
    
    test('Gregorian to Ethiopian conversion with classes', () => {
        const gregorian = new GregorianDate(2024, 9, 11);
        const ethiopic = gregorian.toEthiopic();
        return ethiopic.year === 2017 && ethiopic.month === 1 && ethiopic.day === 1;
    });
    
    // Test Date Arithmetic
    console.log('\n--- Date Arithmetic Tests ---');
    
    test('Add days to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 1, 1);
        const newDate = date.addDays(30);
        return newDate.month === 2 && newDate.day === 1;
    });
    
    test('Subtract days from Ethiopian date', () => {
        const date = new EthiopicDate(2017, 2, 1);
        const newDate = date.subtractDays(30);
        return newDate.month === 1 && newDate.day === 1;
    });
    
    test('Add months to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 1, 15);
        const newDate = date.addMonths(2);
        return newDate.month === 3 && newDate.day === 15;
    });
    
    test('Add years to Ethiopian date', () => {
        const date = new EthiopicDate(2017, 5, 10);
        const newDate = date.addYears(3);
        return newDate.year === 2020 && newDate.month === 5 && newDate.day === 10;
    });
    
    test('Calculate days difference', () => {
        const date1 = new EthiopicDate(2017, 1, 1);
        const date2 = new EthiopicDate(2017, 1, 30);
        return date1.daysDifference(date2) === 29;
    });
    
    // Test Date Comparison
    console.log('\n--- Date Comparison Tests ---');
    
    test('Date comparison - isBefore', () => {
        const date1 = new EthiopicDate(2017, 1, 1);
        const date2 = new EthiopicDate(2017, 1, 2);
        return date1.isBefore(date2);
    });
    
    test('Date comparison - isAfter', () => {
        const date1 = new EthiopicDate(2017, 1, 2);
        const date2 = new EthiopicDate(2017, 1, 1);
        return date1.isAfter(date2);
    });
    
    test('Date comparison - isSame', () => {
        const date1 = new EthiopicDate(2017, 1, 1);
        const date2 = new EthiopicDate(2017, 1, 1);
        return date1.isSame(date2);
    });
    
    test('Cross-calendar date comparison', () => {
        const ethiopic = new EthiopicDate(2017, 1, 1);
        const gregorian = new GregorianDate(2024, 9, 11);
        return ethiopic.isSame(gregorian);
    });
    
    // Test Formatting
    console.log('\n--- Formatting Tests ---');
    
    test('Ethiopian date formatting - basic', () => {
        const date = new EthiopicDate(2017, 1, 5);
        return date.format('YYYY-MM-DD') === '2017-01-05';
    });
    
    test('Ethiopian date formatting - with month name', () => {
        const date = new EthiopicDate(2017, 1, 5);
        const formatted = date.format('D MMMM YYYY');
        return formatted === '5 Meskerem 2017';
    });
    
    test('Ethiopian date formatting - Amharic', () => {
        const date = new EthiopicDate(2017, 1, 5);
        const formatted = date.format('DD MMMM YYYY', 'am');
        return formatted.includes('መስከረም');
    });
    
    test('Gregorian date formatting', () => {
        const date = new GregorianDate(2024, 9, 11);
        return date.format('DD MMMM YYYY') === '11 September 2024';
    });
    
    // Test String Parsing
    console.log('\n--- String Parsing Tests ---');
    
    test('Parse Ethiopian date - YYYY-MM-DD', () => {
        const date = EthiopicDate.parse('2017-01-05');
        return date.year === 2017 && date.month === 1 && date.day === 5;
    });
    
    test('Parse Ethiopian date - YYYY/MM/DD', () => {
        const date = EthiopicDate.parse('2017/1/5');
        return date.year === 2017 && date.month === 1 && date.day === 5;
    });
    
    test('Parse Gregorian date - YYYY-MM-DD', () => {
        const date = GregorianDate.parse('2024-09-11');
        return date.year === 2024 && date.month === 9 && date.day === 11;
    });
    
    // Test Month Names and Localization
    console.log('\n--- Localization Tests ---');
    
    test('Ethiopian month names - English', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.getMonthName('en') === 'Meskerem';
    });
    
    test('Ethiopian month names - Amharic', () => {
        const date = new EthiopicDate(2017, 1, 1);
        return date.getMonthName('am') === 'መስከረም';
    });
    
    test('Day of week calculation', () => {
        const date = new EthiopicDate(2017, 1, 1); // Ethiopian New Year 2017
        const dayOfWeek = date.getDayOfWeek();
        return typeof dayOfWeek === 'number' && dayOfWeek >= 0 && dayOfWeek <= 6;
    });
    
    test('Day name in English', () => {
        const date = new EthiopicDate(2017, 1, 1);
        const dayName = date.getDayName('en');
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(dayName);
    });
    
    // Test Holiday Detection
    console.log('\n--- Holiday Tests ---');
    
    test('Ethiopian New Year holiday detection', () => {
        const newYear = new EthiopicDate(2017, 1, 1);
        return newYear.isHoliday() && newYear.getHoliday() === 'Ethiopian New Year';
    });
    
    test('Ethiopian Christmas holiday detection', () => {
        const christmas = new EthiopicDate(2017, 4, 29);
        return christmas.isHoliday() && christmas.getHoliday() === 'Ethiopian Christmas';
    });
    
    test('Non-holiday date', () => {
        const regular = new EthiopicDate(2017, 2, 15);
        return !regular.isHoliday() && regular.getHoliday() === null;
    });
    
    // Test Seasons
    console.log('\n--- Season Tests ---');
    
    test('Season detection - Belg', () => {
        const date = new EthiopicDate(2017, 7, 15);
        return date.getSeason() === 'Belg';
    });
    
    test('Season detection - Kiremt', () => {
        const date = new EthiopicDate(2017, 3, 15);
        return date.getSeason() === 'Kiremt';
    });
    
    // Test Age Calculation
    console.log('\n--- Age Calculation Tests ---');
    
    test('Age calculation - exact birthday', () => {
        const birthDate = new EthiopicDate(2000, 1, 1);
        const asOfDate = new EthiopicDate(2020, 1, 1);
        return birthDate.getAge(asOfDate) === 20;
    });
    
    test('Age calculation - before birthday', () => {
        const birthDate = new EthiopicDate(2000, 6, 15);
        const asOfDate = new EthiopicDate(2020, 3, 10);
        return birthDate.getAge(asOfDate) === 19;
    });
    
    // Test Calendar Utils
    console.log('\n--- Calendar Utilities Tests ---');
    
    test('Generate Ethiopian calendar month', () => {
        const calendar = CalendarUtils.generateEthiopicCalendar(2017, 1);
        return calendar.year === 2017 && calendar.month === 1 && calendar.monthName === 'Meskerem';
    });
    
    test('Generate Gregorian calendar month', () => {
        const calendar = CalendarUtils.generateGregorianCalendar(2024, 9);
        return calendar.year === 2024 && calendar.month === 9 && calendar.monthName === 'September';
    });
    
    test('Business days calculation', () => {
        const start = new GregorianDate(2024, 9, 9); // Monday
        const end = new GregorianDate(2024, 9, 13);   // Friday
        const businessDays = CalendarUtils.getBusinessDaysBetween(start, end);
        return businessDays === 5; // Monday to Friday inclusive
    });
    
    // Test Current Date Methods
    console.log('\n--- Current Date Tests ---');
    
    test('Get current dates', () => {
        const today = DateConverter.today();
        return today.ethiopic instanceof EthiopicDate && today.gregorian instanceof GregorianDate;
    });
    
    test('Ethiopian today static method', () => {
        const today = EthiopicDate.today();
        return today instanceof EthiopicDate;
    });
    
    test('Gregorian today static method', () => {
        const today = GregorianDate.today();
        return today instanceof GregorianDate;
    });
    
    // Test Relative Date Strings
    console.log('\n--- Relative Date Tests ---');
    
    test('Relative date - tomorrow', () => {
        const today = EthiopicDate.today();
        const tomorrow = today.addDays(1);
        return tomorrow.getRelativeDateString() === 'tomorrow';
    });
    
    test('Relative date - yesterday', () => {
        const today = EthiopicDate.today();
        const yesterday = today.subtractDays(1);
        return yesterday.getRelativeDateString() === 'yesterday';
    });
    
    // Test JDN Functions
    console.log('\n--- JDN Utility Tests ---');
    
    test('Ethiopian to JDN conversion', () => {
        const jdn = DateConverter.ethiopicToJDN(2017, 1, 1);
        return typeof jdn === 'number' && jdn > 0;
    });
    
    test('JDN to Ethiopian conversion', () => {
        const jdn = DateConverter.ethiopicToJDN(2017, 1, 1);
        const date = DateConverter.jdnToEthiopic(jdn);
        return date.year === 2017 && date.month === 1 && date.day === 1;
    });
    
    test('Day of week from JDN', () => {
        const jdn = DateConverter.gregorianToJDN(2024, 9, 11);
        const dayOfWeek = DateConverter.getDayOfWeek(jdn);
        return typeof dayOfWeek === 'number' && dayOfWeek >= 0 && dayOfWeek <= 6;
    });
    
    // Test Constants
    console.log('\n--- Constants Tests ---');
    
    test('Month names constant availability', () => {
        return MONTH_NAMES.ethiopic.en[0] === 'Meskerem' && 
               MONTH_NAMES.gregorian.en[0] === 'January';
    });
    
    test('Day names constant availability', () => {
        return DAY_NAMES.en[0] === 'Monday' && DAY_NAMES.am[0] === 'ሰኞ';
    });
    
    test('Ethiopian holidays constant', () => {
        return ETHIOPIAN_HOLIDAYS.fixed.length > 0 && 
               ETHIOPIAN_HOLIDAYS.fixed[0].name === 'Ethiopian New Year';
    });
    
    test('Ethiopian seasons constant', () => {
        return ETHIOPIAN_SEASONS.length === 3 && 
               ETHIOPIAN_SEASONS[0].name === 'Belg';
    });
    
    // Test Error Handling
    console.log('\n--- Error Handling Tests ---');
    
    test('Invalid Ethiopian date throws error', () => {
        try {
            new EthiopicDate(2017, 14, 1); // Invalid month
            return false;
        } catch (error) {
            return error.message.includes('Invalid Ethiopian date');
        }
    });
    
    test('Invalid Gregorian date throws error', () => {
        try {
            new GregorianDate(2024, 13, 1); // Invalid month
            return false;
        } catch (error) {
            return error.message.includes('Invalid Gregorian date');
        }
    });
    
    test('Invalid date string parsing throws error', () => {
        try {
            EthiopicDate.parse('invalid-date');
            return false;
        } catch (error) {
            return error.message.includes('Unable to parse');
        }
    });
    
    // Summary
    console.log(`\n=== Enhanced Test Results ===`);
    console.log(`Passed: ${passedTests}/${totalTests} tests`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
        console.log('All enhanced tests passed!');
    } else {
        console.log(`${totalTests - passedTests} tests failed`);
    }
    
    return passedTests === totalTests;
}

// Demo usage examples
function showUsageExamples() {
    console.log('\n\n=== Usage Examples ===\n');
    
    console.log('--- Basic Date Creation and Conversion ---');
    const ethiopic = new EthiopicDate(2017, 1, 1);
    const gregorian = ethiopic.toGregorian();
    console.log(`Ethiopian: ${ethiopic.toString()}`);
    console.log(`Gregorian: ${gregorian.toString()}`);
    console.log(`Day of week: ${ethiopic.getDayName()}`);
    
    console.log('\n--- Date Arithmetic ---');
    const futureDate = ethiopic.addDays(100);
    console.log(`100 days later: ${futureDate.format('DD MMMM YYYY')}`);
    console.log(`Next year: ${ethiopic.addYears(1).toString()}`);
    
    console.log('\n--- Formatting ---');
    console.log(`English: ${ethiopic.format('dddd, DD MMMM YYYY')}`);
    console.log(`Amharic: ${ethiopic.format('dddd, DD MMMM YYYY', 'am')}`);
    
    console.log('\n--- Holiday and Season Detection ---');
    console.log(`Is holiday: ${ethiopic.isHoliday()}`);
    console.log(`Holiday: ${ethiopic.getHoliday()}`);
    console.log(`Season: ${ethiopic.getSeason()}`);
    
    console.log('\n--- Current Dates ---');
    const today = DateConverter.today();
    console.log(`Today (Ethiopian): ${today.ethiopic.toString()}`);
    console.log(`Today (Gregorian): ${today.gregorian.toString()}`);
    
    console.log('\n--- Age Calculation ---');
    const birthDate = new EthiopicDate(2000, 5, 15);
    console.log(`Birth date: ${birthDate.format('DD MMMM YYYY')}`);
    console.log(`Age: ${birthDate.getAge()} years old`);
    
    console.log('\n--- Calendar Generation ---');
    const calendar = CalendarUtils.generateEthiopicCalendar(2017, 1);
    console.log(`Calendar for ${calendar.monthName} ${calendar.year}:`);
    console.log(`Days in month: ${calendar.daysInMonth}`);
    console.log(`Number of weeks: ${calendar.weeks.length}`);
}

if (require.main === module) {
    const success = runEnhancedTests();
    if (success) {
        showUsageExamples();
    }
}

module.exports = { runEnhancedTests, showUsageExamples };
