import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "Arpita Jena",
    summary:
      "Software engineer obsessed with building exceptional products that people love",
    email: "arpitajena210@gmail.com",
    phone: "+91-9354515502",
    location: "Lucknow, India",
    url: "https://www.linkedin.com/in/arpita-jena-04a262215/",
  },
  workExperiences: [
    {
      company: "ABC Company",
      jobTitle: "Software Engineer",
      date: "May 2023 - Present",
      descriptions: [
        "Pseudo work history to be displayed here"
      ],
    },
    {
      company: "XYZ Organization",
      jobTitle: "Software Engineer Intern",
      date: "Summer 2022",
      descriptions: [
        "Pseudo work history to be displayed here"
      ],
    },
    {
      company: "Flipkart",
      jobTitle: "SDE Intern",
      date: "Summer 2021",
      descriptions: [
        "Created Change Language Page to allow users to choose from different languages before logging onto Shopsy an e-commerce platform, also called the Vernacular API on the action of the Continue button to pass payload specific to a session/device as a API Contract to the back-end",
        " Onboard-ed IRIS API that creates a directory specific to different locales containing key-value pairs of strings to be dynamically used throughout the code-base instead of hard-coded strings",
        " Migrated SellerV2, NepCoupon, NetEffectivePrice widget to NextJS"
      ],
    },
  ],
  educations: [
    {
      school: "Indian Institute of Information Technology Lucknow",
      degree: "Bachelor of Science in IT",
      date: "Nov 2021 - May 2025",
      gpa: "8.65",
      descriptions: [
        "Teaching Assistant for Programming for the Web (2022 - 2023)",
        "Coursework: Object-Oriented Programming (A+), Cryptography (A+), Cloud Computing (A), Soft Computing (B+), AI for Arts (A)",
      ],
    },
  ],
  projects: [
    {
      project: "Echo",
      date: "Spring 2023",
      descriptions: [
        "Created and launched a free resume builder web app that allows thousands of users to create professional resume easily and land their dream jobs",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "HTML", rating: 4 },
      { skill: "CSS", rating: 4 },
      { skill: "Python", rating: 3 },
      { skill: "TypeScript", rating: 3 },
      { skill: "React", rating: 3 },
      { skill: "C++", rating: 2 },
    ],
    descriptions: [
      "Tech: React Hooks, GraphQL, Node.js, SQL, Postgres, NoSql, Redis, REST API, Git",
      "Soft: Teamwork, Creative Problem Solving, Communication, Learning Mindset, Agile",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
