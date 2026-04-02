const mongoose = require("mongoose");
const SyllabusData = require("./Models/SyllabusData");

const MONGO_URI = "mongodb://localhost:27017/schoolDB";

const ALL_SYLLABUS = [

    // ════════════════════════════════════
    // STD 1 — ENGLISH MEDIUM
    // ════════════════════════════════════
    {
        standard: 1, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Numbers 1–100", "Addition & Subtraction", "Shapes", "Patterns", "Measurement"] },
            { subjectName: "English", topics: ["Alphabets & Phonics", "Simple Words", "Rhymes & Poems", "Short Sentences", "Picture Books"] },
            { subjectName: "EVS", topics: ["My Family", "My School", "Animals & Plants", "Food & Nutrition", "Transport"] },
            { subjectName: "Hindi", topics: ["Varnamala", "Simple Words", "Matras", "Short Sentences", "Poems"] },
            { subjectName: "Art", topics: ["Drawing Basics", "Colouring", "Clay Modelling", "Craft", "Paper Folding"] }
        ]
    },

    // STD 1 — GUJARATI MEDIUM
    {
        standard: 1, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["1–100 Anka", "Vdhara ane Badbaaki", "Aakaro", "Namonaa", "Maap"] },
            { subjectName: "Gujarati", topics: ["Akshar Olakh", "Sarla Shabdo", "Baalgeet", "Nana Vaakyo", "Chitra Vachan"] },
            { subjectName: "Paryavaran", topics: ["Mara Parivar", "Meri Shala", "Prani ane Vanaspati", "Khuraak", "Vahaan"] },
            { subjectName: "Hindi", topics: ["Varnamala", "Sarla Shabdo", "Matra", "Nana Vaakyo", "Kavita"] },
            { subjectName: "Kala", topics: ["Chitrankana Mool", "Rang Purao", "Maati Kaam", "Craft", "Kagad Vaalvu"] }
        ]
    },

    // ════════════════════════════════════
    // STD 2 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 2, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Numbers 1–500", "Multiplication Tables 1–5", "Subtraction 2-digit", "Time & Calendar", "Money"] },
            { subjectName: "English", topics: ["Grammar Basics", "Nouns & Pronouns", "Short Paragraphs", "Comprehension", "Letter Writing Intro"] },
            { subjectName: "EVS", topics: ["Seasons", "Water Sources", "Our Community", "Safety Rules", "Plants & Growth"] },
            { subjectName: "Hindi", topics: ["Matra Abhyas", "Small Stories", "Sentences", "Antonyms", "Poems"] },
            { subjectName: "Art", topics: ["Landscape Drawing", "Color Theory", "Craft Projects", "Paper Art", "Model Making"] }
        ]
    },

    // STD 2 — GUJARATI
    {
        standard: 2, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["1–500 Anka", "Gunakaar Koshtaka 1–5", "Badbaaki 2-anka", "Samay ane Panchang", "Naaney"] },
            { subjectName: "Gujarati", topics: ["Vyakaran Paya", "Naam ane Sarvanam", "Nana Anuched", "Aavbodh", "Patra Lekhan Parichy"] },
            { subjectName: "Paryavaran", topics: ["Rituoo", "Paani na Strot", "Amaro Samuday", "Suraksha Niyamo", "Chhod ane Vikruti"] },
            { subjectName: "Hindi", topics: ["Matra Abhyas", "Nani Kahaniyan", "Vaakyo", "Virudharthi Shabdo", "Kavitao"] },
            { subjectName: "Kala", topics: ["Prakruti Chitrankam", "Rang Siddhant", "Craft Projects", "Kagad Kala", "Maadal Banavam"] }
        ]
    },

    // ════════════════════════════════════
    // STD 3 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 3, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Numbers to 1000", "Multiplication 2-digit", "Division Intro", "Fractions", "Geometry Basics"] },
            { subjectName: "English", topics: ["Tenses Present/Past", "Adjectives & Adverbs", "Paragraph Writing", "Letter Writing", "Story Reading"] },
            { subjectName: "EVS", topics: ["Earth & Sky", "States of Matter", "Human Body", "Conservation", "Natural Disasters"] },
            { subjectName: "Hindi", topics: ["Visheshan", "Kriya", "Muhavare", "Patra Lekhan", "Nibandh"] },
            { subjectName: "Art", topics: ["Still Life", "Poster Making", "Weaving", "Block Printing", "Nature Art"] }
        ]
    },

    // STD 3 — GUJARATI
    {
        standard: 3, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["1000 Sudhi Anka", "Gunakaar 2-anka", "Bhaagaakaar Parichy", "Bhaag", "Bhoomiti Paya"] },
            { subjectName: "Gujarati", topics: ["Kaal Vartaman/Bhoot", "Visheshan ane Kriyavisheshan", "Anuched Lekhan", "Patra Lekhan", "Vaarata Vachan"] },
            { subjectName: "Paryavaran", topics: ["Prithvi ane Aakaash", "Dravyani Avastha", "Maanav Sharir", "Sanrakshan", "Prakrutik Aapda"] },
            { subjectName: "Hindi", topics: ["Visheshan", "Kriya", "Muhavare", "Patra Lekhan", "Nibandh"] },
            { subjectName: "Kala", topics: ["Sthaayee Jeevan", "Poster Nirmaan", "Bunai", "Block Printing", "Prakruti Kala"] }
        ]
    },

    // ════════════════════════════════════
    // STD 4 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 4, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Large Numbers", "Multiplication 3-digit", "LCM & HCF Intro", "Decimals Intro", "Perimeter & Area"] },
            { subjectName: "English", topics: ["Parts of Speech", "Active & Passive Voice Intro", "Essay Writing", "Comprehension Passages", "Grammar Exercises"] },
            { subjectName: "Science", topics: ["Plants & Photosynthesis", "Animals Classification", "Simple Machines", "Light & Shadow", "Air & Water"] },
            { subjectName: "Social Science", topics: ["Maps & Directions", "Indian States", "Freedom Struggle Intro", "Agriculture", "Local Government"] },
            { subjectName: "Hindi", topics: ["Samas", "Sandhi Intro", "Kavita", "Anuched Lekhan", "Vartalaap"] }
        ]
    },

    // STD 4 — GUJARATI
    {
        standard: 4, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Mota Anka", "Gunakaar 3-anka", "LCM ane HCF Parichy", "Dashaansh Parichy", "Paridhi ane Kshetrafal"] },
            { subjectName: "Gujarati", topics: ["Shabdna Bhed", "Kartari Karma Prayog", "Nibandh Lekhan", "Aavbodh", "Vyakaran"] },
            { subjectName: "Vigyan", topics: ["Chhod ane Prakaashsansleshan", "Praanion nu Vargikaran", "Sarala Yantro", "Prakash ane Chhaya", "Vayu ane Pani"] },
            { subjectName: "Samajik Vigyan", topics: ["Naksha ane Dish", "Gujarat na Jilla", "Swatantrata Sangram Parichy", "Kheti", "Sthanik Sarkar"] },
            { subjectName: "Hindi", topics: ["Samas", "Sandhi Parichy", "Kavita", "Anuched Lekhan", "Vartalaap"] }
        ]
    },

    // ════════════════════════════════════
    // STD 5 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 5, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Fractions & Decimals", "Percentage Intro", "Profit & Loss Intro", "Area & Volume", "Data Handling"] },
            { subjectName: "English", topics: ["Tenses All", "Reported Speech Intro", "Essay & Letter Writing", "Comprehension", "Poetry Analysis"] },
            { subjectName: "Science", topics: ["Human Body Systems", "Food & Nutrition", "Environment & Pollution", "Stars & Planets", "Simple Chemical Changes"] },
            { subjectName: "Social Science", topics: ["Ancient India", "Indian Constitution Intro", "Resources", "Industries", "World Geography Basics"] },
            { subjectName: "Hindi", topics: ["Vyakaran", "Prasiddh Kahaniyan", "Patra Lekhan", "Nibandh", "Muhavare & Lokoktiyan"] }
        ]
    },

    // STD 5 — GUJARATI
    {
        standard: 5, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Bhaag ane Dashaansh", "Takkaavari Parichy", "Nafa ane Nukshan Parichy", "Kshetrafal ane Khattu", "Mahiti Aayojan"] },
            { subjectName: "Gujarati", topics: ["Sarva Kaal", "Pratyaksh Ukti Parichy", "Nibandh ane Patra Lekhan", "Aavbodh", "Kavita Visleshan"] },
            { subjectName: "Vigyan", topics: ["Maanav Sharir Tantra", "Khuraak ane Poshan", "Paryavaran ane Pradooshan", "Taara ane Graaho", "Rasaaynik Parivartan"] },
            { subjectName: "Samajik Vigyan", topics: ["Prachin Bharat", "Bharatiy Bandharan Parichy", "Sansadhano", "Udyog", "Vishwa Bhoogol Paya"] },
            { subjectName: "Hindi", topics: ["Vyakaran", "Prasiddh Kahaniyan", "Patra Lekhan", "Nibandh", "Muhavare ane Lokoktiyan"] }
        ]
    },

    // ════════════════════════════════════
    // STD 6 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 6, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Integers", "Fractions & Decimals", "Algebra Intro", "Basic Geometry", "Data Handling"] },
            { subjectName: "English", topics: ["Reading Comprehension", "Grammar - Tenses", "Essay Writing", "Letter Writing", "Poem Analysis"] },
            { subjectName: "Science", topics: ["Food & Nutrition", "Components of Food", "Fibre to Fabric", "Sorting Materials", "Changes Around Us"] },
            { subjectName: "Social Science", topics: ["The Earth & Solar System", "Motions of Earth", "Maps", "Major Domains", "India - Climate & Vegetation"] },
            { subjectName: "Hindi", topics: ["Gadya Sahitya", "Padya Sahitya", "Vyakaran", "Patra Lekhan", "Nibandh"] }
        ]
    },

    // STD 6 — GUJARATI
    {
        standard: 6, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Purna Anka", "Bhaag ane Dashaansh", "Beej Ganit Parichy", "Mool Bhoomiti", "Mahiti Aayojan"] },
            { subjectName: "Gujarati", topics: ["Gadya Vachan", "Padya Vachan", "Vyakaran", "Patra Lekhan", "Nibandh"] },
            { subjectName: "Vigyan", topics: ["Khuraak ane Poshan", "Khuraakna Ghatok", "Reshaathi Kapdu", "Dravyonu Vargikaran", "Aaspaasna Parivartan"] },
            { subjectName: "Samajik Vigyan", topics: ["Prithvi ane Suryamandal", "Prithvini Gati", "Naksha", "Mota Kshetro", "Bharat - Havaman ane Vanaspati"] },
            { subjectName: "Hindi", topics: ["Gadya Sahitya", "Padya Sahitya", "Vyakaran", "Patra Lekhan", "Nibandh"] }
        ]
    },

    // ════════════════════════════════════
    // STD 7 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 7, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Integers Operations", "Rational Numbers", "Simple Equations", "Lines & Angles", "Perimeter & Area"] },
            { subjectName: "English", topics: ["Advanced Comprehension", "Reported Speech", "Formal Letters", "Narrative Writing", "Literary Devices"] },
            { subjectName: "Science", topics: ["Nutrition in Plants", "Nutrition in Animals", "Heat", "Acids Bases Salts", "Physical & Chemical Changes"] },
            { subjectName: "Social Science", topics: ["Tracing Changes", "New Kings & Kingdoms", "Delhi Sultans", "Mughal Empire", "Tribes Nomads"] },
            { subjectName: "Hindi", topics: ["Vasant Bhag 2", "Bal Mahabharat", "Vyakaran Visheshan", "Sandhi", "Patra Lekhan"] }
        ]
    },

    // STD 7 — GUJARATI
    {
        standard: 7, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Purna Ankani Kriyao", "Taarkik Anka", "Sarala Samikarano", "Rekhaao ane Kono", "Paridhi ane Kshetrafal"] },
            { subjectName: "Gujarati", topics: ["Aavbodh Kanso", "Pratyaksh Ukti", "Aupcharik Patro", "Varnnatmak Lekhan", "Sahityik Sadhanao"] },
            { subjectName: "Vigyan", topics: ["Chhodni Poshan", "Praanioni Poshan", "Garamee", "Aml Khar Lavan", "Bhautik ane Rasaaynik Parivartan"] },
            { subjectName: "Samajik Vigyan", topics: ["Parivartan ni Khabar", "Nava Raajao", "Dilhi Sultanat", "Mughal Samrajya", "Jaatijano"] },
            { subjectName: "Hindi", topics: ["Vasant Bhag 2", "Bal Mahabharat", "Vyakaran", "Sandhi", "Patra Lekhan"] }
        ]
    },

    // ════════════════════════════════════
    // STD 8 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 8, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Rational Numbers", "Linear Equations", "Quadrilaterals", "Squares & Square Roots", "Algebraic Expressions"] },
            { subjectName: "English", topics: ["Honeydew", "It so Happened", "Grammar - Active Passive", "Formal & Informal Letters", "Comprehension Passages"] },
            { subjectName: "Science", topics: ["Crop Production", "Microorganisms", "Metals & Non-Metals", "Coal & Petroleum", "Combustion & Flame"] },
            { subjectName: "Social Science", topics: ["How When & Where", "From Trade to Territory", "Ruling the Countryside", "Tribals Dikus & Vision of Golden Age", "When People Rebel"] },
            { subjectName: "Hindi", topics: ["Vasant Bhag 3", "Durva", "Bharat ki Khoj", "Vyakaran", "Lekhan Kaushal"] }
        ]
    },

    // STD 8 — GUJARATI
    {
        standard: 8, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Taarkik Anka", "Rekhiya Samikarano", "Chaturbhuj", "Varg ane Vargamool", "Beejganitiy Abhivyakti"] },
            { subjectName: "Gujarati", topics: ["Gadya ane Padya", "Vyakaran - Kartari Karma", "Aupcharik Patro", "Nibandh Lekhan", "Aavbodh"] },
            { subjectName: "Vigyan", topics: ["Pako Utpadan", "Sukshmajeevo", "Dhatu ane Adhatu", "Koyalo ane Petrrolium", "Dahankriya"] },
            { subjectName: "Samajik Vigyan", topics: ["Kya Kab Kaise", "Vyapar thi Pradesh", "Grameen Prashasn", "Janjaatiya", "Jyare Log Vidroh"] },
            { subjectName: "Hindi", topics: ["Vasant Bhag 3", "Durva", "Bharat ki Khoj", "Vyakaran", "Lekhan Kaushal"] }
        ]
    },

    // ════════════════════════════════════
    // STD 9 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 9, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in 2 Variables", "Euclids Geometry", "Triangles", "Statistics"] },
            { subjectName: "English", topics: ["Beehive", "Moments", "Grammar - Tenses & Voice", "Writing Skills", "Literature"] },
            { subjectName: "Science", topics: ["Matter in Our Surroundings", "Atom & Molecules", "Cell - Structure", "Tissues", "Motion", "Force & Laws of Motion", "Gravitation"] },
            { subjectName: "Social Science", topics: ["French Revolution", "Russian Revolution", "Nazism", "Forest Society", "Pastoralists", "Electoral Politics", "Constitutional Design"] },
            { subjectName: "Hindi", topics: ["Kshitij Bhag 1", "Kritika Bhag 1", "Vyakaran - Sandhi Samas", "Lekhan - Patra Nibandh", "Sahitya Bodh"] }
        ]
    },

    // STD 9 — GUJARATI
    {
        standard: 9, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Sankhya Paddhati", "Bahupadi", "Nirdeshak Bhoomiti", "2 Chaladni Rekhiy Samikarano", "Euclid ni Bhoomiti", "Tribhuj", "Aankadashaastr"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya Vachan", "Vyakaran", "Lekhan Kaushal", "Patra Lekhan", "Nibandh"] },
            { subjectName: "Vigyan", topics: ["Aaspaasnu Dravya", "Parmaanu ane Anu", "Koshika Rachna", "Peeshio", "Gati", "Bal ane Gati na Niyamo", "Gurutvaakarshan"] },
            { subjectName: "Samajik Vigyan", topics: ["French Kraanti", "Russian Kraanti", "Natsizm", "Van Samaj", "Charavaahao", "Chunti Rajniti", "Banshodhaniy Aayojan"] },
            { subjectName: "Hindi", topics: ["Kshitij Bhag 1", "Kritika", "Vyakaran", "Lekhan", "Sahitya Bodh"] }
        ]
    },

    // ════════════════════════════════════
    // STD 10 — ENGLISH
    // ════════════════════════════════════
    {
        standard: 10, medium: "English", stream: "NA",
        subjects: [
            { subjectName: "Mathematics", topics: ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Circles", "Statistics", "Probability"] },
            { subjectName: "English", topics: ["First Flight", "Footprints Without Feet", "Grammar - Complete", "Letter & Application Writing", "Literature Analysis"] },
            { subjectName: "Science", topics: ["Chemical Reactions", "Acids Bases Salts", "Metals & Non-Metals", "Carbon Compounds", "Life Processes", "Electricity", "Magnetic Effects", "Light"] },
            { subjectName: "Social Science", topics: ["Nationalism in India", "The Age of Industrialization", "Print Culture", "Novels Society History", "Resources & Development", "Power Sharing", "Federalism", "Money & Credit"] },
            { subjectName: "Hindi", topics: ["Kshitij Bhag 2", "Kritika Bhag 2", "Vyakaran - Complete", "Lekhan Kaushal", "Sahitya"] }
        ]
    },

    // STD 10 — GUJARATI
    {
        standard: 10, medium: "Gujarati", stream: "NA",
        subjects: [
            { subjectName: "Ganit", topics: ["Vastavik Anka", "Bahupadi", "Rekhiy Samikaranno Yugm", "Dwigatiya Samikarano", "Shedimala", "Tribhuj", "Vartul", "Aankadashaastr", "Sambhavita"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya", "Vyakaran - Sampurna", "Patra ane Arji", "Nibandh", "Sahitya Visleshan"] },
            { subjectName: "Vigyan", topics: ["Rasaaynik Prakriyao", "Aml Khar Lavan", "Dhatu ane Adhatu", "Karban Sanyojano", "Jeevan Prakriyao", "Vidyut", "Chumbakiy Prabhav", "Prakash"] },
            { subjectName: "Samajik Vigyan", topics: ["Bharat ma Rashtravad", "Audyogikaran", "Mudran Sanskriti", "Sansadhan ane Vikas", "Satta Bhagidari", "Sanghvad", "Nani ane Dhiraan"] },
            { subjectName: "Hindi", topics: ["Kshitij Bhag 2", "Kritika Bhag 2", "Vyakaran", "Lekhan Kaushal", "Sahitya"] }
        ]
    },

    // ════════════════════════════════════
    // STD 11 — SCIENCE — ENGLISH
    // ════════════════════════════════════
    {
        standard: 11, medium: "English", stream: "Science",
        subjects: [
            { subjectName: "Physics", topics: ["Units & Measurements", "Motion in Straight Line", "Laws of Motion", "Work Energy Power", "Gravitation", "Thermodynamics", "Waves", "Oscillations"] },
            { subjectName: "Chemistry", topics: ["Basic Concepts of Chemistry", "Structure of Atom", "Periodic Table", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions", "Organic Chemistry Basics"] },
            { subjectName: "Biology", topics: ["Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Morphology of Plants", "Anatomy of Plants", "Cell Biology", "Biomolecules", "Cell Division"] },
            { subjectName: "Mathematics", topics: ["Sets", "Relations & Functions", "Trigonometry", "Complex Numbers", "Permutations & Combinations", "Binomial Theorem", "Straight Lines", "Limits & Derivatives", "Statistics", "Probability"] },
            { subjectName: "English", topics: ["Hornbill", "Snapshots", "Grammar - Advanced", "Writing Skills", "Literature"] }
        ]
    },

    // STD 11 — SCIENCE — GUJARATI
    {
        standard: 11, medium: "Gujarati", stream: "Science",
        subjects: [
            { subjectName: "Bhautikshaastr", topics: ["Maap ane Ekaao", "Rekhaiy Gati", "Gati na Niyamo", "Karya Urja Shakti", "Gurutvaakarshan", "Thermodynamics", "Tarango", "Dakane"] },
            { subjectName: "Rasayanshaastr", topics: ["Rasaayan na Mool Sidhanto", "Parmaanuni Rachna", "Avart Koshtaka", "Rasaaynik Bandhan", "Dravyani Avastha", "Thermodynamics", "Samatulana", "Redox Prakriya", "Karbanik Rasaayan"] },
            { subjectName: "Jivvigyan", topics: ["Jivant Vishva", "Jaivik Vargikaran", "Vanaspati Samrajya", "Prani Samrajya", "Chhodni Aakruti", "Chhodni Sharir Rachna", "Koshika Vigyan", "Jeevanan", "Koshika Vibhajan"] },
            { subjectName: "Ganit", topics: ["Samucho", "Sambandh ane Viraman", "Trikonamiiti", "Mishra Anka", "Kramchalagno", "Dvipad Pramey", "Saral Rekhaao", "Maryada ane Vyutpanna", "Aankadashaastr", "Sambhavita"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya", "Vyakaran", "Lekhan Kaushal", "Patra Lekhan", "Sahitya Visleshan"] }
        ]
    },

    // ════════════════════════════════════
    // STD 11 — COMMERCE — ENGLISH
    // ════════════════════════════════════
    {
        standard: 11, medium: "English", stream: "Commerce",
        subjects: [
            { subjectName: "Accountancy", topics: ["Introduction to Accounting", "Theory Base of Accounting", "Recording of Transactions", "Trial Balance", "Financial Statements", "Bank Reconciliation", "Depreciation"] },
            { subjectName: "Business Studies", topics: ["Nature & Purpose of Business", "Forms of Business Organization", "Public Private & Global Enterprises", "Business Services", "Emerging Modes of Business", "Social Responsibility"] },
            { subjectName: "Economics", topics: ["Indian Economy on Eve of Independence", "Indian Economy 1950-1990", "Liberalisation Privatisation Globalisation", "Poverty", "Human Capital Formation", "Microeconomics", "Consumer Behaviour", "Production & Costs"] },
            { subjectName: "Mathematics", topics: ["Sets", "Relations & Functions", "Trigonometry", "Permutations & Combinations", "Binomial Theorem", "Straight Lines", "Limits & Derivatives", "Statistics", "Probability"] },
            { subjectName: "English", topics: ["Hornbill", "Snapshots", "Grammar - Advanced", "Writing Skills", "Literature"] }
        ]
    },

    // STD 11 — COMMERCE — GUJARATI
    {
        standard: 11, medium: "Gujarati", stream: "Commerce",
        subjects: [
            { subjectName: "Hisabi Vidya", topics: ["Hisabi Vidyano Parichy", "Lekha na Sidhanto", "Vyavharano Nondh", "Kasoti Patra", "Aarthik Patrak", "Bank Milaap Patra", "Ghsaro"] },
            { subjectName: "Vanijya Vyavasaay", topics: ["Vanijyano Swabhav", "Vanijyani Rachna", "Jansarkari ane Khansarkari", "Vanijya Sevaao", "Nava Vanijya Prakaaro", "Samajik Javabdari"] },
            { subjectName: "Arthashastr", topics: ["Swatantrata Samayni Indian Arthvyavastha", "Bharatni Arthvyavastha 1950-1990", "Udaaratu Khansaakarikaran Vaishveekaran", "Gareebi", "Maanav Muddaakeeya Rathan", "Vyashti Arthashastr", "Graahak Vyavhar", "Utpadan ane Kharch"] },
            { subjectName: "Ganit", topics: ["Samucho", "Sambandh ane Viraman", "Trikonamiiti", "Kramchalagno", "Dvipad Pramey", "Saral Rekhaao", "Maryada", "Aankadashaastr", "Sambhavita"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya", "Vyakaran", "Lekhan Kaushal", "Patra Lekhan", "Sahitya Visleshan"] }
        ]
    },

    // ════════════════════════════════════
    // STD 12 — SCIENCE — ENGLISH
    // ════════════════════════════════════
    {
        standard: 12, medium: "English", stream: "Science",
        subjects: [
            { subjectName: "Physics", topics: ["Electric Charges & Fields", "Electrostatic Potential", "Current Electricity", "Magnetic Effects of Current", "Electromagnetic Induction", "Alternating Current", "EM Waves", "Ray Optics", "Wave Optics", "Dual Nature of Radiation", "Atoms", "Nuclei", "Semiconductors"] },
            { subjectName: "Chemistry", topics: ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry", "Isolation of Elements", "p-Block Elements", "d & f Block Elements", "Coordination Compounds", "Haloalkanes", "Alcohols Phenols Ethers", "Aldehydes Ketones", "Amines", "Biomolecules", "Polymers"] },
            { subjectName: "Biology", topics: ["Reproduction in Organisms", "Sexual Reproduction in Plants", "Human Reproduction", "Reproductive Health", "Principles of Inheritance", "Molecular Basis of Inheritance", "Evolution", "Human Health & Disease", "Microbes in Human Welfare", "Biotechnology", "Organisms & Populations", "Ecosystem", "Biodiversity"] },
            { subjectName: "Mathematics", topics: ["Relations & Functions", "Inverse Trigonometry", "Matrices", "Determinants", "Continuity & Differentiability", "Applications of Derivatives", "Integrals", "Applications of Integrals", "Differential Equations", "Vector Algebra", "3D Geometry", "Linear Programming", "Probability"] },
            { subjectName: "English", topics: ["Flamingo", "Vistas", "Grammar - Complete", "Writing Skills - Advanced", "Literature Analysis"] }
        ]
    },

    // STD 12 — SCIENCE — GUJARATI
    {
        standard: 12, medium: "Gujarati", stream: "Science",
        subjects: [
            { subjectName: "Bhautikshaastr", topics: ["Vidyut Bhaar ane Kshetro", "Vidyut Sthitiman Vibhav", "Praavaah Vidyut", "Praavaahni Chumbakiy Asar", "Vidyutchumbakiy Pravarthana", "Aavartman Praavaah", "EM Tarango", "Kiranaoptika", "Taranga Optika", "Vikiranni Dvait Prakriti", "Parmaanu", "Nabhi", "Ardha Vaahako"] },
            { subjectName: "Rasayanshaastr", topics: ["Khos Avastha", "Draavano", "Vidyut Rasaayan", "Rasaaynik Gati", "Prushtha Rasaayan", "Tatvanun Alagikaran", "p-Khand Tatvo", "d & f Khand Tatvo", "Samanvaya Sanyojano", "Haloalkains", "Aalkohol Phenol Ether", "Aldehyde Ketone", "Aamino", "Jivmanuo", "Polymar"] },
            { subjectName: "Jivvigyan", topics: ["Jivoma Prajanan", "Chhodo ma Jaatiya Prajanan", "Maanav Prajanan", "Prajanan Arogya", "Varasa na Sidhanto", "Varasan no Aanuvanshik Aadhar", "Uvikas", "Maanav Arogya ane Rog", "Maanav Kalyaan ma Sukshmajeevo", "Jiv Praudyogiki", "Jeevo ane Vasahaton", "Parithantha", "Jaivik Vividhata"] },
            { subjectName: "Ganit", topics: ["Sambandh ane Viraman", "Viruddh Trikonamiiti", "Matrika", "Saaransh", "Satatata ane Bhinnata", "Vyutpannani Upayogita", "Sambakalan", "Sambakalan ni Upayogita", "Avakala Samikarano", "Sadi Beej Ganit", "Traid Bhoomiti", "Rekhiy Aayojan", "Sambhavita"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya", "Vyakaran - Sampurna", "Lekhan Kaushal", "Patra Lekhan", "Sahitya Visleshan"] }
        ]
    },

    // ════════════════════════════════════
    // STD 12 — COMMERCE — ENGLISH
    // ════════════════════════════════════
    {
        standard: 12, medium: "English", stream: "Commerce",
        subjects: [
            { subjectName: "Accountancy", topics: ["Accounting for Partnership", "Reconstitution of Partnership", "Dissolution", "Share Capital", "Debentures", "Financial Statements of Companies", "Cash Flow Statement", "Analysis of Financial Statements", "Ratio Analysis"] },
            { subjectName: "Business Studies", topics: ["Nature & Significance of Management", "Principles of Management", "Business Environment", "Planning", "Organising", "Staffing", "Directing", "Controlling", "Financial Management", "Financial Markets", "Marketing", "Consumer Protection"] },
            { subjectName: "Economics", topics: ["National Income", "Money & Banking", "Government Budget", "Balance of Payments", "Exchange Rate", "Theory of Consumer Behaviour", "Theory of Firm", "Market Equilibrium", "Demand & Supply"] },
            { subjectName: "Mathematics", topics: ["Relations & Functions", "Inverse Trigonometry", "Matrices", "Determinants", "Continuity & Differentiability", "Applications of Derivatives", "Integrals", "Linear Programming", "Probability"] },
            { subjectName: "English", topics: ["Flamingo", "Vistas", "Grammar - Complete", "Writing Skills - Advanced", "Literature Analysis"] }
        ]
    },

    // STD 12 — COMMERCE — GUJARATI
    {
        standard: 12, medium: "Gujarati", stream: "Commerce",
        subjects: [
            { subjectName: "Hisabi Vidya", topics: ["Bhagidaari Hisabi Vidya", "Bhagidaari Punarachna", "Visleshi", "Sher Muddaakapital", "Rijanaatmak Patr", "Kampanina Aarthik Patrako", "Nagad Pravaah Patrak", "Aarthik Patrakon Visleshan", "Aagatano Visleshan"] },
            { subjectName: "Vanijya Vyavasaay", topics: ["Vyavasthapan no Swabhav", "Vyavasthapan na Sidhanto", "Vanijya Paryavaran", "Aayojan", "Sanghatan", "Karmachariyan", "Nirdesh", "Niyantran", "Aarthik Vyavasthapan", "Aarthik Bazaro", "Maarketing", "Graahak Sanrakshan"] },
            { subjectName: "Arthashastr", topics: ["Rashtriiy Aay", "Nani ane Banking", "Sarkari Bajat", "Chukavani Santulan", "Vinimay Dar", "Graahak Vyavhar", "Pedhi no Siddhant", "Bazaar Samatulana", "Mang ane Puravatha"] },
            { subjectName: "Ganit", topics: ["Sambandh ane Viraman", "Viruddh Trikonamiiti", "Matrika", "Saaransh", "Satatata", "Vyutpannani Upayogita", "Sambakalan", "Rekhiy Aayojan", "Sambhavita"] },
            { subjectName: "Gujarati", topics: ["Gadya Padya", "Vyakaran - Sampurna", "Lekhan Kaushal", "Patra Lekhan", "Sahitya Visleshan"] }
        ]
    }
];

async function seedSyllabus() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");

        // Clear existing syllabus data
        await SyllabusData.deleteMany({});
        console.log("🗑️ Old syllabus data cleared");

        // Insert all data
        await SyllabusData.insertMany(ALL_SYLLABUS);
        console.log(`✅ ${ALL_SYLLABUS.length} syllabus records inserted successfully!`);

        mongoose.connection.close();
        console.log("🔌 MongoDB Disconnected");

    } catch (error) {
        console.error("❌ Seed error:", error);
        process.exit(1);
    }
}

seedSyllabus();