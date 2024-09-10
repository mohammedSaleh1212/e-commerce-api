
import mongoose, { Schema, Document } from 'mongoose';

interface IImage extends Document {
  filename: string;
  contentType: string;
  imageBase64: string;
}

const ImageSchema: Schema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  imageBase64: { type: String, required: true },
});

export default mongoose.model<IImage>('Image', ImageSchema);

