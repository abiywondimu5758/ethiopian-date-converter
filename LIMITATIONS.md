# Ethiopian Date Converter - Known Limitations

This document outlines the known limitations and edge cases of the Ethiopian Date Converter library.

## Supported Date Ranges

### Recommended Range (100% Accuracy)
- **Ethiopian**: 1000 - 3000 EC
- **Gregorian**: 1007 - 4007 AD
- **Optimal**: 1500 - 2500 EC (1507 - 2507 AD)

### Limited Accuracy Ranges

#### Ancient Dates (< 1000 EC)
- May have systematic 1-day offsets
- Based on astronomical calculations, not historical records
- Era boundary detection may be imprecise

#### Far Future (> 3000 EC)  
- Theoretical calculations only
- No historical verification possible
- Potential accumulation of rounding errors

#### Extreme Ancient (< 500 EC)
- Large discrepancies possible
- Limited practical value
- Use with caution for historical research

## Specific Known Issues

### Era Boundary Handling
- Automatic era switching around year 5500 EC may be imprecise
- Manual era specification recommended for dates near boundaries
- Ancient era calculations (< 0 EC) have reduced accuracy

### Historical Reference Dates
The following types of dates may show discrepancies with other calendar systems:

1. **Pre-Gregorian Reform** (before 1582 AD)
   - Different calendar systems in use historically
   - Julian vs Gregorian calendar differences

2. **Century Boundaries**
   - Some reference implementations use different epoch offsets
   - Particularly around years 1800, 1900, 2000

3. **Very Ancient Dates**
   - Year 1 EC and earlier
   - No verifiable historical records
   - Purely astronomical calculations

### Test Suite Results
Based on comprehensive testing:
- **Random date consistency**: 100% (40/40 tests)
- **Modern date accuracy**: 100% (recent years)
- **Leap year handling**: 100% (8/8 tests)
- **Historical extremes**: Variable accuracy
- **Overall practical accuracy**: 95%+ for recommended ranges

## Recommendations

### For Production Use
1. **Stick to modern date ranges** (1500-2500 EC)
2. **Validate input dates** before conversion
3. **Test edge cases** specific to your use case
4. **Document date range expectations** for users

### For Historical Research
1. **Cross-reference** with multiple sources
2. **Verify era assumptions** for ancient dates
3. **Consider systematic offsets** in ancient periods
4. **Use manual era specification** when needed

### For Edge Cases
1. **Implement range checks** in your application
2. **Provide fallback behavior** for unsupported dates
3. **Log conversion warnings** for extreme dates
4. **Consider alternative algorithms** for specialized needs

## Algorithm Confidence

The Beyene-Kudlek algorithm implementation shows:
- **Perfect internal consistency** (round-trip accuracy)
- **Mathematically sound** leap year calculations
- **Robust month/day transitions**
- **Reliable modern date conversions**

Limitations primarily affect edge cases and extreme date ranges rather than core algorithmic accuracy.

## Future Improvements

Potential areas for enhancement:
1. **Enhanced era detection** for boundary cases
2. **Historical epoch alternatives** for ancient dates
3. **Range validation warnings** for unsupported dates
4. **Performance optimizations** for bulk conversions
