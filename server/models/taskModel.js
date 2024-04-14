import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    taskName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    reminders: {
        type: [Date],
        required: true
    }

});
export default mongoose.model('taskModel', taskSchema, "Tasks")