import Enrollment from "./Enrollment";

export default interface IEnrollmentRepository {
    save(enrollment: Enrollment): void;
    findAllByClass(level: string, module: string, classroom: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    count(): number;
}