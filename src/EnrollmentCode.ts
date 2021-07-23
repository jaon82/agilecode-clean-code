export default class EnrollmentCode {
    value: string;

    constructor(level: string, module: string, classroom: string, date: Date, sequence: number){
        this.value = `${date.getFullYear()}${level}${module}${classroom}${(sequence).toString().padStart(4,"0")}`;
    }
}