export default class Name {
    value: string;

    constructor(value: string){
        if(!this.validateName(value)){
            throw new Error("Invalid name");
         }
        this.value = value;
    }

    validateName(name: string){
        if(!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)){
            return false;
        }
        return true;
    }

}