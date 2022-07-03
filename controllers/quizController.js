const { Quiz } = require("../models/quiz");
const Joi = require("joi");
const { validateObjectId } = require("../helpers/validateObjectId");

exports.insertSolvedQuiz = async (req, res) => {
    const body = req.body;
    const { error } = validateQuiz(body);

    if (error) return res.status(400).send(error.details[0].message);
    if (!body.questions?.length)
        return res.status(400).send('Questions Are Required');
        
    let quiz = new Quiz(body);
    await quiz.save()
    res.status(200).json({
        msg: 'quiz successfully submitted'
    });
};


exports.getQuizs = async (req, res) => {
    let query = req.query;

    const resultsPerPage = query.resultsPerPage ? query.resultsPerPage : 10;
    let page = query.page >= 1 ? query.page : 1;
    page = page - 1

    const [quizs, count] = await Promise.all([
        Quiz.find()
            .sort({ createdAt: query.sort ? query.sort : "asc" })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page),
        Quiz.count()
    ])

    res.status(200).send({ count, quizs });
};

function validateQuiz(input) {
    schema = Joi.object({
        title: Joi.string().min(1).required(),
        questions: Joi.array().items({
            title: Joi.string()
                .required(),
            type: Joi.string()
                .required(),
            answer: Joi.string()
                .optional(),
            options: Joi.array().items({
                title: Joi.string().required(),
                selected: Joi.boolean().required()
            })
                .required().min(2).optional()
        })
    });
    return schema.validate({ title: input.title, questions: input.questions });
}
