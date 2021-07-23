export default class Invoice {
    code: string;
    month: number;
    year: number;
    value: number;

    constructor (code: string, month: number, year: number, value: number) {
         this.code = code;
         this.month = month;
         this.year = year;
         this.value = value;
    }

}