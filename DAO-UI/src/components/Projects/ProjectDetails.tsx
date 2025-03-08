import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "styles/pages/ProjectDetails.module.css";

const fetchProjectDetails = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/projects/${id}`
  );
  return data;
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useQuery(
    ["projectDetails", id],
    () => fetchProjectDetails(id!)
  );

  if (isLoading)
    return (
      <div className="text-center py-10">
        <p>{t("projectDetails.loading")}</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10">
        <p>{t("projectDetails.error")}</p>
      </div>
    );

  return (
    <div className={styles.projectDetailsContainer}>
      <h1 className={styles.projectTitle}>{data.name}</h1>
      <p className={styles.projectDescription}>{data.description}</p>
      <div className={styles.projectInfo}>
        <p>
          <strong>{t("projectDetails.budget")}:</strong> {data.budget} USD
        </p>
        <p>
          <strong>{t("projectDetails.progress")}:</strong> {data.progress}%
        </p>
        <p>
          <strong>{t("projectDetails.status")}:</strong> {data.status}
        </p>
      </div>
      <button className={styles.investButton}>
        {t("projectDetails.investButton")}
      </button>
    </div>
  );
};

export default ProjectDetails;