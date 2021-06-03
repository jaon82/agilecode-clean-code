import Class from "./Class";

export default interface IClassRepository {
    findByCode(level: string, module: string, code: string): Class;
}