import mongoose from "mongoose";

const PartsSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const HistorySchema = new mongoose.Schema({
  role: { type: String, required: true },
  parts: { type: [PartsSchema], required: true },
});

const AiChatSchema = new mongoose.Schema({
  history: { type: [HistorySchema], required: true },
});

const AiChatModel = mongoose.model("AiChat", AiChatSchema);

export default AiChatModel;
