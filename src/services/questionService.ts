import {Question} from '../entities/question';
import {getConnection} from 'typeorm';
import {QuestionRepository} from '../repositories/questionRepository';

export class QuestionService {
    questionRepository: QuestionRepository;

    constructor() {
        this.questionRepository = getConnection().getCustomRepository(QuestionRepository);
    }

    public async getAllQuestions(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    public async createNewQuestion(question: Question): Promise<Question> {
        console.log('Question - ', question);
        return this.questionRepository.save(question);
    }

    public async updateQuestion(question: Question): Promise<Question> {
        console.log('Updating - ', question);
        return this.questionRepository.save(question);
    }
}