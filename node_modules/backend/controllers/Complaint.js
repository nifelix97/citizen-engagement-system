const Complaint = require('../models/Complaint');

exports.submitComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
};

exports.getOne = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  res.json(complaint);
};

exports.updateStatusOrResponse = async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(complaint);
};
exports.deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
exports.getByUserId = async (req, res) => {
  const complaints = await Complaint.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json(complaints);
};