// ---------- Core Signatures ----------

abstract sig User {
    id: one ID,
    email: one ID,
    name: one ID,
    phoneNumber: one ID
}

// A student user who has a CV and can submit internship applications.
sig Student extends User {
    cv: one CV,
    applications: set Application
} {
    // Every student must have a CV.
    some cv
}

// A company user that offers internships.
sig Company extends User {
    companyName: one ID,
    industry: one ID,
    internships: set Internship // Internships provided by the company.
}

// A university user managing students and handling complaints.
sig University extends User {
    universityName: one ID,
    students: set Student, // The students enrolled in the university.
    complaints: set Complaint // Complaints registered with the university.
}

// A CV containing a summary, skills, education, and experience details.
sig CV {
    skills: set Skill,
    education: set Education,
    experience: set Experience,
    summary: one ID
}

// An internship with specific details such as title, description, requirements, and dates.
sig Internship {
    title: one ID,
    description: one ID,
    requirements: set Skill, // Skills required for the internship.
    startDate: one Date,
    endDate: one Date,
    status: one Status
}

// An application linking a student to an internship.
sig Application {
    student: one Student,
    internship: one Internship,
    applicationDate: one Date,
    status: one Status
}

// An interview scheduled for a specific application.
sig Interview {
    application: one Application,
    scheduledTime: one DateTime, // Time slot for the interview.
    status: one Status,
    feedback: lone ID
}

// A complaint filed by a user with a description and status.
sig Complaint {
    id: one ID,
    description: one ID, // Complaint details.
    status: one Status,
    filingDate: one Date,
    complainant: one User // The user who raised the complaint.
}

// Represents textual identifiers for various elements.
sig ID {}

// ---------- Enumerations ----------

enum Skill      { JAVA, PYTHON, CPP, JAVASCRIPT, DATABASE }
enum Education  { BACHELORS, MASTERS, PHD }
enum Experience { JUNIOR, MID, SENIOR }
enum Status     { OPEN, CLOSED, PENDING, APPROVED, REJECTED }
enum DateTime   { MORNING, AFTERNOON, EVENING }

// Represents months as a hierarchy rather than an enumeration.
abstract sig Date {}
one sig JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC extends Date {}

// ---------- Utility Function + Predicate ----------

// Assigns a numerical index to each month for easy comparison.
fun dateIndex[d: Date]: Int {
    d = JAN => 1
    else d = FEB => 2
    else d = MAR => 3
    else d = APR => 4
    else d = MAY => 5
    else d = JUN => 6
    else d = JUL => 7
    else d = AUG => 8
    else d = SEP => 9
    else d = OCT => 10
    else d = NOV => 11
    else 12
}

// Validates that one date comes before another.
pred dateOrder[d1, d2: Date] {
    dateIndex[d1] < dateIndex[d2]
}

// ---------- Facts & Constraints ----------

// Enforces unique IDs for all users.
fact UserIDsAreUnique {
    all disj u1, u2: User | u1.id != u2.id
}

// Ensures the system always contains at least one student, company, and university.
fact AtLeastOneOfEach {
    some Student
    some Company
    some University
}

// Every student must be associated with exactly one university.
fact StudentUniversityRelationship {
    all s: Student | one u: University | s in u.students
}

// Ensures internships are owned by exactly one company.
fact InternshipOwnership {
    all i: Internship | one c: Company | i in c.internships
}

// Ensures internships have a valid time frame, with the start date before the end date.
fact InternshipDates {
    all i: Internship | dateOrder[i.startDate, i.endDate]
}

// A student can only apply for internships where their CV covers all required skills.
fact ValidApplications {
    all a: Application |
        a.internship.requirements in a.student.cv.skills
}

// Guarantees that open internships have at least one applicant.
fact OpenInternshipsMustHaveApplicants {
    all i: Internship |
        i.status = OPEN implies some a: Application | a.internship = i
}

// Prevents duplicate applications for the same internship by the same student.
fact UniqueApplications {
    all disj a1, a2: Application |
        (a1.student != a2.student) or (a1.internship != a2.internship)
}

// If an application is approved, the corresponding internship cannot remain open.
fact ApprovedApplicationClosesInternship {
    all a: Application |
        a.status = APPROVED implies a.internship.status != OPEN
}

// Ensures interviews are only scheduled if the student's skills meet the internship requirements.
fact ValidInterview {
    all i: Interview |
        i.application.student.cv.skills in i.application.internship.requirements
}

// Complaints (if not rejected) must have a valid complainant.
fact ComplaintResolution {
    all c: Complaint |
        c.status != REJECTED implies some c.complainant
}

// Ensures all complaints have unique IDs and exactly one complainant.
fact ValidComplaints {
    all c: Complaint | one u: User | c.complainant = u
    all disj c1, c2: Complaint | c1.id != c2.id
}

// Suggests that students whose skills match the requirements of an internship should apply.
fact RecommendedApplications {
    all s: Student, i: Internship |
      (i.requirements in s.cv.skills) implies
        (some a: Application | a.student = s and a.internship = i)
}

// ---------- Simple Run Command ----------

// Generates an instance of the model up to a scope of 5.
run {} for 5

// ---------- Analysis Code (Assertions + Predicates) ----------

// Assertion: Prevents students from applying to the same internship multiple times.
assert UniqueApplicationsAssert {
    all disj a1, a2: Application |
        a1.student = a2.student and a1.internship = a2.internship
        implies a1 = a2
}
check UniqueApplicationsAssert for 5

// Assertion: Validates that open internships have at least one applicant.
assert OpenInternshipsAssert {
    all i: Internship |
        i.status = OPEN implies some a: Application | a.internship = i
}
check OpenInternshipsAssert for 5

// Assertion: Ensures students are only interviewed if they meet the requirements.
assert ValidInterviewAssert {
    all i: Interview |
        i.application.student.cv.skills in i.application.internship.requirements
}
check ValidInterviewAssert for 5

// Assertion: Complaints (if not rejected) must have valid complainants.
assert ComplaintResolutionAssert {
    all c: Complaint |
        c.status != REJECTED implies some c.complainant
}
check ComplaintResolutionAssert for 5

// Assertion: Approved applications mean the internship is not open anymore.
assert ApprovedApplicationClosesInternshipAssert {
    all a: Application |
        a.status = APPROVED implies a.internship.status != OPEN
}
check ApprovedApplicationClosesInternshipAssert for 5

// Assertion: If a student meets all required skills, an application should exist.
assert RecommendedApplicationsAssert {
    all s: Student, i: Internship |
      (i.requirements in s.cv.skills) implies
        (some a: Application | a.student = s and a.internship = i)
}
check RecommendedApplicationsAssert for 5

//------------------------------------------------------
//  Scenarios to RUN and visualize
//------------------------------------------------------

/**
 * Scenario: A student is applying for an internship.
 * The internship is open, and the student has the required skills for it.
 * We also ensure that the application is properly linked to both the student
 * and the internship.
 */
pred StudentAppliesToOpenInternship {
    some s: Student, i: Internship |
        i.status = OPEN
        and i.requirements in s.cv.skills
        and some a: Application | a.student = s and a.internship = i
}
/** Execute this scenario with up to 5 instances */
run StudentAppliesToOpenInternship for 5

/**
 * Scenario: An internship gets approved for a student.
 * Once approved, the internship is no longer open for applications.
 * This helps verify that the status transitions are consistent.
 */
pred ApprovedInternshipScenario {
    some a: Application |
        a.status = APPROVED
        and a.internship.status != OPEN
}
/** Execute this scenario with up to 5 instances */
run ApprovedInternshipScenario for 5

/**
 * Scenario: A complaint has been submitted and isn't rejected.
 * If the complaint is still under consideration or resolved,
 * we need to ensure there’s a valid complainant tied to it.
 */
pred ValidComplaintScenario {
    some c: Complaint |
        c.status != REJECTED
}
/** Execute this scenario with up to 5 instances */
run ValidComplaintScenario for 5

