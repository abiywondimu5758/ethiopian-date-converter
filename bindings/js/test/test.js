/* Copyright (c) 2025 Abiy */

const { DateConverter, ethiopicToGregorian, gregorianToEthiopic } = require('../index');

function runTests() {
    console.log('Testing Ethiopian Date Converter...\n');
    
    const tests = [
        {
            name: 'Ethiopian New Year 2017',
            ethiopic: { year: 2017, month: 1, day: 1 },
            gregorian: { year: 2024, month: 9, day: 11 }
        },
        {
            name: 'Ethiopian Christmas 2017',
            ethiopic: { year: 2017, month: 4, day: 29 },
            gregorian: { year: 2025, month: 1, day: 7 }
        },
        {
            name: 'Ethiopian Timkat 2017',
            ethiopic: { year: 2017, month: 5, day: 11 },
            gregorian: { year: 2025, month: 1, day: 19 }
        },
        {
            name: 'End of Pagume 2015 (leap year)',
            ethiopic: { year: 2015, month: 13, day: 6 },
            gregorian: { year: 2023, month: 9, day: 11 }
        },
        {
            name: 'Mid-year date',
            ethiopic: { year: 2017, month: 7, day: 15 },
            gregorian: { year: 2025, month: 3, day: 24 }
        }
    ];
    
    let passed = 0;
    let total = tests.length * 2;
    
    console.log('=== Forward Tests (Ethiopian → Gregorian) ===');
    for (const test of tests) {
        try {
            const result = ethiopicToGregorian(
                test.ethiopic.year, 
                test.ethiopic.month, 
                test.ethiopic.day
            );
            
            const match = result.year === test.gregorian.year &&
                         result.month === test.gregorian.month &&
                         result.day === test.gregorian.day;
            
            console.log(`${match ? 'PASS' : 'FAIL'} ${test.name}`);
            console.log(`   Ethiopian: ${test.ethiopic.year}-${test.ethiopic.month}-${test.ethiopic.day}`);
            console.log(`   Expected:  ${test.gregorian.year}-${test.gregorian.month}-${test.gregorian.day}`);
            console.log(`   Got:       ${result.year}-${result.month}-${result.day}`);
            
            if (match) passed++;
            console.log();
        } catch (error) {
            console.log(`FAIL ${test.name} - Error: ${error.message}\n`);
        }
    }
    
    console.log('=== Reverse Tests (Gregorian → Ethiopian) ===');
    for (const test of tests) {
        try {
            const result = gregorianToEthiopic(
                test.gregorian.year,
                test.gregorian.month,
                test.gregorian.day
            );
            
            const match = result.year === test.ethiopic.year &&
                         result.month === test.ethiopic.month &&
                         result.day === test.ethiopic.day;
            
            console.log(`${match ? 'PASS' : 'FAIL'} ${test.name} (reverse)`);
            console.log(`   Gregorian: ${test.gregorian.year}-${test.gregorian.month}-${test.gregorian.day}`);
            console.log(`   Expected:  ${test.ethiopic.year}-${test.ethiopic.month}-${test.ethiopic.day}`);
            console.log(`   Got:       ${result.year}-${result.month}-${result.day}`);
            
            if (match) passed++;
            console.log();
        } catch (error) {
            console.log(`FAIL ${test.name} (reverse) - Error: ${error.message}\n`);
        }
    }
    

    console.log('=== Validation Tests ===');
    const validationTests = [
        {
            name: 'Valid Ethiopian date',
            func: () => DateConverter.isValidEthiopicDate(2017, 1, 1),
            expected: true
        },
        {
            name: 'Invalid Ethiopian month',
            func: () => DateConverter.isValidEthiopicDate(2017, 14, 1),
            expected: false
        },
        {
            name: 'Invalid Pagume day (non-leap)',
            func: () => DateConverter.isValidEthiopicDate(2017, 13, 7),
            expected: false
        },
        {
            name: 'Valid Pagume day (leap year)',
            func: () => DateConverter.isValidEthiopicDate(2015, 13, 6),
            expected: true
        },
        {
            name: 'Gregorian leap year check',
            func: () => DateConverter.isGregorianLeap(2024),
            expected: true
        },
        {
            name: 'Gregorian non-leap year check',
            func: () => DateConverter.isGregorianLeap(2023),
            expected: false
        }
    ];
    
    for (const test of validationTests) {
        try {
            const result = test.func();
            const match = result === test.expected;
            
            console.log(`${match ? 'PASS' : 'FAIL'} ${test.name}`);
            console.log(`   Expected: ${test.expected}, Got: ${result}`);
            
            if (match) passed++;
            total++;
            console.log();
        } catch (error) {
            console.log(`FAIL ${test.name} - Error: ${error.message}\n`);
            total++;
        }
    }
    
    console.log(`\n=== Results ===`);
    console.log(`Passed: ${passed}/${total} tests`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    if (passed === total) {
        console.log('All tests passed!');
    } else {
        console.log(`${total - passed} tests failed`);
    }
}


if (require.main === module) {
    runTests();
}

module.exports = { runTests };
