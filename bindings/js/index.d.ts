/* Copyright (c) 2025 Abiy */

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

export declare class DateConverter {
    static ethiopicToGregorian(year: number, month: number, day: number, era?: number | null): DateObject;
    static gregorianToEthiopic(year: number, month: number, day: number): DateObject;
    static isValidEthiopicDate(year: number, month: number, day: number): boolean;
    static isValidGregorianDate(year: number, month: number, day: number): boolean;
    static isGregorianLeap(year: number): boolean;
    static readonly EPOCHS: EpochConstants;
}

export declare function ethiopicToGregorian(year: number, month: number, day: number, era?: number | null): DateObject;
export declare function gregorianToEthiopic(year: number, month: number, day: number): DateObject;
export declare function isValidEthiopicDate(year: number, month: number, day: number): boolean;
export declare function isValidGregorianDate(year: number, month: number, day: number): boolean;
export declare function isGregorianLeap(year: number): boolean;

export declare const EPOCHS: EpochConstants;
