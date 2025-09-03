/* Copyright (c) 2025 Abiy */

#include <napi.h>
#include "core/ethiopic_calendar.h"


Napi::Object CreateDateObject(Napi::Env env, const date_t& date) {
    Napi::Object obj = Napi::Object::New(env);
    obj.Set("year", Napi::Number::New(env, date.year));
    obj.Set("month", Napi::Number::New(env, date.month));
    obj.Set("day", Napi::Number::New(env, date.day));
    return obj;
}


date_t ExtractDate(const Napi::Object& obj) {
    date_t date;
    date.year = obj.Get("year").As<Napi::Number>().Int32Value();
    date.month = obj.Get("month").As<Napi::Number>().Int32Value();
    date.day = obj.Get("day").As<Napi::Number>().Int32Value();
    return date;
}


Napi::Value EthiopicToGregorian(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Expected 3 arguments: year, month, day")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    
    // Optional era parameter (defaults to auto-detection)
    int64_t era = 0;
    if (info.Length() >= 4 && !info[3].IsNull() && !info[3].IsUndefined()) {
        era = info[3].As<Napi::Number>().Int64Value();
    } else {
        // Use auto-detection by converting to JDN first
        int64_t jdn = ethiopic_to_jdn(year, month, day, JD_EPOCH_OFFSET_AMETE_MIHRET);
        era = guess_era(jdn);
    }
    
    if (!is_valid_ethiopic_date(year, month, day)) {
        Napi::TypeError::New(env, "Invalid Ethiopian date")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    date_t result = ethiopic_to_gregorian(year, month, day, era);
    return CreateDateObject(env, result);
}


Napi::Value GregorianToEthiopic(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Expected 3 arguments: year, month, day")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    
    if (!is_valid_gregorian_date(year, month, day)) {
        Napi::TypeError::New(env, "Invalid Gregorian date")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    date_t result = gregorian_to_ethiopic(year, month, day);
    return CreateDateObject(env, result);
}


Napi::Value IsValidEthiopicDate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        return Napi::Boolean::New(env, false);
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    
    return Napi::Boolean::New(env, is_valid_ethiopic_date(year, month, day));
}


Napi::Value IsValidGregorianDate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        return Napi::Boolean::New(env, false);
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    
    return Napi::Boolean::New(env, is_valid_gregorian_date(year, month, day));
}


Napi::Value IsGregorianLeap(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        return Napi::Boolean::New(env, false);
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    return Napi::Boolean::New(env, is_gregorian_leap(year));
}

// JDN helper functions for date arithmetic
Napi::Value EthiopicToJDN(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Expected 3 arguments: year, month, day").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    int64_t era = (info.Length() > 3 && !info[3].IsNull()) ? info[3].As<Napi::Number>().Int64Value() : JD_EPOCH_OFFSET_AMETE_MIHRET;
    
    int64_t jdn = ethiopic_to_jdn(year, month, day, era);
    return Napi::Number::New(env, static_cast<double>(jdn));
}

Napi::Value GregorianToJDN(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Expected 3 arguments: year, month, day").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int32_t year = info[0].As<Napi::Number>().Int32Value();
    int32_t month = info[1].As<Napi::Number>().Int32Value();
    int32_t day = info[2].As<Napi::Number>().Int32Value();
    
    int64_t jdn = gregorian_to_jdn(year, month, day);
    return Napi::Number::New(env, static_cast<double>(jdn));
}

Napi::Value JDNToEthiopic(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Expected 1 argument: jdn").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int64_t jdn = static_cast<int64_t>(info[0].As<Napi::Number>().DoubleValue());
    int64_t era = (info.Length() > 1 && !info[1].IsNull()) ? info[1].As<Napi::Number>().Int64Value() : JD_EPOCH_OFFSET_AMETE_MIHRET;
    
    date_t result = jdn_to_ethiopic(jdn, era);
    
    Napi::Object obj = Napi::Object::New(env);
    obj.Set("year", Napi::Number::New(env, result.year));
    obj.Set("month", Napi::Number::New(env, result.month));
    obj.Set("day", Napi::Number::New(env, result.day));
    
    return obj;
}

Napi::Value JDNToGregorian(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Expected 1 argument: jdn").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int64_t jdn = static_cast<int64_t>(info[0].As<Napi::Number>().DoubleValue());
    date_t result = jdn_to_gregorian(jdn);
    
    Napi::Object obj = Napi::Object::New(env);
    obj.Set("year", Napi::Number::New(env, result.year));
    obj.Set("month", Napi::Number::New(env, result.month));
    obj.Set("day", Napi::Number::New(env, result.day));
    
    return obj;
}

Napi::Value GetDayOfWeek(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Expected 1 argument: jdn").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    int64_t jdn = static_cast<int64_t>(info[0].As<Napi::Number>().DoubleValue());
    
    // JDN 0 was a Monday, so we need to adjust
    // 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
    int dayOfWeek = static_cast<int>(jdn % 7);
    
    return Napi::Number::New(env, dayOfWeek);
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("ethiopicToGregorian", Napi::Function::New(env, EthiopicToGregorian));
    exports.Set("gregorianToEthiopic", Napi::Function::New(env, GregorianToEthiopic));
    exports.Set("isValidEthiopicDate", Napi::Function::New(env, IsValidEthiopicDate));
    exports.Set("isValidGregorianDate", Napi::Function::New(env, IsValidGregorianDate));
    exports.Set("isGregorianLeap", Napi::Function::New(env, IsGregorianLeap));

    // JDN helper functions
    exports.Set("ethiopicToJDN", Napi::Function::New(env, EthiopicToJDN));
    exports.Set("gregorianToJDN", Napi::Function::New(env, GregorianToJDN));
    exports.Set("jdnToEthiopic", Napi::Function::New(env, JDNToEthiopic));
    exports.Set("jdnToGregorian", Napi::Function::New(env, JDNToGregorian));
    exports.Set("getDayOfWeek", Napi::Function::New(env, GetDayOfWeek));

    exports.Set("JD_EPOCH_OFFSET_AMETE_ALEM", 
                Napi::Number::New(env, JD_EPOCH_OFFSET_AMETE_ALEM));
    exports.Set("JD_EPOCH_OFFSET_AMETE_MIHRET", 
                Napi::Number::New(env, JD_EPOCH_OFFSET_AMETE_MIHRET));
    exports.Set("JD_EPOCH_OFFSET_GREGORIAN", 
                Napi::Number::New(env, JD_EPOCH_OFFSET_GREGORIAN));
    
    return exports;
}

NODE_API_MODULE(ethiopic_calendar_ts, Init)