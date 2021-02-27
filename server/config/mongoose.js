import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/online_payment", { 
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex: true  
});

export default mongoose;