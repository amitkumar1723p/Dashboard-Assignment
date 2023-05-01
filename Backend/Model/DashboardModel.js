import mongoose from "mongoose";
const Dashboard_Schema = mongoose.Schema({
  end_year: {
    type: Number,
    trim: true,
  },
  intensity: {
    type: Number,

    trim: true,
  },

  sector: {
    type: String,

    trim: true,
  },
  topic: {
    type: String,

    trim: true,
  },
  insight: {
    type: String,

    trim: true,
  },
  url: {
    type: String,

    trim: true,
  },
  region: {
    type: String,

    trim: true,
  },
  start_year: {
    type: Number,

    trim: true,
  },
  impact: {
    type: String,

    trim: true,
  },
  added: {
    type: String,

    trim: true,
  },
  published: {
    type: String,

    trim: true,
  },
  country: {
    type: String,

    trim: true,
  },
  relevance: {
    type: Number,

    trim: true,
  },
  pestle: {
    type: String,

    trim: true,
  },
  source: {
    type: String,

    trim: true,
  },
  title: {
    type: String,

    trim: true,
  },
  likelihood: {
    type: Number,

    trim: true,
  },
});

const Dashboard_Model = mongoose.model("Dashboard_Schema", Dashboard_Schema);
export default Dashboard_Model;
