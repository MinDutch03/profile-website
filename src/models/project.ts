import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  technologies: string[];
  projectUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    technologies: [{ type: String }],
    projectUrl: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
