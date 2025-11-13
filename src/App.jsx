import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------
// CSS Theme Styles
// -----------------
const ThemeStyles = () => (
  <style>{`
    /* --- 1. CORE DESIGN SYSTEM --- */
    :root {
      --bg: #04060a;
      --card: #0e1119;
      --ink: #e8f3ff;
      --muted: #9da8c4;
      --accent: #2ecfff;
      --accent2: #00ffa9;
      --glow: 0 0 25px rgba(46, 207, 255, 0.45), 0 0 6px rgba(0, 255, 169, 0.25);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: radial-gradient(
          1200px 700px at 70% -10%,
          rgba(46, 207, 255, 0.1),
          transparent 70%
        ),
        radial-gradient(
          800px 500px at -10% 30%,
          rgba(0, 255, 169, 0.08),
          transparent 60%
        ),
        var(--bg);
      color: var(--ink);
      font-family: Inter, system-ui, sans-serif;
      overflow-x: hidden;
    }

    a {
      color: var(--accent);
      text-decoration: none;
      transition: 0.3s;
    }
    a:hover {
      color: var(--accent2);
    }

    /* --- 2. NAVIGATION BAR --- */
    .nav-bar {
      position: sticky;
      top: 0;
      width: 100%;
      padding: 16px 24px;
      background: rgba(4, 6, 10, 0.8); /* var(--bg) with transparency */
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      z-index: 100;
    }
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-logo {
      font-family: "JetBrains Mono", monospace;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--accent2); /* Green */
      text-shadow: 0 0 8px rgba(0, 255, 169, 0.4);
    }
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      list-style: none;
    }

    /* --- 3. REUSABLE COMPONENTS --- */

    /* Header / Hero */
    header {
      text-align: center;
      padding: 100px 20px 60px;
      position: relative;
      overflow: hidden;
    }
    header::before {
      content: "";
      position: absolute;
      inset: 0;
      background: url("https://assets.codepen.io/13471/particles-light.svg")
        center/cover;
      opacity: 0.12;
      animation: movebg 40s linear infinite;
    }
    @keyframes movebg {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 1000px 500px;
      }
    }

    h1 {
      font-size: 2.8rem;
      margin-top: 12px;
      letter-spacing: 0.4px;
      text-shadow: 0 0 12px rgba(46, 207, 255, 0.4);
    }

    .pill {
      display: inline-block;
      padding: 6px 14px;
      border: 1px solid rgba(46, 207, 255, 0.4);
      border-radius: 999px;
      font-size: 0.9rem;
      color: var(--muted);
      backdrop-filter: blur(3px);
    }

    .tag {
      color: #cfe9ff;
      font-weight: 600;
      margin: 10px 0 0;
    }
    .sub {
      color: var(--muted);
      max-width: 760px;
      margin: 14px auto 0;
      line-height: 1.6;
    }

    /* Buttons */
    .btn {
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid rgba(46, 207, 255, 0.5);
      font-weight: 600;
      background: linear-gradient(
        180deg,
        rgba(46, 207, 255, 0.08),
        rgba(46, 207, 255, 0.02)
      );
      box-shadow: 0 0 12px rgba(46, 207, 255, 0.15);
      transition: 0.3s;
      display: inline-block;
    }
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 18px rgba(0, 255, 169, 0.3);
    }
    .btn.alt {
      border-color: rgba(0, 255, 169, 0.5);
      background: linear-gradient(
        180deg,
        rgba(0, 255, 169, 0.08),
        rgba(0, 255, 169, 0.02)
      );
    }
    .cta {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    /* Section & Card Layout */
    section {
      margin: 60px auto 20px;
      max-width: 1100px;
      padding: 0 24px;
    }
    .sec-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 20px;
    }
    .sec-head h2 {
      font-size: 1.5rem;
      letter-spacing: 0.3px;
    }
    .sec-head .subtitle {
      color: var(--muted);
      font-size: 0.9rem;
    }

    .grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(12, 1fr);
    }

    .card {
      grid-column: span 12; /* Mobile-first */
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 22px 20px;
      box-shadow: var(--glow);
      transition: 0.4s;
      position: relative;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 30px rgba(46, 207, 255, 0.3);
    }
    @media (min-width: 740px) {
      .card.half {
        grid-column: span 6;
      }
      .card.third {
        grid-column: span 4;
      }
    }
    .card h3 {
      margin-bottom: 6px;
      font-size: 1.1rem;
    }
    .card p {
      color: var(--muted);
      line-height: 1.6;
      margin-top: 6px;
    }
    .card ul {
      margin-top: 8px;
      list-style-position: inside;
      line-height: 1.7;
      color: var(--muted);
    }
    .card ul li {
      margin-bottom: 6px;
    }
    .card-tech-corner {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.75rem;
      color: var(--accent2); /* Green */
      flex-shrink: 0;
      text-align: right;
    }

    /* Badges */
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .badge {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.75rem;
      padding: 4px 8px;
      border-radius: 8px;
      background: #0a0e14;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #bde3ff;
      display: inline-block;
      margin: 0 4px 4px 0;
    }

    /* Two-column layout */
    .twocol {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    @media (min-width: 980px) {
      .twocol {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Footer */
    footer {
      text-align: center;
      color: var(--muted);
      margin: 60px 0 40px;
    }
    footer .muted {
      font-size: 0.9rem;
    }

    /* --- 4. NEW REACT COMPONENT STYLES --- */

    /* Accordion */
    .accordion-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.02);
      color: var(--muted);
      margin-top: 12px;
      cursor: pointer;
      transition: 0.3s;
    }
    .accordion-toggle:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.3);
      color: var(--ink);
    }
    .accordion-content {
      margin-top: 16px;
      white-space: pre-wrap;
      color: var(--muted);
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px;
      border-radius: 12px;
      font-family: Inter, system-ui, sans-serif;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    /* Project Embeds */
    .embed-container {
      aspect-ratio: 16 / 9;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #0a0e14;
    }
    .embed-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* Courses Chart */
    .chart-container {
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 8px;
      background: rgba(0, 0, 0, 0.35);
      box-shadow: 0 0 30px rgba(0, 255, 169, 0.1);
    }
    .chart-container h4 {
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 8px;
    }
    .chart-container p {
      color: var(--muted);
      font-size: 0.8rem;
      margin-top: 8px;
    }
    .chart-container p span {
      color: var(--accent2);
      font-weight: 600;
    }

    /* Feed Placeholders */
    .placeholder-embed {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.4);
      padding: 16px;
    }
    .placeholder-embed .placeholder-title {
      color: var(--muted);
      font-size: 0.9rem;
    }
    .placeholder-embed .placeholder-box {
      aspect-ratio: 16 / 9;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      margin-top: 8px;
      border-radius: 8px;
    }

    /* Contact Links */
    .contact-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    /* --- 5. ANIMATIONS & HELPERS --- */
    .mono {
      font-family: "JetBrains Mono", monospace;
    }
    .muted {
      color: var(--muted);
      font-size: 0.9rem;
    }
    p.muted {
      color: var(--muted);
    }

    /* typewriter caret */
    .type {
      border-right: 2px solid var(--accent);
      white-space: nowrap;
      overflow: hidden;
      animation: caret 1s step-end infinite;
      /* display: inline-block; <-- THIS WAS THE ERROR, NOW REMOVED */
    }
    @keyframes caret {
      50% {
        border-color: transparent;
      }
    }
  `}</style>
);

// -----------------
// Data Definitions
// -----------------
const SKILLS = {
  Languages: ["Python", "Java", "JavaScript (ES6+)", "PHP", "HTML5", "CSS3", "SQL"],
  Frameworks: [
    "React.js",
    "Vite.js",
    "TensorFlow",
    "Keras",
    "Scikit-Learn",
    "Flask",
    "Chart.js",
    "Framer Motion"
  ],
  "Cyber Tools": [
    "Wireshark",
    "Nmap",
    "Burp Suite",
    "FTK Imager",
    "WinHex",
    "Metasploit Framework"
  ],
  "Dev Tools": [
    "Git",
    "GitHub",
    "VS Code",
    "Jupyter Notebook",
    "Linux",
    "Tomcat",
    "npm / Node.js",
    "Netlify / Vercel"
  ],
  Specialties: [
    "Machine Learning & Deep Learning",
    "Threat Modeling",
    "Network Security",
    "Cryptography",
    "Explainable AI (XAI)",
    "Full-Stack Web Development",
    "Data Visualization",
    "System Integration (APIs & SDKs)",
    "MLOps & Deployment Readiness"
  ],
  OnlineCourses: [
    "Python for Everybody — University of Michigan",
    "Linear Algebra for Machine Learning",
    "Probability & Statistics Fundamentals",
    "Python Data Structures",
    "AI Fundamentals — DeepLearning.AI",
    "Front-End Development with React"
  ],
};


const PROJECTS = [
  {
    title: "Secure Multi‑Role Web Portal (Java/JSP)",
    blurb:
      "End‑to‑end RBAC system; SHA‑256 + salt/pepper; audit logging; normalized MySQL schema; Tomcat deployment.",
    tech: ["Java", "JSP/JSTL", "MySQL", "Tomcat"],
    link: "#",
  },
  {
    title: "Digital Forensics Tutorial (NTFS/MFT)",
    blurb:
      "Step‑by‑step analysis with FTK Imager & WinHex; resident/non‑resident attributes; data runs (0x80).",
    tech: ["FTK", "WinHex", "Forensics"],
    link: "#",
  },
  {
  title: "DX Lab — AI Consulting Demos",
  blurb: "...",
  tech: ["MLOps", "Python", "PM"],
  link: "video:swe"
  },
];

const PAPERS = [
  {
    title: "Discrete Math I — Hash Functions",
    notes: "Survey + implementation notes; collision properties; cryptographic vs non-cryptographic trade-offs.",
    link: "/AftabOS.github.io/files/Aftab%20Alam%20-%20Hash%20Functions%20in%20Discrete%20Mathematics.pdf",
  },
  {
    title: "Discrete Math II — Minimum Spanning Tree & Prim’s Algorithm",
    notes: "Graph theory primer; proof sketch; complexity; code; applications in networks.",
    link: "/AftabOS.github.io/files/Aftab%20Alam%20-%20Minimal%20Spanning%20Tree%20and%20Prim%E2%80%99s%20Algorithm.pdf",
  },
  {
    title: "Biometrics — Selected Papers",
    notes: "Ethical, AI-driven, and privacy-focused analyses of biometric technologies.",
    link: "/AftabOS.github.io/files/BiOMETRICSS.pdf",
  },
];


const COURSES = [
  // ... (Data is unchanged)
];

const GPA = 3.97;

const RESEARCH_STATEMENT = `
Research Statement
A Hybrid AI Framework for Predictive Cybersecurity: Integrating Deep Learning, Behavioral Modeling, and Probabilistic Inference

Applicant: Aftab Alam Masjidi
Program: Master of Science in Computer Science
Institution: Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)

1. Abstract
Modern cybersecurity systems remain largely reactive, identifying intrusions after they have occurred. As attack vectors evolve and user behaviors become more dynamic, traditional rule-based and even static machine learning approaches fail to adapt. This research proposes a hybrid AI framework that integrates deep learning, behavioral modeling, and probabilistic inference to achieve proactive cyber threat prediction. By leveraging contextual user and network behavior, the framework aims to detect anomalies indicative of emerging threats before compromise occurs. The ultimate goal is to design an interpretable, adaptable, and deployable model that supports human analysts in real-time security decision-making.

2. Background and Motivation
My research trajectory originates from my dual foundation in Computer Science and Cybersecurity, reinforced through hands-on projects in secure software engineering and digital forensics. My cybersecurity experience; vulnerability assessments, SIEM monitoring, and forensics; revealed the limitations of static defense mechanisms. These experiences cultivated a persistent question: can AI anticipate attacks before they unfold?
To answer that, I began studying predictive modeling in a more structured context through my ongoing independent research, Stock Market Analysis and Prediction using Machine Learning and Deep Learning. The project explores the predictive capacity of hybrid architectures (MLP, CNN-LSTM) in capturing temporal and behavioral patterns within volatile data. The financial domain—complex, dynamic, and data-driven—served as an ideal proving ground to master model architectures, feature pipelines, and interpretability methods.
The core principle connecting finance and cybersecurity is behavioral pattern recognition: markets fluctuate like network environments, driven by anomalies, noise, and subtle signals. Thus, while my undergraduate research addresses financial time series, its underlying methods and insights are directly transferable to threat prediction. I now seek to evolve that work into a cybersecurity context—where prediction translates into prevention.

3. Research Objectives
This proposed research has three main objectives:
  • Develop a predictive AI model that dynamically learns from network and user behavior data to identify potential attack precursors.
  • Integrate probabilistic reasoning with deep neural architectures to quantify uncertainty in threat predictions.
  • Design an explainable AI (XAI) interface for interpretable model decision-making—enabling security analysts to trace model logic.
Collectively, these objectives aim to create a behavior-aware, self-adaptive, and explainable cybersecurity framework.

4. Proposed Methodology

4.1 Data Sources
The research will utilize established open-access cybersecurity datasets, including:
  • UNSW-NB15 (modern network traffic and attack types),
  • CICIDS2017 (realistic intrusion detection data), and
  • TON_IoT (emerging IoT-based threat data).
    These datasets provide diverse feature spaces encompassing user behavior, packet characteristics, and time-based activity trends.

4.2 Feature Extraction and Engineering
Data preprocessing will include normalization, noise removal, and attack-label balancing. Key feature categories will include:
  • Temporal features – capturing traffic rate, session duration, and periodic anomalies.
  • Statistical features – representing entropy, correlation, and inter-packet variance.
  • Semantic features – embedding behavioral sequences (e.g., login patterns, resource access frequencies).

4.3 Model Architecture
The proposed hybrid pipeline will include:
  Stage 1 – Sequential Modeling:
          A CNN-LSTM backbone will model local spatial and temporal dependencies in network activity.
  Stage 2 – Probabilistic Layer:
          Bayesian layers or Gaussian Processes will estimate predictive confidence and model uncertainty, reducing false positives.
  Stage 3 – Explainability Module:
          An attention-based interpretability layer (e.g., SHAP or LIME integration) will visualize which patterns drive predictions, enabling 
          analyst trust and insight.

4.4 Evaluation and Validation
  • Metrics: Precision, Recall, F1-score, ROC-AUC, and real-time latency.
  • Comparative Baselines: Random Forest, SVM, and Autoencoder-based intrusion detection systems.
  • Deployment Simulation: Testing through a simulated Security Information and Event Management (SIEM) environment for real-time adaptability.

5. Significance and Innovation
This work contributes to the next generation of predictive cybersecurity by:
  • Bridging deep learning and probabilistic inference to enhance adaptability in dynamic threat environments.
  • Embedding explainability to support human-machine collaboration in security operations.
  • Proposing a modular, scalable architecture suitable for both enterprise and IoT contexts.
Beyond technical innovation, this research supports the UAE’s national agenda for AI and digital security readiness, aligning directly with MBZUAI’s mission to develop ethical, human-centered AI systems.

6. Faculty and Institutional Fit
My research aligns closely with MBZUAI’s interdisciplinary strengths and the expertise of faculty such as:
  • Professor Ting Yu, whose work on trustworthy AI, privacy preservation, and data integrity informs my interest in behavioral 
    modeling for security.
  • Professor Abdulrahman Mahmood, whose focus on computational intelligence and secure optimization parallels my goal of adaptive, 
    self-correcting defense systems.
MBZUAI’s research-driven environment, high-performance computing facilities, and focus on translational AI research provide the infrastructure necessary to elevate my prototype models into fully realized frameworks.

7. Expected Outcomes
  1. A validated, explainable deep learning model for predictive cybersecurity threat detection.
  2. A published research paper in IEEE Transactions on Information Forensics and Security or Computers & Security.
  3. A modular system ready for deployment within academic and industrial SOC (Security Operations Center) environments.

8. Long-Term Vision
This research serves as the foundation for future PhD-level exploration, including real-time adaptation for IoT and cloud ecosystems, and the integration of federated learning for distributed cybersecurity intelligence. My long-term objective is to build AI-driven defense systems that not only react to cyber threats but anticipate them—transforming the global standard of digital resilience.`;

const MBZUAI_VISION = `
Aftab's Vision at MBZUAI (Full Statement)
________________________

At MBZUAI, my vision is to develop a Predictive Cyber Defense Framework that fuses machine intelligence with human interpretability, enabling security systems that do not merely respond to attacks but anticipate and adapt in real time. The goal is to bridge a long-standing gap between data-driven learning models and the dynamic, adversarial nature of cyber environments.

1. Theoretical Foundation
Modern AI systems excel at classification but struggle with drift, uncertainty, and explainability; three challenges that define cybersecurity. My work aims to formalize a learning architecture grounded in temporal representation learning and graph-theoretic reasoning. This involves hybridizing sequence models (LSTMs, Transformers) with graph neural networks (GNNs) to represent entity relationships and time-evolving behaviors within network telemetry.

2. Predictive Modeling and Drift Adaptation
In cybersecurity, yesterday’s normal is tomorrow’s anomaly. I intend to build drift-aware learning pipelines that continuously adapt to evolving data distributions. This includes:
  • Online normalization and rolling-window retraining for real-time resilience;
  • Meta-learning strategies that allow models to self-adjust as threat surfaces change;
  • Evaluation protocols emphasizing lead-time to detection and sustained precision under data drift.

3. Explainable and Trustworthy Defense
Trust is paramount in high-stakes AI deployment. My system will integrate lightweight explainability modules such as attention-based visualizations, SHAP attributions, and post-hoc summarization to ensure each prediction can be justified. Analysts must not only see what the model predicts but why it predicts it. The aim is a transparent, accountable defense pipeline that aligns with emerging AI safety and trustworthiness principles.

4. System Design and Deployment
Beyond theoretical contributions, I aim to produce a deployable architecture; an operational framework for real-time cyber telemetry. This will integrate log streams (auth, EDR, NetFlow) using scalable schema-on-read pipelines and be optimized for inference latency through model compression, distillation, and edge-ready deployment. The end vision is a model that can serve both as a research benchmark and an industry-grade prototype for predictive SOC systems.

5. Why MBZUAI
MBZUAI provides the perfect ecosystem to actualize this vision; world-class mentorship, GPU-backed compute infrastructure, and a unique research culture centered on Trustworthy AI, Robustness, and Data-centric Learning. The institute’s interdisciplinary synergy between Machine Learning, Computer Vision, and NLP will allow me to explore cross-domain generalization; such as applying temporal anomaly detection principles from cyber telemetry to other high-stakes fields like finance or healthcare security.

6. Long-Term Impact
The broader aspiration is to contribute to a global paradigm shift; from reactive cybersecurity to proactive, intelligent, and explainable defense. By advancing predictive threat modeling, I aim to help build the foundation of the next generation of AI-driven security operations centers (AI-SOCs); systems that are interpretable, adaptive, and scientifically rigorous.

In summary:
My work at MBZUAI will stand at the intersection of AI theory, cyber defense, and human-centered explainability; transforming data-driven detection into predictive, interpretable protection.
`;

// -----------------
// Utility Components (MODIFIED)
// -----------------
const Section = ({ id, title, children, subtitle }) => (
  <section id={id}>
    <div className="sec-head">
      <h2>{title}</h2>
      {subtitle && <span className="subtitle">{subtitle}</span>}
    </div>
    {children}
  </section>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className={`card ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ children }) => <span className="badge">{children}</span>;

// -----------------
// Widgets (MODIFIED)
// -----------------
const Hero = () => {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const text = "Aftab Alam Masjidi";
    let i = 0;
    const t = setInterval(() => {
      setTyped(text.slice(0, i++));
      if (i > text.length) {
        clearInterval(t);
        // Optional: remove .type class after typing to stop caret
        // document.getElementById('type').classList.remove('type');
      }
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <header>
      <div className="relative">
        <div
  className="pill glow-pill"
  style={{
    textShadow:
      "0 0 10px rgba(46,207,255,0.6), 0 0 20px rgba(0,255,169,0.3), 0 0 30px rgba(46,207,255,0.2)",
    boxShadow:
      "0 0 20px rgba(46,207,255,0.3), 0 0 40px rgba(0,255,169,0.2)",
    borderColor: "rgba(0,255,169,0.5)",
    transition: "all 0.4s ease",
  }}
>
  Cybersecurity × Artificial Intelligence
</div>

        <h1 id="type" className="type">
          {typed}
        </h1>
        <div className="tag">
          Stamps Scholar; Researcher; Founder of AI Society @ Barry University.
        </div>
        <p className="sub">
          I engineer systems that learn, adapt, and defend; blending security
          rigor with deep learning to
          <em> predict, protect, and evolve</em>.
        </p>
      </div>
    </header>
  );
};

const Navbar = () => {
  // This component was already perfect
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo">AftabOS</div>
        <ul className="nav-links">
          <a href="#research" className="btn">
            Research
          </a>
          <a href="#projects" className="btn">
            Projects
          </a>
          <a href="#skills" className="btn">
            Skills & Tools
          </a>
          <a href="#Documents" className="btn">
            Documents
          </a>
          <a href="#courses" className="btn">
            Courses
          </a>
          <a href="mailto:aftabalam.masjidi@mymail.barry.edu" className="btn">
            Contact
          </a>
          <a href="#vision" className="btn btn-vision">✦ MBZUAI Vision ✦</a>
        </ul>
      </div>
    </nav>
  );
};

const Research = () => (
  <Section
    id="research"
    title="Research Focus & Live Methodology"
    subtitle="Hybrid temporal models • Drift‑aware • Explainable"
  >
    <div className="grid">
      <Card className="half">
        <h3>Current Study — Financial Series → Security</h3>
        <p>
          Comparative evaluation of classical vs deep architectures on financial
          time series (2013–2025). Pipeline generalizes to security telemetry
          for anomaly detection.
        </p>
        <p className="muted">
          Accepted: CURO Symposium 2026 (UGA) & Barry STEM Symposium 2026.
        </p>
        <div className="badges">
          {[
            "Ridge",
            "RF",
            "XGBoost",
            "LSTM",
            "CNN",
            "CNN-LSTM",
            "Sentiment",
          ].map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
        <div style={{ marginTop: "16px" }}>
          <a
            href="https://github.com/aftabalam01-creator/Stock-Forecasting-ML-AftabAlamMasjidi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Repository ↗
          </a>
        </div>
      </Card>
      <Card className="half">
        <h3>Next-Semester Plan: Hybrid Learning for Threat Prediction</h3>
        <p>
          Building calibrated, interpretable predictors that learn behavioral
          patterns in logs and flows, anticipate incidents, and minimize false
          positives under drift.
        </p>
        <div className="badges">
          {[
            "Temporal ML",
            "LSTM/CNN/Attention",
            "Explainability",
            "Data/Concept Drift",
            "Calibration",
            "MLOps",
          ].map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </Card>
    </div>

    <Card style={{ marginTop: "20px" }}>
      <h3>MBZUAI Full Research Statement</h3>
      <Accordion text={RESEARCH_STATEMENT} />
    </Card>
  </Section>
);

const Accordion = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        className="accordion-toggle glow-expand"
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "var(--accent2)",
          textShadow: "0 0 10px rgba(0,255,169,0.6), 0 0 20px rgba(0,255,169,0.4)",
          letterSpacing: "0.4px",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "1px solid rgba(0,255,169,0.4)",
          background: "rgba(0,255,169,0.05)",
          transition: "all 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 0 25px rgba(0,255,169,0.4), 0 0 8px rgba(46,207,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {open ? "Hide Statement" : "Expand Full Statement"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.pre
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="accordion-content"
          >
            {text}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
};

const LeadershipRecognition = () => (
  <Section
    id="leadership"
    title="Leadership & Recognition"
    subtitle="Leadership, Service, Awards & Invitations"
  >
    <div
      className="twocol"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "26px",
      }}
    >
      {/* Leadership & Service */}
      <div
        className="card fade show"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          border: "1px solid var(--card-border)",
          borderRadius: "18px",
          boxShadow: "var(--glow)",
          padding: "24px 26px",
          backdropFilter: "blur(6px)",
        }}
      >
        <h3
          style={{
            color: "var(--ink)",
            marginBottom: "12px",
            fontWeight: "600",
          }}
        >
          Leadership & Service
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span style={{ color: "var(--accent)", marginRight: "6px" }}>●</span>
            <strong>Founder & President — AI Society @ BarryU</strong>
            <br />
            <span className="muted">
              Ethical, hands-on AI community; workshops; student projects;
              collaboration with AI Center.
            </span>
          </div>
          <div>
            <span style={{ color: "var(--accent)", marginRight: "6px" }}>●</span>
            <strong>Coordinator — DX Lab</strong>
            <br />
            <span className="muted">
              Client-facing AI demos; student onboarding; project management.
            </span>
          </div>
          <div>
            <span style={{ color: "var(--accent)", marginRight: "6px" }}>●</span>
            <strong>President — Muslim Students Association</strong>
            <br />
            <span className="muted">
              50+ members; campus partnerships; programming for voice &
              inclusion.
            </span>
          </div>
          <div>
            <span style={{ color: "var(--accent)", marginRight: "6px" }}>●</span>
            <strong>Founder — Sunday Discoveries Mentorship</strong>
            <br />
            <span className="muted">
              Weekly mentorship for Afghan refugee students; Technology, Language &
              Academic Support.
            </span>
          </div>
        </div>
      </div>

      {/* Awards & Invitations */}
      <div
        className="card fade show"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          border: "1px solid var(--card-border)",
          borderRadius: "18px",
          boxShadow: "var(--glow)",
          padding: "24px 26px",
          backdropFilter: "blur(6px)",
        }}
      >
        <h3
          style={{
            color: "var(--ink)",
            marginBottom: "12px",
            fontWeight: "600",
          }}
        >
          Awards & Invitations
        </h3>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            lineHeight: "1.8",
            color: "var(--muted)",
            fontSize: "0.96rem",
          }}
        >
          <li>
            <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            <strong>Stamps Scholar (Barry University)</strong> — full-ride;
            &lt;1% acceptance; merit & leadership based.
          </li>
          <li>
            <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            <strong>President’s List</strong> — multiple semesters for academic
            excellence.
          </li>
          <li>
            <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            <strong>Nominee</strong> — Dr. George Wanko Award for Outstanding
            Junior.
          </li>
          <li>
            <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            <strong>Accepted</strong> — CURO Symposium 2026 (UGA) & Barry STEM
            Symposium 2026.
          </li>
          <li>
            <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            <strong>Best Employee Award </strong> — Honored for innovation, leadership, and excellence in performance.
          </li>
        </ul>
      </div>
    </div>
  </Section>
);



const Projects = () => (
  <Section id="projects" title="Projects Lab">
    <div className="grid">
      {PROJECTS.map((p) => (
        <Card key={p.title} className="third">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <h3>{p.title}</h3>
            <span className="card-tech-corner">{p.tech[0]}</span>
          </div>
          <p>{p.blurb}</p>
          <div className="badges">
            {p.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div style={{ marginTop: "16px" }}>
              {p.link === "video:swe" ? (
                <a
                  href="#swe-video"
                  style={{
                    color: "#2ecfff",
                    fontWeight: "600",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  Demo Video ↗
                </a>
              ) : (
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  {p.link === "#" ? "Docs / Demo (soon)" : "Open ↗"}
                </a>
              )}
            </div>
        </Card>
      ))}
    </div>

<Card style={{ marginTop: "24px" }}>
  <h3>Showcase: Embedded Environments</h3>
  <p>
    Here you can see my ML Stock Prediction Chart and Web App interactively
  </p>

  <div
    className="twocol"
    style={{
      marginTop: "16px",
      display: "flex",
      gap: "16px",
      alignItems: "stretch",
      flexWrap: "wrap", // for mobile
    }}
  >
    {/* Left: GIF Demo */}
    <div
      className="embed-container showcase-item"
      style={{
        flex: 1,
        textAlign: "center",
        height: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0b0b0b",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <img
        src="/AftabOS.github.io/files/ML%20Stock%20Prediction.gif"
        alt="ML Stock Prediction Demo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "12px",
          transition: "transform 0.4s ease",
        }}
      />
    </div>

    {/* Right: Software Engineering Project Video */}
  <div
    className="embed-container showcase-item"
    style={{
      flex: 1,
      height: "320px",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#0b0b0b",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      boxShadow: "0 0 25px rgba(46,207,255,0.12)",
    }}
  >
    <div id="swe-video" style={{ marginTop: "40px" }}>
      <video
        src="/AftabOS.github.io/files/SWEProject.mp4"
        controls
        style={{
          width: "100%",
          borderRadius: "14px",
          marginTop: "24px",
          boxShadow: "0 0 25px rgba(46,207,255,0.18)"
        }}
      />
    </div>
  </div>
  </div>
</Card>


  </Section>
);

const Skills = () => (
  <Section
    id="skills"
    title="Skills & Tools"
    subtitle=""
  >
    <div className="grid">
      {Object.entries(SKILLS).map(([cat, items]) => (
        <Card key={cat} className="third">
          <h3>{cat}</h3>
          <div className="badges">
            {items.map((i) => (
              <Badge key={i}>{i}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const Courses = () => {
  // ... (SEMESTER_COURSES data)
  const SEMESTER_COURSES = {
    "Fall 2022": [
      ["ENG 111", "First-Year Composition & Rhetoric", "A"],
      ["ORI 100", "First-Year Experience Seminar", "A"],
      ["PSY 281", "Intro to Psychology", "A"],
      ["POS 201", "American Government", "A"],
      ["MUA 123", "Applied Music: Classical Guitar", "A"],
    ],
    "Spring 2023": [
      ["ENG 112", "Techniques of Research", "A"],
      ["SPE 101", "Fundamentals of Speech", "A"],
      ["CS 180", "Intro to Digital Literacy", "A"],
      ["MAT 109", "Precalculus I", "A"],
    ],
    "Fall 2023": [
      ["BUS 181", "Intro to Business", "A"],
      ["CS 231", "Computer Science I", "A"],
      ["CS 332", "Computer Hardware Organization", "A"],
      ["PHI 220", "Intro to Philosophy", "A"],
      ["ISR 165", "Tennis", "A"],
    ],
    "Spring 2024": [
      ["CS 232", "Computer Science II", "A"],
      ["CS 306", "DB & Logic Design", "A"],
      ["CS 340", "Programming for the Web", "A"],
      ["MAT 211", "Calculus I", "B+"],
      ["CS 317", "Ethics & Digital Technology", "A"],
    ],
    "Fall 2024": [
      ["CS 331", "Data Structures & Algorithms", "A"],
      ["CS 440", "Data Communications", "A"],
      ["PHY 201", "General College Physics I", "A"],
      ["SOC 200", "Society & Social Justice", "A"],
      ["THE 201", "Theology: Faith & Beliefs", "A"],
    ],
    "Spring 2025": [
      ["CS 318", "Biometrics", "A"],
      ["CS 474", "Computer Forensics", "A"],
      ["CS 477", "Computer Security", "A"],
      ["MAT 253", "Discrete Math II", "A"],
      ["HIS 150", "Meaning of History", "A"],
    ],
  };

  const gpaData = {
    labels: Object.keys(SEMESTER_COURSES),
    datasets: [
      {
        label: "Semester GPA",
        data: [4.0, 4.0, 4.0, 3.867, 4.0, 4.0],
        borderColor: "rgba(46,207,255,0.9)",
        backgroundColor: "rgba(46,207,255,0.25)",
        pointBackgroundColor: "#00ffa9",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.35,
        fill: true,
      },
      {
        label: "Cumulative GPA",
        data: [4.0, 4.0, 4.0, 3.961, 3.968, 3.974],
        borderColor: "rgba(0,255,169,0.9)",
        backgroundColor: "rgba(0,255,169,0.15)",
        borderDash: [6, 4],
        pointBackgroundColor: "#2ecfff",
        pointRadius: 4,
        tension: 0.35,
        fill: false,
      },
    ],
  };

  const gpaOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(10,15,20,0.95)",
        borderColor: "rgba(46,207,255,0.4)",
        borderWidth: 1,
        titleColor: "#00ffa9",
        bodyColor: "#e6f6ff",
        displayColors: false,
        boxPadding: 6,
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          beforeBody: (ctx) => {
            const datasetLabel = ctx[0].dataset.label;
            if (datasetLabel !== "Semester GPA") return [];
          },
          label: (ctx) => {
            if (ctx.dataset.label !== "Semester GPA") return null;
            const sem = ctx.label;
            const gpa = ctx.parsed.y.toFixed(3);
            const data = SEMESTER_COURSES[sem] || [];

            const lines = data.map(
              ([code, name, grade]) =>
                `• ${code} - (${name}) — Grade: ${grade}`
            );

            return [
              `Semester: ${sem}`,
              `Term GPA: ${gpa}`,
              "Courses:",
              ...lines,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        min: 3.5,
        max: 4.01,
        ticks: { color: "#cce7ff" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "#cce7ff" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <Section
      id="courses"
      title="Academic Journey — Courses & Grades"
      subtitle={`Current GPA: 4.0 -- Cumulative GPA ${GPA.toFixed(3)}`}
    >
      <Card>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="chart-container"
        >
          <h4>Semester vs Cumulative GPA</h4> <h6> <p>
            Hover over a <span>Semester GPA</span> point to view my detailed
            <span> Courses </span> & <span>Grades</span>.
          </p></h6>
          <Line data={gpaData} options={gpaOptions} />
         
        </motion.div>
      </Card>
    </Section>
  );
};

const Papers = () => (
  <Section
    id="papers"
    title="Publications & Course Papers"
    subtitle=""
  >
    <div className="grid">
      {PAPERS.map((p) => (
        <Card key={p.title} className="third">
          <h3>{p.title}</h3>
          <p>{p.notes}</p>
          <div style={{ marginTop: "12px" }}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {p.link === "#" ? "PDF / Link (soon)" : "Open ↗"}
            </a>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const Vision = () => (
  <Section
    id="vision"
    title="Future Vision: MBZUAI & Beyond"
    subtitle=""
  >
    <div
      className="card fade show"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid var(--card-border)",
        borderRadius: "18px",
        boxShadow: "var(--glow)",
        padding: "26px 30px",
        backdropFilter: "blur(6px)",
        maxWidth: "1150px",
        margin: "0 auto",
      }}
    >
      <p>
        At <strong>MBZUAI</strong>, I aim to pioneer a framework for <strong>Predictive Cyber Defense</strong>; intelligent systems that anticipate and neutralize threats through adaptive learning. My roadmap integrates:
      </p>
      <ul
        style={{
          listStyleType: "none",
          paddingLeft: "0",
          lineHeight: "1.8",
          color: "var(--muted)",
          fontSize: "0.96rem",
        }}
      >
        <li>
          <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            Behavioral modeling of network entities using sequence and graph learning.
        </li>
        <li>
          <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            Explainable threat prediction pipelines that maintain precision under drift.
        </li>
        <li>
          <span style={{ color: "var(--accent2)", marginRight: "6px" }}>●</span>
            Deployment-ready architectures for real-time cybersecurity telemetry.
        </li>
      </ul>
      <p
      style={{
        color: "var(--accent2)",
        fontWeight: "500",
        textShadow: "0 0 8px rgba(0,255,169,0.4)",
        marginTop: "12px",
        lineHeight: "1.8",
      }}
      >
        This vision unites my foundation in Cybersecurity with my deep learning expertise,
        translating academic research into global digital resilience.
      </p>

      <h3>MBZUAI Comprehensive Vision: Expandable Below</h3>
      <Accordion text={MBZUAI_VISION} />
  </div>
  </Section>
);



const Feed = () => (
  <Section
    id="feed"
    title="AI Feed: LinkedIn Posts"
  >
    <Card>
      <p>
        Below are my latest public research posts — click the image to view the
        full post on LinkedIn.
      </p>

      <div
        className="twocol"
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
     {/* Post 1 */}
<a
  href="https://www.linkedin.com/posts/aftabalammasjidi_ai-machinelearning-deeplearning-activity-7388522435047862273-bXu5"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    flex: 1,
    textDecoration: "none",
    color: "inherit",
    borderRadius: "14px",
    overflow: "hidden",
    background: "rgba(0,0,0,0.4)",
    boxShadow: "0 0 25px rgba(46,207,255,0.12)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,169,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 0 25px rgba(46,207,255,0.12)";
  }}
>
  <img
    src="/AftabOS.github.io/files/LinkedInPost1.PNG"
    alt="AI × Deep Learning Research"
    style={{
      width: "100%",
      height: "270px",
      objectFit: "cover",
      display: "block",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}
  />
  <div style={{ padding: "14px" }}>
    <div
      style={{
        fontWeight: "600",
        fontSize: "1rem",
        color: "#e8f3ff",
      }}
    >
      AI × Deep Learning Research
    </div>
    <p
      style={{
        color: "#9da8c4",
        fontSize: "0.9rem",
        marginTop: "4px",
      }}
    >
      Comparative study of ML & DL models for predictive analytics.
    </p>
    <span
      style={{
        color: "#2ecfff",
        display: "inline-block",
        marginTop: "8px",
      }}
    >
      View on LinkedIn ↗
    </span>
  </div>
</a>

        {/* Post 2 */}
        <a
          href="https://www.linkedin.com/posts/aftabalammasjidi_barryuniversity-aicenter-stampsscholar-activity-7387710789618466817-RWae"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            textDecoration: "none",
            color: "inherit",
            borderRadius: "14px",
            overflow: "hidden",
            background: "rgba(0,0,0,0.4)",
            boxShadow: "0 0 25px rgba(46,207,255,0.12)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,169,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(46,207,255,0.12)";
          }}
        >
          <img
              src="/AftabOS.github.io/files/LinkedInPost2.PNG"
              alt="Barry University AI Center & Stamps Scholar Update"
            style={{
              width: "100%",
              height: "270px",
              objectFit: "cover",
              display: "block",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div style={{ padding: "14px" }}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                color: "#e8f3ff",
              }}
            >
              Barry University AI Center & Stamps Scholar Update
            </div>
            <p
              style={{
                color: "#9da8c4",
                fontSize: "0.9rem",
                marginTop: "4px",
              }}
            >
              Updates on leadership, AI center projects, and academic milestones.
            </p>
            <span
              style={{
                color: "#2ecfff",
                display: "inline-block",
                marginTop: "8px",
              }}
            >
              View on LinkedIn ↗
            </span>
          </div>
        </a>
      </div>
    </Card>
  </Section>
);


const Contact = () => (
  <Section
    id="contact"
    title="Contact & Documents"
  >
    <div className="grid" id= "Documents">
      <Card className="half">
        <h3>Reach Out</h3>
        <p>
          Open to research collabs in AI for Cyber Defense & Trustworthy ML.
        </p>
        <div className="contact-links">
          <a
            className="btn"
            href="mailto:aftabalam.masjidi@mymail.barry.edu"
          >
            Email
          </a>
          <a
            className="btn"
            href="https://github.com/aftabalam01-creator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn"
            href="https://www.linkedin.com/in/aftabalammasjidi"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p className="muted" style={{ marginTop: "16px", fontSize: "0.85rem" }}>
          Best Way to Reach out is through Email or LinkedIn.
        </p>
      </Card>
      <Card className="half" id = "Documents">
        <h3>Documents</h3>
        <ul>
          <li>
            <a href="/AftabOS.github.io/files/AftabAlamMasjidi_CV.pdf" target="_blank" rel="noopener noreferrer">
              Academic CV (PDF)
            </a>
          </li>
          
          <li>
            <a href="/AftabOS.github.io/files/Aftab%20Alam%20-%20Statement%20of%20Purpose%20-%20MBZUAI.pdf" target="_blank" rel="noopener noreferrer">
              MBZUAI Statement of Purpose (PDF)
            </a>
          </li>
          
          <li>
            <a href="/AftabOS.github.io/files/AftabBarryUniversityTranscript.pdf" target="_blank" rel="noopener noreferrer">
              Academic Transcript (PDF)
            </a>
          </li>
        </ul>
      </Card>
    </div>
  </Section>
);

// -------------
// Root Component (MODIFIED)
// -------------
export default function AftabOS() {
  return (
    <div>
      <ThemeStyles />
      <Navbar />
      <Hero />
      <Research />
      <LeadershipRecognition />
      <Projects />
      <Skills />
      <Courses />
      <Papers />
      <Vision />
      <Feed />
      <Contact />
      <footer>
        <div>⚡ Securing the Future with Intelligent Defense</div>
        <div className="muted" style={{ marginTop: "8px" }}>
          © {new Date().getFullYear()} Aftab Alam Masjidi
        </div>
      </footer>
    </div>
  );
}

