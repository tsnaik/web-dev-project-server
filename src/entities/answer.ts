import { ReputationPoint } from './reputationPoint';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './question';
import { User } from './user';
import { IsNotEmpty } from 'class-validator';

@Entity({name: 'answers'})
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({type: 'longtext'})
    answer: string;

    @ManyToOne(type => Question, question => question.answers, {
        onDelete: 'CASCADE'
    })
    question: Question;

    @ManyToOne(type => User, user => user.answers)
    user: User

    @OneToMany(type => ReputationPoint, reputationPoint => reputationPoint.targetAnswer)
    reputations: ReputationPoint[]

    totalReputation: number
}
