import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Eye,
  Quote,
  UserRound,
  UsersRound,
} from "lucide-react";

type TeamProfile = {
  name: string;
  role: string;
  intro: string;
  quote: string;
  strengths: string[];
  image: string;
};

const mentors: TeamProfile[] = [
  {
    name: "Chan Chhaya",
    role: "Backend",
    intro:
      "Chhaya mentors backend development and ensures our systems are scalable, secure, and reliable.",
    quote:
      "A strong backend is invisible to users, but essential to everything they experience.",
    strengths: ["API Design", "System Architecture", "Scalability"],
    image: "/mt-mb/mt_chhaya.jpg",
  },
  {
    name: "Mom Reksmey",
    role: "Frontend",
    intro:
      "Reksmey guides frontend development and helps the team build clean, responsive, and user-friendly interfaces.",
    quote:
      "Great UI is not just seen—it is felt through smooth and intuitive interactions.",
    strengths: [
      "UI Development",
      "Responsive Design",
      "Performance Optimization",
    ],
    image: "/mt-mb/mt_reksmey.jpg",
  },
  {
    name: "Kit Tara",
    role: "Database",
    intro:
      "Tara ensures our data is well-structured, efficient, and secure across all systems.",
    quote: "Good data design is the foundation of every reliable application.",
    strengths: ["Database Design", "Data Modeling", "Query Optimization"],
    image: "/mt-mb/mt_tara.jpg",
  },
];

const members: TeamProfile[] = [
  {
    name: "Keo Menglong",
    role: "Fullstack",
    intro:
      "Menglong builds user-facing pages with strong responsiveness and smooth interaction details. Build some backend endpoint.",
    quote:
      "Don't said I'm busy, we still have free time. So, let's do your best!",
    strengths: ["UI Development", "Responsive", "Backend"],
    image: "/mt-mb/mb_menglong.png",
  },
  {
    name: "Bo Vibol",
    role: "UI Member",
    intro: "Vibol works on UI and test the project",
    quote:
      "Reliability is invisible when it works, but unforgettable when it fails.",
    strengths: ["UI Development", "Testing"],
    image: "/mt-mb/mb_vibol.jpg",
  },
  {
    name: "Saroeun Sothearith",
    role: "UI Member",
    intro: "Sothearith works on UI and test the project",
    quote:
      "Quality is a habit. We protect users by questioning every assumption.",
    strengths: ["UI Development", "Testing"],
    image: "/mt-mb/mb_sothearith.png",
  },
  {
    name: "Toch Ratana",
    role: "fullstack",
    intro: "Ratana manages deployments and Backend for application.",
    quote: "Responsibliry",
    strengths: ["Deployments", "Backend"],
    image: "/mt-mb/mb_ratana.jpg",
  },
];

function StoryRow({
  profile,
  reverse = false,
  type,
}: {
  profile: TeamProfile;
  reverse?: boolean;
  type: "mentor" | "member";
}) {
  const imageOrderClass = reverse ? "md:order-2" : "";
  const textOrderClass = reverse ? "md:order-1" : "";
  const typeLabel = type === "mentor" ? "Mentor" : "Member";

  return (
    <article className="grid grid-cols-1 items-start gap-6 border-t border-slate-200 py-8 first:border-t-0 dark:border-slate-700 md:grid-cols-12">
      <div className={`relative md:col-span-3 ${imageOrderClass}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-700/60 bg-slate-100 dark:bg-slate-800">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <div className={`space-y-3 md:col-span-9 ${textOrderClass}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3a5fae] dark:text-blue-300">
          {typeLabel}
        </p>
        <h3 className="text-xl font-bold text-[#102d74] dark:text-blue-200 font-sans">
          {profile.name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4467b4] dark:text-blue-400">
          {profile.role}
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {profile.intro}
        </p>

        <blockquote className="rounded-r-xl border-l-4 border-[#1f4fb3] bg-[#ecf3ff]/75 px-4 py-3 text-xs italic leading-relaxed text-[#1c3f87] dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200">
          <Quote className="mb-1 h-3 w-3" />
          {profile.quote}
        </blockquote>

        <div className="flex flex-wrap gap-2">
          {profile.strengths.map((strength) => (
            <span
              key={`${profile.name}-${strength}`}
              className="rounded-full border border-[#bfd2ff] bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#294d9f] dark:border-blue-900 dark:bg-blue-950/45 dark:text-blue-300"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-900 dark:bg-[#070f22] dark:text-slate-100 font-sans">
      <section className="relative mx-auto max-w-7xl px-8 py-22 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 fill-mode-both">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f63b3] dark:text-blue-300">
          About CamHotel Team
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#0f2f76] md:text-6xl dark:text-blue-100 font-sans">
          Mission-led team, mentor-guided growth, member-driven execution.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
          We build hotel technology that feels reliable for operators and
          effortless for guests. Every sprint combines mentorship, ownership,
          and practical delivery.
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl border-y border-slate-200 px-6 py-14 dark:border-slate-700 md:px-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <article className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3659a9] dark:text-blue-300">
              <Compass className="h-4 w-4" />
              Mission
            </p>
            <h2 className="text-3xl font-bold text-[#102f77] dark:text-blue-200 font-sans">
              Build dependable digital hospitality experiences.
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Our mission is to simplify hotel operations while preserving
              warmth in every customer interaction. We deliver tools that reduce
              friction and increase confidence for staff and guests.
            </p>
          </article>

          <article className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3659a9] dark:text-blue-300">
              <Eye className="h-4 w-4" />
              Vision
            </p>
            <h2 className="text-3xl font-bold text-[#102f77] dark:text-blue-200 font-sans">
              Become the trusted platform behind modern hotel workflows.
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              We see a future where every reservation, room status, and guest
              journey is connected in one calm system that teams can scale with
              confidence.
            </p>
          </article>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 md:px-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-both">
        <div className="mb-6 flex items-center gap-3">
          <UserRound className="h-5 w-5 text-[#3558aa] dark:text-blue-300" />
          <h2 className="text-3xl font-bold text-[#102f77] dark:text-blue-200 font-sans">
            Mentors
          </h2>
        </div>

        {mentors.map((mentor, index) => (
          <StoryRow
            key={mentor.name}
            profile={mentor}
            reverse={index % 2 === 1}
            type="mentor"
          />
        ))}
      </section>

      <section className="relative mx-auto max-w-7xl border-t border-slate-200 px-6 py-14 dark:border-slate-700 md:px-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-both">
        <div className="mb-6 flex items-center gap-3">
          <UsersRound className="h-5 w-5 text-[#3558aa] dark:text-blue-300" />
          <h2 className="text-3xl font-bold text-[#102f77] dark:text-blue-200 font-sans">
            Members
          </h2>
        </div>

        {members.map((member, index) => (
          <StoryRow
            key={member.name}
            profile={member}
            reverse={index % 2 === 1}
            type="member"
          />
        ))}

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#153a93] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102f77] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Connect With Our Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
