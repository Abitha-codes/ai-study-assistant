import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

/**
 * This screen is shown only for features not yet implemented in the
 * current build phase (see project roadmap). It is intentionally explicit
 * about status rather than faking data, per the "no placeholder content"
 * requirement — nothing here claims to be a working feature.
 */
const ComingSoon = ({ title, phase }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-800">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-800">
      <HiOutlineWrenchScrewdriver size={26} />
    </div>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-2 max-w-sm text-sm text-gray-500">
      This feature is being built in {phase} of the project roadmap and will connect to a
      real backend API — it isn&apos;t live yet.
    </p>
  </div>
);

export default ComingSoon;
