var tasksData = [];

const getTasks = (req, res) => {
  try {
    const { id } = req.params;
    let finalRes = [];
    if (id) {
      const foundRecord = tasksData.find((ele) => ele.id === id);

      if (!foundRecord) throw new Error("No record found on given id.");
      finalRes = [foundRecord];
    } else {
      finalRes = tasksData;
    }

    res.status(200).send({ success: true, data: finalRes });
  } catch (error) {
    res.status(400).send({ success: true, message: error.message || error });
  }
};

const addTasks = (req, res) => {
  try {
    const { body } = req;
    if (typeof body !== "object" || !Object.keys(body).length)
      throw new Error("Invalid body");

    tasksData = [...tasksData, { id: Date.now().toString(), ...body }];
    res
      .status(200)
      .send({ success: true, message: "Task created successfully" });
  } catch (error) {
    res.status(400).send({ success: true, message: error.message || error });
  }
};

const updateTasks = (req, res) => {
  try {
    const { body, params } = req,
      { id } = params;

    if (typeof body !== "object" || !Object.keys(body).length)
      throw new Error("Invalid body");

    if (!id) throw new Error("Id is required to update record.");
    const existingData = tasksData.find((ele) => ele.id === id);

    if (!existingData) throw new Error("No record found on given id.");

    tasksData = tasksData.map((ele) =>
      ele.id === id ? { ...ele, ...body } : ele
    );

    res
      .status(200)
      .send({ success: true, message: "Task updated successfully" });
  } catch (error) {
    res.status(400).send({ success: true, message: error.message || error });
  }
};

const deleteTasks = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Id is required to delete record.");

    tasksData = tasksData.filter((ele) => ele.id !== id);
    res
      .status(200)
      .send({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send({ success: true, message: error.message || error });
  }
};

module.exports = {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
};
