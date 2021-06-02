export default interface IClassRepository {
    findByCode(level: string, module: string, code: string): any;
}