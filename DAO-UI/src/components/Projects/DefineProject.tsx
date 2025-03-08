import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "styles/pages/DefineProject.module.css";

const DefineProject: React.FC = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      budget: "",
      duration: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("defineProject.validation.name")),
      description: Yup.string().required(t("defineProject.validation.description")),
      budget: Yup.number()
        .required(t("defineProject.validation.budget"))
        .positive(t("defineProject.validation.budgetPositive")),
      duration: Yup.number()
        .required(t("defineProject.validation.duration"))
        .positive(t("defineProject.validation.durationPositive")),
      category: Yup.string().required(t("defineProject.validation.category")),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/projects`, values);
        alert(t("defineProject.success"));
      } catch (error) {
        console.error(error);
        alert(t("defineProject.error"));
      }
    },
  });

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t("defineProject.title")}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="name" className={styles.formLabel}>
            {t("defineProject.fields.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`${styles.formInput} ${
              formik.touched.name && formik.errors.name ? styles.errorInput : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorMessage}>{formik.errors.name}</p>
          )}
        </div>

        {/* سایر فیلدها به همین شکل */}
      </form>
    </div>
  );
};

export default DefineProject;