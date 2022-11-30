import IClassroomRepository from "./IClassroomRepository";
import IEnrollmentRepository from "./IEnrollmentRepository";
import ILevelRepository from "./ILevelRepository";
import IModuleRepository from "./IModuleRepository";

export default interface IRepositoryAbstractFactory {
    createLevelRepository(): ILevelRepository;

    createModuleRepository(): IModuleRepository;

    createClassroomRepository(): IClassroomRepository;

    createEnrollmentRepository() : IEnrollmentRepository

}