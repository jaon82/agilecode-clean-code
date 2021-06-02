export default interface IModuleRepository {
    findByCode(level: string, code: string): any;
}