import { Admin } from "../models/admin.models.js";
import { Song } from "../models/song.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadSong = asyncHandler(async(req,res)=> {
    const {songName} =req.body;
if(!songName){
    throw new ApiError(404,"Please enter song Name")
}
    const songFilePath = req.files?.songFile[0]?.path;
    const songCoverPath = req.files?.songCover[0]?.path;
    if(!songFilePath){
        throw new ApiError(404,"cant find the song")
    }
    const songFile = await uploadOnCloudinary(songFilePath);
    const songCover = await uploadOnCloudinary(songCoverPath);
    if(!songFile){
        throw new ApiError(404,"Song file is required")
    }

    const song =await Song.create({
        songName,
        songFile:songFile.url,
        songCover:songCover.url|| "",
    })
    
    const admin = await Admin.findById(req.user._id);
    console.log(admin);
    admin.mySong.push(song);
    song.createdBy.push(admin);
    await song.save();
    await admin.save();

    return res.status(200)
    .json(new ApiResponse(200,song,"Song successfully uploaded"))

})

const viewMySongs = asyncHandler(async(req,res)=> {
     const adminId = req.user._id;
     const songs = await Admin.findById(adminId).populate("mySong");

    return res.json( new ApiResponse(200,songs,"song successfully fetched"))
})
const allSongs = asyncHandler(async(req,res)=> {
    const songs = await Song.find();
    const artist = await Song.find().populate("createdBy")
 if(artist)
 return res.json(new ApiResponse(200,artist,"All songs fetched"))

})
export {
    uploadSong,
    viewMySongs,
    allSongs,
}
