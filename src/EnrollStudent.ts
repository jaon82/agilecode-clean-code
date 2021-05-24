import validateCpf from "./validateCPF";

interface IStudent{
    name: string,
    cpf: string
}

interface IEnrollmentRequest{
    student: IStudent
}

export default class EnrollStudent {
    students: IStudent[] = [];

    constructor () {
        this.students = [];
    }

    validateName(name: string){
        if(!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)){
            return false;
        }
        return true;
    }

    checkStudentExists(cpf: string): boolean {
        return !!this.students.find(student => student.cpf === cpf);
    }

    execute(enrollmentRequest: IEnrollmentRequest) : IStudent[] {
        const student = enrollmentRequest.student;

        if(!this.validateName(student.name)){
           throw new Error("Invalid student name");
        }

        if(!validateCpf(student.cpf)){
            throw new Error("Invalid student CPF");
        }

        if(this.checkStudentExists(student.cpf)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }

        this.students.push(student);

        return this.students;
    }
}