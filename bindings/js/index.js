/* Copyright (c) 2025 Abiy */

const addon = require('./build/Release/ethiopic_calendar');

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
    
    static get EPOCHS() {
        return {
            AMETE_ALEM: addon.JD_EPOCH_OFFSET_AMETE_ALEM,
            AMETE_MIHRET: addon.JD_EPOCH_OFFSET_AMETE_MIHRET,
            GREGORIAN: addon.JD_EPOCH_OFFSET_GREGORIAN
        };
    }
}


function ethiopicToGregorian(year, month, day, era = null) {
    return DateConverter.ethiopicToGregorian(year, month, day, era);
}

function gregorianToEthiopic(year, month, day) {
    return DateConverter.gregorianToEthiopic(year, month, day);
}

module.exports = {
    DateConverter,
    ethiopicToGregorian,
    gregorianToEthiopic,
    isValidEthiopicDate: DateConverter.isValidEthiopicDate,
    isValidGregorianDate: DateConverter.isValidGregorianDate,
    isGregorianLeap: DateConverter.isGregorianLeap,
    EPOCHS: DateConverter.EPOCHS
};
