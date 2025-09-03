# Ethiopian Date Converter for Python

Complete documentation for the Ethiopian calendar date conversion library for Python.

## Overview

The Ethiopian Date Converter for Python provides high-performance date conversion between Ethiopian and Gregorian calendars using a native C implementation. It offers a rich set of features including date arithmetic, formatting, holiday detection, and calendar utilities.

## Features

### Core Functionality
- **Date Conversion**: Bidirectional conversion between Ethiopian and Gregorian calendars
- **Date Validation**: Comprehensive validation for both calendar systems
- **High Performance**: Native C implementation for maximum speed
- **Cross-Platform**: Works on Windows, macOS, and Linux

### Advanced Features
- **Date Classes**: Rich `EthiopicDate` and `GregorianDate` objects with full functionality
- **Date Arithmetic**: Add/subtract days, months, years with automatic overflow handling
- **Holiday Detection**: Built-in Ethiopian holiday recognition
- **Multi-Language Support**: English and Amharic month/day names
- **Calendar Utilities**: Generate calendar grids, calculate business days
- **Formatting**: Flexible date formatting with custom patterns

### Python-Specific Enhancements
- **Pythonic API**: Natural Python syntax and conventions
- **Type Hints**: Full type annotation support
- **Rich Comparison**: Complete comparison operator support
- **Iterator Support**: Calendar generation with iterator patterns
- **Context Managers**: Resource management for bulk operations

## Quick Start

### Installation
```bash
pip install ethiopian-date-converter-py
```

### Basic Usage
```python
from ethiopian_date_converter import EthiopicDate, GregorianDate

# Create dates
ethiopic = EthiopicDate(2017, 1, 1)  # Ethiopian New Year
gregorian = ethiopic.to_gregorian()

print(f"Ethiopian: {ethiopic}")      # 2017-01-01
print(f"Gregorian: {gregorian}")     # 2024-09-11

# Date arithmetic
next_month = ethiopic.add_months(1)
print(f"Next month: {next_month}")   # 2017-02-01

# Holiday detection
print(f"Is holiday: {ethiopic.is_holiday()}")          # True
print(f"Holiday name: {ethiopic.get_holiday_name()}")  # Ethiopian New Year
```

## Calendar Systems

### Ethiopian Calendar
- **Structure**: 13 months (12 months of 30 days + Pagume)
- **Pagume**: 5 days (normal year), 6 days (leap year)
- **Leap Years**: Every 4 years when `year % 4 == 3`
- **Era**: Primarily uses Amete Mihret (Anno Domini equivalent)

### Supported Ranges
- **Ethiopian**: 1000-3000 EC (recommended range)
- **Gregorian**: 1007-4007 AD
- **Optimal**: 1900-2100 AD for modern applications

## Package Architecture

### Core Modules
- **`converter`**: Low-level conversion functions using ctypes
- **`date_classes`**: High-level `EthiopicDate` and `GregorianDate` classes
- **`constants`**: Month names, holidays, and calendar constants
- **`utils`**: Calendar utilities and helper functions

### Native Integration
- **C Library**: Compiled automatically during installation
- **Cross-Platform**: Supports Windows, macOS, and Linux
- **Performance**: Optimized for high-frequency conversions

## Documentation Structure

This documentation is organized into several sections:

### [Getting Started](getting-started.md)
- Installation instructions
- Basic setup and configuration
- First steps with the library
- Common use cases

### [Examples](examples.md)
- Comprehensive code examples
- Real-world usage scenarios
- Best practices and patterns
- Performance tips

### [API Reference](api-reference.md)
- Complete function and class documentation
- Parameter descriptions and return values
- Error handling and exceptions
- Type annotations

## Comparison with Other Versions

### JavaScript/TypeScript vs Python

| Feature | JavaScript | TypeScript | Python |
|---------|------------|------------|--------|
| Core Conversion | Yes | Yes | Yes |
| Date Classes | Basic | Advanced | Enhanced |
| Type Safety | No | Yes | Yes (hints) |
| Holiday Detection | No | Yes | Yes |
| Date Arithmetic | No | Yes | Yes |
| Calendar Utils | No | Yes | Yes Enhanced |
| Business Days | No | Yes | Yes |
| Age Calculation | No | No | Yes |
| Multi-language | No | Yes | Yes |

### Python-Specific Advantages
- **Rich Standard Library**: Integration with `datetime`, `calendar`
- **Scientific Computing**: Compatible with NumPy/Pandas workflows
- **Data Analysis**: Perfect for data science applications
- **Scripting**: Ideal for automation and batch processing

## Performance Considerations

### Optimization Tips
- Use date classes for complex operations
- Batch conversions when possible
- Cache frequently used dates
- Leverage Julian Day Numbers for arithmetic

### Memory Usage
- Date objects are lightweight
- No hidden allocations in core functions
- Efficient string formatting
- Minimal memory overhead

## Error Handling

The library provides comprehensive error handling:

```python
from ethiopian_date_converter.date_classes import InvalidDateError

try:
    invalid_date = EthiopicDate(2017, 13, 7)  # Invalid Pagume day
except InvalidDateError as e:
    print(f"Date error: {e}")

try:
    result = ethiopic_to_gregorian(2017, 0, 1)  # Invalid month
except ValueError as e:
    print(f"Value error: {e}")
```

## Contributing

The Ethiopian Date Converter is open source and welcomes contributions:

- **Bug Reports**: Submit issues on GitHub
- **Feature Requests**: Propose new functionality
- **Code Contributions**: Submit pull requests
- **Documentation**: Help improve documentation

## License

MIT License - See the LICENSE file for details.

## Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and examples
- **Community**: Active development and support
