import mongoose from "mongoose";

const DisasterAlertSchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      index: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    region: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

DisasterAlertSchema.index({ disasterType: 1, location: 1, timestamp: 1 }, { unique: true });

const DisasterAlert = mongoose.models.DisasterAlert || mongoose.model("DisasterAlert", DisasterAlertSchema);

export default DisasterAlert;