import mongoose from 'mongoose';

export default mongoose.connect(
  'mongodb+srv://admin:89456123@cluster0-9fkne.mongodb.net/omnistack7?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  }
);
