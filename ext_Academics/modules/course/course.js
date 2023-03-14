const db = require("./courseDB");
const Validator = require('../../validator')

class Course {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns jnoih
   */
  async getAllCourses(req, res) {
    try {
      const retVal = await db.getAllCourses();
      if (retVal == null) {
        return res.status(400).json({ Error: db.getError() ? "DB Response was Null" : db.getError() });
      }
      res.status(200).send(retVal);
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  async getCourses(req, res) {
    try {
      if (req.body == null) {
        return res.status(400).json({ Error: "Invalid request parameters" });
      }
      const { DepartmentId, Status, Name } = req.body;
      const retVal = await db.getCourses(DepartmentId, Status, Name);
      if (retVal == null) {
        return res.status(400).json({ Error: db.getError() == null ? "DB Response Was Null" : db.getError() });
      }
      if (retVal.length < 1) {
        return res.status(404).json({ Error: "No Courses Found" });
      }
      res.status(200).send(retVal);
    } catch (error) {
      res.status(400).json({ Error: error });
    }
  }

  async getCourse(req, res) {
    try {
      // if (!req.params) {
      //   return res.status(400).json({ Error: "Please input a valid course Id" });
      // }
      const courseId = req.params.id;
      const retVal = await db.getCourse(courseId);
      if (retVal == null) {
        return res.status(400).json({
          Error: db.getError() === null ? "DB Response Was Null" : db.getError() });
      }
      if (retVal.length < 1) {
        return res.status(404).json({ Error: "Course Not Found" });
      }
      res.status(200).send(retVal);
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  async addCourse(req, res) {
    try {
      const course = { ...req.body };
      console.log(course);
      if (!Validator.course(course)) return res.status(400).json({ Error: Validator.error[0] });

      if (!await db.addCourse(course)) {
        return res.status(400).json({ Error: db.getError() })
      }

      res.status(200).json({ IsSuccessFul: true })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  async editCourse(req, res) {
    try {
      const course = { ...req.body };
      
      if (!Validator.course(course)) return res.status(400).json({ Error: Validator.error[0] });

      if (!await db.editCourse(course)) {
        return res.status(400).json({ Error: db.getError() })
      }
      res.status(200).json({ IsSuccessFul: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error })
    }
  }

  async removeCourse(req, res) {
    try {
      if (!(req.params.id)) {
        res.status(400).json({ Error: "Please input a valid course Id" });
      }
      await db.removeCourse(req.params.id)
      res.status(200).json({ IsSuccessFul: true });
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

}

module.exports = new Course;