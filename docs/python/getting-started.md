# Getting Started with Ethiopian Date Converter for Python

This guide will help you get started with the Ethiopian Date Converter Python library, from installation to your first conversions.

## Installation

### Requirements
- Python 3.7 or higher
- C compiler (for building native extension)
  - **Windows**: Visual Studio Build Tools or MinGW-w64
  - **macOS**: Xcode Command Line Tools
  - **Linux**: GCC

### Install from PyPI
```bash
pip install ethiopian-date-converter-py
```

### Install from Source
```bash
git clone https://github.com/abiywondimu5758/ethiopian-date-converter.git
cd ethiopian-date-converter/bindings/python
pip install -e .
```

### Verify Installation
```python
import ethiopian_date_converter
print(f"Version: {ethiopian_date_converter.__version__}")

# Test basic functionality
from ethiopian_date_converter import ethiopic_to_gregorian
result = ethiopic_to_gregorian(2017, 1, 1)
print(f"Ethiopian New Year 2017: {result}")
```

## Basic Concepts

### Ethiopian Calendar
The Ethiopian calendar has unique characteristics:
- **13 months**: 12 months of 30 days each, plus Pagume
- **Pagume**: 5 days (normal year) or 6 days (leap year)
- **Leap years**: When `year % 4 == 3`
- **New Year**: Meskerem 1 (around September 11 Gregorian)

### Date Representation
Dates are represented as dictionaries or date objects:
```python
# Dictionary format
ethiopic_dict = {"year": 2017, "month": 1, "day": 1}
gregorian_dict = {"year": 2024, "month": 9, "day": 11}

# Date object format
from ethiopian_date_converter import EthiopicDate, GregorianDate
ethiopic_obj = EthiopicDate(2017, 1, 1)
gregorian_obj = GregorianDate(2024, 9, 11)
```

## Your First Conversion

### Simple Function-Based Conversion
```python
from ethiopian_date_converter import ethiopic_to_gregorian, gregorian_to_ethiopic

# Ethiopian to Gregorian
result = ethiopic_to_gregorian(2017, 1, 1)
print(f"Ethiopian 2017-01-01 = Gregorian {result['year']}-{result['month']}-{result['day']}")

# Gregorian to Ethiopian
result = gregorian_to_ethiopic(2024, 9, 11)
print(f"Gregorian 2024-09-11 = Ethiopian {result['year']}-{result['month']}-{result['day']}")
```

### Object-Oriented Approach
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate

# Create Ethiopian date
ethiopic = EthiopicDate(2017, 1, 1)
print(f"Ethiopian date: {ethiopic}")

# Convert to Gregorian
gregorian = ethiopic.to_gregorian()
print(f"Gregorian equivalent: {gregorian}")

# Create Gregorian date and convert
gregorian = GregorianDate(2024, 9, 11)
ethiopic = gregorian.to_ethiopic()
print(f"Back to Ethiopian: {ethiopic}")
```

## Working with Date Classes

### Creating Dates
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate
from ethiopian_date_converter.date_classes import InvalidDateError

# Valid dates
new_year = EthiopicDate(2017, 1, 1)
christmas = EthiopicDate(2017, 4, 29)
leap_pagume = EthiopicDate(2015, 13, 6)  # Leap year Pagume

# Handle invalid dates
try:
    invalid = EthiopicDate(2017, 13, 7)  # Too many days in Pagume
except InvalidDateError as e:
    print(f"Invalid date: {e}")
```

### Date Properties
```python
date = EthiopicDate(2017, 1, 1)

# Basic properties
print(f"Year: {date.year}")
print(f"Month: {date.month}")
print(f"Day: {date.day}")

# Calendar information
print(f"Month name: {date.get_month_name()}")
print(f"Day of week: {date.get_day_of_week()}")
print(f"Days in month: {date.get_days_in_month()}")
print(f"Is leap year: {date.is_leap_year()}")
```

### Date Arithmetic
```python
date = EthiopicDate(2017, 1, 1)

# Add time periods
tomorrow = date.add_days(1)
next_week = date.add_days(7)
next_month = date.add_months(1)
next_year = date.add_years(1)

print(f"Original: {date}")
print(f"Tomorrow: {tomorrow}")
print(f"Next week: {next_week}")
print(f"Next month: {next_month}")
print(f"Next year: {next_year}")

# Calculate differences
christmas = EthiopicDate(2017, 4, 29)
days_until = christmas.diff_days(date)
print(f"Days until Christmas: {days_until}")
```

## Date Validation

### Validation Functions
```python
from ethiopian_date_converter import is_valid_ethiopic_date, is_valid_gregorian_date, is_gregorian_leap

# Ethiopian date validation
print(is_valid_ethiopic_date(2017, 1, 1))   # True
print(is_valid_ethiopic_date(2017, 13, 6))  # False (not leap year)
print(is_valid_ethiopic_date(2015, 13, 6))  # True (leap year)

# Gregorian date validation
print(is_valid_gregorian_date(2024, 2, 29))  # True (leap year)
print(is_valid_gregorian_date(2023, 2, 29))  # False (not leap year)

# Leap year detection
print(is_gregorian_leap(2024))  # True
print(is_gregorian_leap(2023))  # False
```

### Class-Based Validation
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate

# Static validation methods
print(EthiopicDate.is_valid(2017, 1, 1))     # True
print(GregorianDate.is_valid(2024, 2, 29))   # True

# Instance validation
date = EthiopicDate(2015, 13, 1)
print(f"Is leap year: {date.is_leap_year()}")  # True
print(f"Days in Pagume: {date.get_days_in_month()}")  # 6
```

## Holiday Detection

### Built-in Holidays
```python
from ethiopian_date_converter import EthiopicDate

# Ethiopian holidays
new_year = EthiopicDate(2017, 1, 1)
print(f"Is holiday: {new_year.is_holiday()}")          # True
print(f"Holiday name: {new_year.get_holiday_name()}")  # "Ethiopian New Year"

christmas = EthiopicDate(2017, 4, 29)
print(f"Is holiday: {christmas.is_holiday()}")         # True
print(f"Holiday name: {christmas.get_holiday_name()}")  # "Ethiopian Christmas"

# Regular day
regular_day = EthiopicDate(2017, 2, 15)
print(f"Is holiday: {regular_day.is_holiday()}")       # False
print(f"Holiday name: {regular_day.get_holiday_name()}")  # None
```

### Holiday Utilities
```python
from ethiopian_date_converter.utils import get_holidays, find_next_holiday

# Get all holidays for a year
holidays = get_holidays(2017, "ethiopic")
for holiday in holidays:
    print(f"{holiday['name']}: {holiday['date']}")

# Find next holiday
next_holiday = find_next_holiday(EthiopicDate(2017, 1, 15))
if next_holiday:
    print(f"Next holiday: {next_holiday['name']} in {next_holiday['days_until']} days")
```

## Formatting and Localization

### Date Formatting
```python
date = EthiopicDate(2017, 1, 1)

# Basic formatting
print(date.format("YYYY-MM-DD"))           # "2017-01-01"
print(date.format("DD/MM/YYYY"))           # "01/01/2017"
print(date.format("DD MMMM YYYY"))         # "01 Meskerem 2017"
print(date.format("DDDD, DD MMMM YYYY"))   # "Wednesday, 01 Meskerem 2017"

# Custom patterns
print(date.format("Month: MMMM, Day: DDDD"))  # "Month: Meskerem, Day: Wednesday"
```

### Multi-Language Support
```python
date = EthiopicDate(2017, 1, 1)

# English (default)
print(f"Month (EN): {date.get_month_name('en')}")    # "Meskerem"
print(f"Day (EN): {date.get_day_of_week('en')}")     # "Wednesday"

# Amharic
print(f"Month (AM): {date.get_month_name('am')}")    # "መስከረም"
print(f"Day (AM): {date.get_day_of_week('am')}")     # "ረቡዕ"

# Formatted in Amharic
print(date.format("DD MMMM YYYY", "am"))             # "01 መስከረም 2017"
```

## Calendar Utilities

### Current Dates
```python
from ethiopian_date_converter import get_current_ethiopic_date, get_current_gregorian_date

# Get current dates
current_ethiopic = get_current_ethiopic_date()
current_gregorian = get_current_gregorian_date()

print(f"Today (Ethiopian): {current_ethiopic}")
print(f"Today (Gregorian): {current_gregorian}")
```

### Calendar Generation
```python
from ethiopian_date_converter.utils import generate_calendar

# Generate Ethiopian calendar for Meskerem 2017
calendar = generate_calendar(2017, 1, "ethiopic")

print(f"Month: {calendar['month_name']}")
print(f"Days in month: {calendar['days_in_month']}")
print("Calendar grid:")
for week in calendar['calendar_grid']:
    print(week)
```

### Business Days
```python
from ethiopian_date_converter.utils import get_business_days

start_date = EthiopicDate(2017, 1, 1)
end_date = EthiopicDate(2017, 1, 30)

# Calculate business days (excluding weekends and holidays)
business_days = get_business_days(start_date, end_date, exclude_holidays=True)
print(f"Business days in Meskerem 2017: {business_days}")
```

## Error Handling

### Common Errors
```python
from ethiopian_date_converter import EthiopicDate, ethiopic_to_gregorian
from ethiopian_date_converter.date_classes import InvalidDateError

# Invalid date creation
try:
    invalid_date = EthiopicDate(2017, 13, 7)  # Invalid Pagume day
except InvalidDateError as e:
    print(f"Date creation error: {e}")

# Invalid conversion
try:
    result = ethiopic_to_gregorian(2017, 0, 1)  # Invalid month
except ValueError as e:
    print(f"Conversion error: {e}")

# Type errors
try:
    result = ethiopic_to_gregorian("2017", 1, 1)  # Wrong type
except TypeError as e:
    print(f"Type error: {e}")
```

### Best Practices
```python
# Always validate before conversion
year, month, day = 2017, 1, 1
if EthiopicDate.is_valid(year, month, day):
    date = EthiopicDate(year, month, day)
    print(f"Valid date: {date}")
else:
    print("Invalid date provided")

# Handle edge cases
try:
    # Leap year Pagume
    pagume = EthiopicDate(2015, 13, 6)
    print(f"Leap year Pagume: {pagume}")
except InvalidDateError:
    print("Not a valid Pagume date")
```

## Performance Tips

### Efficient Conversions
```python
from ethiopian_date_converter import EthiopicDate

# For single conversions, use functions
from ethiopian_date_converter import ethiopic_to_gregorian
result = ethiopic_to_gregorian(2017, 1, 1)

# For multiple operations, use date objects
date = EthiopicDate(2017, 1, 1)
gregorian = date.to_gregorian()
next_month = date.add_months(1)
month_name = date.get_month_name()
```

### Bulk Operations
```python
# Process multiple dates efficiently
dates = [(2017, 1, 1), (2017, 2, 1), (2017, 3, 1)]

# Convert all at once
converted = [ethiopic_to_gregorian(y, m, d) for y, m, d in dates]

# Or use date objects for complex operations
date_objects = [EthiopicDate(y, m, d) for y, m, d in dates]
month_names = [date.get_month_name() for date in date_objects]
```

## Next Steps

Now that you understand the basics:

1. **Explore Examples**: Check out the [Examples](examples.md) page for real-world usage
2. **API Reference**: Review the complete [API Reference](api-reference.md)
3. **Advanced Features**: Learn about calendar utilities and business logic
4. **Integration**: Use the library in your applications

## Common Use Cases

- **Data Analysis**: Convert historical Ethiopian dates in datasets
- **Web Applications**: Build Ethiopian calendar interfaces
- **Business Systems**: Handle Ethiopian business dates and holidays
- **Educational Tools**: Create calendar learning applications
- **Personal Projects**: Build Ethiopian date utilities and converters
