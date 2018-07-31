// A sample array with student object looks like this:
const studentList =   [
    {
        name: {
            firstName: "Kyle",
            lastName: "Lowry"
        },
        age: 19,
        average: 80,
        courses: ["CS101", "FR201", "BU201", "SPAN101", "MUS102"],
        id: 20181092
    },
    {
        name: {
            firstName: "Serge",
            lastName: "Ibaka"
        },
        age: 20,
        average: 60,
        courses: ["CS201", "ENG201", "BU201", "FR101", "GER101"],
        id: 20170819
    },
    {
        name: {
            firstName: "Dwight",
            lastName: "Howard"
        },
        age: 20,
        average: 45,
        courses: ["MUS201", "DRAM201", "BU201", "FR201", "GER101"],
        id: 20149031
    },
    {
        name: {
            firstName: "Jay",
            lastName: "Vee"
        },
        age: 18,
        average: 89,
        courses: ["MUS101", "DRAM201", "BU101", "FR201", "CS101"],
        id: 20149332
    }
]

// Finding items in an array:
// 1. Search through an array of Student objects, and console log the corresponding student's average.
//      If no students by that name are found, console log "No Students" instead. 
let selectByName = ( name, studentList ) => {
    for (let i = 0; i < studentList.length; i++) {
        let parsedName = `${studentList[i].name.firstName} ${studentList[i].name.lastName}`;
        if (parsedName === name) {
            console.log(`${studentList[i].average}%`);
            break;
        }
        else if (i === studentList.length-1) {
            console.log("No Students")
        }
    }
}
// Checking work:
// selectByName("James Franco", studentList) // => "No Students"
// selectByName("Dwight Howard", studentList) // => "45%"

// 2. Console log an array with the names of the students with an average greater or equal to an amount, or
//      "Yikes" if no student has an average above the cutoff
let deansList = (cutoff, studentList) => {
    let smartStudents = [];
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].average >= cutoff) {
            smartStudents.push(`${studentList[i].name.firstName} ${studentList[i].name.lastName}`);
        }
    }
    console.log(smartStudents.length < 1 ? "Yikes" : smartStudents)
}
// Checking work:
// deansList(80, studentList) // => ["Kyle Lowry", "Jay Vee"]
// deansList(95, studentList) // => "Yikes"


// 3. Write a function that takes in a course code and the student list, and console logs the IDs of the students taking
//      that course, or "Empty class" if no students are in the class
let courseList = (courseCode, studentList) => {
    let classmates = [];
    for (let i = 0; i < studentList.length; i++) {
        for (let j = 0; j < studentList[i].courses.length; j++) {
            if (studentList[i].courses[j] === courseCode) {
                classmates.push(studentList[i].id);
            }
        }
    }
    console.log(classmates.length < 1 ? "Empty class" : classmates)
}
// Checking work:
// courseList("CS101", studentList) // => [20181092, 20148332]
// courseList("BU201", studentList) // => [20149031, 20170819, 20181092]
// courseList("GEO101", studentList) // => "Empty class"
