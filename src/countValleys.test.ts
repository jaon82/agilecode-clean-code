import countingValleys from './countingValleys';

test('UDDDUDUU', function(){
    const path = 'UDDDUDUU';
    const valleys = countingValleys(path);
    expect(valleys).toBe(1);
});

test('DDUUUUDD', function(){
    const path = 'DDUUUUDD';
    const valleys = countingValleys(path);
    expect(valleys).toBe(1);
});

test('DDUUDDUDUUUD', function(){
    const path = 'DDUUDDUDUUUD';
    const valleys = countingValleys(path);
    expect(valleys).toBe(2);
});

test('DUDDDUUDUU', function(){
    const path = 'DUDDDUUDUU';
    const valleys = countingValleys(path);
    expect(valleys).toBe(2);
});

test('DDUUUDDDUUUDDDUUUDDU', function(){
    const path = 'DDUUUDDDUUUDDDUUUDDU';
    const valleys = countingValleys(path);
    expect(valleys).toBe(4);
});

test('DDU', function(){
    const path = 'DDU';
    expect(() => countingValleys(path)).toThrow(new Error('Invalid path'));
});