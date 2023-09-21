import mongoose, { Schema, Document } from 'mongoose';

export interface ITodoList extends Document {
    name: string;
    isEven: boolean;
    todos: {
        text: string;
        completed: boolean;
        date: Date;
    }[];
}

const TodoListSchema = new Schema<ITodoList>({
    name: {
        type: String,
        required: true,
    },
    isEven: {
        type: Boolean,
        required: true
    },
    todos: [{
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }], 
});

export default mongoose.model<ITodoList>('TodoList', TodoListSchema);