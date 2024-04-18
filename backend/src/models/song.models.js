import { timeStamp } from "console"
import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const songSchema =new Schema({
    songName : {
        type: String,
    },
    createdBy: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }],
    songFile: {
        type:String,//cloudinary url
    },
    songCover: {
        type:String,//cloudinary url
    }

},
 {
    timestamps:true
 } 
)

songSchema.plugin(mongooseAggregatePaginate);
export const Song = mongoose.model("Song",songSchema)