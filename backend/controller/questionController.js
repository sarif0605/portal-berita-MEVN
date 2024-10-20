import Question from "../models/Question";
import asyncHandler from "../middleware/asyncHandle";
export const CreateData = asyncHandler(async (req, res) => {
  const createData = await Question.create({
    title: req.body.title,
    question: req.body.question,
    category: req.body.category,
    userId: req.user._id,
  });

  return res.status(201).json({
    success: true,
    data: createData,
  });
});

export const GetData = asyncHandler(async (req, res) => {
  const getAllData = await Question.find();
  return res.status(200).json({
    success: true,
    data: getAllData,
  });
});

export const GetDataById = asyncHandler(async (req, res) => {
  const getDataById = await Question.findById(req.params.id);
  if (!getDataById) {
    res.status(404);
    throw new Error("Data not found");
  }
  return res.status(200).json({
    success: true,
    data: getDataById,
  });
});

export const UpdateData = asyncHandler(async (req, res) => {
  const { title, question, category } = req.body;
  const paramsId = req.params.id;
  const idQuestion = await Question.findById(paramsId);
  idQuestion.title = title;
  idQuestion.question = question;
  idQuestion.category = category;
  await idQuestion.save();
  return res.status(200).json({
    success: true,
    data: idQuestion,
  });
});
