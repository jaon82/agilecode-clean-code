export default class Class {
    level: string;
    module: string;
    code: string;
    capacity: number;
    startDate: Date;
    endDate: Date;


    constructor (level: string, module: string, code: string, capacity: number, startDate: string, endDate: string) {
         this.level = level;
         this.module = module;
         this.code = code;
         this.capacity = capacity;
         this.startDate = new Date(startDate);
         this.endDate = new Date(endDate);
    }

    isFinished() {
        return Date.now()-this.endDate.getTime() <= 0;
    }

    isOutOfEnrollTime() {
        const quarterTime = (this.endDate.getTime()-this.startDate.getTime())*0.25;
        const passedTime = (Date.now()-this.startDate.getTime());
        return passedTime > quarterTime;
    }
}