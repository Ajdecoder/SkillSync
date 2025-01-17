const CandidateCardSchema = {
    candidateId: {
      type: String,
      required: true, 
    },
    name: {
      type: String,
      required: true, 
    },
    profilePicture: {
      type: String, 
    },
    headline: {
      type: String, 
    },
    skills: {
      type: [String], 
    },
    experience: {
      type: Number, 
    },
    location: {
      type: String, 
    },
    availability: {
      type: String, 
    },
    about: {
      type: String, 
    },
    education: {
      type: [ 
        {
          institution: String, 
          degree: String, 
          yearOfGraduation: String, 
        },
      ],
    },
    portfolio: {
      type: [String], 
    },
    socialLinks: {
      linkedIn: {
        type: String, 
      },
      github: {
        type: String, 
      },
      other: {
        type: String, 
      },
    },
    certifications: {
      type: [ 
        {
          title: String, 
          issuedBy: String, 
          year: String, 
        },
      ],
    },
    projects: {
      type: [ 
        {
          name: String, 
          description: String, 
          link: String, 
        },
      ],
    },
  };
  