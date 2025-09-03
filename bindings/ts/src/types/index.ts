/**
 * TypeScript definitions for Ethiopian Date Converter
 */

export interface DateObject {
    year: number;
    month: number;
    day: number;
}

export interface EpochConstants {
    readonly AMETE_ALEM: number;
    readonly AMETE_MIHRET: number;
    readonly GREGORIAN: number;
}

export interface MonthNames {
    ethiopic: {
        en: string[];
        am: string[];
        gez: string[];
    };
    gregorian: {
        en: string[];
        short: string[];
    };
}

export interface DayNames {
    en: string[];
    short: string[];
    am: string[];
    gez: string[];
}

export interface Holiday {
    month: number;
    day: number;
    name: string;
    nameAm: string;
}

export interface EthiopianHolidays {
    fixed: Holiday[];
    variable: Array<{ name: string; nameAm: string; }>;
}

export interface Season {
    name: string;
    nameAm: string;
    months: number[];
    description: string;
}

export interface CalendarDayInfo {
    date: EthiopicDate | GregorianDate;
    day: number;
    isToday: boolean;
    isHoliday?: boolean;
    holiday?: string;
}

export interface CalendarMonth {
    year: number;
    month: number;
    monthName: string;
    weeks: Array<Array<CalendarDayInfo | null>>;
    daysInMonth: number;
}

export type LanguageCode = 'en' | 'am' | 'gez' | 'short';
export type FormatPattern = string;

// Forward declarations for circular dependencies
export interface EthiopicDate {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}

export interface GregorianDate {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}

// Native binding interface
export interface NativeBinding {
    ethiopicToGregorian(year: number, month: number, day: number, era?: number | null): DateObject;
    gregorianToEthiopic(year: number, month: number, day: number): DateObject;
    isValidEthiopicDate(year: number, month: number, day: number): boolean;
    isValidGregorianDate(year: number, month: number, day: number): boolean;
    isGregorianLeap(year: number): boolean;
    
    ethiopicToJDN(year: number, month: number, day: number, era?: number | null): number;
    gregorianToJDN(year: number, month: number, day: number): number;
    jdnToEthiopic(jdn: number, era?: number | null): DateObject;
    jdnToGregorian(jdn: number): DateObject;
    getDayOfWeek(jdn: number): number;
    
    readonly JD_EPOCH_OFFSET_AMETE_ALEM: number;
    readonly JD_EPOCH_OFFSET_AMETE_MIHRET: number;
    readonly JD_EPOCH_OFFSET_GREGORIAN: number;
}

