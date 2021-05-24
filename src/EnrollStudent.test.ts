import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34"
        }
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
});

test("Should not enroll without valid student cpf", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99"
        }
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student CPF"))
});

test("Should not enroll duplicated student", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34"
        }
    };
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
});