import data from "./data";
import Student from "./Student";

interface IStudent{
    name: string,
    cpf: string
    birthDate: string
}

interface IEnrollmentRequest{
    student: IStudent
    level: string,
    module: string,
    class: string
}

interface IEnrollment{
    student: Student
    level: string,
    module: string,
    class: string,
    code: string,
}

export default class EnrollStudent {
    enrollments: IEnrollment[] = [];

    constructor () {
        this.enrollments = [];
    }

    existingEnrollment(cpf: string): boolean {
        return !!this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
    }

    hasAllowedAge(student: Student, minimumAge: number): boolean {
        const studentAge = Math.floor((Date.now()-(new Date(student.birthDate)).getTime())/(1000 * 60 * 60 * 24 * 365.25));
        return studentAge >= minimumAge;
    }

    hasClassCapacity(classCapacity: number, level: string, moduleCode: string, classCode: string): boolean {
        const studentsInClass = this.enrollments.filter(enrollment => enrollment.level === level && enrollment.module === moduleCode && enrollment.class === classCode);
        return studentsInClass.length < classCapacity;
    }

    generateEnrollmentCode(enrollment: IEnrollmentRequest): string{
        const sequence = (this.enrollments.length+1).toString().padStart(4,"0");
        let enrollmentCode = `${(new Date()).getFullYear()}${enrollment.level}${enrollment.module}${enrollment.class}${sequence}`;
        return enrollmentCode;
    }

    execute(enrollmentRequest: IEnrollmentRequest) : IEnrollment {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        const level = data.levels.find(level => level.code === enrollmentRequest.level);
        if(!level){
            throw new Error("Level not found");
        }
        const module = data.modules.find(module => module.level === level.code && module.code === enrollmentRequest.module);
        if(!module){
            throw new Error("Module not found");
        }
        const clazz = data.classes.find(classData => classData.level === level.code && classData.module === module.code && classData.code === enrollmentRequest.class);
        if(!clazz){
            throw new Error("Class not found");
        }
        if(this.existingEnrollment(student.cpf.value)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }
        if(!this.hasAllowedAge(student, module.minimumAge)){
            throw new Error("Student below minimum age");
        }
        if(!this.hasClassCapacity(clazz.capacity, enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.class)){
            throw new Error("Class is over capacity");
        }
        const enrollment:IEnrollment = {
            student,
            level: level.code,
            module: module.code,
            class: clazz.code,
            code: this.generateEnrollmentCode(enrollmentRequest)
        };
        this.enrollments.push(enrollment);
        return enrollment;
    }
}