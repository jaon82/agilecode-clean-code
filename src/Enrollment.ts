import Invoice from "./Invoice";
import Student from "./Student";

export default class Enrollment {
    student: Student;
    level: string;
    module: string;
    clazz: string;
    code: string;
    invoices: Invoice[];
    
    constructor (student: Student, level: string, module: string, clazz: string, code: string, invoices: Invoice[]) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.clazz = clazz;
        this.code = code;
        this.invoices = invoices;
    }
}
