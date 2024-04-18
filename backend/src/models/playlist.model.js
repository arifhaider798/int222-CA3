import { timeStamp } from "console"
import mongoose,{Schema} from "mongoose"

const playlistSchema =new Schema({
    playlistName : {
        type: String,
    },
    createdBy: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    playlistCover: {
        type:String,//cloudinary url
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
       }]

},{timestamps:true})
export const Playlist = mongoose.model("Playlist",playlistSchema)