/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/

const schemeModel = require("./scheme-model");

const checkSchemeId = async (req, res, next) => {
  try {
    const isExist = await schemeModel.findById(req.params.scheme_id);

    if (!isExist) {
      res.status(404).json({
        message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı`,
      });
    } else {
      req.currentScheme = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
}; // veritabanına gittiğimiz için async/await yaparız.

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body;

    if (
      scheme_name === undefined ||
      typeof scheme_name !== "string" ||
      scheme_name.trim() === ""
    ) {
      res.status(400).json({ message: "Geçersiz scheme_name" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;
    if (
      instructions === undefined ||
      typeof instructions !== "string" ||
      instructions.trim() == "" ||
      typeof step_number !== "number" ||
      step_number < 1
    ) {
      res.status(400).json({ message: "Hatalı step" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
