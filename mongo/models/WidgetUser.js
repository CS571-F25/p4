import mongoose from 'mongoose';

const WidgetUserSchema = new mongoose.Schema({
    userId: String,
    providers: {
        type: Map,
        of: String | Number | Array,
    },
});

export default mongoose.models.WidgetUser || mongoose.model('WidgetUser', WidgetUserSchema);
