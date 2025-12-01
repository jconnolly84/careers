
// CS & iMedia Career Quest
// careers-quest-game.js

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");

    const startBtn = document.getElementById("start-btn");
    const backBtn = document.getElementById("back-btn");
    const skipBtn = document.getElementById("skip-btn");
    const retryBtn = document.getElementById("retry-btn");
    const printBtn = document.getElementById("print-btn");

    const questionNumberSpan = document.getElementById("question-number");
    const totalQuestionsSpan = document.getElementById("total-questions");
    const progressFill = document.getElementById("progress-fill");
    const questionTextEl = document.getElementById("question-text");
    const questionHelperEl = document.getElementById("question-helper");
    const optionsContainer = document.getElementById("options-container");

    const barTech = document.getElementById("bar-tech");
    const barCreative = document.getElementById("bar-creative");
    const barSecurity = document.getElementById("bar-security");

    const resultSummaryEl = document.getElementById("result-summary");
    const resultTagsEl = document.getElementById("result-tags");
    const profileListEl = document.getElementById("profile-list");
    const careersContainer = document.getElementById("careers-container");
    const nextStepsList = document.getElementById("next-steps-list");

    // Categories represent rough "talent branches"
    const initialScores = {
        tech: 0,       // logical, programming, systems
        creative: 0,   // design, visual, storytelling
        security: 0,   // security, data, problem-solving
        support: 0     // helping others, communication, troubleshooting
    };

    let scores = { ...initialScores };
    let currentQuestionIndex = 0;

    const questions = [
        {
            id: 1,
            text: "When you're given a new project, what excites you most?",
            helper: "Think about lessons or projects at school.",
            options: [
                {
                    id: "a",
                    text: "Figuring out how it works behind the scenes and planning the logic.",
                    sub: "You enjoy solving puzzles and planning how things will run.",
                    scores: { tech: 2, security: 1 }
                },
                {
                    id: "b",
                    text: "Making it look amazing with images, layouts or video.",
                    sub: "You care about visuals and creative presentation.",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "Testing everything and spotting issues other people miss.",
                    sub: "You're good at checking details and finding problems.",
                    scores: { security: 2, tech: 1 }
                },
                {
                    id: "d",
                    text: "Explaining it clearly so others can use or understand it.",
                    sub: "You like helping people and communicating ideas.",
                    scores: { support: 2, creative: 1 }
                }
            ]
        },
        {
            id: 2,
            text: "Which of these sounds most like you in lessons?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "I enjoy coding tasks and fixing bugs.",
                    sub: "You like writing and improving code.",
                    scores: { tech: 2 }
                },
                {
                    id: "b",
                    text: "I enjoy editing photos, videos or graphics.",
                    sub: "You like working with visual media.",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "I like investigating problems, errors or weird behaviour.",
                    sub: "You like problem solving and debugging.",
                    scores: { security: 1, tech: 1 }
                },
                {
                    id: "d",
                    text: "I like helping classmates when they get stuck.",
                    sub: "You like supporting others.",
                    scores: { support: 2 }
                }
            ]
        },
        {
            id: 3,
            text: "How do you feel about maths and logical thinking?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "I really enjoy it – give me logic puzzles or number problems.",
                    sub: "",
                    scores: { tech: 2, security: 1 }
                },
                {
                    id: "b",
                    text: "It's okay, but I prefer creative tasks.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "I don't love it, but I can handle it if it's practical.",
                    sub: "",
                    scores: { support: 1, tech: 1 }
                },
                {
                    id: "d",
                    text: "I avoid it when I can.",
                    sub: "",
                    scores: { creative: 1 }
                }
            ]
        },
        {
            id: 4,
            text: "Which mini-project would you choose?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "Build a simple game or app.",
                    sub: "",
                    scores: { tech: 2 }
                },
                {
                    id: "b",
                    text: "Design a poster, logo or travel guide.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "Investigate a fake 'cyber attack' and write a report.",
                    sub: "",
                    scores: { security: 2, tech: 1 }
                },
                {
                    id: "d",
                    text: "Create a guide or how‑to video to help others.",
                    sub: "",
                    scores: { support: 2, creative: 1 }
                }
            ]
        },
        {
            id: 5,
            text: "If a friend's laptop keeps crashing, what are you most likely to do?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "Look up error messages and try to fix the problem step‑by‑step.",
                    sub: "",
                    scores: { tech: 2, support: 1 }
                },
                {
                    id: "b",
                    text: "Explain how to keep their files safe and avoid dodgy downloads.",
                    sub: "",
                    scores: { security: 2, support: 1 }
                },
                {
                    id: "c",
                    text: "Make a simple visual guide so they don't have to ask again.",
                    sub: "",
                    scores: { creative: 2, support: 1 }
                },
                {
                    id: "d",
                    text: "Recommend a new device or a better way of working.",
                    sub: "",
                    scores: { support: 2 }
                }
            ]
        },
        {
            id: 6,
            text: "How do you feel about presenting your work to others?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "I don't mind as long as I know my facts and how it works.",
                    sub: "",
                    scores: { tech: 1, support: 1 }
                },
                {
                    id: "b",
                    text: "I like telling the story behind my design or media work.",
                    sub: "",
                    scores: { creative: 2, support: 1 }
                },
                {
                    id: "c",
                    text: "I'm happier testing and improving things in the background.",
                    sub: "",
                    scores: { security: 2, tech: 1 }
                },
                {
                    id: "d",
                    text: "I’d rather do a one‑to‑one explanation than present to the whole class.",
                    sub: "",
                    scores: { support: 2 }
                }
            ]
        },
        {
            id: 7,
            text: "Pick the activity that sounds most fun to you:",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "Joining a coding club or hackathon.",
                    sub: "",
                    scores: { tech: 2 }
                },
                {
                    id: "b",
                    text: "Making short videos or graphics for social media.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "Taking part in a cybersecurity or puzzle challenge.",
                    sub: "",
                    scores: { security: 2 }
                },
                {
                    id: "d",
                    text: "Running a help desk at school for IT problems.",
                    sub: "",
                    scores: { support: 2, tech: 1 }
                }
            ]
        },
        {
            id: 8,
            text: "What kind of detail do you notice first?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "If something doesn’t work or the logic doesn’t make sense.",
                    sub: "",
                    scores: { tech: 1, security: 1 }
                },
                {
                    id: "b",
                    text: "If the fonts, colours or layout look wrong.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "If something feels risky, unsafe or badly organised.",
                    sub: "",
                    scores: { security: 2 }
                },
                {
                    id: "d",
                    text: "If someone is confused or needs help.",
                    sub: "",
                    scores: { support: 2 }
                }
            ]
        },
        {
            id: 9,
            text: "In a group project, which role would you naturally take?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "The person who builds the solution or writes the code.",
                    sub: "",
                    scores: { tech: 2 }
                },
                {
                    id: "b",
                    text: "The person who designs the look, layout and visuals.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "The person who checks everything carefully and spots issues.",
                    sub: "",
                    scores: { security: 2 }
                },
                {
                    id: "d",
                    text: "The person who organises tasks and supports the team.",
                    sub: "",
                    scores: { support: 2 }
                }
            ]
        },
        {
            id: 10,
            text: "What matters most to you in a future job?",
            helper: "",
            options: [
                {
                    id: "a",
                    text: "Building useful tech and solving tough problems.",
                    sub: "",
                    scores: { tech: 2, security: 1 }
                },
                {
                    id: "b",
                    text: "Being creative, designing or telling stories with media.",
                    sub: "",
                    scores: { creative: 2 }
                },
                {
                    id: "c",
                    text: "Keeping people and data safe and secure.",
                    sub: "",
                    scores: { security: 2 }
                },
                {
                    id: "d",
                    text: "Helping people, explaining things and working with others.",
                    sub: "",
                    scores: { support: 2 }
                }
            ]
        }
    ];

    totalQuestionsSpan.textContent = questions.length.toString();

    // Careers database
    const careers = [
        // Computer Science focused
        {
            id: "software-engineer",
            name: "Software Engineer",
            sector: "Computer Science",
            category: "tech",
            salaryRange: "≈ £35k – £75k+",
            description: "Designs and builds software, apps and systems that solve real‑world problems.",
            qualifications: [
                "GCSEs including maths and English",
                "A‑Level Computer Science or maths (or Level 3 equivalent)",
                "Degree in Computer Science / Software Engineering OR Degree apprenticeship"
            ],
            technicalSkills: [
                "Programming (e.g. Python, Java, C#)",
                "Algorithms and data structures",
                "Databases and APIs",
                "Version control (Git)"
            ],
            personalSkills: [
                "Logical problem solving",
                "Patience and resilience",
                "Teamwork and communication"
            ],
            helpfulSubjects: "Computer Science, Maths, Physics",
            links: [
                {
                    label: "Search: Software engineer apprenticeships (UK)",
                    url: "https://www.google.com/search?q=uk+software+engineer+degree+apprenticeship"
                }
            ]
        },
        {
            id: "game-developer",
            name: "Game Developer",
            sector: "Computer Science",
            category: "tech",
            salaryRange: "≈ £30k – £65k+",
            description: "Creates the code and logic behind video games, from gameplay to physics and AI.",
            qualifications: [
                "GCSEs including maths",
                "A‑Level / Level 3 in Computer Science / Games / Media",
                "Degree in Games Programming / Computer Science OR apprenticeship"
            ],
            technicalSkills: [
                "Programming (C#, C++, scripting)",
                "Game engines (Unity, Unreal, etc.)",
                "Maths for games (physics, vectors)"
            ],
            personalSkills: [
                "Creativity and imagination",
                "Team collaboration",
                "Perseverance to debug and improve"
            ],
            helpfulSubjects: "Computer Science, Maths, Art / Design, iMedia",
            links: [
                {
                    label: "Search: Game development university courses (UK)",
                    url: "https://www.google.com/search?q=uk+game+development+degree"
                }
            ]
        },
        {
            id: "web-developer",
            name: "Web Developer",
            sector: "Computer Science",
            category: "tech",
            salaryRange: "≈ £28k – £55k+",
            description: "Builds websites and web apps, making sure they work smoothly on all devices.",
            qualifications: [
                "GCSEs including maths and English",
                "College / Sixth Form in IT or Computer Science",
                "Self‑taught portfolio, degree or apprenticeship"
            ],
            technicalSkills: [
                "HTML, CSS, JavaScript",
                "Frontend frameworks (e.g. React)",
                "Basic backend (e.g. Node, PHP)"
            ],
            personalSkills: [
                "Attention to detail",
                "User‑focused thinking",
                "Problem solving"
            ],
            helpfulSubjects: "Computer Science, iMedia, IT",
            links: [
                {
                    label: "Search: Web developer apprenticeships (UK)",
                    url: "https://www.google.com/search?q=uk+web+developer+apprenticeship"
                }
            ]
        },
        {
            id: "cyber-analyst",
            name: "Cybersecurity Analyst",
            sector: "Computer Science",
            category: "security",
            salaryRange: "≈ £32k – £70k+",
            description: "Protects computer systems and data from cyber attacks and security risks.",
            qualifications: [
                "GCSEs including maths and English",
                "College course or A‑Levels in IT / Computer Science",
                "Degree or apprenticeship in Cyber Security / Digital Forensics"
            ],
            technicalSkills: [
                "Networks and operating systems",
                "Security tools and monitoring",
                "Understanding of threats and hacking techniques"
            ],
            personalSkills: [
                "Curious and investigative mindset",
                "Calm under pressure",
                "Ethical decision making"
            ],
            helpfulSubjects: "Computer Science, Maths, IT",
            links: [
                {
                    label: "Search: Cybersecurity careers (UK)",
                    url: "https://www.google.com/search?q=uk+cyber+security+careers"
                }
            ]
        },
        {
            id: "data-analyst",
            name: "Data Analyst",
            sector: "Computer Science",
            category: "security",
            salaryRange: "≈ £30k – £60k+",
            description: "Uses data to spot patterns, answer questions and help organisations make decisions.",
            qualifications: [
                "Strong GCSE maths",
                "A‑Level maths or statistics (helpful)",
                "Degree or apprenticeship in Data / Maths / Computing / Business"
            ],
            technicalSkills: [
                "Spreadsheets and databases",
                "Data visualisation tools",
                "Basic coding (e.g. Python, SQL)"
            ],
            personalSkills: [
                "Logical thinking",
                "Attention to detail",
                "Good communication"
            ],
            helpfulSubjects: "Maths, Computer Science, Business Studies",
            links: [
                {
                    label: "Search: Data analyst apprenticeships (UK)",
                    url: "https://www.google.com/search?q=uk+data+analyst+apprenticeship"
                }
            ]
        },
        {
            id: "it-support",
            name: "IT Support Technician",
            sector: "Computer Science",
            category: "support",
            salaryRange: "≈ £22k – £35k+",
            description: "Helps people fix IT problems, install software and keep devices running.",
            qualifications: [
                "GCSEs including maths and English",
                "College course in IT / Networking / Support",
                "IT support or infrastructure apprenticeship"
            ],
            technicalSkills: [
                "Operating systems (Windows, macOS, etc.)",
                "Basic networking and hardware",
                "Troubleshooting and diagnostics"
            ],
            personalSkills: [
                "Patience and empathy",
                "Clear communication",
                "Problem solving"
            ],
            helpfulSubjects: "IT, Computer Science",
            links: [
                {
                    label: "Search: IT support apprenticeship (UK)",
                    url: "https://www.google.com/search?q=uk+it+support+apprenticeship"
                }
            ]
        },

        // iMedia & creative digital
        {
            id: "graphic-designer",
            name: "Graphic Designer",
            sector: "iMedia",
            category: "creative",
            salaryRange: "≈ £24k – £45k+",
            description: "Creates logos, posters, branding and layouts for print and digital media.",
            qualifications: [
                "GCSEs including art or design (helpful)",
                "College course in Graphic Design / iMedia",
                "Degree or apprenticeship in Graphic Design or related area"
            ],
            technicalSkills: [
                "Design software (Photoshop, Illustrator, etc.)",
                "Layout, colour and typography",
                "Digital file formats and exporting"
            ],
            personalSkills: [
                "Creativity and imagination",
                "Visual attention to detail",
                "Listening to clients and feedback"
            ],
            helpfulSubjects: "Art, iMedia, Design & Technology",
            links: [
                {
                    label: "Search: Graphic design college courses (UK)",
                    url: "https://www.google.com/search?q=uk+graphic+design+college+course"
                }
            ]
        },
        {
            id: "video-editor",
            name: "Video Editor",
            sector: "iMedia",
            category: "creative",
            salaryRange: "≈ £24k – £50k+",
            description: "Cuts and edits footage, adds sound, titles and effects to tell a clear story.",
            qualifications: [
                "GCSEs including English",
                "College course in Media / Film / iMedia",
                "Degree or apprenticeship in Film / Media Production"
            ],
            technicalSkills: [
                "Editing software (Premiere Pro, DaVinci, Final Cut, etc.)",
                "Sound and timing",
                "File formats and exporting for different platforms"
            ],
            personalSkills: [
                "Storytelling and pacing",
                "Patience with detailed work",
                "Teamwork with directors and clients"
            ],
            helpfulSubjects: "iMedia, English, Drama",
            links: [
                {
                    label: "Search: Video editor career (UK)",
                    url: "https://www.google.com/search?q=uk+video+editor+career"
                }
            ]
        },
        {
            id: "content-creator",
            name: "Digital Content Creator",
            sector: "iMedia",
            category: "creative",
            salaryRange: "≈ £22k – £40k+ (varies widely)",
            description: "Plans, creates and posts videos, images and graphics for brands and organisations.",
            qualifications: [
                "GCSEs including English",
                "College course in Digital Media / Marketing / iMedia",
                "Experience and a strong portfolio are very important"
            ],
            technicalSkills: [
                "Social media platforms",
                "Basic design and video editing",
                "Analytics and SEO basics"
            ],
            personalSkills: [
                "Creativity and initiative",
                "Understanding audiences",
                "Time management"
            ],
            helpfulSubjects: "iMedia, English, Business Studies",
            links: [
                {
                    label: "Search: Digital marketing apprenticeships (UK)",
                    url: "https://www.google.com/search?q=uk+digital+marketing+apprenticeship"
                }
            ]
        },
        {
            id: "ux-designer",
            name: "UX / UI Designer",
            sector: "iMedia",
            category: "creative",
            salaryRange: "≈ £30k – £65k+",
            description: "Designs how apps and websites look and feel so they are easy and enjoyable to use.",
            qualifications: [
                "GCSEs including English and maths",
                "College or sixth form in IT / Design / iMedia",
                "Degree or apprenticeship in UX, Digital Design or related field"
            ],
            technicalSkills: [
                "Wireframing and prototyping",
                "User research and testing",
                "Design tools (Figma, XD, etc.)"
            ],
            personalSkills: [
                "Empathy for users",
                "Creative problem solving",
                "Communication with developers and clients"
            ],
            helpfulSubjects: "iMedia, Computer Science, Design & Technology",
            links: [
                {
                    label: "Search: UX designer career (UK)",
                    url: "https://www.google.com/search?q=uk+ux+designer+career"
                }
            ]
        },
        {
            id: "animator",
            name: "Animator / Motion Designer",
            sector: "iMedia",
            category: "creative",
            salaryRange: "≈ £25k – £55k+",
            description: "Brings graphics and characters to life through movement and effects.",
            qualifications: [
                "GCSEs including art / design (helpful)",
                "College course in Animation / Media / Art & Design",
                "Degree or apprenticeship in Animation / Motion Graphics"
            ],
            technicalSkills: [
                "2D or 3D animation tools",
                "Timing and storytelling",
                "Drawing or visual design"
            ],
            personalSkills: [
                "Patience and attention to detail",
                "Creativity and imagination",
                "Collaboration with teams"
            ],
            helpfulSubjects: "Art, iMedia, IT",
            links: [
                {
                    label: "Search: Animation courses (UK)",
                    url: "https://www.google.com/search?q=uk+animation+courses"
                }
            ]
        },
        {
            id: "digital-marketer",
            name: "Digital Marketer",
            sector: "iMedia",
            category: "support",
            salaryRange: "≈ £25k – £50k+",
            description: "Promotes products and services online using social media, email and web content.",
            qualifications: [
                "GCSEs including English",
                "College course in Business / Marketing / Digital Media",
                "Digital marketing apprenticeship or degree"
            ],
            technicalSkills: [
                "Social media tools and scheduling",
                "Basic design and copywriting",
                "Data and analytics for campaigns"
            ],
            personalSkills: [
                "Communication and storytelling",
                "Understanding audiences",
                "Organisation and planning"
            ],
            helpfulSubjects: "Business Studies, iMedia, English",
            links: [
                {
                    label: "Search: Digital marketing career (UK)",
                    url: "https://www.google.com/search?q=uk+digital+marketing+career"
                }
            ]
        }
    ];

    function resetState() {
        scores = { ...initialScores };
        currentQuestionIndex = 0;
        resultTagsEl.innerHTML = "";
        profileListEl.innerHTML = "";
        careersContainer.innerHTML = "";
        nextStepsList.innerHTML = "";
        updateProgressBars();
    }

    function showScreen(screen) {
        [startScreen, quizScreen, resultScreen].forEach(sec => {
            sec.classList.remove("active");
            sec.classList.add("hidden");
        });
        screen.classList.add("active");
        screen.classList.remove("hidden");
    }

    function updateProgressBars() {
        const totalScore = scores.tech + scores.creative + scores.security + scores.support;
        const safeTotal = totalScore || 1;

        const techPercent = (scores.tech / safeTotal) * 100;
        const creativePercent = (scores.creative / safeTotal) * 100;
        const securityPercent = ((scores.security + scores.support * 0.3) / safeTotal) * 100;

        barTech.style.width = Math.min(100, techPercent).toFixed(1) + "%";
        barCreative.style.width = Math.min(100, creativePercent).toFixed(1) + "%";
        barSecurity.style.width = Math.min(100, securityPercent).toFixed(1) + "%";

        const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
        progressFill.style.width = progressPercent.toFixed(1) + "%";
    }

    function renderQuestion() {
        const question = questions[currentQuestionIndex];
        questionNumberSpan.textContent = (currentQuestionIndex + 1).toString();
        questionTextEl.textContent = question.text;
        questionHelperEl.textContent = question.helper || "";

        optionsContainer.innerHTML = "";
        question.options.forEach(option => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerHTML = `
                <span class="text-main">${option.text}</span>
                ${option.sub ? `<span class="text-sub">${option.sub}</span>` : ""}
            `;
            btn.addEventListener("click", () => {
                applyScores(option.scores);
                goToNextQuestion();
            });
            optionsContainer.appendChild(btn);
        });

        backBtn.disabled = currentQuestionIndex === 0;
        skipBtn.disabled = currentQuestionIndex === questions.length - 1;

        updateProgressBars();
    }

    function applyScores(optionScores) {
        Object.keys(optionScores).forEach(key => {
            scores[key] += optionScores[key];
        });
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            showResults();
        }
    }

    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    }

    function buildProfileFromScores() {
        const scoreEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const top = scoreEntries[0];
        const second = scoreEntries[1] || top;

        const profilePoints = [];

        if (top[0] === "tech") {
            profilePoints.push("You enjoy logical thinking and building things that work.");
        }
        if (top[0] === "creative") {
            profilePoints.push("You are strongly creative and enjoy visual or storytelling work.");
        }
        if (top[0] === "security") {
            profilePoints.push("You like investigating problems and keeping things safe and organised.");
        }
        if (top[0] === "support") {
            profilePoints.push("You enjoy helping others, explaining things and working in a team.");
        }

        if (second[0] !== top[0]) {
            if (second[0] === "tech") {
                profilePoints.push("You also have a good logical / technical side that you can develop further.");
            }
            if (second[0] === "creative") {
                profilePoints.push("You also have a creative side that works well with your main strengths.");
            }
            if (second[0] === "security") {
                profilePoints.push("You also notice risks and like to solve tricky problems.");
            }
            if (second[0] === "support") {
                profilePoints.push("You’re also good at supporting others and communicating clearly.");
            }
        }

        if (profilePoints.length === 0) {
            profilePoints.push("You have a balanced mix of strengths – you can choose from a wide range of careers.");
        }

        return profilePoints;
    }

    function pickCareersFromScores() {
        const scoreEntries = Object.entries(scores)
            .filter(([, value]) => value > 0)
            .sort((a, b) => b[1] - a[1]);

        const chosenCategories = scoreEntries.slice(0, 2).map(entry => entry[0]);
        if (chosenCategories.length === 0) {
            return careers.slice(0, 6);
        }

        let matchedCareers = careers.filter(c => chosenCategories.includes(c.category));

        if (matchedCareers.length < 6) {
            const extras = careers.filter(c => !matchedCareers.includes(c));
            matchedCareers = matchedCareers.concat(extras.slice(0, 6 - matchedCareers.length));
        }

        return matchedCareers.slice(0, 8);
    }

    function showResults() {
        showScreen(resultScreen);

        const profilePoints = buildProfileFromScores();
        const matchedCareers = pickCareersFromScores();

        const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0) || 1;
        const techScore = scores.tech + scores.security * 0.4;
        const creativeScore = scores.creative + scores.support * 0.3;

        const csBias = (techScore / totalScore) * 100;
        const imediaBias = (creativeScore / totalScore) * 100;

        let mainSummary = "";
        if (csBias > imediaBias + 10) {
            mainSummary = "Your answers suggest you lean more towards Computer Science roles, especially those that involve logic, problem solving and technology.";
        } else if (imediaBias > csBias + 10) {
            mainSummary = "Your answers suggest you lean more towards iMedia and creative digital roles, especially those that involve design, media and communication.";
        } else {
            mainSummary = "Your answers suggest you have a good balance between Computer Science and iMedia strengths, giving you lots of choice in digital careers.";
        }

        resultSummaryEl.textContent = mainSummary;

        resultTagsEl.innerHTML = "";
        const csTag = document.createElement("span");
        csTag.className = "result-tag cs";
        csTag.textContent = `Computer Science match: ${Math.round(csBias)}%`;
        resultTagsEl.appendChild(csTag);

        const imediaTag = document.createElement("span");
        imediaTag.className = "result-tag imedia";
        imediaTag.textContent = `iMedia / Creative match: ${Math.round(imediaBias)}%`;
        resultTagsEl.appendChild(imediaTag);

        // Profile bullet points
        profileListEl.innerHTML = "";
        buildProfileFromScores().forEach(point => {
            const li = document.createElement("li");
            li.textContent = point;
            profileListEl.appendChild(li);
        });

        // Careers
        careersContainer.innerHTML = "";
        matchedCareers.forEach(career => {
            const card = document.createElement("article");
            card.className = "career-card" + (career.sector === "iMedia" ? " imedia-card" : "");

            const detailsId = `details-${career.id}`;

            card.innerHTML = `
                <div class="career-title-row">
                    <div class="career-name">${career.name}</div>
                    <div class="career-tag">${career.sector}</div>
                </div>
                <div class="career-salary">${career.salaryRange}</div>
                <div class="career-pill-row">
                    <span class="career-pill">Pathway: ${career.category === "tech" ? "Technical / coding" :
                        career.category === "creative" ? "Creative / design / media" :
                        career.category === "security" ? "Security / data / analysis" :
                        "People / communication / support"}</span>
                    <span class="career-pill">Good for: ${career.helpfulSubjects}</span>
                </div>
                <div id="${detailsId}" class="career-details">
                    <div><strong>What they do:</strong> ${career.description}</div>
                    <div><strong>Typical qualifications:</strong> ${career.qualifications.join("; ")}</div>
                    <div><strong>Useful technical skills:</strong> ${career.technicalSkills.join("; ")}</div>
                    <div><strong>Personal skills:</strong> ${career.personalSkills.join("; ")}</div>
                    <div class="career-links">
                        ${career.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join(" · ")}
                    </div>
                </div>
            `;

            card.addEventListener("click", () => {
                const detailsEl = document.getElementById(detailsId);
                detailsEl.classList.toggle("visible");
            });

            careersContainer.appendChild(card);
        });

        // Next steps
        nextStepsList.innerHTML = "";
        const nextSteps = [
            "Talk to your teacher or careers advisor about one of the roles that interests you.",
            "Research at least one college or sixth form course that links to your favourite role.",
            "Choose a project in class that lets you practise a skill linked to your chosen career (e.g. coding, design, video).",
            "Create a simple digital portfolio folder to save your best CS and iMedia work.",
            "Look up an apprenticeship or university course for your top career and note the entry requirements."
        ];
        nextSteps.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            nextStepsList.appendChild(li);
        });
    }

    // Event listeners
    startBtn.addEventListener("click", () => {
        resetState();
        showScreen(quizScreen);
        renderQuestion();
    });

    backBtn.addEventListener("click", () => {
        goToPreviousQuestion();
    });

    skipBtn.addEventListener("click", () => {
        goToNextQuestion();
    });

    retryBtn.addEventListener("click", () => {
        resetState();
        showScreen(startScreen);
    });

    printBtn.addEventListener("click", () => {
        window.print();
    });
});
