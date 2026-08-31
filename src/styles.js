/**
 * LEGACY MIGRATION MODULE (temporary)
 *
 * Owns the raw class strings that pre-token legacy sections still depend on.
 * This is the only place these legacy decisions may live. As each section is
 * redesigned onto the semantic foundation (tokens + `@layer components` states
 * in src/index.css), delete the entry here and the `import { styles }` from
 * that section. When every consumer below is gone, delete this file entirely.
 *
 * Consumers (as of the semantic refactor):
 *   - src/hoc/SectionWrapper.jsx        (styles.padding)
 *   - src/components/Works.jsx          (sectionSubText / sectionHeadText)
 *   - src/components/GitHubStats.jsx    (sectionSubText / sectionHeadText)
 *   - src/components/SectionFallback.jsx (padding)
 *   - src/components/Contact.jsx        (sectionSubText / sectionHeadText)
 */
const styles = {
  paddingX: "sm:px-16 px-4",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-4 sm:py-16 py-8",

  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[32px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[14px] lg:leading-[40px]",

  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[28px]",
  sectionSubText:
    "sm:text-[18px] text-[12px] text-secondary uppercase tracking-wider",
};

export { styles };
