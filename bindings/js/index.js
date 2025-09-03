/* Copyright (c) 2025 Abiy */

const addon = require('./build/Release/ethiopic_calendar');
const { 
    EthiopicDate, 
    GregorianDate, 
    CalendarUtils, 
    MONTH_NAMES, 
    DAY_NAMES, 
    ETHIOPIAN_HOLIDAYS, 
    ETHIOPIAN_SEASONS 
} = require('./lib/enhanced-date-converter');

class DateConverter {
    
    static ethiopicToGregorian(year, month, day, era = null) {
        return addon.ethiopicToGregorian(year, month, day, era);
    }
    
    static gregorianToEthiopic(year, month, day) {
        return addon.gregorianToEthiopic(year, month, day);
    }
    
    static isValidEthiopicDate(year, month, day) {
        return addon.isValidEthiopicDate(year, month, day);
    }
    
    static isValidGregorianDate(year, month, day) {
        return addon.isValidGregorianDate(year, month, day);
    }
    
    static isGregorianLeap(year) {
        return addon.isGregorianLeap(year);
    }
    
    // JDN helper methods
    static ethiopicToJDN(year, month, day, era = null) {
        return addon.ethiopicToJDN(year, month, day, era);
    }
    
    static gregorianToJDN(year, month, day) {
        return addon.gregorianToJDN(year, month, day);
    }
    
    static jdnToEthiopic(jdn, era = null) {
        return addon.jdnToEthiopic(jdn, era);
    }
    
    static jdnToGregorian(jdn) {
        return addon.jdnToGregorian(jdn);
    }
    
    static getDayOfWeek(jdn) {
        return addon.getDayOfWeek(jdn);
    }
    
    // Convenience methods for current dates
    static today() {
        return {
            ethiopic: EthiopicDate.today(),
            gregorian: GregorianDate.today()
        };
    }
    
    static get EPOCHS() {
        return {
            AMETE_ALEM: addon.JD_EPOCH_OFFSET_AMETE_ALEM,
            AMETE_MIHRET: addon.JD_EPOCH_OFFSET_AMETE_MIHRET,
            GREGORIAN: addon.JD_EPOCH_OFFSET_GREGORIAN
        };
    }
}


// Legacy function exports for backward compatibility
function ethiopicToGregorian(year, month, day, era = null) {
    return DateConverter.ethiopicToGregorian(year, month, day, era);
}

function gregorianToEthiopic(year, month, day) {
    return DateConverter.gregorianToEthiopic(year, month, day);
}

// Utility functions
function getCurrentEthiopicDate() {
    return EthiopicDate.today();
}

function getCurrentGregorianDate() {
    return GregorianDate.today();
}

function generateCalendar(year, month, type = 'ethiopic') {
    if (type === 'ethiopic') {
        return CalendarUtils.generateEthiopicCalendar(year, month);
    } else {
        return CalendarUtils.generateGregorianCalendar(year, month);
    }
}

function getBusinessDays(startDate, endDate) {
    return CalendarUtils.getBusinessDaysBetween(startDate, endDate);
}

function getHolidays(year) {
    return CalendarUtils.getHolidaysInYear(year);
}

function findNextHoliday(fromDate, maxDays = 365) {
    return CalendarUtils.findNextHoliday(fromDate, maxDays);
}

function calculateAge(birthDate, referenceDate = null) {
    return CalendarUtils.calculateAge(birthDate, referenceDate);
}

module.exports = {
    // Core conversion functions
    ethiopicToGregorian,
    gregorianToEthiopic,
    isValidEthiopicDate: DateConverter.isValidEthiopicDate,
    isValidGregorianDate: DateConverter.isValidGregorianDate,
    isGregorianLeap: DateConverter.isGregorianLeap,
    
    // Date classes with full functionality
    EthiopicDate,
    GregorianDate,
    
    // JDN utilities
    ethiopicToJDN: DateConverter.ethiopicToJDN,
    gregorianToJDN: DateConverter.gregorianToJDN,
    jdnToEthiopic: DateConverter.jdnToEthiopic,
    jdnToGregorian: DateConverter.jdnToGregorian,
    getDayOfWeek: DateConverter.getDayOfWeek,
    
    // Calendar utilities
    CalendarUtils,
    generateCalendar,
    getBusinessDays,
    getCurrentEthiopicDate,
    getCurrentGregorianDate,
    getHolidays,
    findNextHoliday,
    calculateAge,
    
    // Constants
    MONTH_NAMES,
    DAY_NAMES,
    ETHIOPIAN_HOLIDAYS,
    ETHIOPIAN_SEASONS,
    EPOCHS: DateConverter.EPOCHS,
    
    // Legacy class for backward compatibility
    DateConverter
};
