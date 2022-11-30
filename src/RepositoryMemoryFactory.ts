import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import IRepositoryAbstractFactory from "./IRepositoryAbstractFactory";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

export default class RepositoryMemoryFactory implements IRepositoryAbstractFactory {
    createLevelRepository() {
        return new LevelRepositoryMemory();
    }

    createModuleRepository() {
        return new ModuleRepositoryMemory();
    }

    createClassroomRepository() {
        return new ClassroomRepositoryMemory();
    }

    createEnrollmentRepository() {
        return new EnrollmentRepositoryMemory();
    }

}