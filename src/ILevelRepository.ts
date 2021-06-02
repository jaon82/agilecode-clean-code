export default interface ILevelRepository {
    findByCode(code: string): any;
}