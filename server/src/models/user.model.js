import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, 'User name cannot exceed 30 characters'],  
        index: true,
    },
    collegeName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'College name cannot exceed 50 characters'],  
        index: true
    },
    round1Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 1 Marks must be at least 0'],
        validate: {
            validator: function(value) {
                return value <= this.maxRoundMarks;
            },
            message: 'Round 1 Marks cannot exceed maxRoundMarks'
        }
    },
    round2Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 2 Marks must be at least 0'],
        validate: {
            validator: function(value) {
                return value <= this.maxRoundMarks;
            },
            message: 'Round 2 Marks cannot exceed maxRoundMarks'
        }
    },
    round3Marks: {
        type: Number,
        required: true,
        min: [0, 'Round 3 Marks must be at least 0'],
        validate: {
            validator: function(value) {
                return value <= this.maxRoundMarks;
            },
            message: 'Round 3 Marks cannot exceed maxRoundMarks'
        }
    },
    techMarks: {
        type: Number,
        required: true,
        min: [10, 'Tech Marks must be at least 10'],
        validate: {
            validator: function(value) {
                return value <= this.maxTechMarks;
            },
            message: 'Tech Marks cannot exceed maxTechMarks'
        }
    },
    maxRoundMarks: {
        type: Number,
        required: true
    },
    maxTechMarks: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;
