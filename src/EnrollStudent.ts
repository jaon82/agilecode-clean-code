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

    hasClassCapacity(classCapacity: number, level: string, moduleCode: string, classCode: string): boolean {
        const studentsInClass = this.enrollmentRepository.findAllByClass(level, moduleCode, classCode);
        return studentsInClass.length < classCapacity;
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
        if(!this.hasClassCapacity(classroom.capacity, enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.class)){
            throw new Error("Class is over capacity");
        }
        if(this.existingEnrollment(student.cpf.value)){
            throw new Error("Enrollment with duplicated student is not allowed");
        }
        const issueDate = new Date();
        const enrollmentSequence = this.enrollmentRepository.count()+1;
        const enrollment = new Enrollment(student, level, module, classroom, issueDate, enrollmentSequence, enrollmentRequest.installments);
        this.enrollmentRepository.save(enrollment);
        return enrollment;
    }
}