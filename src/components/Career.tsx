import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Full Stack Intern</h4>
                <h5>EduSkills Academy</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed a 10-week internship focused on Java Full Stack Development.
              Engineered web applications with HTML, CSS, Bootstrap, JavaScript, and
              Core Java, gaining valuable industry exposure to Spring Framework, Spring
              Boot, Hibernate, MySQL, and Git.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE</h4>
                <h5>Axis Institute Of Technology and Management , Kanpur</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Undergraduate in Computer Science & Engineering (CGPA: 7.46). Focused on
              Data Structures, Algorithms, DBMS, and OOP. Awarded Certificate of
              Appreciation for Gandhigiri 2024/2025 and won Kabaddi & Cricket championships
              at Infinito Sports Meet 2025.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Foundations Associate</h4>
                <h5>Oracle Cloud Infrastructure</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Earned official certification from Oracle Corporation validating foundational
              cloud infrastructure expertise, AI/ML concepts, and generative AI solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior & Higher Secondary</h4>
                <h5>J.S.D Inter College, Kuthond</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed Senior Secondary (UP Board, 2023) with 78% and Higher
              Secondary (UP Board, 2021) with 86%, demonstrating academic excellence in
              Mathematics and Sciences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
