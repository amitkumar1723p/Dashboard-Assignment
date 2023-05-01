import Dashboard_Model from "../Model/DashboardModel.js";
import { SendError } from "../Utils/SendError.js";
// Create DashboardData

export const createDashboardData = async (req, res) => {
  try {
    const Dashboard_document = new Dashboard_Model(req.body);
    await Dashboard_document.save();
    let message = "Data Created successfully";

    res.status(201).json({ success: true, message });
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};

export const getAllData = async (req, res) => {
  try {
    let alldata = await Dashboard_Model.find();
    let message = "data find successfully";
    res.status(200).json({ success: true, message, data: alldata }); 
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};
