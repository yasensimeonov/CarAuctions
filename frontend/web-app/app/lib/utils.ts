import { isDate, parse } from "date-fns";

export function formatDateToLocal(
    dateStr: string,
    locale: string = 'en-US',
) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}

export function parseDateString(value: any, originalValue: string) {
    return isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());
}