import mongoose from 'mongoose';

const WidgetGoal = new mongoose.Schema({
    provider: String,
    userId: String,
    goalType: String,
    goal: Number,
    mockValue: Number,
    values: {
        total: {
            value: { type: Number, default: 0 },
            lastReset: { type: Date, default: Date.now },
        },
        weekly: {
            value: { type: Number, default: 0 },
            lastReset: { type: Date, default: Date.now },
        },
        monthly: {
            value: { type: Number, default: 0 },
            lastReset: { type: Date, default: Date.now },
        },
        session: {
            value: { type: Number, default: 0 },
        },
    },
});

export default mongoose.models.WidgetGoal || mongoose.model('WidgetGoal', WidgetGoal);
