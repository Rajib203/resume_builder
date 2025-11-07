import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path'
// Create Resume Controller
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // You can get userId from req.user (if auth middleware used)
    // or from req.body for testing in Thunder Client
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Default resume structure
    const defaultResumeData = {

      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
        },
      ],
      skills: [
        {
          name: '',
          progress: 0,
        },
      ],
      projects: [
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
      languages: [
        {
          name: '',
          progress: 0,
        },
      ],
      interests: [''],
    };

    // Create resume in DB
    const newResume = await Resume.create({
        userId,
        title,
        ...defaultResumeData,
        ...req.body

    });
    res.status(201).json(newResume);

  } catch (error) {
    console.error("Create Resume Error:", error);
    res.status(500).json({ message: "Resume not created sucessfully", error: error.message });
  }
};

export const getUserResumes =async(req,res)=>{

    try {
        const resumes= await Resume.find({userId:req.user._id}).sort({
            createdAt:-1
        })
        res.status(201).json(resumes)
    } catch (error) {
        res.status(500).json({ message: "Resume not get", error: error.message });

    }
}

export const getResumeById=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id})
        if(!resume)
        {
            return res.status(400).json({message:"Resume not found"})
        }
        res.status(200).json(resume)
    } catch (error) {
        res.status(500).json({ message: "Resume not gettt", error: error.message });

    }
}

export const updateResume=async(req,res)=>{
  try {
    const resume=await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    })
    if(!resume)
    {
      return res.status(404).json({message:"Resume not found.."})
    }

    Object.assign(resume,req.body)

    const savedResume=await resume.save()
    res.json(savedResume)

  } catch (error) {
    res.status(500).json({message:"failed to update resume."})
  }
}

export const deleteResume=async(req,res)=>{
  try {
    const resume=await Resume.findOne({
      _id:req.params.id,
      userId:req.user._id
    })
    if(!resume)
    {
      return res.status(500).json({message:"Failed to load Resume"})
    }
    const uploadsFolder=path.join(process.cwd(),"uploads")

    if(resume.thumbnailLink){
      const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailLink))
      if(fs.existsSync(oldThumbnail))
      {
        fs.unlinkSync(oldThumbnail)
      }
    }
    if(resume.profileInfo?.profilePreviewUrl)
    {
      const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl))
      if(fs.existsSync(oldProfile))
      {
        fs.unlinkSync(oldProfile)
      }
    }
    const deleted=await Resume.findOneAndDelete({
      _id:req.params.id,
      userId:req.user._id
    })
    if(!deleted)
    {
      return res.status(404).json({message:"Resume not found.."})

    }
    res.json({message:"Resume deleted sucessfully"})
    
  } catch (error) {
      res.status(500).json({message:"failed to dleted",error:error.message})

  }
}