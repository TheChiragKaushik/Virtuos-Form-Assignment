import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    collegeName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    round1Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 1 Marks must be at least 0'],
        max: [10, 'Round 1 Marks cannot exceed 10']
    },
    round2Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 2 Marks must be at least 0'],
        max: [10, 'Round 2 Marks cannot exceed 10']
    },
    round3Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 3 Marks must be at least 0'],
        max: [10, 'Round 3 Marks cannot exceed 10']
    },
    techMarks: {
        type: Number,
        required: true,
        min: [10, 'Tech Marks must be at least 10'],
        max: [20, 'Tech Marks cannot exceed 20']
    }
});

const User = mongoose.model("User", userSchema);

export default User;
