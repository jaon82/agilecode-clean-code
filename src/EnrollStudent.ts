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
    enrollmentCode: string,
}

export default class EnrollStudent {
    enrollments: IEnrollment[] = [];

    constructor () {
        this.enrollments = [];
    }

    checkStudentExists(cpf: string): boolean {
        return !!this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
    }

    checkStudentAge(student: Student, level: string, moduleCode: string): boolean {
        const module = data.modules.find(module => module.level === level && module.code === moduleCode)
        if(!module){
            throw new Error("Module not found");
        }
        const studentAge = Math.floor((Date.now()-(new Date(student.birthDate)).getTime())/(1000 * 60 * 60 * 24 * 365.25));
        return studentAge >= module.minimumAge;
    }

    checkClassCapacity(student: Student, level: string, moduleCode: string, classCode: string): boolean {
        const classFound = data.classes.find(classData => classData.level === level && classData.module === moduleCode && classData.code === classCode)
        if(!classFound){
            throw new Error("Class not found");
        }
        const studentsInClass = this.enrollments.filter(enrollment => enrollment.level === level && enrollment.module === moduleCode && enrollment.class === classCode);
        return studentsInClass.length < classFound.capacity;
    }

    execute(enrollmentRequest: IEnrollmentRequest) : IEnrollment {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf, enrollmentRequest.student.birthDate);
        if(this.checkStudentExists(student.cpf.value)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }
        if(!this.checkStudentAge(student, enrollmentRequest.level, enrollmentRequest.module)){
            throw new Error("Student below minimum age");
        }
        if(!this.checkClassCapacity(student, enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.class)){
            throw new Error("Class is over capacity");
        }
        const enrollment:IEnrollment = {
            student,
            level: enrollmentRequest.level,
            module: enrollmentRequest.module,
            class: enrollmentRequest.class,
            enrollmentCode: this.generateEnrollmentCode(enrollmentRequest)
        };
        this.enrollments.push(enrollment);
        return enrollment;
    }

    generateEnrollmentCode(enrollment: IEnrollmentRequest): string{
        let enrollmentCode = (new Date()).getFullYear()+enrollment.level+enrollment.module+enrollment.class+(this.enrollments.length+1).toString().padStart(4,"0");
        return enrollmentCode;
    }
}