import Level from "./Level";

export default interface ILevelRepository {
    findByCode(code: string): Level;
}