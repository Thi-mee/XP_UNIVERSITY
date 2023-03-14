const db = require("./facultyDB");
const Validate = require("../../validator");

class Faculty {
  getAllFaculties = async (req, res) => {
    try {
      const retVal = await db.getAllFaculties();
      if (retVal == null) {
        return res.status(500).json({ Error: db.getError() ? "DB Response was Null" : db.getError() });
      }
      res.status(200).send(retVal);
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  getFaculty = async (req, res) => {
    try {
      const { facultyId } = req.params;
      const retVal = await db.getFaculty(facultyId);
      if (retVal == null) {
        res.status(400).json({ Error: "No faculty found" });
      } else {
        res.status(200).send(retVal);
      }
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  getFaculties = async (req, res) => {
    try {
      const { Status, Name } = req.body;

      if (!Validate.facultyQuery({ Status, Name })) return res.status(400).json({ Error: Validate.error[0] });

      const retVal = await db.getFaculties(Status, Name);
      if (retVal == null) {
        res
          .status(400)
          .json({
            Error: db.getError() === null ? "No faculty found" : db.getError(),
          });
      } else {
        res.status(200).send(retVal);
      }

    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  addFaculty = async (req, res) => {
    try {
      const faculty = { ...req.body };

      if (!Validate.faculty(faculty)) return res.status(400).json({ Error: Validate.error[0] });

      const retValue = await db.addFaculty(faculty);
      if (retValue == null) { return res.status(400).json({ Error: db.getError() ? db.getError() : "Db returned null" }); }

      return res.status(200).json({ IsSuccess: true, body: retValue });

    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }

  editFaculty = async (req, res) => {
    try {
      const faculty = { ...req.body };

      if (!Validate.faculty(faculty)) return res.status(400).json({ Error: Validate.error[0] });

      else {
        await db.editFaculty(faculty);
        res.status(200).json({ IsSuccessFul: true });
      }
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }
  removeFaculty = async (req, res) => {
    try {
      const { facultyId } = req.params;
      if (facultyId == 0) {
        res.status(400).json({ Error: "Please input a valid faculty Id" });
      } else {
        await db.removeFaculty(facultyId);
        res.status(200).json({ IsSuccessFul: true });
      }
    } catch (error) {
      res.status(400).json({ Error: error });
      console.log(error);
    }
  }
}

module.exports = new Faculty;
