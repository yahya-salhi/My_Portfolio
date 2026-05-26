import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
    <div className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full xs:w-[320px] sm:w-[360px] transition-transform hover:scale-[1.02]">
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={`${name} project preview`}
          width={360}
          height={230}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <button
            type="button"
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border-0"
            aria-label={`View ${name} source code on GitHub`}
          >
            <img
              src={github}
              alt=""
              className="w-1/2 h-1/2 object-contain"
            />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[20px] sm:text-[24px]">
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[12px] sm:text-[14px]">
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p
            key={`${name}-${tag.name}`}
            className={`text-[12px] sm:text-[14px] ${tag.color}`}
          >
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  </motion.div>
);

const Works = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it.
        </motion.p>
      </div>

      <div className="mt-12 sm:mt-20 flex flex-wrap gap-4 sm:gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "work");
