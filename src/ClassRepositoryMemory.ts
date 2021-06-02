import IClassRepository from "./IClassRepository";

export default class ClassRepositoryMemory implements IClassRepository {
    classes: any[];

    constructor () {
        this.classes = [
            {
                level: "EM",
                module: "1",
                code: "A",
                capacity: 10
            },            
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2
            }
        ];
    }

    findByCode(level: string, module: string, code: string) {
        const clazz = this.classes.find(classData => classData.level === level && classData.module === module && classData.code === code)
        if (!clazz) throw new Error("Class not found");
        return clazz
    }
}