const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  managerid: {
    type: String,
    required: true,
  },
  managerAffilication: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  question1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  question3: {
    type: String,
    required: true,
  },
  question4: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
