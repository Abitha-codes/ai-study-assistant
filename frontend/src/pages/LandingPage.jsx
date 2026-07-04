import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCalendarDays,
  HiChevronDown,
  HiArrowRight,
} from "react-icons/hi2";
import LandingNavbar from "../components/layout/LandingNavbar";
import Footer from "../components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const features = [
  {
    icon: HiOutlineDocumentText,
    title: "Smart Summaries",
    desc: "Turn dense PDFs, DOCX and TXT notes into clear, structured summaries in seconds.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Auto Flashcards",
    desc: "AI extracts key concepts and definitions into interactive, flippable flashcards.",
  },
  {
    icon: HiOutlineClipboardDocumentCheck,
    title: "Practice Quizzes",
    desc: "Generate exam-style MCQs with explanations and track your score over time.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "AI Study Chat",
    desc: "Ask questions about your own notes and get instant, contextual answers.",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "Study Planner",
    desc: "Set goals, deadlines and priorities, and track completion with a calendar view.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Progress Analytics",
    desc: "Visualize study hours, quiz performance and streaks on a live dashboard.",
  },
];

const steps = [
  { number: "01", title: "Upload your notes", desc: "Drag and drop PDFs, Word docs, or plain text files." },
  { number: "02", title: "AI processes instantly", desc: "We extract the text and generate summaries, flashcards and quizzes." },
  { number: "03", title: "Study smarter", desc: "Review, chat with your notes, and track your progress over time." },
];

const stats = [
  { value: "50K+", label: "Notes Processed" },
  { value: "12K+", label: "Active Students" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "3.2x", label: "Faster Revision" },
];

const testimonials = [
  { name: "Ananya R.", role: "Computer Science Student", text: "The flashcards and quiz generator cut my revision time in half. It genuinely feels like having a tutor." },
  { name: "Daniel K.", role: "Pre-Med Student", text: "Uploading lecture notes and instantly getting a clean summary is a game changer before exams." },
  { name: "Priya S.", role: "MBA Candidate", text: "The AI chat lets me ask follow-up questions on my own case studies — it's like office hours on demand." },
];

const faqs = [
  { q: "What file types can I upload?", a: "You can upload PDF, DOCX, and TXT files. We extract the text automatically and prepare it for AI processing." },
  { q: "Is my study data private?", a: "Yes. Your notes and generated content are tied to your account and protected behind authenticated APIs." },
  { q: "Do I need to pay to try it?", a: "You can create a free account and start uploading notes right away — no credit card required." },
  { q: "Which AI model powers the summaries?", a: "StudyAI uses the Grok API to generate summaries, flashcards, quizzes and chat responses from your notes." },
];

const FaqItem = ({ q, a }) => {
  const [openState, setOpenState] = useState(false);
  return (
    <div className="card p-5">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpenState((p) => !p)}
      >
        <span className="font-medium">{q}</span>
        <HiChevronDown
          className={`shrink-0 transition-transform duration-300 ${openState ? "rotate-180" : ""}`}
        />
      </button>
      {openState && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 text-sm text-gray-500"
        >
          {a}
        </motion.p>
      )}
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 pt-16 pb-24 md:flex-row md:pt-24">
        <div className="absolute -top-20 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex-1 text-center md:text-left"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            ✨ Powered by AI
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Learn Smarter{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-gray-500 md:mx-0">
            Upload notes, generate summaries, flashcards, quizzes and improve
            learning with AI.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link to="/register" className="btn-primary text-base">
              Get Started <HiArrowRight />
            </Link>
            <Link to="/login" className="btn-secondary text-base">
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex-1"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="card mx-auto max-w-md p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-primary-200 to-primary-100 dark:from-primary-900 dark:to-primary-800" />
              <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="h-3 w-5/6 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl bg-secondary-50 dark:bg-secondary-900/30" />
                <div className="h-20 rounded-xl bg-primary-50 dark:bg-primary-900/30" />
              </div>
              <div className="h-3 w-2/3 rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 -top-6 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-lg dark:bg-gray-900"
          >
            <HiOutlineLightBulb className="text-secondary-500" size={22} />
            <span className="text-xs font-semibold">Flashcards ready!</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <p className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-3xl font-extrabold text-transparent">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to study smarter</h2>
          <p className="mt-3 text-gray-500">One workspace for your notes, summaries, flashcards, quizzes and progress.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="card group p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white transition-transform duration-300 group-hover:scale-110">
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-24 dark:bg-gray-900/40">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-3 text-gray-500">From upload to mastery in three simple steps.</p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.number}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-5xl font-extrabold text-gray-100 dark:text-gray-800">{s.number}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Loved by students</h2>
          <p className="mt-3 text-gray-500">Real feedback from learners using StudyAI every day.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">“{t.text}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-24 dark:bg-gray-900/40">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
          </motion.div>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-16 text-center text-white"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Start learning smarter today</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Join thousands of students turning their notes into knowledge with AI.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 transition-transform hover:-translate-y-0.5"
          >
            Get Started Free <HiArrowRight />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
