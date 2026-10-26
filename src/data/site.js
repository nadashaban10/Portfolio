export const profile = {
  name: "Nada Shaaban",
  fullName: "Nada Shaaban Mahmoud",
  role: "Senior L1",
  company: "PaySky",
  location: "Cairo, Egypt",
  email: "nadashapann@gmail.com",
  linkedin: "https://www.linkedin.com/in/nada-shaaban-89340a223",
  github: "https://github.com/nadashaban10",
  whatsapp: "https://wa.me/201156647497",
  whatsappLabel: "+20 115 664 7497",
  siteUrl: "https://portfolio-nadashaban10s-projects.vercel.app/",
  cv: null,
};

export const nav = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Engineering", href: "#engineering" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const latticeNodes = [
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "angular", label: "Angular" },
  { id: "javascript", label: "JavaScript" },
  { id: "css", label: "CSS" },
  { id: "html", label: "HTML" },
];

export const achievement = {
  title: "Top Achiever",
  org: "PaySky",
  year: "2025",
};

export const roles = [
  {
    id: "paysky",
    title: "Senior L1",
    org: "PaySky",
    context: "FinTech",
    period: "Jan 2025 — Present",
    note: "Frontend Engineer from January 2025. Promoted to Senior L1 in September 2026. Recognized as a Top Achiever, 2025.",
    points: [
      "I build and maintain multi-tenant e-commerce applications in one shared codebase, including Yalla Super Mall.",
      "The merchant dashboard covers transactions, support, reporting, and access control. I maintain it, and I led a revamp for usability and performance.",
      "Payment gateway integration, from checkout through settlement, is handled through that large-scale dashboard.",
    ],
  },
  {
    id: "alx",
    title: "Frontend Engineering Trainee",
    org: "ALX Africa",
    context: "Software Engineering",
    period: "Sept 2024 — Oct 2024",
    points: [
      "Built AI-assisted learning features on REST APIs, so learners received content shaped to them.",
    ],
  },
  {
    id: "isekai",
    title: "Frontend Developer Intern",
    org: "IsekaiCode",
    context: "Internship",
    period: "Aug 2024 — Sept 2024",
    points: [
      "Built reusable interface pieces and production features with backend engineers, including REST API integration for data and UI state.",
    ],
  },
];

export const projects = [
  {
    id: "deco",
    featured: true,
    name: "Deco Furniture",
    image: "/images/deco.png",
    kind: "commerce",
    role: "Independent project",
    problem:
      "A furniture shop needs a catalog people can browse immediately, and a cart, wishlist, and order history that belong to a signed-in customer.",
    contribution:
      "I designed and built the React storefront: shop, product, cart, shipping, account, wishlist, and order history.",
    stack: ["React", "Redux Toolkit", "React Router", "Axios", "Tailwind CSS"],
    demo: "https://deco-furniture-app.vercel.app",
    github: "https://github.com/nadashaban10/Deco-furniture-App",
    caseStudy: {
      context:
        "The product is a multi-page shop. Catalog data and account data have different lifetimes, and mixing them makes the storefront feel broken before anyone logs in.",
      challenge:
        "Products and categories should load for every visitor. Cart, wishlist, and orders only make sense once a user id exists.",
      approach:
        "Redux Toolkit slices split those domains. The shop fetches products and categories on load. Cart, wishlist, and orders wait for an authenticated user id, then load from the API through Axios.",
      tradeoff:
        "Keeping that state in Redux made each flow explicit and inspectable. It is more boilerplate than a server-cache library, which I would weigh differently on a project I start today.",
      outcome:
        "The interface covers the path from browsing a category to shipping details and past orders, with the account-specific data staying behind login.",
    },
  },
  {
    id: "admin",
    featured: true,
    name: "Operations dashboard",
    image: "/images/ScrAdmin.png",
    kind: "dashboard",
    role: "Independent project",
    problem:
      "Admin tools repeat the same shapes: a list, a record, and a form. Without a shared page pattern, every new section becomes a one-off layout.",
    contribution:
      "I built a React dashboard with routed list, detail, and create views, data tables, charts, and a light and dark theme.",
    stack: ["React", "Material UI", "MUI X Data Grid", "Recharts", "React Router"],
    demo: "https://test-ad-dash-board.vercel.app",
    github: "https://github.com/nadashaban10/simple-AdminDashBoard",
    caseStudy: {
      context:
        "This is a frontend interface project for users and products. It is not a PaySky system, and it is not connected to a private company API.",
      challenge:
        "Users and products both need list, detail, and create screens. The layout and table behavior should stay consistent as sections are added.",
      approach:
        "Shared page types take their columns and form fields from configuration. Material UI provides the tables and chrome. Recharts covers the summary charts. A small theme context switches light and dark.",
      tradeoff:
        "Configuration-driven pages are fast to extend and easy to drift if the config becomes a second, undocumented API. I kept the inputs next to the routes so the shape of each section stays visible.",
      outcome:
        "The result is a coherent dashboard shell: navigation, tables, records, forms, and charts that follow one layout.",
    },
  },
  {
    id: "food",
    featured: false,
    name: "Food delivery",
    image: "/images/food.png",
    kind: "food",
    role: "Independent project",
    problem:
      "An ordering interface has to keep a cart intact while someone moves between the menu and checkout.",
    contribution:
      "I built the React interface: menu, cart, place-order flow, and a login dialog, with cart state held in context.",
    stack: ["React", "React Router", "Context", "Tailwind CSS"],
    demo: "https://food-app-delivery-gamma.vercel.app",
    github: "https://github.com/nadashaban10/Food-App-delivery",
  },
  {
    id: "education",
    featured: false,
    name: "Education site",
    image: "/images/educa.png",
    kind: "education",
    role: "Independent project",
    problem:
      "A course brand needs a responsive marketing site that can present programs without feeling like a document.",
    contribution:
      "I built a multi-section React site with routing, carousels, and motion for an education offering.",
    stack: ["React", "React Router", "Tailwind CSS", "Framer Motion"],
    demo: "https://educational-app-v2.vercel.app",
    github: "https://github.com/nadashaban10/Educational-App-V2",
  },
  {
    id: "hayms",
    featured: false,
    name: "Hayms Software",
    image: "/images/softwarecompany.png",
    kind: "company",
    role: "Marketing site",
    problem:
      "A software company needs a clear public site for its services, with a layout that still feels considered on a phone.",
    contribution:
      "I implemented the Hayms Software marketing site, including motion and scroll navigation.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    demo: "https://company-web-app-iota.vercel.app",
    github: "https://github.com/nadashaban10/company-Web-App",
  },
];

export const engineering = [
  {
    id: "frontend",
    title: "Frontend Development",
    summary:
      "I implement interfaces in React, Next.js, and Angular, usually with TypeScript. At PaySky that work lives in an Nx monorepo, and the screens have to stay responsive and accessible across tenants.",
    points: [
      "React.js",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Monorepos (Nx)",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    id: "data",
    title: "State & Data Management",
    summary:
      "I integrate REST APIs and shape server state for the interface. That includes payment and banking flows, and, in my own projects, Redux slices that load catalog and account data separately.",
    points: [
      "Redux Toolkit",
      "TanStack Query",
      "Zustand",
      "Context API",
      "React Hook Form",
      "REST APIs",
      "Axios",
      "Swagger",
    ],
  },
  {
    id: "ui",
    title: "UI & Design Systems",
    summary:
      "Shared components and design systems are how the same product stays consistent across tenants. I build those pieces in code and work from Figma when the design is already there.",
    points: ["Tailwind CSS", "Material UI", "Reusable Components", "Design Systems", "Figma"],
  },
  {
    id: "quality",
    title: "Testing & Quality",
    summary:
      "Most of my work lands in code other people already own. I test, lint, and review with the team so the next change is easier than the last one.",
    points: [
      "Vitest",
      "Jest",
      "React Testing Library",
      "MSW",
      "ESLint",
      "Prettier",
      "Unit Testing",
      "Code Review",
    ],
  },
  {
    id: "tools",
    title: "Tools & Practices",
    summary:
      "Day to day I ship through Git and GitHub, track work in Jira, and check APIs in Postman and Chrome DevTools. Performance and the monorepo stay part of that loop.",
    points: [
      "Git",
      "GitHub",
      "Jira",
      "Postman",
      "Chrome DevTools",
      "Nx Monorepos",
      "Agile/Scrum",
      "CI/CD",
      "Performance Optimization",
    ],
  },
];

export const about = {
  paragraphs: [
    "I am a frontend engineer in Cairo. Since January 2025 I have been at PaySky, and in September 2026 I was promoted to Senior L1. Most of the work is multi-tenant e-commerce: storefronts, a merchant dashboard, and payment flows in one shared codebase.",
    "Before PaySky I completed a 15-month Software Engineering scholarship at ALX Africa — Holberton School, from July 2023 to August 2024, with a high score and support from the Mastercard Foundation. ALX is that software engineering program, run with Holberton School. In September and October 2024 I continued there as a Frontend Engineering Trainee and built AI-assisted learning features backed by REST APIs. I also interned at IsekaiCode, building interface pieces with backend engineers.",
    "I am currently studying Node.js and NestJS, so I can follow a feature further than the interface while I keep building frontend products.",
  ],
};

export const education = [
  {
    school: "ALX Africa — Holberton School",
    program: "Software Engineering",
    period: "Jul 2023 — Aug 2024",
    detail: "15-month scholarship with a high score, supported by the Mastercard Foundation.",
    points: [
      "Studied C, Python, JavaScript, React, HTML, CSS, Tailwind CSS, SQL, and NoSQL databases.",
      "Covered data structures, algorithms, networking, Linux, Docker, and software engineering fundamentals through hands-on coding and projects.",
    ],
  },
  {
    school: "Ain Shams University",
    program: "Bachelor of Arts in Geography",
    period: "Graduated 2023",
    detail: "GIS specialization. GPA 3.5/4.0.",
  },
];
