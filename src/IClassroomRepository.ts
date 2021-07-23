import Classroom from "./Classroom";

export default interface IClassroomRepository {
    findByCode(level: string, module: string, code: string): Classroom;
}