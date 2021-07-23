import Enrollment from "./Enrollment";
import IClassroomRepository from "./IClassroomRepository";
import IEnrollmentRepository from "./IEnrollmentRepository";
import ILevelRepository from "./ILevelRepository";
import IModuleRepository from "./IModuleRepository";
import Invoice from "./Invoice";
import Student from "./Student";

interface IStudentRequest{
    name: string,
    cpf: string
    birthDate: string
}

interface IEnrollmentRequest{
    student: IStudentRequest
    level: string,
    module: string,
    class: string,
    installments: number
}

export default class EnrollStudent {
    levelRepository: ILevelRepository;
    moduleRepository: IModuleRepository;
    classRepository: IClassroomRepository;
    enrollmentRepository: IEnrollmentRepository;

    constructor (
        levelRepository: ILevelRepository, 
        moduleRepository: IModuleRepository, 
        classRepository: IClassroomRepository, 
        enrollmentRepository: IEnrollmentRepository
    ) {
        this.levelRepository = levelRepository;
        this.moduleRepository = moduleRepository;
        this.classRepository = classRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    existingEnrollment(cpf: string): boolean {
        return !!this.enrollmentRepository.findByCpf(cpf);
    }

    hasAllowedAge(student: Student, minimumAge: number): boolean {
        return student.getAge() >= minimumAge;
    }

    hasClassCapacity(classCapacity: number, level: string, moduleCode: string, classCode: string): boolean {
        const studentsInClass = this.enrollmentRepository.findAllByClass(level, moduleCode, classCode);
        return studentsInClass.length < classCapacity;
    }

    generateEnrollmentCode(enrollment: IEnrollmentRequest): string{
        const sequence = (this.enrollmentRepository.count()+1).toString().padStart(4,"0");
        let enrollmentCode = `${(new Date()).getFullYear()}${enrollment.level}${enrollment.module}${enrollment.class}${sequence}`;
        return enrollmentCode;
    }

    generateInvoices(modulePrice: number, installments: number): Invoice[] {
        const invoices:Invoice[] = [];
        let invoicePrice = Math.floor((modulePrice/installments)*100)/100;
        for(let i=1; i <= installments; i++){
            if(i === installments){
                invoicePrice = Math.ceil((modulePrice-(invoicePrice*(installments-1)))*100)/100;
            }
            const invoice = new Invoice(invoicePrice);
            invoices.push(invoice);
        }
        return invoices;
    }

    execute(enrollmentRequest: IEnrollmentRequest) : Enrollment {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const level = this.levelRepository.findByCode(enrollmentRequest.level);
        if(!level){
            throw new Error("Level not found");
        }
        const module = this.moduleRepository.findByCode(enrollmentRequest.level, enrollmentRequest.module);
        if(!module){
            throw new Error("Module not found");
        }
        const classroom = this.classRepository.findByCode(level.code, module.code, enrollmentRequest.class);
        if(!classroom){
            throw new Error("Class not found");
        }
        if(!this.hasAllowedAge(student, module.minimumAge)){
            throw new Error("Student below minimum age");
        }
        if(!classroom.isFinished()){
            throw new Error("Class is already finished");
        }
        if(classroom.isOutOfEnrollTime()){
            throw new Error("Class is already started");
        }
        if(!this.hasClassCapacity(classroom.capacity, enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.class)){
            throw new Error("Class is over capacity");
        }
        if(this.existingEnrollment(student.cpf.value)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }
        const code = this.generateEnrollmentCode(enrollmentRequest);
        const invoices = this.generateInvoices(module.price, enrollmentRequest.installments);
        const enrollment = new Enrollment(student, level.code, module.code, classroom.code, code, invoices);
        this.enrollmentRepository.save(enrollment);
        return enrollment;
    }
}