# Examples - Ethiopian Date Converter JavaScript

This document provides comprehensive examples of using the Ethiopian Date Converter JavaScript library in real-world scenarios.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Date Conversion](#date-conversion)
3. [Date Arithmetic](#date-arithmetic)
4. [Formatting and Localization](#formatting-and-localization)
5. [Cultural Features](#cultural-features)
6. [Calendar Applications](#calendar-applications)
7. [Business Applications](#business-applications)
8. [Advanced Usage](#advanced-usage)

## Basic Usage

### Creating Dates

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Ethiopian dates
const ethiopicNewYear = new EthiopicDate(2017, 1, 1);
const ethiopicChristmas = new EthiopicDate(2017, 4, 29);
const pagume = new EthiopicDate(2015, 13, 6); // Leap year Pagume

// Gregorian dates
const gregorianNewYear = new GregorianDate(2024, 1, 1);
const today = GregorianDate.today();

// Current dates
const currentEthiopic = EthiopicDate.today();
const currentGregorian = GregorianDate.today();

console.log(`Today in Ethiopian: ${currentEthiopic.toString()}`);
console.log(`Today in Gregorian: ${currentGregorian.toString()}`);
```

### Date Validation

```javascript
function validateAndCreateDate(year, month, day) {
  try {
    const date = new EthiopicDate(year, month, day);
    return { valid: true, date };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Test various dates
const tests = [
  [2017, 1, 1],   // Valid
  [2017, 13, 5],  // Valid (Pagume)
  [2017, 13, 7],  // Invalid (too many days in non-leap Pagume)
  [2017, 14, 1],  // Invalid (month > 13)
  [2017, 1, 31]   // Invalid (Ethiopian months have 30 days)
];

tests.forEach(([year, month, day]) => {
  const result = validateAndCreateDate(year, month, day);
  if (result.valid) {
        console.log(`PASS ${year}-${month}-${day} is valid`);
} else {
    console.log(`FAIL ${year}-${month}-${day}: ${result.error}`);
  }
});
```

## Date Conversion

### Basic Conversion

```javascript
const { EthiopicDate, GregorianDate } = require('@ethiopian-date-converter/js');

// Ethiopian to Gregorian
const ethiopic = new EthiopicDate(2017, 1, 1);
const gregorian = ethiopic.toGregorian();

console.log(`Ethiopian: ${ethiopic.format('D MMMM YYYY')}`);     // "1 Meskerem 2017"
console.log(`Gregorian: ${gregorian.format('D MMMM YYYY')}`);    // "11 September 2024"

// Gregorian to Ethiopian
const gregDate = new GregorianDate(2024, 12, 25);
const ethDate = gregDate.toEthiopic();

console.log(`Gregorian Christmas: ${gregDate.format('D MMMM YYYY')}`);
console.log(`In Ethiopian: ${ethDate.format('D MMMM YYYY')}`);
```

### Batch Conversion

```javascript
function convertManyDates(dates) {
  return dates.map(({ year, month, day, calendar }) => {
    if (calendar === 'ethiopic') {
      const ethiopic = new EthiopicDate(year, month, day);
      const gregorian = ethiopic.toGregorian();
      return {
        input: `${year}-${month}-${day} EC`,
        output: gregorian.format('D MMMM YYYY'),
        dayOfWeek: ethiopic.getDayName()
      };
    } else {
      const gregorian = new GregorianDate(year, month, day);
      const ethiopic = gregorian.toEthiopic();
      return {
        input: `${year}-${month}-${day}`,
        output: ethiopic.format('D MMMM YYYY') + ' EC',
        dayOfWeek: gregorian.getDayName()
      };
    }
  });
}

const dates = [
  { year: 2017, month: 1, day: 1, calendar: 'ethiopic' },
  { year: 2017, month: 4, day: 29, calendar: 'ethiopic' },
  { year: 2024, month: 1, day: 1, calendar: 'gregorian' },
  { year: 2024, month: 12, day: 25, calendar: 'gregorian' }
];

const converted = convertManyDates(dates);
converted.forEach(result => {
  console.log(`${result.input} → ${result.output} (${result.dayOfWeek})`);
});
```

### Historical Date Conversion

```javascript
// Convert historical Ethiopian dates
const historicalDates = [
  { year: 1889, month: 1, day: 1, event: 'Start of Emperor Menelik II reign' },
  { year: 1928, month: 1, day: 1, event: 'Haile Selassie coronation year' },
  { year: 1968, month: 1, day: 1, event: 'Start of Ethiopian Revolution' }
];

console.log('Historical Ethiopian Dates:');
historicalDates.forEach(({ year, month, day, event }) => {
  const ethiopic = new EthiopicDate(year, month, day);
  const gregorian = ethiopic.toGregorian();
  
  console.log(`${event}:`);
  console.log(`  Ethiopian: ${ethiopic.format('D MMMM YYYY')}`);
  console.log(`  Gregorian: ${gregorian.format('D MMMM YYYY')}`);
  console.log('');
});
```

## Date Arithmetic

### Adding and Subtracting Time

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

const startDate = new EthiopicDate(2017, 1, 1);

// Add different time periods
const nextWeek = startDate.addDays(7);
const nextMonth = startDate.addMonths(1);
const nextYear = startDate.addYears(1);

// Subtract time periods
const lastWeek = startDate.addDays(-7);
const lastMonth = startDate.addMonths(-1);

console.log(`Start date: ${startDate.format('D MMMM YYYY')}`);
console.log(`+7 days: ${nextWeek.format('D MMMM YYYY')}`);
console.log(`+1 month: ${nextMonth.format('D MMMM YYYY')}`);
console.log(`+1 year: ${nextYear.format('D MMMM YYYY')}`);
console.log(`-7 days: ${lastWeek.format('D MMMM YYYY')}`);
console.log(`-1 month: ${lastMonth.format('D MMMM YYYY')}`);
```

### Project Duration Calculator

```javascript
function calculateProjectDuration(startDate, endDate) {
  const { CalendarUtils } = require('@ethiopian-date-converter/js');
  
  const totalDays = startDate.daysDifference(endDate);
  const workingDays = CalendarUtils.getBusinessDaysBetween(
    startDate.toGregorian(), 
    endDate.toGregorian()
  );
  
  const weeks = Math.floor(totalDays / 7);
  const months = Math.floor(totalDays / 30);
  
  return {
    totalDays,
    workingDays,
    weeks,
    months,
    startDate: startDate.format('D MMMM YYYY'),
    endDate: endDate.format('D MMMM YYYY')
  };
}

const projectStart = new EthiopicDate(2017, 1, 1);
const projectEnd = new EthiopicDate(2017, 6, 30);
const duration = calculateProjectDuration(projectStart, projectEnd);

console.log('Project Duration Analysis:');
console.log(`From: ${duration.startDate}`);
console.log(`To: ${duration.endDate}`);
console.log(`Total days: ${duration.totalDays}`);
console.log(`Working days: ${duration.workingDays}`);
console.log(`Approximate weeks: ${duration.weeks}`);
console.log(`Approximate months: ${duration.months}`);
```

### Age Calculator

```javascript
function calculateDetailedAge(birthDate, asOfDate = null) {
  const referenceDate = asOfDate || EthiopicDate.today();
  
  const ageInYears = birthDate.getAge(referenceDate);
  const ageInDays = birthDate.daysDifference(referenceDate);
  const ageInMonths = Math.floor(ageInDays / 30);
  
  return {
    years: ageInYears,
    months: ageInMonths,
    days: ageInDays,
    birthDate: birthDate.format('D MMMM YYYY'),
    referenceDate: referenceDate.format('D MMMM YYYY')
  };
}

const birthDate = new EthiopicDate(2000, 5, 15);
const age = calculateDetailedAge(birthDate);

console.log('Age Calculation:');
console.log(`Birth date: ${age.birthDate}`);
console.log(`Reference date: ${age.referenceDate}`);
console.log(`Age: ${age.years} years, ${age.months % 12} months, ${age.days} days total`);
```

## Formatting and Localization

### Multiple Language Support

```javascript
const { EthiopicDate } = require('@ethiopian-date-converter/js');

const date = new EthiopicDate(2017, 1, 1);

// Different languages
const formats = {
  'English': date.format('dddd, D MMMM YYYY', 'en'),
  'Amharic': date.format('dddd, D MMMM YYYY', 'am'),
  'Ge\'ez': date.format('dddd, D MMMM YYYY', 'gez')
};

console.log('Ethiopian New Year 2017:');
Object.entries(formats).forEach(([language, formatted]) => {
  console.log(`${language}: ${formatted}`);
});

// Day names in different languages
console.log('\nDay names:');
['en', 'am', 'gez', 'short'].forEach(lang => {
  console.log(`${lang}: ${date.getDayName(lang)}`);
});

// Month names in different languages
console.log('\nMonth names:');
['en', 'am', 'gez'].forEach(lang => {
  console.log(`${lang}: ${date.getMonthName(lang)}`);
});
```

### Custom Date Formatter

```javascript
class EthiopicDateFormatter {
  static formats = {
    'short': 'D/M/YYYY',
    'medium': 'D MMM YYYY',
    'long': 'D MMMM YYYY',
    'full': 'dddd, D MMMM YYYY',
    'iso': 'YYYY-MM-DD'
  };
  
  static format(date, style = 'medium', lang = 'en') {
    const pattern = this.formats[style] || style;
    return date.format(pattern, lang);
  }
  
  static formatWithOrdinal(date, lang = 'en') {
    const day = date.day;
    const ordinal = this.getOrdinal(day);
    const pattern = `D${ordinal} MMMM YYYY`;
    return date.format(pattern.replace('D', day.toString()), lang);
  }
  
  static getOrdinal(num) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = num % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  }
}

const date = new EthiopicDate(2017, 1, 1);

console.log('Different formatting styles:');
Object.keys(EthiopicDateFormatter.formats).forEach(style => {
  console.log(`${style}: ${EthiopicDateFormatter.format(date, style)}`);
});

console.log(`With ordinal: ${EthiopicDateFormatter.formatWithOrdinal(date)}`);
```

### Relative Date Formatting

```javascript
function getRelativeDateInfo(date) {
  const today = EthiopicDate.today();
  const daysDiff = today.daysDifference(date);
  
  let relative = date.getRelativeDateString();
  let category;
  
  if (daysDiff === 0) category = 'today';
  else if (Math.abs(daysDiff) === 1) category = 'adjacent';
  else if (Math.abs(daysDiff) <= 7) category = 'this-week';
  else if (Math.abs(daysDiff) <= 30) category = 'this-month';
  else category = 'distant';
  
  return {
    date: date.format('D MMMM YYYY'),
    relative,
    category,
    daysDiff
  };
}

// Test relative dates
const dates = [
  EthiopicDate.today().addDays(-2),
  EthiopicDate.today().addDays(-1),
  EthiopicDate.today(),
  EthiopicDate.today().addDays(1),
  EthiopicDate.today().addDays(2),
  EthiopicDate.today().addDays(7),
  EthiopicDate.today().addDays(30)
];

console.log('Relative date examples:');
dates.forEach(date => {
  const info = getRelativeDateInfo(date);
  console.log(`${info.date} → ${info.relative} (${info.category})`);
});
```

## Cultural Features

### Holiday Detection and Information

```javascript
const { EthiopicDate, ETHIOPIAN_HOLIDAYS } = require('@ethiopian-date-converter/js');

// Find all holidays in a year
function getHolidaysInYear(year) {
  const holidays = [];
  
  ETHIOPIAN_HOLIDAYS.fixed.forEach(holiday => {
    try {
      const date = new EthiopicDate(year, holiday.month, holiday.day);
      holidays.push({
        date,
        name: holiday.name,
        nameAm: holiday.nameAm,
        gregorian: date.toGregorian(),
        dayOfWeek: date.getDayName()
      });
    } catch (e) {
      // Skip invalid dates (e.g., Pagume in non-leap years)
    }
  });
  
  return holidays.sort((a, b) => a.date.getJDN() - b.date.getJDN());
}

const holidays2017 = getHolidaysInYear(2017);

console.log('Ethiopian Holidays in 2017:');
holidays2017.forEach(holiday => {
  console.log(`${holiday.date.format('D MMMM')} (${holiday.dayOfWeek})`);
  console.log(`  English: ${holiday.name}`);
  console.log(`  Amharic: ${holiday.nameAm}`);
  console.log(`  Gregorian: ${holiday.gregorian.format('D MMMM YYYY')}`);
  console.log('');
});
```

### Season Information

```javascript
const { EthiopicDate, ETHIOPIAN_SEASONS } = require('@ethiopian-date-converter/js');

function getSeasonInfo(date) {
  const season = ETHIOPIAN_SEASONS.find(s => s.months.includes(date.month));
  
  if (!season) return null;
  
  return {
    name: season.name,
    nameAm: season.nameAm,
    description: season.description,
    months: season.months,
    monthNames: season.months.map(m => {
      const dummyDate = new EthiopicDate(date.year, m, 1);
      return dummyDate.getMonthName();
    })
  };
}

// Test seasons for different months
const testDates = [
  new EthiopicDate(2017, 1, 15),   // Bega
  new EthiopicDate(2017, 4, 15),   // Kiremt
  new EthiopicDate(2017, 8, 15),   // Belg
  new EthiopicDate(2017, 11, 15)   // Bega
];

console.log('Ethiopian Seasons:');
testDates.forEach(date => {
  const seasonInfo = getSeasonInfo(date);
  if (seasonInfo) {
    console.log(`${date.format('D MMMM')} is in ${seasonInfo.name} (${seasonInfo.nameAm})`);
    console.log(`  Description: ${seasonInfo.description}`);
    console.log(`  Months: ${seasonInfo.monthNames.join(', ')}`);
    console.log('');
  }
});
```

### Cultural Calendar Events

```javascript
function createCulturalCalendar(year) {
  const events = [];
  
  // Add all holidays
  ETHIOPIAN_HOLIDAYS.fixed.forEach(holiday => {
    try {
      const date = new EthiopicDate(year, holiday.month, holiday.day);
      events.push({
        date,
        type: 'holiday',
        name: holiday.name,
        nameAm: holiday.nameAm
      });
    } catch (e) {
      // Skip invalid dates
    }
  });
  
  // Add season starts
  ETHIOPIAN_SEASONS.forEach(season => {
    const firstMonth = Math.min(...season.months);
    const date = new EthiopicDate(year, firstMonth, 1);
    events.push({
      date,
      type: 'season',
      name: `${season.name} begins`,
      nameAm: `${season.nameAm} ይጀምራል`
    });
  });
  
  // Add Ethiopian New Year
  events.push({
    date: new EthiopicDate(year, 1, 1),
    type: 'new-year',
    name: 'Ethiopian New Year',
    nameAm: 'እንቁጣጣሽ'
  });
  
  return events.sort((a, b) => a.date.getJDN() - b.date.getJDN());
}

const culturalEvents = createCulturalCalendar(2017);

console.log('Cultural Calendar for 2017:');
culturalEvents.forEach(event => {
  const icon = event.type === 'holiday' ? '[H]' : 
               event.type === 'season' ? '[S]' : '[E]';
  
  console.log(`${icon} ${event.date.format('D MMMM')} - ${event.name}`);
  console.log(`   ${event.nameAm}`);
});
```

## Calendar Applications

### Monthly Calendar Generator

```javascript
const { CalendarUtils, DAY_NAMES } = require('@ethiopian-date-converter/js');

function generateMonthlyCalendar(year, month) {
  const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
  
  // Create header
  let output = `\n${calendar.monthName} ${calendar.year}\n`;
  output += '═'.repeat(calendar.monthName.length + 5) + '\n';
  
  // Day headers
  output += DAY_NAMES.short.map(day => day.padEnd(3)).join(' ') + '\n';
  output += '─'.repeat(21) + '\n';
  
  // Calendar weeks
  calendar.weeks.forEach(week => {
    const weekRow = week.map(day => {
      if (!day) return '   ';
      
      let dayStr = day.day.toString().padStart(2);
      if (day.isToday) dayStr = `[${dayStr}]`.slice(0, 3);
      else if (day.isHoliday) dayStr = `*${dayStr}`.slice(0, 3);
      else dayStr = ` ${dayStr}`.slice(0, 3);
      
      return dayStr;
    }).join(' ');
    
    output += weekRow + '\n';
  });
  
  // Legend
  output += '\nLegend: [Today] *Holiday\n';
  
  return output;
}

// Generate calendar for current month
const today = EthiopicDate.today();
const calendar = generateMonthlyCalendar(today.year, today.month);
console.log(calendar);

// Generate calendar for Ethiopian New Year month
const newYearCalendar = generateMonthlyCalendar(2017, 1);
console.log(newYearCalendar);
```

### Calendar Widget Data Generator

```javascript
function generateCalendarWidget(year, month) {
  const { CalendarUtils, DAY_NAMES } = require('@ethiopian-date-converter/js');
  
  const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
  
  return {
    title: `${calendar.monthName} ${calendar.year}`,
    subtitle: `${calendar.daysInMonth} days`,
    dayHeaders: DAY_NAMES.short,
    weeks: calendar.weeks.map(week => 
      week.map(day => {
        if (!day) return null;
        
        return {
          day: day.day,
          isToday: day.isToday,
          isHoliday: day.isHoliday,
          holiday: day.holiday,
          classes: [
            day.isToday ? 'today' : '',
            day.isHoliday ? 'holiday' : '',
            day.date.getDayOfWeek() >= 5 ? 'weekend' : 'weekday'
          ].filter(Boolean),
          ethiopicDate: day.date.toString(),
          gregorianDate: day.date.toGregorian().toString(),
          formatted: {
            short: day.date.format('D'),
            medium: day.date.format('D MMM'),
            long: day.date.format('D MMMM YYYY')
          }
        };
      })
    ),
    navigation: {
      prevMonth: month === 1 ? { year: year - 1, month: 13 } : { year, month: month - 1 },
      nextMonth: month === 13 ? { year: year + 1, month: 1 } : { year, month: month + 1 }
    },
    metadata: {
      totalDays: calendar.daysInMonth,
      holidays: calendar.weeks.flat()
        .filter(day => day && day.isHoliday)
        .map(day => ({
          day: day.day,
          name: day.holiday,
          date: day.date.toString()
        }))
    }
  };
}

// Generate widget data
const widgetData = generateCalendarWidget(2017, 1);
console.log('Calendar Widget Data:');
console.log(JSON.stringify(widgetData, null, 2));
```

### Year View Calendar

```javascript
function generateYearView(year) {
  const months = [];
  
  for (let month = 1; month <= 13; month++) {
    const calendar = CalendarUtils.generateEthiopicCalendar(year, month);
    
    const monthData = {
      month,
      name: calendar.monthName,
      daysInMonth: calendar.daysInMonth,
      holidays: calendar.weeks.flat()
        .filter(day => day && day.isHoliday)
        .map(day => ({
          day: day.day,
          name: day.holiday,
          date: day.date.format('D MMMM')
        })),
      firstDay: calendar.weeks[0].find(day => day)?.date.getDayName(),
      lastDay: calendar.weeks[calendar.weeks.length - 1]
        .filter(day => day)
        .pop()?.date.getDayName()
    };
    
    months.push(monthData);
  }
  
  return {
    year,
    months,
    totalDays: months.reduce((sum, month) => sum + month.daysInMonth, 0),
    totalHolidays: months.reduce((sum, month) => sum + month.holidays.length, 0)
  };
}

const yearView = generateYearView(2017);

console.log(`Ethiopian Year ${yearView.year} Overview:`);
console.log(`Total days: ${yearView.totalDays}`);
console.log(`Total holidays: ${yearView.totalHolidays}`);
console.log('\nMonths:');

yearView.months.forEach(month => {
  console.log(`${month.name} (${month.daysInMonth} days) - Starts: ${month.firstDay}, Ends: ${month.lastDay}`);
  if (month.holidays.length > 0) {
    month.holidays.forEach(holiday => {
      console.log(`  ${holiday.date} - ${holiday.name}`);
    });
  }
});
```

## Business Applications

### Working Days Calculator

```javascript
const { CalendarUtils } = require('@ethiopian-date-converter/js');

class WorkingDaysCalculator {
  constructor(excludeHolidays = true) {
    this.excludeHolidays = excludeHolidays;
  }
  
  calculateWorkingDays(startDate, endDate) {
    // Convert to Gregorian for business day calculation
    const startGregorian = startDate.toGregorian();
    const endGregorian = endDate.toGregorian();
    
    let workingDays = CalendarUtils.getBusinessDaysBetween(startGregorian, endGregorian);
    
    if (this.excludeHolidays) {
      // Subtract holidays that fall on working days
      let current = startDate.clone();
      let holidaysOnWorkingDays = 0;
      
      while (current.isBefore(endDate) || current.isSame(endDate)) {
        const dayOfWeek = current.getDayOfWeek();
        const isWorkingDay = dayOfWeek < 5; // Monday to Friday
        
        if (isWorkingDay && current.isHoliday()) {
          holidaysOnWorkingDays++;
        }
        
        current = current.addDays(1);
      }
      
      workingDays -= holidaysOnWorkingDays;
    }
    
    return workingDays;
  }
  
  addWorkingDays(startDate, workingDaysToAdd) {
    let current = startDate.clone();
    let addedDays = 0;
    
    while (addedDays < workingDaysToAdd) {
      current = current.addDays(1);
      
      const dayOfWeek = current.getDayOfWeek();
      const isWorkingDay = dayOfWeek < 5; // Monday to Friday
      const isHoliday = this.excludeHolidays && current.isHoliday();
      
      if (isWorkingDay && !isHoliday) {
        addedDays++;
      }
    }
    
    return current;
  }
}

// Example usage
const calculator = new WorkingDaysCalculator(true);

const projectStart = new EthiopicDate(2017, 1, 1);
const projectEnd = new EthiopicDate(2017, 2, 30);

const workingDays = calculator.calculateWorkingDays(projectStart, projectEnd);
console.log(`Working days between ${projectStart.format('D MMMM')} and ${projectEnd.format('D MMMM')}: ${workingDays}`);

// Calculate deadline
const taskStart = new EthiopicDate(2017, 1, 15);
const deadline = calculator.addWorkingDays(taskStart, 20);
console.log(`Task starting ${taskStart.format('D MMMM')} with 20 working days will complete by ${deadline.format('D MMMM YYYY')}`);
```

### Payroll Period Calculator

```javascript
class PayrollCalculator {
  static calculatePayPeriods(year, frequency = 'monthly') {
    const periods = [];
    
    if (frequency === 'monthly') {
      for (let month = 1; month <= 13; month++) {
        const startDate = new EthiopicDate(year, month, 1);
        
        // Calculate last day of month
        let lastDay = 30;
        if (month === 13) {
          // Check if leap year
          try {
            new EthiopicDate(year, 13, 6);
            lastDay = 6; // Leap year
          } catch (e) {
            lastDay = 5; // Regular year
          }
        }
        
        const endDate = new EthiopicDate(year, month, lastDay);
        
        periods.push({
          period: `${year}-${month.toString().padStart(2, '0')}`,
          startDate,
          endDate,
          workingDays: CalendarUtils.getBusinessDaysBetween(
            startDate.toGregorian(), 
            endDate.toGregorian()
          ),
          monthName: startDate.getMonthName(),
          holidays: this.getHolidaysInPeriod(startDate, endDate)
        });
      }
    }
    
    return periods;
  }
  
  static getHolidaysInPeriod(startDate, endDate) {
    const holidays = [];
    let current = startDate.clone();
    
    while (current.isBefore(endDate) || current.isSame(endDate)) {
      if (current.isHoliday()) {
        holidays.push({
          date: current.clone(),
          name: current.getHoliday(),
          dayOfWeek: current.getDayName()
        });
      }
      current = current.addDays(1);
    }
    
    return holidays;
  }
}

const payrollPeriods = PayrollCalculator.calculatePayPeriods(2017);

console.log('Payroll Periods for 2017:');
payrollPeriods.forEach(period => {
  console.log(`\n${period.monthName} ${period.period}`);
  console.log(`  Period: ${period.startDate.format('D MMM')} - ${period.endDate.format('D MMM')}`);
  console.log(`  Working days: ${period.workingDays}`);
  
  if (period.holidays.length > 0) {
    console.log(`  Holidays:`);
    period.holidays.forEach(holiday => {
      console.log(`    ${holiday.date.format('D MMM')} (${holiday.dayOfWeek}) - ${holiday.name}`);
    });
  }
});
```

### Age-based Employee Classification

```javascript
class EmployeeAgeCalculator {
  static classifyEmployee(birthDate, hireDate = null) {
    const today = EthiopicDate.today();
    const age = birthDate.getAge(today);
    
    let classification = '';
    let eligibility = {};
    
    // Age-based classification
    if (age < 18) {
      classification = 'Minor';
    } else if (age < 25) {
      classification = 'Young Adult';
    } else if (age < 55) {
      classification = 'Adult';
    } else if (age < 65) {
      classification = 'Senior';
    } else {
      classification = 'Retirement Age';
    }
    
    // Calculate eligibility
    if (hireDate) {
      const serviceYears = hireDate.getAge(today);
      eligibility = {
        pensionEligible: age >= 55 && serviceYears >= 10,
        seniorBenefits: age >= 55,
        longServiceAward: serviceYears >= 20,
        serviceYears
      };
    }
    
    return {
      age,
      classification,
      birthDate: birthDate.format('D MMMM YYYY'),
      eligibility,
      retirementDate: this.calculateRetirementDate(birthDate)
    };
  }
  
  static calculateRetirementDate(birthDate) {
    // Assume retirement at age 65
    const retirementDate = birthDate.addYears(65);
    return {
      date: retirementDate,
      formatted: retirementDate.format('D MMMM YYYY'),
      yearsRemaining: retirementDate.getAge(EthiopicDate.today()) * -1
    };
  }
}

// Example employees
const employees = [
  { name: 'Ahmed', birth: new EthiopicDate(1985, 3, 15), hire: new EthiopicDate(2010, 1, 1) },
  { name: 'Fatima', birth: new EthiopicDate(1995, 7, 22), hire: new EthiopicDate(2018, 6, 15) },
  { name: 'Bekele', birth: new EthiopicDate(1965, 11, 8), hire: new EthiopicDate(1992, 2, 1) }
];

console.log('Employee Age Analysis:');
employees.forEach(emp => {
  const analysis = EmployeeAgeCalculator.classifyEmployee(emp.birth, emp.hire);
  
  console.log(`\n${emp.name}:`);
  console.log(`  Age: ${analysis.age} (${analysis.classification})`);
  console.log(`  Birth: ${analysis.birthDate}`);
  console.log(`  Service: ${analysis.eligibility.serviceYears} years`);
  console.log(`  Retirement: ${analysis.retirementDate.formatted} (${analysis.retirementDate.yearsRemaining} years to go)`);
  
  if (analysis.eligibility.pensionEligible) {
    console.log(`  🎯 Pension eligible`);
  }
  if (analysis.eligibility.longServiceAward) {
    console.log(`  🏆 Long service award eligible`);
  }
});
```

## Advanced Usage

### Performance Optimization

```javascript
// Optimize for bulk operations
class BulkDateProcessor {
  constructor() {
    this.cache = new Map();
  }
  
  convertBulkEthiopicToGregorian(dates) {
    return dates.map(({ year, month, day }) => {
      const key = `${year}-${month}-${day}`;
      
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      
      const ethiopic = new EthiopicDate(year, month, day);
      const gregorian = ethiopic.toGregorian();
      const result = {
        input: { year, month, day },
        output: gregorian.toObject(),
        formatted: gregorian.format('D MMMM YYYY')
      };
      
      this.cache.set(key, result);
      return result;
    });
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// Test with many dates
const processor = new BulkDateProcessor();
const testDates = [];

// Generate 100 random dates
for (let i = 0; i < 100; i++) {
  testDates.push({
    year: 2000 + Math.floor(Math.random() * 25),
    month: Math.floor(Math.random() * 13) + 1,
    day: Math.floor(Math.random() * 30) + 1
  });
}

console.time('Bulk conversion');
const results = processor.convertBulkEthiopicToGregorian(testDates);
console.timeEnd('Bulk conversion');

console.log(`Processed ${results.length} dates`);
console.log(`Cache size: ${processor.cache.size}`);
```

### Custom Date Range Iterator

```javascript
class DateRangeIterator {
  constructor(startDate, endDate, increment = 'days', step = 1) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.increment = increment;
    this.step = step;
    this.current = startDate.clone();
  }
  
  * [Symbol.iterator]() {
    while (this.current.isBefore(this.endDate) || this.current.isSame(this.endDate)) {
      yield this.current.clone();
      
      switch (this.increment) {
        case 'days':
          this.current = this.current.addDays(this.step);
          break;
        case 'months':
          this.current = this.current.addMonths(this.step);
          break;
        case 'years':
          this.current = this.current.addYears(this.step);
          break;
      }
    }
  }
  
  toArray() {
    return Array.from(this);
  }
  
  filter(predicate) {
    return this.toArray().filter(predicate);
  }
  
  map(transformer) {
    return this.toArray().map(transformer);
  }
}

// Example: Find all holidays in a year
const yearStart = new EthiopicDate(2017, 1, 1);
const yearEnd = new EthiopicDate(2017, 13, 6);
const dateRange = new DateRangeIterator(yearStart, yearEnd, 'days', 1);

const holidays = dateRange.filter(date => date.isHoliday());
console.log('Holidays in 2017:');
holidays.forEach(holiday => {
  console.log(`${holiday.format('D MMMM')} - ${holiday.getHoliday()}`);
});

// Example: Monthly reports
const monthlyDates = new DateRangeIterator(yearStart, yearEnd, 'months', 1);
const monthlyReports = monthlyDates.map(date => ({
  month: date.getMonthName(),
  firstDay: date.getDayName(),
  workingDays: CalendarUtils.getBusinessDaysBetween(
    date.toGregorian(),
    date.addMonths(1).addDays(-1).toGregorian()
  )
}));

console.log('\nMonthly Working Days:');
monthlyReports.forEach(report => {
  console.log(`${report.month}: ${report.workingDays} working days (starts on ${report.firstDay})`);
});
```

### Integration with JavaScript Date

```javascript
class DateBridge {
  static fromJSDate(jsDate) {
    const gregorian = new GregorianDate(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1, // JS months are 0-based
      jsDate.getDate()
    );
    return gregorian.toEthiopic();
  }
  
  static toJSDate(ethiopicDate) {
    return ethiopicDate.toGregorian().toJSDate();
  }
  
  static syncWithSystemTime() {
    const now = new Date();
    const ethiopicNow = this.fromJSDate(now);
    
    return {
      system: {
        gregorian: now.toDateString(),
        iso: now.toISOString(),
        timestamp: now.getTime()
      },
      ethiopic: {
        formatted: ethiopicNow.format('dddd, D MMMM YYYY'),
        short: ethiopicNow.toString(),
        object: ethiopicNow.toObject()
      }
    };
  }
}

// Real-time clock example
function displayEthiopicClock() {
  setInterval(() => {
    const sync = DateBridge.syncWithSystemTime();
    console.clear();
    console.log('🕐 Ethiopian Date/Time Clock');
    console.log('═'.repeat(40));
    console.log(`Gregorian: ${sync.system.gregorian}`);
    console.log(`Ethiopian: ${sync.ethiopic.formatted}`);
    console.log(`Day of Week: ${EthiopicDate.today().getDayName()}`);
    
    const season = EthiopicDate.today().getSeason();
    if (season) {
      console.log(`Season: ${season}`);
    }
    
    const holiday = EthiopicDate.today().getHoliday();
    if (holiday) {
      console.log(`Holiday: ${holiday}`);
    }
  }, 1000);
}

// Uncomment to run the clock
// displayEthiopicClock();

// Show sync example
const sync = DateBridge.syncWithSystemTime();
console.log('Date Synchronization:');
console.log(JSON.stringify(sync, null, 2));
```

This comprehensive examples document demonstrates the full capabilities of the Ethiopian Date Converter JavaScript library, from basic usage to advanced enterprise applications.
