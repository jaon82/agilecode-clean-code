import Classroom from "./Classroom";
import IClassroomRepository from "./IClassroomRepository";

export default class ClassroomRepositoryMemory implements IClassroomRepository {
    classes: Classroom[];

    constructor () {
        this.classes = [
            new Classroom({
                level: "EM",
                module: "1",
                code: "A",
                capacity: 5,
                startDate: "2022-12-01",
                endDate: "2023-05-15"
            }),
            new Classroom({
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                startDate: "2022-12-01",
                endDate: "2023-05-15"
            }),
            new Classroom({
                level: "EM",
                module: "3",
                code: "B",
                capacity: 5,
                startDate: "2022-11-01",
                endDate: "2022-11-30"
            }),
            new Classroom({
                level: "EM",
                module: "3",
                code: "C",
                capacity: 5,
                startDate: "2022-11-01",
                endDate: "2022-12-30"
            })
        ];
    }

    findByCode(level: string, module: string, code: string) {
        const classroom = this.classes.find(classData => classData.level === level && classData.module === module && classData.code === code)
        if (!classroom) throw new Error("Class not found");
        return classroom;
    }
}