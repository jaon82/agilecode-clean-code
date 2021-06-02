import Enrollment from "./Enrollment";
import IClassRepository from "./IClassRepository";
import IEnrollmentRepository from "./IEnrollmentRepository";
import ILevelRepository from "./ILevelRepository";
import IModuleRepository from "./IModuleRepository";
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
    class: string
}

export default class EnrollStudent {
    levelRepository: ILevelRepository;
    moduleRepository: IModuleRepository;
    classRepository: IClassRepository;
    enrollmentRepository: IEnrollmentRepository;

    constructor (
        levelRepository: ILevelRepository, 
        moduleRepository: IModuleRepository, 
        classRepository: IClassRepository, 
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
        const clazz = this.classRepository.findByCode(level.code, module.code, enrollmentRequest.class);
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
        const code = this.generateEnrollmentCode(enrollmentRequest);
        const enrollment = new Enrollment(student, level.code, module.code, clazz.code, code);
        this.enrollmentRepository.save(enrollment);
        return enrollment;
    }
}