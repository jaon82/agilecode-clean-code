const dict = {
    "D": -1,
    "U": 1
};
type dictType = 'D'|'U';
export default function countingValleys(path: any){
    const parsedPath:dictType[] = [...path];
    let level = 0;
    let isValley = false;
    let valleys = 0;
    for(const char of parsedPath){
        level += dict[char];
        if(level === -1){
            isValley = true;
        }
        if(level === 0 && isValley){
            valleys++;
            isValley = false;
        }
    }
    if(level !== 0){
        throw new Error('Invalid path');
    }
    return valleys;
}