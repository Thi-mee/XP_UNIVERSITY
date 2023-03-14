class Validator {
  constructor() {
    this._errorMsg = [];
  }

  get error() {
    let temp = this._errorMsg;
    this._errorMsg = [];
    return temp;
  }

  isBodyValid(object, name) {
    if (object == null) {
      this._errorMsg.push(`${name} is required but not provided`);
      return false;
    }
    return true;
  }

  minlength(input, minValue, name) {
    let inputLength = input.length;

    if (inputLength < minValue) {
      this._errorMsg.push(`${name} must be minimum of ${minValue} characters`);
      return false;
    }
    return true
  }

  maxlength(input, maxValue, name) {
    let inputLength = input.value.length;

    if (inputLength > maxValue) {
      this._errorMsg.push(`${name} shouldn't be more than ${maxValue} characters`);
      return false;
    }
    return true
  }

  nonNegative(number, name) {
    if (number < 0) {
      this._errorMsg.push(`${name} must be a non-negative number`);
      return false;
    }
    return true;
  }

  greaterThan(number, minValue, name) {
    if (number <= minValue) {
      this._errorMsg.push(`${name} must be greater than ${minValue}`);
      return false;
    }
    return true;
  }

  isString(input, name) {
    if (typeof input !== "string") {
      this._errorMsg.push(`${name} must be a string`);
      return false;
    }
    return true;
  }

  // verifica se um input só contém letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;;

    let inputValue = input.value;

    let errorMessage = "Este campo não aceita números nem caracteres especiais";

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }
  }

  isNumber(number, name) {
    let re = /^[0-9]+$/;

    if (!re.test(number)) {
      this._errorMsg.push(`${name} must be a number`);
      return false;
    }
    return true;
  }

  /**
   * 
   * @param {{
   * Name: string,
   * CourseId: number | undefined,
   * DepartmentId: number,
   * UniqueId: string,
   * Code: string,
   * Units: number,
   * CourseLevel: number,
   * CourseSemester: number,
   * Status: number
   * }} course 
   */
  course(course) {
    const res1 = this.isBodyValid(course, "Course");
    const res2 = this.isString(course.Name, "Course Name");
    const res3 = this.minlength(course.Name, 3, "Course Name");
    const res4 = this.isNumber(course.DepartmentId, "Department Id");
    const res5 = this.greaterThan(course.DepartmentId, 0, "Department Id");
    const res6 = this.isString(course.UniqueId, "Unique Id");
    const res7 = this.minlength(course.UniqueId, 3, "Unique Id");
    const res8 = this.isString(course.Code, "Course Code");
    const res9 = this.minlength(course.Code, 2, "Course Code");
    const res10 = this.isNumber(course.Units, "Course Units");
    const res11 = this.greaterThan(course.Units, 0, "Course Units");
    const res12 = this.isNumber(course.CourseLevel, "Course Level");
    const res13 = this.greaterThan(course.CourseLevel, 0, "Course Level");
    const res14 = this.isNumber(course.CourseSemester, "Course Semester");
    const res15 = this.greaterThan(course.CourseSemester, 0, "Course Semester");
    const res16 = this.isNumber(course.Status, "Status");
    const res17 = this.nonNegative(course.Status, "Status");
    if (course.CourseId) {
      const res18 = this.isNumber(course.CourseId, "Course Id");
      const res19 = this.nonNegative(course.CourseId, "Course Id");
      if (res1 && res2 && res3 && res4 && res5 && res6 && res7 && res8 && res9 && res10 && res11 && res12 && res13 && res14 && res15 && res16 && res17 && res18 && res19) {
        return true;
      }
      return false;
    }
    if (res1 && res2 && res3 && res4 && res5 && res6 && res7 && res8 && res9 && res10 && res11 && res12 && res13 && res14 && res15 && res16 && res17) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {{
   * Name: string,
   * UniqueId: string,
   * Code: string,
   * Status: number
   * FacultyId: number | undefined
   * }} faculty 
   * @returns 
   */
  faculty(faculty) {
    const res1 = this.isBodyValid(faculty, "Faculty");
    const res2 = this.isString(faculty.Name, "Faculty Name");
    const res3 = this.minlength(faculty.Name, 3, "Faculty Name");
    const res6 = this.isString(faculty.UniqueId, "Unique Id");
    const res7 = this.minlength(faculty.UniqueId, 3, "Unique Id");
    const res8 = this.isString(faculty.Code, "Faculty Code");
    const res9 = this.minlength(faculty.Code, 2, "Faculty Code");
    const res10 = this.isNumber(faculty.Status, "Status");
    const res11 = this.nonNegative(faculty.Status, "Status");
    if (faculty.FacultyId) {
      const res12 = this.isNumber(faculty.FacultyId, "Faculty Id");
      const res13 = this.nonNegative(faculty.FacultyId, "Faculty Id");
      if (res1 && res2 && res3 && res6 && res7 && res8 && res9 && res10 && res11 && res12 && res13) {
        return true;
      }
      return false;
    }
    if (res1 && res2 && res3 && res6 && res7 && res8 && res9 && res10 && res11) {
      return true;
    }
    return false;



  }

  isInteger(number, name) {
    if (!Number.isInteger(number)) {
      this._errorMsg.push(`${name} must be an integer`);
      return false;
    }
    return true;
  }

  /**
   * 
   * @param {{
   * Name: string,
   * Status: number
   * }} query 
   */
  facultyQuery(query) {
    const res1 = this.isBodyValid(query, "Faculty Query");
    let res2, res3;
    if (query.Status) {
      res2 = this.isNumber(query.Status, "Status");
    }
    if (query.Name) {
      res3 = this.isString(query.Name, "Faculty Name");
    }
    if (res1 === false || res2 === false || res3 === false) {
      return false;
    }
    return true;
  }

  /**
   * 
   * @param {{
   * Name: string,
   * FacultyId: number,
   * UniqueId: string,
   * Code: string,
   * Status: number,
   * DepartmentId: number | undefined
   * }} department 
   */
  department(department) {
    const res1 = this.isBodyValid(department, "Department");
    const res2 = this.isString(department.Name, "Department Name");
    const res3 = this.minlength(department.Name, 3, "Department Name");
    const res4 = this.isNumber(department.FacultyId, "Faculty Id");
    const res5 = this.greaterThan(department.FacultyId, 0, "Faculty Id");
    const res6 = this.isString(department.UniqueId, "Unique Id");
    const res7 = this.minlength(department.UniqueId, 3, "Unique Id");
    const res8 = this.isString(department.Code, "Department Code");
    const res9 = this.minlength(department.Code, 2, "Department Code");
    const res10 = this.isNumber(department.Status, "Status");
    const res11 = this.nonNegative(department.Status, "Status");
    if (department.DepartmentId) {
      const res12 = this.isNumber(department.DepartmentId, "Department Id");
      const res13 = this.nonNegative(department.DepartmentId, "Department Id");
      if (res1 && res2 && res3 && res4 && res5 && res6 && res7 && res8 && res9 && res10 && res11 && res12 && res13) {
        return true;
      }
      return false;
    } 
    if (res1 && res2 && res3 && res4 && res5 && res6 && res7 && res8 && res9 && res10 && res11) {
      return true;
    }
    return false;
  }

  departmentQuery(query) {
    const res1 = this.isBodyValid(query, "Department Query");
    let res2, res3, res4;
    if (query.Status) {
      res2 = this.isNumber(query.Status, "Department Id");
    }
    if (query.Name) {
      res3 = this.isString(query.Name, "Department Name");
    }
    if (query.FacultyId) {
      res4 = this.isNumber(query.FacultyId, "Faculty Id");
    }
    if (res1 === false || res2 === false || res3 === false || res4 === false) {
      return false;
    }
    return true;
  }
}

module.exports = new Validator;