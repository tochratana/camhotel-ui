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
      "Sokha mentors our roadmap and keeps each feature connected to real business outcomes.",
    quote:
      "A product is not complete when it ships. It is complete when users trust it naturally.",
    strengths: ["Roadmap Coaching", "Product Strategy", "Team Direction"],
    image: "/mt-mb/mt_chhaya.webp",
  },
  {
    name: "Mom Reksmey",
    role: "Frontend",
    intro:
      "Dara supports architecture decisions and helps the team turn complex problems into maintainable systems.",
    quote:
      "Clean structure is kindness to your future team. Build it once, scale it calmly.",
    strengths: ["Architecture", "Code Quality", "Performance"],
    image: "/mt-mb/mt-reksmey.jpg",
  },
  {
    name: "Kit Tara",
    role: "Database",
    intro:
      "Piseth guides experience design so each flow feels clear, trustworthy, and premium.",
    quote:
      "When design is right, users do not notice the UI. They notice their confidence.",
    strengths: ["UX Guidance", "Design Systems", "Brand Consistency"],
    image: "/mt-mb/mt_tara.jpg",
  },
];

const members: TeamProfile[] = [
  {
    name: "Keo Menglong",
    role: "Fullsatck",
    intro:
      "Nita builds user-facing pages with strong responsiveness and smooth interaction details.",
    quote:
      "Polish is not decoration. It is clarity delivered at the right moment.",
    strengths: ["UI Development", "Responsive UX"],
    image: "/mt-mb/mb_menglong.jpg",
  },
  {
    name: "Vichea P.",
    role: "Backend Member",
    intro:
      "Vichea works on secure APIs and reliable data flow for authentication and core operations.",
    quote:
      "Reliability is invisible when it works, but unforgettable when it fails.",
    strengths: ["API Delivery", "Security"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Sreyleak T.",
    role: "QA Member",
    intro:
      "Sreyleak ensures releases stay stable by catching regressions early and validating edge cases.",
    quote:
      "Quality is a habit. We protect users by questioning every assumption.",
    strengths: ["Manual Testing", "Regression Checks"],
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
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
    <article className="grid grid-cols-1 items-center gap-8 border-t border-slate-200 py-10 first:border-t-0 dark:border-slate-700 md:grid-cols-12">
      <div className={`relative md:col-span-4 ${imageOrderClass}`}>
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#8bb6ff]/45 to-[#ffe5bd]/40 blur-xl dark:from-blue-900/45 dark:to-cyan-900/40" />
        <div className="relative overflow-hidden rounded-2xl border border-white/50 shadow-lg shadow-[#12367e]/20 dark:border-slate-700/60">
          <Image
            src={profile.image}
            alt={profile.name}
            width={640}
            height={760}
            className="h-72 w-full object-cover md:h-80"
            unoptimized
          />
        </div>
      </div>

      <div className={`space-y-4 md:col-span-8 ${textOrderClass}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3a5fae] dark:text-blue-300">
          {typeLabel}
        </p>
        <h3
          className="text-3xl font-bold text-[#102d74] dark:text-blue-200"
          style={{ fontFamily: '"Merriweather", Georgia, serif' }}
        >
          {profile.name}
        </h3>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4467b4] dark:text-blue-400">
          {profile.role}
        </p>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {profile.intro}
        </p>

        <blockquote className="rounded-r-2xl border-l-4 border-[#1f4fb3] bg-[#ecf3ff]/75 px-5 py-4 text-sm italic leading-relaxed text-[#1c3f87] dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200">
          <Quote className="mb-2 h-4 w-4" />
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
    <main
      className="relative min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-900 dark:bg-[#070f22] dark:text-slate-100"
      style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#96bcff]/40 blur-3xl dark:bg-blue-900/35" />
        <div className="absolute right-0 top-0 h-[26rem] w-[26rem] rounded-full bg-[#ffddb0]/45 blur-3xl dark:bg-cyan-900/30" />
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-[#c4d6ff]/40 blur-3xl dark:bg-indigo-900/30" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-14 pt-24 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f63b3] dark:text-blue-300">
          About CamHotel Team
        </p>
        <h1
          className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#0f2f76] md:text-6xl dark:text-blue-100"
          style={{ fontFamily: '"Merriweather", Georgia, serif' }}
        >
          Mission-led team, mentor-guided growth, member-driven execution.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
          We build hotel technology that feels reliable for operators and
          effortless for guests. Every sprint combines mentorship, ownership,
          and practical delivery.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl border-y border-slate-200 px-6 py-14 dark:border-slate-700 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <article className="space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3659a9] dark:text-blue-300">
              <Compass className="h-4 w-4" />
              Mission
            </p>
            <h2
              className="text-3xl font-bold text-[#102f77] dark:text-blue-200"
              style={{ fontFamily: '"Merriweather", Georgia, serif' }}
            >
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
            <h2
              className="text-3xl font-bold text-[#102f77] dark:text-blue-200"
              style={{ fontFamily: '"Merriweather", Georgia, serif' }}
            >
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

      <section className="relative mx-auto max-w-6xl px-6 py-14 md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <UserRound className="h-5 w-5 text-[#3558aa] dark:text-blue-300" />
          <h2
            className="text-3xl font-bold text-[#102f77] dark:text-blue-200"
            style={{ fontFamily: '"Merriweather", Georgia, serif' }}
          >
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

      <section className="relative mx-auto max-w-6xl border-t border-slate-200 px-6 py-14 dark:border-slate-700 md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <UsersRound className="h-5 w-5 text-[#3558aa] dark:text-blue-300" />
          <h2
            className="text-3xl font-bold text-[#102f77] dark:text-blue-200"
            style={{ fontFamily: '"Merriweather", Georgia, serif' }}
          >
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
