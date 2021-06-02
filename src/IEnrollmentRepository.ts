import Enrollment from "./Enrollment";

export default interface IEnrollmentRepository {
    save(enrollment: Enrollment): void;
    findAllByClass(level: string, module: string, clazz: string): any;
    findByCpf(cpf: string): any;
    count(): number;
}