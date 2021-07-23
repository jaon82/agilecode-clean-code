import Module from "./Module";

export default interface IModuleRepository {
    findByCode(level: string, code: string): Module;
}