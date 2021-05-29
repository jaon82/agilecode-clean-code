import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"        
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid name"))
});

test("Should not enroll without valid student cpf", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"        
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid CPF"))
});

test("Should not enroll duplicated student", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"        
    };
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
});

test("Should generate enrollment code", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    };
    const enrollment= enrollStudent.execute(enrollmentRequest);
    expect(enrollment.enrollmentCode).toEqual("2021EM1A0001");
});

test("Should generate enrollment codes", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "1982-07-10"
        },
        level: "EM",
        module: "1",
        class: "A"
    };
    const enrollment= enrollStudent.execute(enrollmentRequest);
    expect(enrollment.enrollmentCode).toEqual("2021EM1A0001");

    const enrollmentRequest2 = {
        student: {
            name: "Maria Carolina Fonseca Filha",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    };
    const enrollment2= enrollStudent.execute(enrollmentRequest2);
    expect(enrollment2.enrollmentCode).toEqual("2021EM1A0002");
});

test("Should not enroll student with invalid module", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "2000-03-12"
        },
        level: "EM",
        module: "4",
        class: "A"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Module not found"))
});

test("Should not enroll student below minimum age", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "2007-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"))
});

test("Should not enroll student with invalid class", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "2000-03-12"
        },
        level: "EM",
        module: "3",
        class: "B"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class not found"))
});

test("Should not enroll student over class capacity", function () {
    const enrollStudent = new EnrollStudent();
    let enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "122.451.066-60",
            birthDate: "1965-07-10"
        },
        level: "EM",
        module: "3",
        class: "A"
    };
    enrollStudent.execute(enrollmentRequest);
    enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca Filha",
            cpf: "755.525.774-26",
            birthDate: "1982-01-12"
        },
        level: "EM",
        module: "3",
        class: "A"
    };
    enrollStudent.execute(enrollmentRequest);
    enrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca Neta",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "3",
        class: "A"
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"))
});