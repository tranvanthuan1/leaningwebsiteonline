import { TestingModel } from "../models/TestingModel.js";

export const getTestings = async (req, res) => {
  try {
    const testings = await TestingModel.find();
    res.status(200).json(testings);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}; 

export const createTesting = async (req, res) => {
  const newTesting = req.body;
  TestingModel.insertOne(newTesting)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  
};

///////////
export const deleteOnTesting = async (req, res) => {
  try {
    const { id } = req.body;
    const testing = await TestingModel.deleteOne({ _id: id });
    res.status(200).json(testing);
  } catch (err) {
    res.status(500).json({ error: err }); 
  }
};

export const updateTesting = async (req, res) => {
  try {
    const updateTesting = req.body;
    const newQuestion = updateTesting?.question?.map((item) => ({
      title: item.title,
      answers: item.answers,
    }));
    const testing = await TestingModel.findOneAndUpdate(
      { _id: updateTesting._id },
      { ...updateTesting, question: newQuestion },
      { new: true }
    );

    res.status(200).json(testing);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};