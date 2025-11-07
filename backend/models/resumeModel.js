import mongoose from 'mongoose'

const ResumeSchema= new mongoose.Schema({
    userId:{
        type:String ,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumbnailLink:{
        type:String
    },
    template:{
        theme:String,
        colorPalette:[String]
    },
    profileInfo:{
        profilePreviewUrl:String,
        fullName:String,
        designation:String,
        summary:String,
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String,
        github:String,
        website:String
    },
    //work experience
    workExperience:[{
        company:String,
        role:String,
        startDate:String,
        endDate:String,
        description:String
    },],

    education:[{
        degree:String,
        institution:String,
        startDate:String,
        endDate:String,
    }],
    skills:[{
        name:String,
        progress:Number
    },],

    projects:[{
        title:String,
        description:String,
        github:String,
        livedemo:String
    }]
    ,
    certifications:[{
        title:String,
        issuer:String,
        year:String
    },],

    languages:[{
        name:String,
        progress:Number
    },]
    ,
    interests:[String]


},{timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
}})

export default mongoose.model('Resume',ResumeSchema)