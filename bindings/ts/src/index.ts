/**
 * Ethiopian Date Converter - TypeScript Native Implementation
 * 
 * A comprehensive TypeScript library for converting between Ethiopian and Gregorian calendars
 * with full type safety and modern development experience.
 */

import { NativeBinding } from './types';
import { EthiopicDate } from './lib/EthiopicDate';
import { GregorianDate } from './lib/GregorianDate';
import { MONTH_NAMES, DAY_NAMES, ETHIOPIAN_HOLIDAYS, ETHIOPIAN_SEASONS } from './lib/constants';

// Load native binding
let binding: NativeBinding;
try {
    binding = require('../build/Release/ethiopic_calendar_ts.node');
} catch (error) {
    throw new Error('Failed to load native binding. Make sure to run "npm run build" first.');
}

// Initialize date classes with binding
EthiopicDate.initBinding(binding);
GregorianDate.initBinding(binding);

/**
 * Calendar utilities for advanced operations
 */
export class CalendarUtils {
    /**
     * Generate calendar month view for Ethiopian calendar
     */
    static generateEthiopicCalendar(year: number, month: number) {
        const firstDay = new EthiopicDate(year, month, 1);
        const firstDayOfWeek = firstDay.getDayOfWeek();
        
        // Get number of days in this month
        let daysInMonth = 30;
        if (month === 13) {
            try {
                new EthiopicDate(year, month, 6);
                daysInMonth = 6; // Leap year
            } catch (e) {
                daysInMonth = 5; // Regular year
            }
        }
        
        const calendar: Array<Array<any | null>> = [];
        let currentWeek: Array<any | null> = new Array(7).fill(null);
        
        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new EthiopicDate(year, month, day);
            const dayOfWeek = (day - 1 + firstDayOfWeek) % 7;
            currentWeek[dayOfWeek] = {
                date: date,
                day: day,
                isToday: date.isToday(),
                isHoliday: date.isHoliday(),
                holiday: date.getHoliday()
            };
            
            if (dayOfWeek === 6 || day === daysInMonth) {
                calendar.push([...currentWeek]);
                currentWeek = new Array(7).fill(null);
            }
        }
        
        return {
            year: year,
            month: month,
            monthName: firstDay.getMonthName(),
            weeks: calendar,
            daysInMonth: daysInMonth
        };
    }

    /**
     * Generate calendar month view for Gregorian calendar
     */
    static generateGregorianCalendar(year: number, month: number) {
        const firstDay = new GregorianDate(year, month, 1);
        const firstDayOfWeek = firstDay.getDayOfWeek();
        const daysInMonth = firstDay.isLeapYear() && month === 2 ? 29 : 
                           month === 2 ? 28 :
                           [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
        
        const calendar: Array<Array<any | null>> = [];
        let currentWeek: Array<any | null> = new Array(7).fill(null);
        
        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new GregorianDate(year, month, day);
            const dayOfWeek = (day - 1 + firstDayOfWeek) % 7;
            currentWeek[dayOfWeek] = {
                date: date,
                day: day,
                isToday: date.isToday()
            };
            
            if (dayOfWeek === 6 || day === daysInMonth) {
                calendar.push([...currentWeek]);
                currentWeek = new Array(7).fill(null);
            }
        }
        
        return {
            year: year,
            month: month,
            monthName: firstDay.getMonthName(),
            weeks: calendar,
            daysInMonth: daysInMonth
        };
    }

    /**
     * Get business days between two dates (excluding weekends)
     */
    static getBusinessDaysBetween(startDate: EthiopicDate | GregorianDate, endDate: EthiopicDate | GregorianDate): number {
        let count = 0;
        let current = startDate.clone();
        
        while (current.isBefore(endDate) || current.isSame(endDate)) {
            const dayOfWeek = current.getDayOfWeek();
            // Monday = 0, ..., Friday = 4, Saturday = 5, Sunday = 6
            if (dayOfWeek <= 4) { // Monday to Friday
                count++;
            }
            current = current.addDays(1);
        }
        
        return count;
    }
}

/**
 * Enhanced converter class with additional utilities
 */
export class DateConverter {
    /**
     * Get current dates in both calendars
     */
    static today() {
        return {
            ethiopic: EthiopicDate.today(),
            gregorian: GregorianDate.today()
        };
    }

    /**
     * Convert Ethiopian date to Gregorian (returns plain object)
     */
    static ethiopicToGregorian(year: number, month: number, day: number, era?: number | null) {
        return binding.ethiopicToGregorian(year, month, day, era);
    }

    /**
     * Convert Gregorian date to Ethiopian (returns plain object)
     */
    static gregorianToEthiopic(year: number, month: number, day: number) {
        return binding.gregorianToEthiopic(year, month, day);
    }

    /**
     * Validate Ethiopian date
     */
    static isValidEthiopicDate(year: number, month: number, day: number): boolean {
        return binding.isValidEthiopicDate(year, month, day);
    }

    /**
     * Validate Gregorian date
     */
    static isValidGregorianDate(year: number, month: number, day: number): boolean {
        return binding.isValidGregorianDate(year, month, day);
    }

    /**
     * Check if Gregorian year is leap year
     */
    static isGregorianLeap(year: number): boolean {
        return binding.isGregorianLeap(year);
    }

    // JDN utility methods
    static ethiopicToJDN(year: number, month: number, day: number, era?: number | null): number {
        return binding.ethiopicToJDN(year, month, day, era);
    }

    static gregorianToJDN(year: number, month: number, day: number): number {
        return binding.gregorianToJDN(year, month, day);
    }

    static jdnToEthiopic(jdn: number, era?: number | null) {
        return binding.jdnToEthiopic(jdn, era);
    }

    static jdnToGregorian(jdn: number) {
        return binding.jdnToGregorian(jdn);
    }

    static getDayOfWeek(jdn: number): number {
        return binding.getDayOfWeek(jdn);
    }

    /**
     * Get epoch constants
     */
    static get EPOCHS() {
        return {
            AMETE_ALEM: binding.JD_EPOCH_OFFSET_AMETE_ALEM,
            AMETE_MIHRET: binding.JD_EPOCH_OFFSET_AMETE_MIHRET,
            GREGORIAN: binding.JD_EPOCH_OFFSET_GREGORIAN
        };
    }
}

// Legacy function exports for backward compatibility
export function ethiopicToGregorian(year: number, month: number, day: number, era?: number | null) {
    return DateConverter.ethiopicToGregorian(year, month, day, era);
}

export function gregorianToEthiopic(year: number, month: number, day: number) {
    return DateConverter.gregorianToEthiopic(year, month, day);
}

export function isValidEthiopicDate(year: number, month: number, day: number): boolean {
    return DateConverter.isValidEthiopicDate(year, month, day);
}

export function isValidGregorianDate(year: number, month: number, day: number): boolean {
    return DateConverter.isValidGregorianDate(year, month, day);
}

export function isGregorianLeap(year: number): boolean {
    return DateConverter.isGregorianLeap(year);
}

// JDN utilities
export function ethiopicToJDN(year: number, month: number, day: number, era?: number | null): number {
    return DateConverter.ethiopicToJDN(year, month, day, era);
}

export function gregorianToJDN(year: number, month: number, day: number): number {
    return DateConverter.gregorianToJDN(year, month, day);
}

export function jdnToEthiopic(jdn: number, era?: number | null) {
    return DateConverter.jdnToEthiopic(jdn, era);
}

export function jdnToGregorian(jdn: number) {
    return DateConverter.jdnToGregorian(jdn);
}

export function getDayOfWeek(jdn: number): number {
    return DateConverter.getDayOfWeek(jdn);
}

// Main exports
export {
    EthiopicDate,
    GregorianDate,
    MONTH_NAMES,
    DAY_NAMES,
    ETHIOPIAN_HOLIDAYS,
    ETHIOPIAN_SEASONS
};

// Type exports
export * from './types';

// Default export for convenience
export default {
    EthiopicDate,
    GregorianDate,
    CalendarUtils,
    DateConverter,
    MONTH_NAMES,
    DAY_NAMES,
    ETHIOPIAN_HOLIDAYS,
    ETHIOPIAN_SEASONS
};

