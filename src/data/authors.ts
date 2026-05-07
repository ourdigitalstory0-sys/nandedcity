export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialization: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const authors: Author[] = [
  {
    id: "vikram-deshmukh",
    name: "Vikram Deshmukh",
    role: "Senior Investment Strategist",
    bio: "With over 15 years of experience in the Pune real estate market, Vikram specializes in township appreciation trends and high-yield residential investments. He has authored multiple whitepapers on the growth of South Pune's micro-markets.",
    avatar: "/authors/vikram.jpg",
    specialization: ["Real Estate Investment", "Township Appreciation", "Sinhagad Road Market Analysis"],
    social: {
      linkedin: "https://linkedin.com/in/vikram-deshmukh-pune"
    }
  },
  {
    id: "ananya-kulkarni",
    name: "Ananya Kulkarni",
    role: "Township Lifestyle Consultant",
    bio: "Ananya is an expert in integrated community living and urban planning. She focuses on the quality-of-life metrics within self-reliant townships like Nanded City, ensuring families find the perfect balance between amenities and serenity.",
    avatar: "/authors/ananya.jpg",
    specialization: ["Community Living", "Urban Planning", "Family-Centric Real Estate"],
    social: {
      linkedin: "https://linkedin.com/in/ananya-kulkarni-lifestyle"
    }
  }
];
