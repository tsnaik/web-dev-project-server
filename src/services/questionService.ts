import { Question } from '../entities/question';
import { getConnection } from 'typeorm';
import { QuestionRepository } from '../repositories/questionRepository';

export class QuestionService {
    private static instance: QuestionService;
    private questionRepository: QuestionRepository;

    private constructor() {
        this.questionRepository = getConnection().getCustomRepository(QuestionRepository);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new QuestionService();
        }
        return this.instance;
    }


    public async getAllQuestions(): Promise<Question[]> {
        try {
            return await this.questionRepository.find({
                relations: ['user']
            });
        } catch (e) {
            console.error(e);
            throw (e);
        }
    }

    public async getQuestionById(qId: number): Promise<Question> {
        try {
            return await this.questionRepository.findOneOrFail(qId, {
                relations: ['user']
            });
        } catch (e) {
            console.error(e);
            throw (e);
        }

    }

    public async createNewQuestion(question: Question): Promise<Question> {
        console.log('Question - ', question);
        try {
            return await this.questionRepository.save(question);
        } catch (e) {
            console.error(e);
            throw (e);
        }
    }

    public async updateQuestion(question: Question): Promise<Question> {
        console.log('Updating - ', question);
        try {
            return await this.questionRepository.save(question);
        } catch (e) {
            console.error(e);
            throw (e);
        }
    }

    public async deleteQuestion(questionId: number): Promise<number> {
        console.log('Deleting - ', questionId);
        try {
            const res = await this.questionRepository.delete(questionId);
            return Number(res.affected);
        } catch (e) {
            console.error(e);
            throw (e);
        }
    }
}
