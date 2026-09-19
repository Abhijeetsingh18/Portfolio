import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward, MdLaunch } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Zamzam Mart E-Commerce Website",
    category: "Full Stack E-Commerce / Web",
    tools: "Java, Spring Boot, React, JavaScript, REST API, MySQL",
    description:
      "Full-stack grocery supermarket e-commerce platform with dynamic product catalogs, search, category filtering, cart management, and seamless responsive checkout.",
    link: "https://github.com/Abhijeetsingh18/zamzammart-E-commerce-website-.git",
    liveLink: "https://client-phi-umber-99.vercel.app/",
    image: "/images/project-zamzam.jpg",
  },
  {
    title: "Hospital Management System",
    category: "Desktop Application / Healthcare",
    tools: "Java, Swing, AWT, JDBC, MySQL",
    description:
      "Engineered a system to manage patient records, staff details, room allocation, and discharge processes with JDBC CRUD operations and an intuitive Swing interface.",
    link: "https://github.com/Abhijeetsingh18/Hospital_Management_System_Project.git",
    image: "/images/project-hospital.jpg",
  },
  {
    title: "Stock Trading Platform",
    category: "Console Application / FinTech",
    tools: "Java, OOP, File I/O, Persistence",
    description:
      "Developed a virtual stock portfolio platform featuring account management, real-time portfolio tracking, and file-based data persistence with clean OOP architecture.",
    link: "https://github.com/Abhijeetsingh18/CodeAlpha_StockTradingPlatform.git",
    image: "/images/project-stock.jpg",
  },
  {
    title: "Student Grade Tracker",
    category: "Desktop GUI / Academic Tools",
    tools: "Java, Swing, OOP, ArrayList",
    description:
      "Interactive GUI application to record student scores, dynamically calculate averages, highest, and lowest marks, and generate formatted academic summary reports.",
    link: "https://github.com/Abhijeetsingh18/CodeAlpha_Student_Grade_Tracker.git",
    image: "/images/project-grades.jpg",
  },
  {
    title: "Full Stack Java Application",
    category: "Full Stack Development / Web",
    tools: "Spring Boot, Hibernate, MySQL, JavaScript, Bootstrap",
    description:
      "End-to-end full stack web applications engineered during internship with Spring Framework, RESTful web services, Hibernate ORM, and responsive web design.",
    link: "https://github.com/Abhijeetsingh18",
    liveLink: "https://portfolio-two-dusky-35.vercel.app/",
    image: "/images/project-fullstack.jpg",
  },
];

const Work = () => {
  useGSAP(() => {
    if (window.innerWidth <= 1024) {
      return;
    }

    const workSection = document.querySelector(".work-section") as HTMLElement;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    if (!workSection || !workFlex) return;

    const getScrollAmount = () => {
      return Math.max(0, workFlex.scrollWidth - window.innerWidth + 120);
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    const refreshHandler = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refreshHandler);

    return () => {
      window.removeEventListener("resize", refreshHandler);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Technologies</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "12px", lineHeight: "1.5" }}>
                  {project.description}
                </p>
                <div className="project-links-group">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-github-link"
                    data-cursor="disable"
                  >
                    <FaGithub /> View Repository <MdArrowOutward />
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-live-link"
                      data-cursor="disable"
                    >
                      <MdLaunch /> Live Demo <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.liveLink || project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
