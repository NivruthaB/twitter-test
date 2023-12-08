/**
 * Class to help with validation of data.
 */
export class ValidationHelper {
    static isString(arg: unknown) {
        return arg !== null && typeof arg === 'string';
    }

    static isEmptyString(arg: any) {
        return this.isString(arg) && arg.length === 0;
    }

    static isNotEmptyString(arg: any) {
        return this.isString(arg) && !this.isEmptyString(arg);
    }

    static isUndefined(arg: any) {
        return arg === undefined;
    }

    static isNull(arg: any) {
        return arg == null;
    }

    static isUndefinedOrNull(arg: any) {
        return this.isUndefined(arg) || this.isNull(arg);
    }

    static isNotUndefinedOrNull(arg: any) {
        return !this.isUndefinedOrNull(arg);
    }

    static isUndefinedOrTrue(arg: any) {
        return this.isUndefined(arg) || arg === true;
    }

    static isUndefinedOrFalse(arg: any) {
        return this.isUndefined(arg) || arg === false;
    }
}