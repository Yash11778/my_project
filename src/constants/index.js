import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  file02,
  homeSmile,
  instagram,
  linkedin,
  unstop,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "expo-event",
    title: "Expo Event",
    url: "#expo-event",
  },
  {
    id: "problem-statements",
    title: "Problem Statements",
    url: "/problem-statements",  // Keep this as /problem-statements to navigate to the separate page
  }
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const hackathonThemes = [
  "Generative AI",
  "FinTech",
  "Internet of Things (IoT)",
  "HealthTech",
  "Transportation and Logistics",
  "Smart Education",
  "Industry 5.0",
  "Open Innovation"
];

export const hackathonThemeIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

// Rename these exports from brainwave to HackRonyX
export const HackRonyXServices = hackathonThemes;
export const HackRonyXServicesIcons = hackathonThemeIcons;

// For backward compatibility with existing components
export const brainwaveServices = hackathonThemes;
export const brainwaveServicesIcons = hackathonThemeIcons;

export const roadmap = [
  {
    id: "0",
    title: "Registration Opens",
    text: "Teams can register for the hackathon and start preparing their concepts.",
    date: "20 April 2025",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Presentation Submission",
    text: "Teams must submit their presentation showcasing understanding of a theme and innovative approach.",
    date: "04 June 2025",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Team Selection",
    text: "Top 35 teams will be shortlisted based on innovation, feasibility, and alignment with themes.",
    date: "10 June 2025",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Offline Hackathon",
    text: "36-hour coding marathon at St. Vincent Pallotti College of Engineering & Technology, Nagpur.",
    date: "27-28 June 2025",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "HacKronyX 2025 is organized in collaboration with leading industry partners and tech companies to bring real-world challenges to participants.";

export const collabContent = [
  {
    id: "0",
    title: "Real-World Problems",
    text: "Work on actual challenges facing industries today",
  },
  {
    id: "1",
    title: "Industry Mentorship",
    text: "Get guidance from experienced professionals"
  },
  {
    id: "2",
    title: "Networking Opportunities",
    text: "Connect with tech leaders and potential employers"
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: notion, // Using notion as a temporary replacement for figma, // Changed from figma to notion as a temporary replacement
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: unstop, // Using unstop as a temporary replacement for discord
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: raindrop, // Using raindrop as a temporary replacement for framer
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
 
];

export const benefits = [
  {
    id: "0",
    title: "Industry Exposure",
    text: "Work on real problems submitted by industries and gain experience solving practical challenges.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Skill Enhancement",
    text: "Sharpen your coding, problem-solving, and presentation skills through intensive challenges.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Networking",
    text: "Connect with industry experts, potential employers, and like-minded tech enthusiasts.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Recognition & Rewards",
    text: "Win prizes worth ₹1,50,000+ and gain recognition for your innovative solutions.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  }
];

export const benefitIcons = [
  "/src/assets/benefits/industry-icon.svg",
  "/src/assets/benefits/skills-icon.svg",
  "/src/assets/benefits/network-icon.svg", 
  "/src/assets/benefits/rewards-icon.svg"
];

export const socials = [
  {
    id: "0",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/hackronyx.in/",
  },
  {
    id: "1",
    title: "LinkedIn",
    iconUrl: linkedin,
    url: "https://www.linkedin.com/company/hackronyx/",
  },
  {
    id: "2",
    title: "Unstop",
    iconUrl: unstop,
    url: "https://unstop.com/hackathons/hackronyx-st-vincent-pallotti-college-of-engineering-and-technology-svpcet-nagpur-1466009",
  }
];

export const problemStatements = [
  {
    id: "1",
    title: "Inventory Misalignment in Multi-Warehouse Logistics",
    description: "A national logistics company operating multiple warehouses across regions often experiences inventory discrepancies, leading to overstock in some locations and stockouts in others. Despite using ERP systems, issues persist due to inaccurate demand forecasting, inefficient inter-warehouse transfer coordination, and a lack of real-time visibility. How can this imbalance be addressed while keeping operational costs low?",
    category: "Logistics & Supply Chain",
    difficulty: "Intermediate",
    icon: "🏭"
  },
  {
    id: "2",
    title: "Unplanned Downtime in Mid-Sized Manufacturing Units",
    description: "Manufacturing SMEs often suffer unplanned machine downtime, leading to production delays and increased maintenance costs. These units usually lack advanced monitoring systems and operate with minimal digital infrastructure. What kind of system or process can help these facilities anticipate failures and schedule maintenance proactively?",
    category: "Manufacturing",
    difficulty: "Intermediate",
    icon: "⚙️"
  },
  {
    id: "3",
    title: "Digital Trust Without Digital Clutter",
    description: "Online users frequently share personal data across apps, sites, and services without knowing how it's stored, shared, or used. Most don't read privacy policies or understand consent frameworks. Meanwhile, developers build authentication systems, yet ignore transparency or user control. Developers focus on login systems but overlook transparency and user autonomy. What kind of solution can empower users to take control of their digital identity and data relationships, while being easy for developers to integrate? You might build a digital-passport, or an extension, or a dashboard, or maybe a plug-and-play API! The innovation is yours…",
    category: "Security & Privacy",
    difficulty: "Advanced",
    icon: "🔐"
  },
  {
    id: "4",
    title: "Trust Gaps in Supply Chain Traceability",
    description: "In global supply chains—especially for products like pharmaceuticals, luxury goods, or perishables—tracking the origin and movement of goods is difficult, often relying on siloed, error-prone records. This creates vulnerabilities to fraud, counterfeiting, and regulatory non-compliance. There's a growing demand for systems that offer traceability, integrity, and transparency across multiple parties without relying on centralized control. Participants can explore solutions for ledger system, authenticity, or even sharing layer!",
    category: "Blockchain",
    difficulty: "Advanced",
    icon: "⛓️"
  },
  {
    id: "5",
    title: "Enhancing Job Screening",
    description: "The recruitment process often involves manually reviewing numerous job descriptions (JDs) and CVs, which can be time-consuming and prone to human error. The goal of this hackathon is to develop a multi-agentic Al system that can automatically read and summarize job descriptions (JDs), match candidate qualifications with the JD, shortlist candidates, and send interview requests based on the match. Participants are expected to make a multiagent framework.",
    category: "AI & Automation",
    difficulty: "Advanced",
    icon: "🤖"
  },
  {
    id: "6",
    title: "Defending National Web Infrastructure from Targeted Attacks",
    description: "Government websites, financial portals, and public service platforms are frequently targeted by coordinated cyberattacks such as DDoS, defacement, or data exfiltration—especially during geopolitical tensions. These attacks can disrupt critical services, erode public trust, and compromise sensitive data. Many institutions still rely on outdated security infrastructure and lack proactive detection or rapid mitigation capabilities. Participants are challenged to build solutions that detect and block unusual traffic patterns, trace the origin of suspicious requests without violating privacy, or create real-time dashboards for monitoring and responding to infrastructure-level threats. The solution should be lightweight, scalable, and adaptable to different types of public-facing web applications.",
    category: "Cybersecurity",
    difficulty: "Expert",
    icon: "🛡️"
  }
];

export const eventHighlights = [
  {
    id: "0",
    title: "Team Size",
    value: "3-5 students"
  },
  {
    id: "1",
    title: "Registration Fee",
    value: "Free"
  },
  {
    id: "2",
    title: "Prize Pool",
    value: "1,50,000+"
  }
];

export const timelineEvents = [
  {
    id: "0",
    title: "Round 1: Online Presentation Submission",
    date: "Deadline: June 10, 2025",
    details: [
      "Submit PPT presentation of your approach",
      "Format: PDF/PPT upload via unstop",
      "Top 35 teams will be shortlisted"
    ]
  },
  {
    id: "1",
    title: "Round 2: Offline Hackathon",
    date: "June 27-28, 2025",
    details: [
      "36-hour coding marathon",
      "Work on real problem statements",
      "Present to industry experts"
    ]
  },
];

export const sponsorshipTiers = {
  platinum: {
    title: "Platinum Sponsors",
    description: "Our main event partners who make this hackathon possible",
    perks: [
      "Premium logo placement on all event materials",
      "Dedicated booth at the hackathon venue",
      "5-minute presentation during opening ceremony",
      "Access to participants' resumes",
      "First pick for recruitment opportunities"
    ],
    price: "₹1,50,000+"
  },
  gold: {
    title: "Gold Sponsors",
    description: "Key contributors to our hackathon's success",
    perks: [
      "Logo on event website and promotional materials",
      "Booth space at the hackathon venue",
      "3-minute presentation during opening ceremony",
      "Access to participants' resumes"
    ],
    price: "₹50,000+"
  },
  silver: {
    title: "Silver Sponsors",
    description: "Supporting our hackathon community",
    perks: [
      "Logo on event website",
      "Mention during opening ceremony",
      "Promotional materials in participant welcome kits"
    ],
    price: "₹25,000+"
  }
};

// New addition: Expo Event details
export const expoEvent = {
  title: "Expo Event - Showcase Day",
  date: "June 28, 2025",
  description: "The culmination of HacKronyX 2025 where teams showcase their solutions to industry experts, judges, and fellow participants. The Expo provides a platform to demonstrate your innovations, receive valuable feedback, and compete for the grand prizes.",
  schedule: [
    {
      activity: "Project Setup and Final Preparations",
      description: "Teams set up their demo stations and make final adjustments to their presentations."
    },
    {
      activity: "Expo Showcase - Round 1",
      description: "Teams present their solutions to judges and attendees in a science fair format."
    },
    {
      activity: "Networking Lunch",
      description: "Connect with industry professionals, mentors, and other participants."
    },
    {
      activity: "Finalist Presentations",
      description: "Top 10 teams selected from Round 1 present their solutions on the main stage."
    },
    {
      activity: "Expert Panel Discussion",
      description: "Industry leaders discuss emerging tech trends and opportunities."
    },
    {
      activity: "Awards Ceremony",
      description: "Announcement of winners and prize distribution."
    }
  ],
  highlights: [
    "Opportunity to showcase your solution to industry experts and potential employers",
    "Networking with professionals from leading tech companies",
    "Constructive feedback from experienced judges",
    "Media coverage for outstanding projects",
    "Recruitment opportunities from sponsoring companies"
  ]
};

// Add FAQ section data
export const faqs = [
  {
    id: "0",
    question: "Will travel allowances be provided to participants?",
    answer: "Travel allowances may not be provided to the hackathon participants. Respective Teams have to manage it by there own."
  },
  {
    id: "1",
    question: "Can the Second round be attended virtually?",
    answer: "No, participants must have to attend the second round on the given venue physically."
  },
  {
    id: "2",
    question: "What happens if one of my team members is unable to attend the final round?",
    answer: "In case a team member cannot attend the final round, the remaining team members can continue to represent the team."
  },
  {
    id: "3",
    question: "Are we required to build the same project that we submitted in the initial PPT for the offline round?",
    answer: "No, teams are expected to work on other industry based problem statements that will be given after the declaration of first round."
  },
  {
    id: "4",
    question: "Can we add 1–2 additional slides to the PPT, or must we strictly follow the given format?",
    answer: "Participants are expected to adhere to the prescribed PPT format shared in the official guidelines provided on the unstop platform."
  },
  {
    id: "5",
    question: "What are the criteria for shortlisting PPTs in the first round?",
    answer: "PPTs will be evaluated based on several factors, including: relevance of the problem statement, Innovativeness and feasibility of the proposed solution, Technical approach and implementation strategy and Presentation quality."
  },
  {
    id: "6",
    question: "Are we allowed to propose IoT or hardware-based solutions for our ideas?",
    answer: "Yes, participants are allowed to develop IoT or hardware-based solutions. Ensure your idea addresses the selected problem statement."
  },
  {
    id: "7",
    question: "When will the results be announced?",
    answer: "Results will be Declared by 10th of June 2025."
  },
  {
    id: "8",
    question: "Will accommodation be provided for participants?",
    answer: "Accommodation along with food will be provided to the top 35 selected teams, and only a minimum charge will be collected to cover the basic facilities and services."
  }
];