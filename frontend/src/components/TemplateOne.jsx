import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuGithub, LuGlobe } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import {
  EducationInfo,
  WorkExperience,
  ProjectInfo,
  CertificationInfo,
} from "./ResumeSection";
import { formatYearMonth } from "../utils/helper";

const DEFAULT_PRIMARY = "#0284c7";
const DEFAULT_BADGE_BG = "#e0f2fe";
const DEFAULT_BADGE_TEXT = "#0369a1";

const Title = ({ text, color = DEFAULT_PRIMARY }) => (
  <div className="relative w-fit mb-2 resume-section-title">
    <h2 className="relative text-sm font-bold uppercase tracking-wider pb-1" style={{ color }}>
      {text}
    </h2>
    <div className="w-full h-[2px] mt-0.5" style={{ backgroundColor: color }} />
  </div>
);

const TemplateOne = ({ resumeData = {}, colorPalette, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  const primaryColor = (colorPalette && colorPalette[1]) || DEFAULT_PRIMARY;
  const badgeBg = (colorPalette && colorPalette[4]) || DEFAULT_BADGE_BG;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualWidth);
      setScale(containerWidth / actualWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white font-sans text-slate-800"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header */}
      <div className="resume-section flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 pb-1" style={{ color: primaryColor }}>
            {profileInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-base font-semibold text-slate-700 pb-2">{profileInfo.designation}</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            {contactInfo.email && (
              <div className="flex items-center gap-1">
                <LuMail className="text-slate-500" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center gap-1">
                <LuPhone className="text-slate-500" />
                <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center gap-1">
                <span>{contactInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end text-xs text-slate-600 space-y-1">
          {contactInfo.linkedin && (
            <div className="flex items-center gap-1">
              <RiLinkedinLine className="text-slate-500" />
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {contactInfo.github && (
            <div className="flex items-center gap-1">
              <LuGithub className="text-slate-500" />
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          )}
          {contactInfo.website && (
            <div className="flex items-center gap-1">
              <LuGlobe className="text-slate-500" />
              <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {profileInfo.summary && (
        <div className="resume-section mb-5">
          <Title text="Professional Summary" color={primaryColor} />
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{profileInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-5">
          {workExperience.length > 0 && (
            <div className="resume-section">
              <Title text="Work Experience" color={primaryColor} />
              <div className="space-y-4">
                {workExperience.map((exp, i) => (
                  <WorkExperience
                    key={i}
                    company={exp.company}
                    role={exp.role}
                    duration={`${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                    description={exp.description}
                    durationColor={primaryColor}
                  />
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="resume-section">
              <Title text="Projects" color={primaryColor} />
              <div className="space-y-4">
                {projects.map((proj, i) => (
                  <ProjectInfo
                    key={i}
                    title={proj.title}
                    description={proj.description}
                    githubLink={proj.github}
                    liveDemoUrl={proj.liveDemo}
                    bgColor={badgeBg}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-5">
          {skills.length > 0 && (
            <div className="resume-section">
              <Title text="Skills" color={primaryColor} />
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: badgeBg, color: DEFAULT_BADGE_TEXT }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="resume-section">
              <Title text="Education" color={primaryColor} />
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <EducationInfo
                    key={i}
                    degree={edu.degree}
                    institution={edu.institution}
                    duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
                  />
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="resume-section">
              <Title text="Certifications" color={primaryColor} />
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <CertificationInfo
                    key={i}
                    title={cert.title}
                    issuer={cert.issuer}
                    year={cert.year}
                    bgColor={badgeBg}
                  />
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="resume-section">
              <Title text="Languages" color={primaryColor} />
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: badgeBg, color: DEFAULT_BADGE_TEXT }}
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && interests.some(Boolean) && (
            <div className="resume-section">
              <Title text="Interests" color={primaryColor} />
              <div className="flex flex-wrap gap-1.5">
                {interests.filter(Boolean).map((int, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: badgeBg, color: DEFAULT_BADGE_TEXT }}
                  >
                    {int}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;