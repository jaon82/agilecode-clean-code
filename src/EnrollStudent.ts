import Student from "./Student";

interface IStudent{
    name: string,
    cpf: string
}

interface IEnrollmentRequest{
    student: IStudent
}

interface IEnrollment{
    student: Student
}

export default class EnrollStudent {
    enrollments: IEnrollment[] = [];

    constructor () {
        this.enrollments = [];
    }

    checkStudentExists(cpf: string): boolean {
        return !!this.enrollments.find(enrollment => enrollment.student.cpf.value === cpf);
    }

    execute(enrollmentRequest: IEnrollmentRequest) : IEnrollment {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf);
        if(this.checkStudentExists(student.cpf.value)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }
        const enrollment = {
            student
        };
        this.enrollments.push(enrollment);
        return enrollment;
    }
}