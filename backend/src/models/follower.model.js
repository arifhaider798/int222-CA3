
import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const followerSchema =new Schema({
    
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin" 
    }
    
},{timestamps:true})
followerSchema.plugin(mongooseAggregatePaginate)
export const Follower = mongoose.model("Follower",followerSchema)