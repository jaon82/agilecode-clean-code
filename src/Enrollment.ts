import Classroom from "./Classroom";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";

export default class Enrollment {
    student: Student;
    level: Level;
    module: Module;
    classroom: Classroom;
    code: EnrollmentCode;
    sequence: number;
    issueDate: Date;
    installments: number;
    invoices: Invoice[];
    
    constructor (student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number, installments: number = 12) {
        if(student.getAge() < module.minimumAge){
            throw new Error("Student below minimum age");
        }
        if(classroom.isFinished(issueDate)){
            throw new Error("Class is already finished");
        }
        if(classroom.isOutOfEnrollTime(issueDate)){
            throw new Error("Class is already started");
        }
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.sequence = sequence;
        this.issueDate = issueDate;
        this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
        this.installments = installments;
        this.invoices = [];
        this.generateInvoices();
    }

    generateInvoices() {
        let invoicePrice = Math.floor((this.module.price/this.installments)*100)/100;
        for(let i=1; i <= this.installments; i++){
            if(i === this.installments){
                invoicePrice = Math.ceil((this.module.price-(invoicePrice*(this.installments-1)))*100)/100;
            }
            const invoice = new Invoice(this.code.value, i, this.issueDate.getFullYear(), invoicePrice);
            this.invoices.push(invoice);
        }
    }
}
