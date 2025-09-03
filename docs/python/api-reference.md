# API Reference - Ethiopian Date Converter for Python

Complete API documentation for all classes, functions, and methods in the Ethiopian Date Converter Python library.

## Table of Contents

1. [Core Conversion Functions](#core-conversion-functions)
2. [Date Classes](#date-classes)
3. [Validation Functions](#validation-functions)
4. [Julian Day Number Functions](#julian-day-number-functions)
5. [Utility Functions](#utility-functions)
6. [Constants](#constants)
7. [Exceptions](#exceptions)
8. [Type Annotations](#type-annotations)

## Core Conversion Functions

### `ethiopic_to_gregorian(year, month, day, era=None)`

Convert Ethiopian date to Gregorian date.

**Parameters:**
- `year` (int): Ethiopian year
- `month` (int): Ethiopian month (1-13)
- `day` (int): Ethiopian day (1-30, or 1-6 for Pagume)
- `era` (int, optional): Ethiopian era offset. Defaults to auto-detection.

**Returns:**
- `Dict[str, int]`: Dictionary with keys 'year', 'month', 'day'

**Raises:**
- `ValueError`: If the Ethiopian date is invalid

**Example:**
```python
result = ethiopic_to_gregorian(2017, 1, 1)
# Returns: {'year': 2024, 'month': 9, 'day': 11}
```

### `gregorian_to_ethiopic(year, month, day)`

Convert Gregorian date to Ethiopian date.

**Parameters:**
- `year` (int): Gregorian year
- `month` (int): Gregorian month (1-12)
- `day` (int): Gregorian day

**Returns:**
- `Dict[str, int]`: Dictionary with keys 'year', 'month', 'day'

**Raises:**
- `ValueError`: If the Gregorian date is invalid

**Example:**
```python
result = gregorian_to_ethiopic(2024, 9, 11)
# Returns: {'year': 2017, 'month': 1, 'day': 1}
```

## Date Classes

### `EthiopicDate`

Represents an Ethiopian calendar date with full functionality.

#### Constructor

```python
EthiopicDate(year: int, month: int, day: int)
```

**Parameters:**
- `year` (int): Ethiopian year
- `month` (int): Ethiopian month (1-13)
- `day` (int): Ethiopian day

**Raises:**
- `InvalidDateError`: If the date is invalid

#### Class Methods

##### `EthiopicDate.from_gregorian(gregorian_date)`

Create Ethiopian date from Gregorian date.

**Parameters:**
- `gregorian_date` (GregorianDate): Gregorian date object

**Returns:**
- `EthiopicDate`: New Ethiopian date object

##### `EthiopicDate.from_jdn(jdn, era=None)`

Create Ethiopian date from Julian Day Number.

**Parameters:**
- `jdn` (int): Julian Day Number
- `era` (int, optional): Ethiopian era offset

**Returns:**
- `EthiopicDate`: New Ethiopian date object

##### `EthiopicDate.today()`

Get current Ethiopian date.

**Returns:**
- `EthiopicDate`: Current Ethiopian date

##### `EthiopicDate.is_valid(year, month, day)`

Check if the given Ethiopian date is valid.

**Parameters:**
- `year` (int): Ethiopian year
- `month` (int): Ethiopian month
- `day` (int): Ethiopian day

**Returns:**
- `bool`: True if valid, False otherwise

#### Instance Methods

##### `to_gregorian()`

Convert to Gregorian date.

**Returns:**
- `GregorianDate`: Equivalent Gregorian date

##### `to_jdn(era=None)`

Convert to Julian Day Number.

**Parameters:**
- `era` (int, optional): Ethiopian era offset

**Returns:**
- `int`: Julian Day Number

##### `add_days(days)`

Add days to the date.

**Parameters:**
- `days` (int): Number of days to add (can be negative)

**Returns:**
- `EthiopicDate`: New date object

##### `add_months(months)`

Add months to the date.

**Parameters:**
- `months` (int): Number of months to add (can be negative)

**Returns:**
- `EthiopicDate`: New date object

##### `add_years(years)`

Add years to the date.

**Parameters:**
- `years` (int): Number of years to add (can be negative)

**Returns:**
- `EthiopicDate`: New date object

##### `diff_days(other)`

Calculate difference in days between two dates.

**Parameters:**
- `other` (EthiopicDate): Other Ethiopian date

**Returns:**
- `int`: Number of days difference

##### `get_day_of_week(locale="en")`

Get day of week name.

**Parameters:**
- `locale` (str): Language code ("en" or "am")

**Returns:**
- `str`: Day of week name

##### `get_month_name(locale="en")`

Get month name.

**Parameters:**
- `locale` (str): Language code ("en" or "am")

**Returns:**
- `str`: Month name

##### `is_leap_year()`

Check if the year is a leap year.

**Returns:**
- `bool`: True if leap year, False otherwise

##### `get_days_in_month()`

Get number of days in the current month.

**Returns:**
- `int`: Number of days in month

##### `is_holiday()`

Check if the date is a holiday.

**Returns:**
- `bool`: True if holiday, False otherwise

##### `get_holiday_name()`

Get holiday name if the date is a holiday.

**Returns:**
- `Optional[str]`: Holiday name or None

##### `format(format_string="YYYY-MM-DD", locale="en")`

Format the date according to the given pattern.

**Parameters:**
- `format_string` (str): Format pattern
- `locale` (str): Language code

**Supported patterns:**
- `YYYY`: 4-digit year
- `MM`: 2-digit month
- `DD`: 2-digit day
- `MMMM`: Full month name
- `DDDD`: Full day name

**Returns:**
- `str`: Formatted date string

**Example:**
```python
date = EthiopicDate(2017, 1, 1)
print(date.format("DD MMMM YYYY"))  # "01 Meskerem 2017"
```

#### Properties

- `year` (int): Ethiopian year
- `month` (int): Ethiopian month
- `day` (int): Ethiopian day

#### Comparison Operators

The `EthiopicDate` class supports all comparison operators:
- `==`, `!=`: Equality comparison
- `<`, `<=`, `>`, `>=`: Date ordering comparison

### `GregorianDate`

Represents a Gregorian calendar date with conversion capabilities.

#### Constructor

```python
GregorianDate(year: int, month: int, day: int)
```

#### Class Methods

##### `GregorianDate.from_ethiopic(ethiopic_date)`

Create Gregorian date from Ethiopian date.

**Parameters:**
- `ethiopic_date` (EthiopicDate): Ethiopian date object

**Returns:**
- `GregorianDate`: New Gregorian date object

##### `GregorianDate.from_jdn(jdn)`

Create Gregorian date from Julian Day Number.

**Parameters:**
- `jdn` (int): Julian Day Number

**Returns:**
- `GregorianDate`: New Gregorian date object

##### `GregorianDate.today()`

Get current Gregorian date.

**Returns:**
- `GregorianDate`: Current Gregorian date

##### `GregorianDate.is_valid(year, month, day)`

Check if the given Gregorian date is valid.

**Parameters:**
- `year` (int): Gregorian year
- `month` (int): Gregorian month
- `day` (int): Gregorian day

**Returns:**
- `bool`: True if valid, False otherwise

#### Instance Methods

##### `to_ethiopic()`

Convert to Ethiopian date.

**Returns:**
- `EthiopicDate`: Equivalent Ethiopian date

##### `to_jdn()`

Convert to Julian Day Number.

**Returns:**
- `int`: Julian Day Number

##### `is_leap_year()`

Check if the year is a leap year.

**Returns:**
- `bool`: True if leap year, False otherwise

##### `get_day_of_week(locale="en")`

Get day of week name.

**Parameters:**
- `locale` (str): Language code ("en" or "am")

**Returns:**
- `str`: Day of week name

##### `get_month_name(locale="en")`

Get month name.

**Parameters:**
- `locale` (str): Language code

**Returns:**
- `str`: Month name

##### `format(format_string="YYYY-MM-DD", locale="en")`

Format the date according to the given pattern.

**Parameters:**
- `format_string` (str): Format pattern
- `locale` (str): Language code

**Returns:**
- `str`: Formatted date string

## Validation Functions

### `is_valid_ethiopic_date(year, month, day)`

Check if an Ethiopian date is valid.

**Parameters:**
- `year` (int): Ethiopian year
- `month` (int): Ethiopian month
- `day` (int): Ethiopian day

**Returns:**
- `bool`: True if valid, False otherwise

### `is_valid_gregorian_date(year, month, day)`

Check if a Gregorian date is valid.

**Parameters:**
- `year` (int): Gregorian year
- `month` (int): Gregorian month
- `day` (int): Gregorian day

**Returns:**
- `bool`: True if valid, False otherwise

### `is_gregorian_leap(year)`

Check if a Gregorian year is a leap year.

**Parameters:**
- `year` (int): Gregorian year

**Returns:**
- `bool`: True if leap year, False otherwise

## Julian Day Number Functions

### `ethiopic_to_jdn(year, month, day, era=None)`

Convert Ethiopian date to Julian Day Number.

**Parameters:**
- `year` (int): Ethiopian year
- `month` (int): Ethiopian month
- `day` (int): Ethiopian day
- `era` (int, optional): Ethiopian era offset

**Returns:**
- `int`: Julian Day Number

### `gregorian_to_jdn(year, month, day)`

Convert Gregorian date to Julian Day Number.

**Parameters:**
- `year` (int): Gregorian year
- `month` (int): Gregorian month
- `day` (int): Gregorian day

**Returns:**
- `int`: Julian Day Number

### `jdn_to_ethiopic(jdn, era=None)`

Convert Julian Day Number to Ethiopian date.

**Parameters:**
- `jdn` (int): Julian Day Number
- `era` (int, optional): Ethiopian era offset

**Returns:**
- `Dict[str, int]`: Dictionary with keys 'year', 'month', 'day'

### `jdn_to_gregorian(jdn)`

Convert Julian Day Number to Gregorian date.

**Parameters:**
- `jdn` (int): Julian Day Number

**Returns:**
- `Dict[str, int]`: Dictionary with keys 'year', 'month', 'day'

### `get_day_of_week(jdn)`

Get day of week from Julian Day Number.

**Parameters:**
- `jdn` (int): Julian Day Number

**Returns:**
- `int`: Day of week (0=Monday, 1=Tuesday, ..., 6=Sunday)

## Utility Functions

### `get_current_ethiopic_date()`

Get the current Ethiopian date.

**Returns:**
- `EthiopicDate`: Current Ethiopian date

### `get_current_gregorian_date()`

Get the current Gregorian date.

**Returns:**
- `GregorianDate`: Current Gregorian date

### `generate_calendar(year, month, calendar_type="ethiopic")`

Generate a calendar for the specified month and year.

**Parameters:**
- `year` (int): Year
- `month` (int): Month
- `calendar_type` (str): "ethiopic" or "gregorian"

**Returns:**
- `Dict[str, Any]`: Calendar information including:
  - `year`: Year
  - `month`: Month number
  - `month_name`: Month name
  - `days_in_month`: Number of days
  - `calendar_grid`: 2D array of calendar days
  - `holidays`: List of holidays in month

### `get_business_days(start_date, end_date, exclude_holidays=True)`

Calculate business days between two Ethiopian dates.

**Parameters:**
- `start_date` (EthiopicDate): Start date
- `end_date` (EthiopicDate): End date
- `exclude_holidays` (bool): Whether to exclude holidays

**Returns:**
- `int`: Number of business days

### `get_holidays(year, calendar_type="ethiopic")`

Get all holidays for a given year.

**Parameters:**
- `year` (int): Year
- `calendar_type` (str): "ethiopic" or "gregorian"

**Returns:**
- `List[Dict[str, Any]]`: List of holiday dictionaries

### `get_holidays_in_month(year, month, calendar_type="ethiopic")`

Get holidays in a specific month.

**Parameters:**
- `year` (int): Year
- `month` (int): Month
- `calendar_type` (str): "ethiopic" or "gregorian"

**Returns:**
- `List[Dict[str, Any]]`: List of holiday dictionaries

### `calculate_age(birth_date, reference_date=None)`

Calculate age from Ethiopian birth date.

**Parameters:**
- `birth_date` (EthiopicDate): Birth date
- `reference_date` (EthiopicDate, optional): Reference date (default: today)

**Returns:**
- `Dict[str, int]`: Dictionary with keys 'years', 'months', 'days'

### `find_next_holiday(start_date, max_days=365)`

Find the next holiday after the given date.

**Parameters:**
- `start_date` (EthiopicDate): Starting date
- `max_days` (int): Maximum days to search

**Returns:**
- `Optional[Dict[str, Any]]`: Holiday information or None

## Constants

### Calendar Constants

```python
JD_EPOCH_OFFSET_AMETE_ALEM = -285019
JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856
JD_EPOCH_OFFSET_GREGORIAN = 1721426

ETHIOPIC_MONTHS_PER_YEAR = 13
ETHIOPIC_DAYS_PER_MONTH = 30
GREGORIAN_MONTHS_PER_YEAR = 12
```

### Month Names

```python
ETHIOPIC_MONTHS = {
    "en": [
        "Meskerem", "Tikemt", "Hidar", "Tahsas", "Tir", "Yakatit",
        "Magabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"
    ],
    "am": [
        "መስከረም", "ትክምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት",
        "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
    ]
}

GREGORIAN_MONTHS = {
    "en": [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
}
```

### Weekday Names

```python
WEEKDAYS = {
    "en": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "am": ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ", "እሁድ"]
}
```

### Holiday Definitions

```python
ETHIOPIAN_HOLIDAYS = {
    "Ethiopian New Year": (1, 1),
    "Finding of the True Cross": (1, 17),
    "Ethiopian Christmas": (4, 29),
    "Epiphany (Timkat)": (5, 11),
    "Battle of Adwa": (6, 23),
    "Good Friday": None,  # Variable date
    "Easter": None,       # Variable date
}
```

## Exceptions

### `InvalidDateError`

Raised when an invalid date is provided to date constructors.

**Base Class:** `ValueError`

**Example:**
```python
from ethiopian_date_converter.date_classes import InvalidDateError

try:
    invalid_date = EthiopicDate(2017, 13, 7)  # Invalid Pagume day
except InvalidDateError as e:
    print(f"Invalid date: {e}")
```

## Type Annotations

The library includes comprehensive type annotations for better IDE support and type checking.

### Type Aliases

```python
from typing import Dict, List, Optional, Union, Any

DateDict = Dict[str, int]  # {'year': int, 'month': int, 'day': int}
HolidayDict = Dict[str, Any]  # Holiday information dictionary
CalendarGrid = List[List[Optional[int]]]  # Calendar grid representation
```

### Function Signatures

```python
def ethiopic_to_gregorian(year: int, month: int, day: int, era: Optional[int] = None) -> DateDict: ...

def gregorian_to_ethiopic(year: int, month: int, day: int) -> DateDict: ...

def is_valid_ethiopic_date(year: int, month: int, day: int) -> bool: ...

class EthiopicDate:
    def __init__(self, year: int, month: int, day: int) -> None: ...
    def add_days(self, days: int) -> 'EthiopicDate': ...
    def format(self, format_string: str = "YYYY-MM-DD", locale: str = "en") -> str: ...
```

## Error Handling Best Practices

### Validation Before Creation

```python
from ethiopian_date_converter import EthiopicDate
from ethiopian_date_converter.date_classes import InvalidDateError

# Always validate input
year, month, day = 2017, 13, 7

if EthiopicDate.is_valid(year, month, day):
    date = EthiopicDate(year, month, day)
else:
    print("Invalid date provided")

# Or use try-catch
try:
    date = EthiopicDate(year, month, day)
except InvalidDateError as e:
    print(f"Date creation failed: {e}")
```

### Conversion Error Handling

```python
from ethiopian_date_converter import ethiopic_to_gregorian

try:
    result = ethiopic_to_gregorian(2017, 13, 7)  # Invalid date
except ValueError as e:
    print(f"Conversion failed: {e}")
```

## Performance Considerations

### Efficient Date Operations

For multiple operations on the same date, use date objects rather than repeated function calls:

```python
# Less efficient
for i in range(100):
    result = ethiopic_to_gregorian(2017, 1, i)

# More efficient
dates = [EthiopicDate(2017, 1, i) for i in range(1, 31)]
gregorian_dates = [date.to_gregorian() for date in dates]
```

### Memory Usage

Date objects are lightweight and can be created frequently without significant memory overhead:

```python
# This is fine for large datasets
large_dataset = [EthiopicDate(year, month, day) 
                for year in range(2000, 2020)
                for month in range(1, 14)
                for day in range(1, 31)
                if EthiopicDate.is_valid(year, month, day)]
```

This completes the comprehensive API reference for the Ethiopian Date Converter Python library.
