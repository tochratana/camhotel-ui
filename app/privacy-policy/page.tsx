import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-8 pb-20 pt-28 text-foreground">
      <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900/75">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1f3b93] dark:text-blue-300">
          CamHotel Policy
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: April 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p className="mt-2 leading-relaxed">
              We collect account information such as full name, email address,
              and authentication-related data when you create an account or use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 leading-relaxed">
              Your information is used to manage accounts, process bookings,
              improve platform reliability, and provide customer support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Data Protection
            </h2>
            <p className="mt-2 leading-relaxed">
              We apply security controls to protect your data and limit access
              to authorized personnel only. We do not sell personal data to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Your Rights
            </h2>
            <p className="mt-2 leading-relaxed">
              You may request updates or correction of account information at
              any time through support channels.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Contact
            </h2>
            <p className="mt-2 leading-relaxed">
              For privacy concerns, please contact us at{" "}
              <a
                href="mailto:stay@camhotel.com"
                className="font-semibold text-[#1f3b93] underline underline-offset-2 dark:text-blue-300"
              >
                stay@camhotel.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link
            href="/register"
            className="inline-flex items-center rounded-lg bg-[#1f3b93] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#18317b] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Back to Register
          </Link>
        </div>
      </section>
    </main>
  );
}
