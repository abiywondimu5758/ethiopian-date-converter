#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <time.h>
#include "../src/ethiopic_calendar.h"


typedef struct {
    const char* name;
    date_t ethiopic;
    date_t gregorian;
    int64_t era;
} test_case_t;


static const test_case_t test_cases[] = {

    {"Basic conversion 1", {1855, 2, 20}, {1862, 10, 29}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Basic conversion 2", {1857, 10, 29}, {1865, 7, 5}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"New Year test", {1, 1, 1}, {8, 8, 27}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Leap year test", {4, 1, 1}, {11, 8, 28}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Month 13 test", {2000, 13, 5}, {2008, 9, 10}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Era boundary", {5500, 1, 1}, {7, 8, 28}, JD_EPOCH_OFFSET_AMETE_ALEM},
    {"Century boundary", {1892, 4, 23}, {1900, 1, 1}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Gregorian reform", {1575, 2, 8}, {1582, 10, 15}, JD_EPOCH_OFFSET_AMETE_MIHRET},
    {"Future date", {2993, 4, 14}, {3000, 12, 31}, JD_EPOCH_OFFSET_AMETE_MIHRET},
};

void run_conversion_tests() {
    printf("Running Ethiopian Calendar Conversion Tests...\n\n");
    
    int total_tests = sizeof(test_cases) / sizeof(test_cases[0]);
    int passed = 0;
    
    for (int i = 0; i < total_tests; i++) {
        const test_case_t* test = &test_cases[i];
        

        date_t result_greg = ethiopic_to_gregorian(test->ethiopic.year, 
                                                  test->ethiopic.month, 
                                                  test->ethiopic.day, 
                                                  test->era);
        
        bool eg_correct = (result_greg.year == test->gregorian.year) &&
                         (result_greg.month == test->gregorian.month) &&
                         (result_greg.day == test->gregorian.day);
        

        date_t result_eth = gregorian_to_ethiopic(test->gregorian.year,
                                                 test->gregorian.month,
                                                 test->gregorian.day);
        
        bool ge_correct = (result_eth.year == test->ethiopic.year) &&
                         (result_eth.month == test->ethiopic.month) &&
                         (result_eth.day == test->ethiopic.day);
        
        printf("Test %d - %s:\n", i + 1, test->name);
        printf("  Ethiopian %d-%d-%d -> Gregorian %d-%d-%d: %s\n",
               test->ethiopic.year, test->ethiopic.month, test->ethiopic.day,
               result_greg.year, result_greg.month, result_greg.day,
               eg_correct ? "PASS" : "FAIL");
        
        printf("  Gregorian %d-%d-%d -> Ethiopian %d-%d-%d: %s\n",
               test->gregorian.year, test->gregorian.month, test->gregorian.day,
               result_eth.year, result_eth.month, result_eth.day,
               ge_correct ? "PASS" : "FAIL");
        
        if (eg_correct && ge_correct) {
            passed++;
            printf("  PASS\n\n");
        } else {
            printf("  FAIL\n\n");
        }
    }
    
    printf("Results: %d/%d tests passed (%.1f%%)\n", 
           passed, total_tests, (passed * 100.0) / total_tests);
    
    if (passed == total_tests) {
        printf("ALL TESTS PASSED\n");
        return;
    } else {
        printf("Some tests failed\n");
        exit(1);
    }
}

void run_validation_tests() {
    printf("\n=== Date Validation Tests ===\n");
    

    assert(is_valid_gregorian_date(2024, 2, 29) == true);
    assert(is_valid_gregorian_date(2023, 2, 29) == false);
    assert(is_valid_gregorian_date(2024, 13, 1) == false);
    assert(is_valid_gregorian_date(2024, 1, 32) == false);
    assert(is_valid_gregorian_date(1900, 2, 29) == false);
    assert(is_valid_gregorian_date(2000, 2, 29) == true);
    

    assert(is_valid_ethiopic_date(2017, 1, 30) == true);
    assert(is_valid_ethiopic_date(2017, 13, 5) == true);
    assert(is_valid_ethiopic_date(2017, 13, 6) == false);
    assert(is_valid_ethiopic_date(2015, 13, 6) == true);
    assert(is_valid_ethiopic_date(2017, 14, 1) == false);
    assert(is_valid_ethiopic_date(2017, 1, 31) == false);
    
    printf("All validation tests passed\n");
}

void run_leap_year_tests() {
    printf("\n=== Leap Year Tests ===\n");
    

    assert(is_gregorian_leap(2024) == true);
    assert(is_gregorian_leap(2023) == false);
    assert(is_gregorian_leap(1900) == false);
    assert(is_gregorian_leap(2000) == true);
    assert(is_gregorian_leap(1600) == true);
    assert(is_gregorian_leap(1700) == false);
    
    printf("All leap year tests passed\n");
}

void demonstrate_current_date() {
    printf("\n=== Current Date Demonstration ===\n");
    

    time_t now = time(NULL);
    struct tm *local = localtime(&now);
    int current_year = local->tm_year + 1900;
    int current_month = local->tm_mon + 1;
    int current_day = local->tm_mday;
    
    printf("Today's Gregorian date: %d-%02d-%02d\n", 
           current_year, current_month, current_day);
    

    date_t ethiopian_today = gregorian_to_ethiopic(current_year, current_month, current_day);
    printf("Today's Ethiopian date: %d-%02d-%02d\n\n", 
           ethiopian_today.year, ethiopian_today.month, ethiopian_today.day);
    

    printf("=== Example Conversions ===\n");
    

    date_t new_year_greg = ethiopic_to_gregorian(2017, 1, 1, JD_EPOCH_OFFSET_AMETE_MIHRET);
    printf("Ethiopian New Year 2017: %d-%02d-%02d (Gregorian)\n",
           new_year_greg.year, new_year_greg.month, new_year_greg.day);
    

    date_t christmas_eth = gregorian_to_ethiopic(2024, 12, 25);
    printf("Christmas 2024: %d-%02d-%02d (Ethiopian)\n",
           christmas_eth.year, christmas_eth.month, christmas_eth.day);
    
    printf("\n");
}

int main() {
    printf("=== Ethiopian Calendar C Implementation Tests ===\n\n");
    

    demonstrate_current_date();
    run_validation_tests();
    run_leap_year_tests();
    run_conversion_tests();
    
    printf("\nALL TEST SUITES COMPLETED SUCCESSFULLY\n");
    
    return 0;
}
