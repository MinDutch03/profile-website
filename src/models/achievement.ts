import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  dateAchieved: Date;
  timeOfAchievement: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateAchieved: { type: Date, required: true },
    timeOfAchievement: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
