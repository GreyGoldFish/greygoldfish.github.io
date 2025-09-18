// _11ty/filters.js
import { DateTime } from "luxon";

export const filters = {
    year: (date) => {
        if (date === "now") {
            return new Date().getFullYear();
        }
        return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat('yyyy');
    },

    formatDateLong: (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL dd, yyyy');
    },
    
    htmlDateString: (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    },

    merge: (obj1, obj2) => {
        return {...obj1, ...obj2};
    }
};
