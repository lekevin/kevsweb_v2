const Experience = () => {
  return (
    <>
      <div className="flex flex-row pb-4 items-end gap-1 sm:gap-2">
        <div className="text-3xl font-medium">
          Experience<span className="text-white font-semibold">.</span>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-light text-red-600 text-base whitespace-nowrap hover:scale-95 duration-300"
        >
          (view cv)
        </a>
      </div>
      <div className="space-y-10 mx-auto sm:border-l sm:border-zinc-700 sm:pl-6">
        {[
          {
            company: "Veeva Systems",
            href: "https://www.veeva.com",
            role: "Quality Engineer",
            date: "May’23 - Present",
            desc: "Automate UI and backend tests across Vault Platform, building reusable frameworks for mobile and web. Integrated LambdaTest into GitLab CI/CD for mobile automation at scale.",
          },
          {
            company: "Textron Aviation",
            href: "https://www.txtav.com",
            role: "Software Engineering Intern",
            date: "May’22 - Aug’22",
            desc: "Built CI/CD pipelines in Azure and automated build tasks using self-hosted Linux agents. Migrated version control from SVN to Git and streamlined developer workflows in Linux CLI.",
          },
          {
            company: "Ennovar",
            href: "https://www.wichita.edu/industry_and_defense/ennovar/index.php",
            role: "Software Developer + System Admin",
            date: "July’21 - Dec’22",
            desc: "Created digital workers to scrape, automate, and visualize data. Maintained and extended Salesforce CRM with Apex, SOQL, and custom automations.",
          },
          {
            company: "Ennovar",
            href: "https://www.wichita.edu/industry_and_defense/ennovar/index.php",
            role: "IT Support",
            date: "July’19 - July’21",
            desc: "Enterprise IT support for 33,000+ users including system refreshes, bug fixes, software installations, and VB script automation for internal tools.",
          },
        ].map((job, index) => (
          <div key={index} className="relative sm:pl-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between whitespace-nowrap">
              <a
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xl opacity-80 pb-1 hover:text-red-500 transition-colors"
              >
                {job.company}
              </a>
              <div className="opacity-35">{job.date}</div>
            </div>
            <div className="text-red-600 font-normal mb-1">{job.role}</div>
            <p className="font-normal mb-2 opacity-35">{job.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Experience;
