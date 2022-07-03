const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema(
    {
        title: {
            type: String
        },
        questions: [
            {
                title: {
                    type: String
                },
                type: {
                    type: String
                },
                answer: {
                    type: String
                },
                date: {
                    type: Date,
                    default: new Date()
                },
                options: [
                    {
                        title: {
                            type: String
                        },
                        selected: {
                            type: Boolean
                        }
                    }
                ]
            }
        ]
    },

    {
        collection: "Quiz",
        timestamps: true, // inserts createdAt and updatedAt
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports.Quiz = Quiz;
