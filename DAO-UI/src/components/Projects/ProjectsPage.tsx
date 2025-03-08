import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "styles/pages/ProjectsPage.module.css";

const fetchProjects = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
  return data;
};

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useQuery("projects", fetchProjects);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects =
    data?.filter((project: any) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading)
    return (
      <div className="text-center py-10">
        <p>{t("projects.loading")}</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10">
        <p>{t("projects.error")}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("projects.title")}</h1>
      <input
        type="text"
        placeholder={t("projects.searchPlaceholder")}
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: any) => (
          <div key={project.id} className={styles.projectCard}>
            <h2 className={styles.projectTitle}>{project.name}</h2>
            <p className={styles.projectInfo}>
              {t("projects.budget")}: {project.budget} USD
            </p>
            <p className={styles.projectInfo}>
              {t("projects.progress")}: {project.progress}%
            </p>
            <p className={styles.projectInfo}>
              {t("projects.status")}: {project.status}
            </p>
            <a href={`/projects/${project.id}`} className={styles.projectLink}>
              {t("projects.viewDetails")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;