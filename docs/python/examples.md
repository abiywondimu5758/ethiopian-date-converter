# Ethiopian Date Converter Examples

Comprehensive examples demonstrating real-world usage of the Ethiopian Date Converter Python library.

## Table of Contents

1. [Basic Date Conversion](#basic-date-conversion)
2. [Date Arithmetic](#date-arithmetic)
3. [Holiday and Calendar Operations](#holiday-and-calendar-operations)
4. [Formatting and Localization](#formatting-and-localization)
5. [Business Applications](#business-applications)
6. [Data Processing](#data-processing)
7. [Calendar Applications](#calendar-applications)
8. [Educational Tools](#educational-tools)

## Basic Date Conversion

### Simple Conversions
```python
from ethiopian_date_converter import ethiopic_to_gregorian, gregorian_to_ethiopic

# Convert important Ethiopian dates
conversions = [
    (2017, 1, 1),   # Ethiopian New Year
    (2017, 4, 29),  # Ethiopian Christmas
    (2017, 5, 11),  # Timkat (Epiphany)
    (2017, 6, 23),  # Battle of Adwa Victory Day
]

print("Ethiopian to Gregorian Conversions:")
for year, month, day in conversions:
    result = ethiopic_to_gregorian(year, month, day)
    print(f"  {year:4d}-{month:02d}-{day:02d} → {result['year']}-{result['month']:02d}-{result['day']:02d}")

# Reverse conversions
gregorian_dates = [
    (2024, 9, 11),  # Ethiopian New Year in Gregorian
    (2025, 1, 7),   # Ethiopian Christmas in Gregorian
    (2025, 1, 19),  # Timkat in Gregorian
]

print("\nGregorian to Ethiopian Conversions:")
for year, month, day in gregorian_dates:
    result = gregorian_to_ethiopic(year, month, day)
    print(f"  {year}-{month:02d}-{day:02d} → {result['year']:4d}-{result['month']:02d}-{result['day']:02d}")
```

### Round-Trip Verification
```python
from ethiopian_date_converter import ethiopic_to_gregorian, gregorian_to_ethiopic

def verify_round_trip(eth_year, eth_month, eth_day):
    """Verify that conversion is consistent in both directions."""
    # Ethiopian → Gregorian → Ethiopian
    greg = ethiopic_to_gregorian(eth_year, eth_month, eth_day)
    back_to_eth = gregorian_to_ethiopic(greg['year'], greg['month'], greg['day'])
    
    original = (eth_year, eth_month, eth_day)
    result = (back_to_eth['year'], back_to_eth['month'], back_to_eth['day'])
    
    is_consistent = original == result
    print(f"  {original} → {greg['year']}-{greg['month']:02d}-{greg['day']:02d} → {result} ✓" if is_consistent else "✗")
    return is_consistent

print("Round-trip Verification:")
test_dates = [
    (2017, 1, 1), (2017, 6, 15), (2017, 13, 5),  # Regular dates
    (2015, 13, 6),  # Leap year Pagume
]

all_consistent = all(verify_round_trip(*date) for date in test_dates)
print(f"\nAll conversions consistent: {all_consistent}")
```

## Date Arithmetic

### Date Class Operations
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate

# Start with Ethiopian New Year
new_year = EthiopicDate(2017, 1, 1)
print(f"Ethiopian New Year 2017: {new_year}")
print(f"Day of week: {new_year.get_day_of_week()}")

# Perform various arithmetic operations
print("\nDate Arithmetic:")
print(f"  Tomorrow: {new_year.add_days(1)}")
print(f"  Next week: {new_year.add_days(7)}")
print(f"  Next month: {new_year.add_months(1)}")
print(f"  Next year: {new_year.add_years(1)}")

# Calculate time until specific events
christmas = EthiopicDate(2017, 4, 29)
timkat = EthiopicDate(2017, 5, 11)

print("\nTime Until Events:")
print(f"  Days until Christmas: {christmas.diff_days(new_year)}")
print(f"  Days until Timkat: {timkat.diff_days(new_year)}")
print(f"  Days between Christmas and Timkat: {timkat.diff_days(christmas)}")
```

### Working with Month Boundaries
```python
from ethiopian_date_converter import EthiopicDate

# Test month boundary arithmetic
dates = [
    EthiopicDate(2017, 1, 30),   # Last day of Meskerem
    EthiopicDate(2017, 12, 30),  # Last day of regular year
    EthiopicDate(2015, 13, 6),   # Last day of leap year
]

print("Month Boundary Arithmetic:")
for date in dates:
    next_day = date.add_days(1)
    print(f"  {date} + 1 day = {next_day}")
    print(f"    Month changed: {date.month != next_day.month}")
    print(f"    Year changed: {date.year != next_day.year}")
    print()
```

### Age Calculation
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.utils import calculate_age

# Calculate someone's age in Ethiopian calendar
birth_date = EthiopicDate(2000, 3, 15)  # Born in Hidar 2000
current_date = EthiopicDate.today()

age = calculate_age(birth_date, current_date)
print(f"Birth date: {birth_date.format('DD MMMM YYYY')}")
print(f"Current date: {current_date.format('DD MMMM YYYY')}")
print(f"Age: {age['years']} years, {age['months']} months, {age['days']} days")

# Age at specific date
specific_date = EthiopicDate(2017, 1, 1)
age_at_new_year = calculate_age(birth_date, specific_date)
print(f"\nAge at New Year 2017: {age_at_new_year['years']} years old")
```

## Holiday and Calendar Operations

### Holiday Detection and Information
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.utils import get_holidays, find_next_holiday

# Check specific dates for holidays
dates_to_check = [
    EthiopicDate(2017, 1, 1),   # New Year
    EthiopicDate(2017, 1, 17),  # Finding of True Cross
    EthiopicDate(2017, 4, 29),  # Christmas
    EthiopicDate(2017, 5, 11),  # Timkat
    EthiopicDate(2017, 2, 15),  # Regular day
]

print("Holiday Detection:")
for date in dates_to_check:
    is_holiday = date.is_holiday()
    holiday_name = date.get_holiday_name()
    status = f"✓ {holiday_name}" if is_holiday else "  Regular day"
    print(f"  {date.format('DD MMMM YYYY')}: {status}")

# Get all holidays for a year
print(f"\nAll holidays in 2017:")
holidays = get_holidays(2017, "ethiopic")
for holiday in holidays:
    date = holiday['date']
    print(f"  {date.format('DD MMMM YYYY')}: {holiday['name']}")

# Find next holiday from a given date
start_date = EthiopicDate(2017, 1, 10)
next_holiday = find_next_holiday(start_date)
if next_holiday:
    print(f"\nNext holiday from {start_date}:")
    print(f"  {next_holiday['name']} in {next_holiday['days_until']} days")
    print(f"  Date: {next_holiday['date']}")
```

### Calendar Generation
```python
from ethiopian_date_converter.utils import generate_calendar

def print_calendar(year, month):
    """Print a formatted Ethiopian calendar."""
    calendar = generate_calendar(year, month, "ethiopic")
    
    print(f"\n{calendar['month_name']} {year}")
    print("─" * 30)
    print("Mo Tu We Th Fr Sa Su")
    
    for week in calendar['calendar_grid']:
        week_str = ""
        for day in week:
            if day is None:
                week_str += "   "
            else:
                week_str += f"{day:2d} "
        print(week_str)
    
    # Show holidays in this month
    if calendar['holidays']:
        print("\nHolidays:")
        for holiday in calendar['holidays']:
            print(f"  {holiday['day']:2d}: {holiday['name']}")

# Generate calendars for important months
print_calendar(2017, 1)   # Meskerem (New Year month)
print_calendar(2017, 4)   # Tahsas (Christmas month)
```

## Formatting and Localization

### Multi-Language Date Display
```python
from ethiopian_date_converter import EthiopicDate

# Important Ethiopian dates
dates = [
    EthiopicDate(2017, 1, 1),   # New Year
    EthiopicDate(2017, 4, 29),  # Christmas
    EthiopicDate(2017, 5, 11),  # Timkat
]

print("Multi-Language Date Formatting:")
print("English:")
for date in dates:
    formatted = date.format("DDDD, DD MMMM YYYY", "en")
    holiday = date.get_holiday_name() or "Regular day"
    print(f"  {formatted} - {holiday}")

print("\nAmharic:")
for date in dates:
    day_name = date.get_day_of_week("am")
    month_name = date.get_month_name("am")
    holiday = date.get_holiday_name() or "Regular day"
    print(f"  {day_name}, {date.day:02d} {month_name} {date.year} - {holiday}")
```

### Custom Date Formatters
```python
from ethiopian_date_converter import EthiopicDate

class EthiopicDateFormatter:
    """Custom formatter for Ethiopian dates."""
    
    @staticmethod
    def format_long(date, locale="en"):
        """Format as 'Wednesday, 1st of Meskerem, 2017'"""
        day_name = date.get_day_of_week(locale)
        month_name = date.get_month_name(locale)
        day_suffix = EthiopicDateFormatter.get_day_suffix(date.day)
        return f"{day_name}, {date.day}{day_suffix} of {month_name}, {date.year}"
    
    @staticmethod
    def format_short(date):
        """Format as 'Mes 1, 2017'"""
        month_abbr = date.get_month_name("en")[:3]
        return f"{month_abbr} {date.day}, {date.year}"
    
    @staticmethod
    def get_day_suffix(day):
        """Get English ordinal suffix for day."""
        if 10 <= day % 100 <= 20:
            return "th"
        else:
            return {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")

# Test custom formatters
date = EthiopicDate(2017, 1, 1)
print("Custom Formatting:")
print(f"  Long: {EthiopicDateFormatter.format_long(date)}")
print(f"  Short: {EthiopicDateFormatter.format_short(date)}")
print(f"  Long (AM): {EthiopicDateFormatter.format_long(date, 'am')}")
```

## Business Applications

### Payroll and HR System
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.utils import get_business_days, get_holidays

class EthiopicPayrollCalculator:
    """Ethiopian calendar payroll calculator."""
    
    def __init__(self, year, month):
        self.year = year
        self.month = month
        self.start_date = EthiopicDate(year, month, 1)
        self.end_date = self.get_month_end()
    
    def get_month_end(self):
        """Get the last day of the month."""
        if self.month == 13:  # Pagume
            days = 6 if EthiopicDate(self.year, 13, 1).is_leap_year() else 5
        else:
            days = 30
        return EthiopicDate(self.year, self.month, days)
    
    def calculate_working_days(self):
        """Calculate working days in the month."""
        return get_business_days(self.start_date, self.end_date, exclude_holidays=True)
    
    def get_holidays_in_month(self):
        """Get holidays in the current month."""
        holidays = get_holidays(self.year, "ethiopic")
        return [h for h in holidays if h['month'] == self.month]
    
    def generate_payroll_report(self):
        """Generate a payroll report."""
        working_days = self.calculate_working_days()
        holidays = self.get_holidays_in_month()
        total_days = self.end_date.day
        
        print(f"Payroll Report - {self.start_date.get_month_name()} {self.year}")
        print("=" * 50)
        print(f"Total days in month: {total_days}")
        print(f"Working days: {working_days}")
        print(f"Holidays: {len(holidays)}")
        
        if holidays:
            print("\nHolidays in this month:")
            for holiday in holidays:
                date = EthiopicDate(self.year, holiday['month'], holiday['day'])
                print(f"  {date.format('DD MMMM')}: {holiday['name']}")

# Generate payroll for different months
months = [1, 4, 5]  # Meskerem, Tahsas, Tir
for month in months:
    calculator = EthiopicPayrollCalculator(2017, month)
    calculator.generate_payroll_report()
    print()
```

### Event Planning System
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.utils import find_next_holiday

class EthiopicEventPlanner:
    """Ethiopian calendar event planning utility."""
    
    def __init__(self):
        self.events = []
    
    def add_event(self, date, name, description=""):
        """Add an event."""
        self.events.append({
            'date': date,
            'name': name,
            'description': description,
            'is_holiday': date.is_holiday(),
            'holiday_name': date.get_holiday_name()
        })
    
    def find_available_dates(self, start_date, num_days, avoid_holidays=True):
        """Find available dates avoiding weekends and holidays."""
        available = []
        current = start_date
        
        while len(available) < num_days:
            day_of_week = current.to_jdn() % 7  # 0=Monday, 6=Sunday
            is_weekend = day_of_week >= 5  # Saturday, Sunday
            is_holiday = avoid_holidays and current.is_holiday()
            
            if not is_weekend and not is_holiday:
                available.append(current)
            
            current = current.add_days(1)
        
        return available
    
    def generate_schedule(self, start_date, end_date):
        """Generate event schedule."""
        events_in_period = [
            event for event in self.events
            if start_date <= event['date'] <= end_date
        ]
        
        events_in_period.sort(key=lambda x: x['date'])
        
        print(f"Event Schedule: {start_date} to {end_date}")
        print("=" * 60)
        
        for event in events_in_period:
            date = event['date']
            day_name = date.get_day_of_week()
            date_str = date.format("DD MMMM YYYY")
            
            print(f"{date_str} ({day_name}): {event['name']}")
            if event['is_holiday']:
                print(f"  Warning: Holiday: {event['holiday_name']}")
            if event['description']:
                print(f"  Description: {event['description']}")
            print()

# Example usage
planner = EthiopicEventPlanner()

# Add some events
planner.add_event(EthiopicDate(2017, 1, 15), "Team Meeting", "Monthly team sync")
planner.add_event(EthiopicDate(2017, 2, 1), "Project Deadline", "Submit quarterly report")
planner.add_event(EthiopicDate(2017, 4, 29), "Christmas Party", "Office celebration")

# Find available meeting dates
start = EthiopicDate(2017, 1, 10)
available_dates = planner.find_available_dates(start, 5, avoid_holidays=True)

print("Available Meeting Dates:")
for i, date in enumerate(available_dates, 1):
    print(f"  {i}. {date.format('DDDD, DD MMMM YYYY')}")

print()

# Generate schedule
planner.generate_schedule(EthiopicDate(2017, 1, 1), EthiopicDate(2017, 5, 30))
```

## Data Processing

### Convert Historical Data
```python
import csv
from ethiopian_date_converter import EthiopicDate, GregorianDate

def convert_historical_dates(input_file, output_file):
    """Convert historical Ethiopian dates to Gregorian in CSV format."""
    
    with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        
        # Add Gregorian date columns
        fieldnames = reader.fieldnames + ['gregorian_date', 'day_of_week']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            try:
                # Parse Ethiopian date
                eth_date = EthiopicDate(
                    int(row['ethiopian_year']),
                    int(row['ethiopian_month']),
                    int(row['ethiopian_day'])
                )
                
                # Convert to Gregorian
                greg_date = eth_date.to_gregorian()
                
                # Add converted data
                row['gregorian_date'] = str(greg_date)
                row['day_of_week'] = eth_date.get_day_of_week()
                
                writer.writerow(row)
                
            except Exception as e:
                print(f"Error converting row {row}: {e}")

# Create sample data
sample_data = [
    {'event': 'Ethiopian New Year', 'ethiopian_year': 2017, 'ethiopian_month': 1, 'ethiopian_day': 1},
    {'event': 'Christmas', 'ethiopian_year': 2017, 'ethiopian_month': 4, 'ethiopian_day': 29},
    {'event': 'Timkat', 'ethiopian_year': 2017, 'ethiopian_month': 5, 'ethiopian_day': 11},
]

# Write sample input file
with open('historical_dates.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['event', 'ethiopian_year', 'ethiopian_month', 'ethiopian_day'])
    writer.writeheader()
    writer.writerows(sample_data)

# Convert the data
convert_historical_dates('historical_dates.csv', 'converted_dates.csv')

# Read and display results
print("Converted Historical Dates:")
with open('converted_dates.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['event']}: {row['ethiopian_year']}-{row['ethiopian_month']:0>2}-{row['ethiopian_day']:0>2} → {row['gregorian_date']} ({row['day_of_week']})")
```

### Data Analysis Example
```python
from ethiopian_date_converter import EthiopicDate
from collections import defaultdict
import random

def analyze_birth_dates(birth_records):
    """Analyze birth date patterns in Ethiopian calendar."""
    
    month_counts = defaultdict(int)
    day_of_week_counts = defaultdict(int)
    holiday_births = []
    
    for record in birth_records:
        birth_date = EthiopicDate(record['year'], record['month'], record['day'])
        
        # Count by month
        month_counts[birth_date.get_month_name()] += 1
        
        # Count by day of week
        day_of_week_counts[birth_date.get_day_of_week()] += 1
        
        # Check for holiday births
        if birth_date.is_holiday():
            holiday_births.append({
                'name': record['name'],
                'date': birth_date,
                'holiday': birth_date.get_holiday_name()
            })
    
    # Print analysis
    print("Birth Date Analysis:")
    print("=" * 40)
    
    print("\nMost common birth months:")
    sorted_months = sorted(month_counts.items(), key=lambda x: x[1], reverse=True)
    for month, count in sorted_months[:5]:
        print(f"  {month}: {count} births")
    
    print("\nMost common birth days of week:")
    sorted_days = sorted(day_of_week_counts.items(), key=lambda x: x[1], reverse=True)
    for day, count in sorted_days:
        print(f"  {day}: {count} births")
    
    print(f"\nHoliday births: {len(holiday_births)}")
    for birth in holiday_births:
        print(f"  {birth['name']}: {birth['date']} ({birth['holiday']})")

# Generate sample birth records
random.seed(42)
birth_records = []
for i in range(100):
    year = random.randint(1980, 2010)
    month = random.randint(1, 13)
    max_day = 6 if month == 13 and (year % 4 == 3) else (5 if month == 13 else 30)
    day = random.randint(1, max_day)
    
    birth_records.append({
        'name': f'Person_{i+1}',
        'year': year,
        'month': month,
        'day': day
    })

analyze_birth_dates(birth_records)
```

## Calendar Applications

### Interactive Calendar Widget
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.utils import generate_calendar

class EthiopicCalendarWidget:
    """Interactive Ethiopian calendar widget."""
    
    def __init__(self, year, month):
        self.year = year
        self.month = month
        self.calendar_data = generate_calendar(year, month, "ethiopic")
        self.selected_date = None
    
    def display(self):
        """Display the calendar."""
        print(f"\n{self.calendar_data['month_name']} {self.year}")
        print("=" * 35)
        print("Mo Tu We Th Fr Sa Su")
        print("-" * 21)
        
        for week in self.calendar_data['calendar_grid']:
            week_str = ""
            for day in week:
                if day is None:
                    week_str += "   "
                else:
                    # Highlight holidays
                    date = EthiopicDate(self.year, self.month, day)
                    if date.is_holiday():
                        week_str += f"[{day:2d}]"
                    else:
                        week_str += f" {day:2d} "
            print(week_str)
        
        # Show legend
        print("\nLegend: [##] = Holiday")
        
        # Show holidays this month
        if self.calendar_data['holidays']:
            print("\nHolidays:")
            for holiday in self.calendar_data['holidays']:
                date = EthiopicDate(self.year, self.month, holiday['day'])
                print(f"  {holiday['day']:2d}: {holiday['name']}")
    
    def get_date_info(self, day):
        """Get information about a specific date."""
        if 1 <= day <= self.calendar_data['days_in_month']:
            date = EthiopicDate(self.year, self.month, day)
            info = {
                'date': date,
                'formatted': date.format("DDDD, DD MMMM YYYY"),
                'day_of_week': date.get_day_of_week(),
                'is_holiday': date.is_holiday(),
                'holiday_name': date.get_holiday_name(),
                'gregorian': date.to_gregorian()
            }
            return info
        return None
    
    def navigate(self, direction):
        """Navigate to next/previous month."""
        if direction == 'next':
            if self.month == 13:
                self.year += 1
                self.month = 1
            else:
                self.month += 1
        elif direction == 'prev':
            if self.month == 1:
                self.year -= 1
                self.month = 13
            else:
                self.month -= 1
        
        self.calendar_data = generate_calendar(self.year, self.month, "ethiopic")

# Example usage
calendar = EthiopicCalendarWidget(2017, 1)

# Display current month
calendar.display()

# Get info about specific dates
print("\nDate Information:")
for day in [1, 15, 30]:
    info = calendar.get_date_info(day)
    if info:
        print(f"  {info['formatted']}")
        print(f"    Gregorian: {info['gregorian']}")
        if info['is_holiday']:
            print(f"    Holiday: {info['holiday_name']}")

# Navigate to next month
print("\n" + "="*50)
print("Navigating to next month...")
calendar.navigate('next')
calendar.display()
```

### Calendar Comparison Tool
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate
from ethiopian_date_converter.utils import generate_calendar

def compare_calendars(ethiopic_year, ethiopic_month):
    """Compare Ethiopian and Gregorian calendars side by side."""
    
    # Generate Ethiopian calendar
    eth_calendar = generate_calendar(ethiopic_year, ethiopic_month, "ethiopic")
    
    # Find corresponding Gregorian months
    first_day = EthiopicDate(ethiopic_year, ethiopic_month, 1)
    last_day_num = eth_calendar['days_in_month']
    last_day = EthiopicDate(ethiopic_year, ethiopic_month, last_day_num)
    
    first_greg = first_day.to_gregorian()
    last_greg = last_day.to_gregorian()
    
    print(f"Calendar Comparison: {eth_calendar['month_name']} {ethiopic_year}")
    print("=" * 70)
    print(f"Ethiopian: {eth_calendar['month_name']} {ethiopic_year}")
    print(f"Gregorian: {first_greg} to {last_greg}")
    print()
    
    # Display date mappings
    print("Date Mappings:")
    print("Ethiopian    →  Gregorian     Day of Week")
    print("-" * 45)
    
    for day in range(1, last_day_num + 1):
        eth_date = EthiopicDate(ethiopic_year, ethiopic_month, day)
        greg_date = eth_date.to_gregorian()
        day_name = eth_date.get_day_of_week()
        
        holiday_marker = " (Holiday)" if eth_date.is_holiday() else ""
        
        print(f"{eth_date}  →  {greg_date}    {day_name}{holiday_marker}")

# Compare different months
months_to_compare = [1, 4, 13]  # Meskerem, Tahsas, Pagume
for month in months_to_compare:
    compare_calendars(2017, month)
    print("\n" + "="*70 + "\n")
```

## Educational Tools

### Calendar Learning Game
```python
import random
from ethiopian_date_converter import EthiopicDate, GregorianDate

class EthiopicCalendarQuiz:
    """Educational quiz about Ethiopian calendar."""
    
    def __init__(self):
        self.score = 0
        self.questions_asked = 0
    
    def generate_conversion_question(self):
        """Generate a date conversion question."""
        year = random.randint(2010, 2020)
        month = random.randint(1, 12)  # Avoid Pagume for simplicity
        day = random.randint(1, 30)
        
        if random.choice([True, False]):
            # Ethiopian to Gregorian
            eth_date = EthiopicDate(year, month, day)
            greg_date = eth_date.to_gregorian()
            
            question = f"Convert Ethiopian date {eth_date} to Gregorian:"
            answer = str(greg_date)
        else:
            # Gregorian to Ethiopian
            greg_date = GregorianDate(year, month, day)
            eth_date = greg_date.to_ethiopic()
            
            question = f"Convert Gregorian date {greg_date} to Ethiopian:"
            answer = str(eth_date)
        
        return question, answer
    
    def generate_holiday_question(self):
        """Generate a holiday question."""
        holidays = [
            (EthiopicDate(2017, 1, 1), "Ethiopian New Year"),
            (EthiopicDate(2017, 4, 29), "Ethiopian Christmas"),
            (EthiopicDate(2017, 5, 11), "Timkat (Epiphany)"),
            (EthiopicDate(2017, 1, 17), "Finding of True Cross"),
        ]
        
        date, holiday_name = random.choice(holidays)
        
        if random.choice([True, False]):
            question = f"What holiday is celebrated on {date.format('DD MMMM')}?"
            answer = holiday_name
        else:
            question = f"When is {holiday_name} celebrated?"
            answer = date.format('DD MMMM')
        
        return question, answer
    
    def generate_calendar_question(self):
        """Generate a calendar knowledge question."""
        questions = [
            ("How many months are in the Ethiopian calendar?", "13"),
            ("How many days are in most Ethiopian months?", "30"),
            ("What is the 13th month called?", "Pagume"),
            ("How many days are in Pagume during a leap year?", "6"),
            ("How many days are in Pagume during a regular year?", "5"),
        ]
        
        return random.choice(questions)
    
    def ask_question(self):
        """Ask a random question."""
        question_type = random.choice(['conversion', 'holiday', 'calendar'])
        
        if question_type == 'conversion':
            question, answer = self.generate_conversion_question()
        elif question_type == 'holiday':
            question, answer = self.generate_holiday_question()
        else:
            question, answer = self.generate_calendar_question()
        
        self.questions_asked += 1
        print(f"\nQuestion {self.questions_asked}: {question}")
        user_answer = input("Your answer: ").strip()
        
        if user_answer.lower() == answer.lower():
            print("Correct!")
            self.score += 1
        else:
            print(f"❌ Incorrect. The correct answer is: {answer}")
        
        return user_answer.lower() == answer.lower()
    
    def run_quiz(self, num_questions=5):
        """Run the quiz."""
        print("Ethiopian Calendar Quiz")
        print("=" * 30)
        print("Test your knowledge of the Ethiopian calendar!")
        
        for _ in range(num_questions):
            self.ask_question()
        
        print(f"\nQuiz Results:")
        print(f"Score: {self.score}/{self.questions_asked}")
        percentage = (self.score / self.questions_asked) * 100
        print(f"Percentage: {percentage:.1f}%")
        
        if percentage >= 80:
            print("Excellent! You know the Ethiopian calendar well!")
        elif percentage >= 60:
            print("Good job! Keep learning!")
        else:
            print("Keep studying the Ethiopian calendar!")

# Run the quiz
if __name__ == "__main__":
    quiz = EthiopicCalendarQuiz()
    quiz.run_quiz(10)
```

### Month Learning Tool
```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.constants import ETHIOPIC_MONTHS

def teach_ethiopic_months():
    """Interactive tool to learn Ethiopian month names."""
    
    print("Learn Ethiopian Month Names")
    print("=" * 40)
    
    months_en = ETHIOPIC_MONTHS['en']
    months_am = ETHIOPIC_MONTHS['am']
    
    print("\nEthiopian Months (English and Amharic):")
    print("-" * 40)
    
    for i, (en_name, am_name) in enumerate(zip(months_en, months_am), 1):
        # Create a sample date for this month
        sample_date = EthiopicDate(2017, i, 1)
        greg_equivalent = sample_date.to_gregorian()
        
        print(f"{i:2d}. {en_name:<12} ({am_name})")
        print(f"    Sample: {sample_date} → {greg_equivalent}")
        
        # Show if this month has any holidays
        if sample_date.is_holiday():
            print(f"    Holiday: {sample_date.get_holiday_name()}")
        
        print()
    
    # Interactive practice
    print("Practice Time!")
    print("Type the month number for the given month name, or 'quit' to exit.")
    
    import random
    score = 0
    attempts = 0
    
    while True:
        month_num = random.randint(1, 13)
        month_name = months_en[month_num - 1]
        
        print(f"\nWhat number is the month '{month_name}'?")
        answer = input("Enter month number (1-13) or 'quit': ").strip()
        
        if answer.lower() == 'quit':
            break
        
        try:
            user_num = int(answer)
            attempts += 1
            
            if user_num == month_num:
                print("Correct!")
                score += 1
            else:
                print(f"❌ Incorrect. {month_name} is month {month_num}")
                
        except ValueError:
            print("Please enter a valid number or 'quit'")
    
    if attempts > 0:
        percentage = (score / attempts) * 100
        print(f"\nFinal Score: {score}/{attempts} ({percentage:.1f}%)")

if __name__ == "__main__":
    teach_ethiopic_months()
```

These examples demonstrate the comprehensive functionality of the Ethiopian Date Converter Python library, showing how it can be used in various real-world scenarios from simple conversions to complex business applications and educational tools.
