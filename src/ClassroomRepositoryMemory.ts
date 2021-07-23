import Classroom from "./Classroom";
import IClassroomRepository from "./IClassroomRepository";

export default class ClassroomRepositoryMemory implements IClassroomRepository {
    classes: any[];

    constructor () {
        this.classes = [
            {
                level: "EM",
                module: "1",
                code: "A",
                capacity: 5,
                startDate: "2021-07-01",
                endDate: "2021-12-15"
            },
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2,
                startDate: "2021-07-01",
                endDate: "2021-12-15"
            },
            {
                level: "EM",
                module: "3",
                code: "B",
                capacity: 5,
                startDate: "2021-06-01",
                endDate: "2021-06-30"
            },
            {
                level: "EM",
                module: "3",
                code: "C",
                capacity: 5,
                startDate: "2021-06-01",
                endDate: "2021-07-30"
            }
        ];
    }

    findByCode(level: string, module: string, code: string) {
        const classroom = this.classes.find(classData => classData.level === level && classData.module === module && classData.code === code)
        if (!classroom) throw new Error("Class not found");
        const classObj = new Classroom(classroom.level, classroom.module, classroom.code, classroom.capacity, classroom.startDate, classroom.endDate);
        return classObj;
    }
}