/* =============================================================================
   PORTFOLIO CONTENT — single source of truth
   -----------------------------------------------------------------------------
   Every page (Home, Projects, Experience, About, Fun) renders from this one
   object.
   ========================================================================== */

window.PORTFOLIO = {
  /* ---- Profile / bio ---------------------------------------------------- */
  profile: {
    name: "Angie Che",
    title: "Creative Software Engineer & Interdisciplinary Designer",
    tagline: "I build playful, human software at the seam of code and design.",
    // Photo path (Mii tile). Emoji also works as a fallback.
    avatar: "ui/home_headshot_photo.svg",
    location: "Boston, MA",

    // Short blurb shown on the Home page (1–2 sentences).
    blurb:
      "I'm a creative software engineer and interdisciplinary designer who loves " +
      "building interactive digital experiences that solve problems for real people.",

    // Longer bio for the About page (each string = one paragraph).
    about: [
      "Hi! I'm Angie, a creative software engineer and interdisciplinary designer. " +
        "I work where software engineering meets art and design, and my passion for art drives me to keep creating, whether that be through code or design. " +
        "I love creating interactive and thoughtful experiences that solve problems for real people. ",
        " I care about creating accessible experiences that make technology feel genuine, and I firmly believe that the power of software lies in its ability to improve our lives.",
    ],

    // Fun facts for the About page (expressive side).
    funFacts: [
      "Currently modding my 3DS to play Pokémon X and Y again",
      "Learning to sculpt using polymer clay",
    ],

    // Education for the About page (practical side).
    education: [
      {
        school: "Northeastern University",
        detail: "B.S. in Computer Science, AI Concentration",
        dates: "Sep 2025 – May 2029",
      },
    ],

    // Tech stack chips for the About page.
    stack: ["Python", "Java", "JavaScript", "TypeScript", "React", "Figma", "HTML/CSS", "Tailwind CSS", "Node.js", "Git", "SQL", "FastAPI", "Vercel", "Wordpress"],
  },

  /* ---- Projects (tech projects) ---------------------------------------- *
   * blurb = one-liner shown in the hover speech bubble.
   * tags  = tech stack (shown in bubble + modal).
   * -------------------------------------------------------------------- */
  projects: [
    {
      id: "project-1",
      icon: "ui/projects/fairgrounds_icon.svg",
      label: "FairGrounds",
      title: "FairGrounds",
      type: "Fullstack", // corner label + filter. One of: Backend | Frontend | Fullstack | ML | UI
      blurb: "AI-powered carnival layout generator for fair organizers.",
      description:
        "FairGrounds, created for HackBeanpot 2026, is an AI-powered carnival layout generator that generates optimized carnival grounds layouts that consider foot traffic, accessibility, and crowd flow to maximize revenue and attendee experience for fair organizers, connected to Google Gemini’s 2.5 Flash AI model.",
      tags: ["Python", "FastAPI", "JavaScript"],
      links: [
        { label: "GitHub", url: "https://github.com/shreya-m9/Hackbeanpot-Project", icon: "ui/github_icon.svg" },
        { label: "Devpost", url: "https://devpost.com/software/fairgrounds-kdo3t5", icon: "ui/devpost_icon.svg" },
      ],
      images: [],
    },
    {
      id: "project-2",
      icon: "ui/projects/climatecheck_icon.svg",
      label: "ClimateCheck",
      title: "ClimateCheck",
      type: "Fullstack",
      blurb: "An app that identifies the risk score and risk factors of a property based on natural disaster data.",
      description:
        "ClimateCheck, built for IrvineHacks 2026, is a fullstack application that takes in a user input of an address and then calculates how much risk the property on that address is at to be caught in a wildfire, flood and landslide. " +
        "The app pulls data from seven different real government and commercial APIs and integrates Google Gemini 2.0 Flash to generate plain English risk explanations, 30-year probability projections, and personalized homebuyer recommendations." +
        "\n\nI contributed to this project as primarily the team lead, delegating tasks, and creating the project structure. I worked on creating the custom formula that determined the overall climate risk score, and connected the backend and frontend from my partners.",
      tags: ["React", "Design Systems", "Accessibility"],
      links: [
        { label: "GitHub", url: "https://github.com/cheangie/ClimateCheck-IrvineHacks", icon: "ui/github_icon.svg" },
        { label: "Devpost", url: "https://devpost.com/software/climate-risk-scoring", icon: "ui/devpost_icon.svg" },
      ],
      images: [],
    },
    {
      id: "project-3",
      // Dual logo: black in light mode, white in dark mode (swaps live on theme toggle).
      icon: {
        light: "ui/projects/somatic/somatic_logo_black.svg",
        dark: "ui/projects/somatic/somatic_logo_white.svg",
      },
      label: "Somatic",
      title: "Somatic",
      type: "UI",
      blurb: "An app designed to help users understand and visually perceive their body's internal sense of discomfort.",
      description:
        "Somatic, created for FigBuild 2026, is a conceptual mobile application that helps users understand and visually perceive their body's internal sense of discomfort through daily check-ins. " +
        "The app uses a combination of data visualization, interactive features, and personalized recommendations to help users identify patterns and triggers for their discomfort, and provides actionable insights to improve their overall well-being.",
      tags: ["Product Design", "Prototyping", "Mobile", "Figma", "Figma Make"],
      links: [
        { label: "Devpost", url: "https://devpost.com/software/somatic-cazgov", icon: "ui/devpost_icon.svg" },
        { label: "Demo", url: "https://www.youtube.com/watch?v=FtatU__n5k4&", icon: "ui/youtube_icon.svg" },
        { label: "Figma (Try it out!)", url: "https://www.figma.com/make/mm60GOfM5leS73SZaLXK0B/Somatic", icon: "ui/link_icon.svg" },
      ],
      images: [],
    },
    {
      id: "project-4",
      icon: "ui/projects/speakr_icon.svg",
      label: "Speakr",
      title: "Speakr",
      type: "Frontend",
      blurb: "A redesigned AAC device for the modern day.",
      description:
        "Speakr, created for HackHealth 2026, is a modern redesign of an AAC (Augmentative and Alternative Communication) device created with an adult neurodivergent person in mind. Being a web app built using Python (PyAudio) and Javascript, Speakr is accessible on any device, a problem we discovered that many AAC devices have.",
      tags: ["JavaScript", "Figma", "Frontend Development"],
      links: [
        { label: "GitHub", url: "https://github.com/shreya-m9/AAC-device-revamp", icon: "ui/github_icon.svg" },
        { label: "Devpost", url: "https://devpost.com/software/speakr-gzpa4n", icon: "ui/devpost_icon.svg" },
      ],
      images: [],
    },
    {
      id: "project-5",
      icon: "ui/projects/streamcompass_icon.svg",
      label: "StreamCompass",
      title: "StreamCompass",
      type: "ML",
      blurb: "ML-powered title recommendation app that finds streaming platforms based on your watch preferences.",
      description:
        "An ML-powered recommendation system using content similarity (genre, cast, tags) to suggest titles and rank streaming platforms based on your watch preferences.",
      tags: ["AI", "ML", "Neural Networks"],
      links: [
        { label: "Site", url: "https://streamcompass.khayrul.com/", icon: "ui/link_icon.svg" },
        { label: "Github", url: "https://github.com/LavishSphere/StreamCompass", icon: "ui/github_icon.svg" },
      ],
      images: [
        {
          src: "ui/projects/streamcompass/hero.png",
          caption: "Screenshot of the landing page for StreamCompass, showing the searchbar and UI.",
        },
        {
          src: "ui/projects/streamcompass/searchresults.png",
          caption: 'Screenshot of the search results page for a sample "Breaking Bad" search, showing the search results based on our custom ML algorithm, utilizing Neural Networks, Bayesian Networks, and Decision Trees.',
        },
        {
          src: "ui/projects/streamcompass/matchscore.png",
          caption: "Screenshot of the match score visualization, showing the sources and reasons behind the search results match percentage.",
        },
      ],
    },
    {
      id: "project-6",
      icon: "ui/projects/maskinc_icon.svg",
      label: "MaskINC",
      title: "MaskINC",
      type: "UI",
      blurb: "A game where you, a government contractor, work redacting audio files to appease your higher-ups.",
      description:
        "Built for the Global Game Jam 2026, MaskINC is a Unity game where you work for M.A.S.K. Inc as a government contractor. " +
        "Your job is to redact audio files by interpreting the audio and your boss's incoherent instructions. " +
        "\nI contributed to this game as the UI designer and front-end developer, creating and prototyping the UI from scratch using Figma and implementing it in Unity. " +
        "I also designed the game's logo and branding, and worked primarily as a visual designer.",
      tags: ["UI Design", "Figma", "Frontend Development"],
      links: [
        { label: "Itch.io", url: "https://zygarde824.itch.io/mask-inc", icon: "ui/link_icon.svg" },
        { label: "Trailer", url: "https://www.youtube.com/watch?v=eIkh6ymDhmU", icon: "ui/youtube_icon.svg" }
      ],
      images: [
        {
          src: "ui/projects/maskinc/drafts.png",
          caption: "Early drafts of various UI and graphic design for the game.",
        },
        {
          src: "ui/projects/maskinc/finals.png",
          caption: "Final designs for the game's UI and graphics, all done in Figma.",
        },
        {
          src: "ui/projects/maskinc/mask_ui_screenshot.png",
          caption: "Screenshot of the game in action, showing the redaction interface and the player's progress.",
        },
      ],
    },
  ],

  /* ---- Experience (reverse-chronological; most recent first) ------------ */
  experience: [
    {
      company: "Khoury College of Computer Sciences, Northeastern University",
      companyUrl: "https://www.khoury.northeastern.edu/",
      role: "Teaching Assistant, CS 2100: Program Design and Implementation I",
      location: "Boston, MA",
      start: "Jan. 2026",
      end: "Present",
      logo: "ui/experience/khourycollege_logo.svg",
      bullets: [
        "Reviewed Java implementations covering OOP, recursion, and data structures for 30+ students per lab section",
        "Held weekly office hours for 100+ students, providing one-on-one debugging support and guidance on assignments",
        "Reinforced core CS concepts such as control flow, abstraction, and program design through direct student support",
        "Assisted in grading assignments, codewalks, and exams, ensuring fair and consistent evaluation of student work",
        "Maintained and consistently updated a tutoring program for struggling students within the course, coordinating and planning additional one-on-one tutoring sessions among all 20+ TA's to help them succeed",
      ],
      tech: ["Python", "Leadership", "Teaching", "Collaboration"],
      keyProjects: [],
    },
    {
      company: "HackBeanpot",
      companyUrl: "https://www.hackbeanpot.com/",
      role: "Software Engineer & Hackathon Co-Director",
      location: "Boston, MA",
      start: "Oct. 2025",
      end: "Present",
      logo: "ui/experience/hackbeanpot_logo.svg",
      bullets: [
        "Worked alongside a team of 9 developers using an Agile workflow to build a full-stack website supporting 100+ participants live during the event",
        "Currently leading the planning and execution of the HackBeanpot 2027 event with a team of 35+ other students, including managing logistics, sponsorships, and operations",
        "Developed and maintained the HackBeanpot 2026 mainsite and livesite, ensuring a smooth experience for participants and sponsors alike",
        "Implemented various frontend features, including sections on the homepage, navbar, and assorted graphics/assets",
      ],
      tech: ["React", "TypeScript", "JavaScript", "Vercel"],
      keyProjects: [
        { title: "HackBeanpot Mainsite", detail: "Redesigned the admin dashboard; cut task time in half.", link: "https://www.hackbeanpot.com/" },
      ],
    },
    {
      company: "Michael J. and Ann Sherman Center",
      companyUrl: "https://sherman.center.northeastern.edu/",
      role: "Makerspace Student Lead & Website Developer",
      location: "Boston, MA",
      start: "Sep. 2025",
      end: "Apr. 2026",
      logo: "ui/experience/sherm_logo.svg",
      bullets: [
        "Redesigned, prototyped, and shipped the Sherman Center Makerspace website, improving user navigation and increasing sponsor engagement.",
        "Maintained a multidisciplinary makerspace, ensuring safe and reliable access to fabrication equipment for 700+ students.",
        "Developed and implemented physical and digital signage for the Makerspace, including a TV display that showcases student work and provides helpful information to everyone.",
      ],
      tech: ["HTML/CSS", "Wordpress", "Figma", "Prototyping", "Yodeck"],
      keyProjects: [
        { title: "Website redesign", detail: "Redesigned the website to improve accessibility and usability.", link: "https://sherman.center.northeastern.edu/sherman-makerspace/" },
      ],
    },
  ],

  /* ---- Creative works (non-tech) — shown on the Fun page ---------------- *
   * category: Illustration | Sketchbook | UI/UX | Game Design | Writing
   * -------------------------------------------------------------------- */
  creative: [
    {
      id: "art-1",
      category: "Art",
      icon: "ui/fun/creative_section/illustrations_logo.svg",
      title: "Illustration",
      description: "Various digital illustrations I've created throughout the almost-decade I've been drawing.",
      // Each image: { src, caption?, link?, linkText? }. If link + linkText are set,
      // the linkText inside the caption becomes a hyperlink.
      images: [
        {
          src: "ui/fun/creative_section/art/winterbreakzine.JPG",
          caption: 'Illustration for "Snowed In," a zine I contributed to over winter break.',
          link: "https://online.fliphtml5.com/snowedinzine/snowed_in_zine/#p=1",
          linkText: "Snowed In",
        },
        {
          src: "ui/fun/creative_section/art/phoenixspread.png",
          caption: "Page from my spread in the Phoenix Art and Literary Magazine 2025 edition.",
        },
        {
          src: "ui/fun/creative_section/art/aclibbookmark.PNG",
          caption: "Bookmark illustration for the AC Library's 2025 Summer Reading Bookmark Contest.",
        },
      ],
      link: "",
    },
    {
      id: "art-3",
      category: "Design",
      icon: "ui/fun/creative_section/graphic_design_icon.svg",
      title: "Graphic Design",
      description: "Various graphic design projects, including posters, flyers, icons, logos, and social media graphics.",
      images: [
        {
          src: "ui/fun/creative_section/graphic_design/beanpot_tshirt_design.png",
          caption: "T-shirt design for the 2025 Beanpot championship; created alongside a team of 4 other designers, with all profits of the final design going back towards the NU student body.",
        },
        {
          src: "ui/fun/creative_section/graphic_design/crochet_species_logo.JPG",
          caption: "Logo design for Crochet Species, a client's small business that I designed while under Prisit Design Studios.",
        },
        {
          src: "ui/fun/creative_section/graphic_design/writers_block_flyer.png",
          caption: "Flyer design for MSJ Writers' Block, my highschool's peer editing and writing club.",
        },
        {
          src: "ui/fun/creative_section/graphic_design/NHS_flyer.png",
          caption: "Flyer design for my highschool's National Honor Society Wellness Week events.",
        },
        {
          src: "ui/fun/creative_section/graphic_design/vams_starjars_post.png",
          caption: "Social media post for an event held by MSJ VAMS, an art and music club in highschool.",
        },
      ],
      link: "",
    },
  ],

  /* ---- "Now" board (Fun page) ------------------------------------------ */
  now: [
    { icon: "ui/fun/gaming_icon.svg", label: "Playing", value: "Splatoon 2" },
    { icon: "ui/fun/reading_icon.svg", label: "Reading", value: "Full Spectrum - Adam Rogers" },
    { icon: "ui/fun/watching_icon.svg", label: "Watching", value: "Severance" },
    { icon: "ui/fun/listening_icon.svg", label: "Listening", value: "NASA - ATEEZ" },
  ],

  /* ---- Footer / contact links (socials) -------------------------------- *
   * icon can be an emoji OR a path to a monochrome svg (auto-tinted per theme).
   * -------------------------------------------------------------------- */
  links: [
    { label: "GitHub", url: "https://github.com/cheangie", icon: "ui/github_icon.svg" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/angie-che/", icon: "ui/linkedin_icon.svg" },
    { label: "Email", url: "mailto:che.a@northeastern.edu", icon: "ui/email_icon.svg" },
  ],

  /* ---- "Right now" blurb (Fun page, beside the now-cards) --------------- */
  nowBlurb: {
    lead: "When I'm not coding or working, I'm:",
    items: [
      "Cheffing it up in the kitchen cooking novel dishes I've never made before",
      "Scoring deals on FB Marketplace",
      "Drawing, sketchbooking, and being creative wherever I can",
    ],
    outro: "I'm currently:",
  },

  /* ---- Contact form (About page) --------------------------------------- *
   * Formspree forms for email contact. The form will POST to that endpoint
   * and email me the submission.
   * -------------------------------------------------------------------- */
  contact: {
    formEndpoint: "https://formspree.io/f/mojgezre",
  },
};
