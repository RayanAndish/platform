// src/components/DefineProject/DefineProject.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DefineProjectContainer,
  StepIndicator,
  Step,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  AddLinkButton,
  Button,
  GraphicalAbstractSection,
  GraphicalAbstractLabel,
  GraphicalAbstractInput,
  ProjectLinkSection,
  LinkInput,
  AddLinkIcon,
  StyledIcon,
  ProgressBar,
  TimelineSection,
  TimelineItem,
  TimelineInput,
  BudgetSection,
  BudgetItem,
  BudgetItemInput,
  BudgetItemDetails,
  FundraisingMethodsSection,
  MethodOption,
  TeamMemberInput,
  TeamMemberSection,
  ServiceFeeSection,
  SupplementaryDocumentSection,
  ErrorText } from './Styles/DefineProject.styles';
import Header from '../HomePage/Header.tsx';
import NewsletterSection from '../HomePage/NewsletterSection.tsx';
import Footer from '../HomePage/Footer.tsx';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import {  FaCalendarAlt, FaDollarSign, FaFileAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup
import { format } from 'date-fns';

const DefineProject: React.FC = () => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        projectTitle: Yup.string().required(t('projectTitleRequired')),
        category: Yup.string().required(t('categoryRequired')),
        keywords: Yup.string().required(t('keywordsRequired')),
        // Add more validations as needed (e.g., for projectLinks, projectSummary, etc.)
    });

    const formik = useFormik({
        initialValues: {
            projectTitle: '',
            category: '',
            keywords: '',
            projectLinks: [''],
            graphicalAbstract: null,
            projectSummary: '',
            projectTimeline: [
                { phase: '', startDate: '', endDate: '', budget: '' },
            ],
            budgetAllocation: [
                { category: '', details: '', amount: '' },
            ],
            fundraisingMethod: 'crowdfunding',
            minimumOffer: 1,
            expirationDate: '',
            serviceFee: 4,
            supplementaryDocument: null,
            teamMembers: [{ email: '', invited: false, approved: false }],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            alert('Form submitted successfully!'); // Replace with your actual submission logic
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('graphicalAbstract', e.target.files?.[0]);
    };

    const addLink = () => {
        formik.setFieldValue('projectLinks', [...formik.values.projectLinks, '']);
    };

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...formik.values.projectLinks];
        newLinks[index] = value;
        formik.setFieldValue('projectLinks', newLinks);
    };

    const addTimelineItem = () => {
        formik.setFieldValue('projectTimeline', [...formik.values.projectTimeline, { phase: '', startDate: '', endDate: '', budget: '' }]);
    };

    const handleTimelineChange = (index: number, field: string, value: string) => {
        const newTimeline = [...formik.values.projectTimeline];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        formik.setFieldValue('projectTimeline', newTimeline);
    };

    const deleteTimelineItem = (index: number) => {
        const newTimeline = [...formik.values.projectTimeline];
        newTimeline.splice(index, 1);
        formik.setFieldValue('projectTimeline', newTimeline);
    };

    const addBudgetItem = () => {
        formik.setFieldValue('budgetAllocation', [...formik.values.budgetAllocation, { category: '', details: '', amount: '' }]);
    };

    const handleBudgetItemChange = (index: number, field: string, value: string) => {
        const newBudget = [...formik.values.budgetAllocation];
        newBudget[index] = { ...newBudget[index], [field]: value };
        formik.setFieldValue('budgetAllocation', newBudget);
    };

    const deleteBudgetItem = (index: number) => {
        const newBudget = [...formik.values.budgetAllocation];
        newBudget.splice(index, 1);
        formik.setFieldValue('budgetAllocation', newBudget);
    };

    const handleFundraisingMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('fundraisingMethod', e.target.value);
    };

    const handleTeamMemberChange = (index: number, value: string) => {
        const newTeamMembers = [...formik.values.teamMembers];
        newTeamMembers[index] = { ...newTeamMembers[index], email: value, invited: false, approved: false };
        formik.setFieldValue('teamMembers', newTeamMembers);
    };

    const addTeamMember = () => {
        formik.setFieldValue('teamMembers', [...formik.values.teamMembers, { email: '', invited: false, approved: false }]);
    };

    const deleteTeamMember = (index: number) => {
        const newTeamMembers = [...formik.values.teamMembers];
        newTeamMembers.splice(index, 1);
        formik.setFieldValue('teamMembers', newTeamMembers);
    };

    const goToNextStep = () => {
      // Validation before moving to the next step
      if (activeStep === 1 && !formik.values.projectTitle) {
        // Handle validation error, e.g., show an error message
        alert(t('projectTitleRequired'));
        return;
      }
      setActiveStep(prevStep => Math.min(prevStep + 1, 3));
    };

    const goToPrevStep = () => {
      setActiveStep(prevStep => Math.max(prevStep - 1, 1));
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
              return (
                <>
                  <FormGroup>
                    <Label htmlFor="projectTitle">{t('projectTitle')}</Label>
                    <Input
                      type="text"
                      id="projectTitle"
                      name="projectTitle"
                      {...formik.getFieldProps('projectTitle')}
                      placeholder={t('projectTitlePlaceholder')}
                    />
                    {formik.touched.projectTitle && formik.errors.projectTitle && (
                        <ErrorText>{formik.errors.projectTitle}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="category">{t('category')}</Label>
                    <Select
                      id="category"
                      name="category"
                      {...formik.getFieldProps('category')}
                    >
                      <option value="">{t('selectCategory')}</option>
                      {/* Add category options here (from a list or API) */}
                      <option value="biotechnology">Biotechnology</option>
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <ErrorText>{formik.errors.category}</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="keywords">{t('keyword')}</Label>
                    <Input
                      type="text"
                      id="keywords"
                      name="keywords"
                      {...formik.getFieldProps('keywords')}
                      placeholder={t('keywordPlaceholder')}
                    />
                    {formik.touched.keywords && formik.errors.keywords && (
                        <ErrorText>{formik.errors.keywords}</ErrorText>
                    )}
                  </FormGroup>

                  <ProjectLinkSection>
                    <Label>{t('projectLink')}</Label>
                    {formik.values.projectLinks.map((link, index) => (
                        <FormGroup key={index}>
                            <Input
                                type="text"
                                placeholder={t('projectLinkPlaceholder')}
                                value={link}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                            />
                        </FormGroup>
                    ))}
                    <AddLinkButton onClick={addLink}>
                        <StyledIcon as={FaPlus} /> {t('addNewLink')}
                    </AddLinkButton>
                  </ProjectLinkSection>

                  <FormGroup>
                    <Label htmlFor="projectSummary">{t('projectSummary')}</Label>
                    <TextArea
                      id="projectSummary"
                      name="projectSummary"
                      {...formik.getFieldProps('projectSummary')}
                      rows={5}
                      placeholder={t('projectSummaryPlaceholder')}
                    />
                  </FormGroup>

                  <GraphicalAbstractSection>
                    <Label>{t('addGraphicalAbstract')}</Label>
                    <GraphicalAbstractLabel htmlFor="graphicalAbstract">
                      {t('graphicalAbstractLabel')}
                      <GraphicalAbstractInput
                          type="file"
                          id="graphicalAbstract"
                          name="graphicalAbstract"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.gif,.pdf"
                      />
                    </GraphicalAbstractLabel>
                  </GraphicalAbstractSection>
                </>
              );
            case 2:
              return (
                <>
                  <TimelineSection>
                    <Label>{t('projectTimeline')}</Label>
                    {formik.values.projectTimeline.map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineInput
                                type="text"
                                placeholder={t('phase')}
                                value={item.phase}
                                onChange={(e) => handleTimelineChange(index, 'phase', e.target.value)}
                            />
                            <TimelineInput
                                type="date"
                                placeholder={t('startDate')}
                                value={item.startDate}
                                onChange={(e) => handleTimelineChange(index, 'startDate', e.target.value)}
                            />
                            <TimelineInput
                                type="date"
                                placeholder={t('endDate')}
                                value={item.endDate}
                                onChange={(e) => handleTimelineChange(index, 'endDate', e.target.value)}
                            />
                            <TimelineInput
                                type="number"
                                placeholder={t('budget')}
                                value={item.budget}
                                onChange={(e) => handleTimelineChange(index, 'budget', e.target.value)}
                            />
                            <StyledIcon as={FaTrashAlt} onClick={() => deleteTimelineItem(index)} style={{marginLeft: '10px', color: 'red', cursor: 'pointer'}} />
                        </TimelineItem>
                    ))}
                    <Button secondary onClick={addTimelineItem} style={{ marginTop: '10px' }}>
                        {t('addTimeline')}
                    </Button>
                  </TimelineSection>

                  <BudgetSection>
                    <Label>{t('budgetAllocation')}</Label>
                    {formik.values.budgetAllocation.map((item, index) => (
                        <BudgetItem key={index}>
                            <BudgetItemInput
                                type="text"
                                placeholder={t('category')}
                                value={item.category}
                                onChange={(e) => handleBudgetItemChange(index, 'category', e.target.value)}
                            />
                            <BudgetItemDetails>
                                {/* Add more budget details inputs here, e.g., for details and amount */}
                                <BudgetItemInput
                                    type="text"
                                    placeholder={t('details')}
                                    value={item.details}
                                    onChange={(e) => handleBudgetItemChange(index, 'details', e.target.value)}
                                />
                                <BudgetItemInput
                                    type="number"
                                    placeholder={t('amount')}
                                    value={item.amount}
                                    onChange={(e) => handleBudgetItemChange(index, 'amount', e.target.value)}
                                />
                            </BudgetItemDetails>
                            <StyledIcon as={FaTrashAlt} onClick={() => deleteBudgetItem(index)} style={{marginLeft: '10px', color: 'red', cursor: 'pointer'}} />
                        </BudgetItem>
                    ))}
                    <Button secondary onClick={addBudgetItem} style={{ marginTop: '10px' }}>
                        {t('addCategory')}
                    </Button>
                  </BudgetSection>
                </>
              );
            case 3:
              return (
                <>
                  <FundraisingMethodsSection>
                    <Label>{t('fundraisingMethods')}</Label>
                    <MethodOption>
                      <input
                        type="radio"
                        id="crowdfunding"
                        name="fundraisingMethod"
                        value="crowdfunding"
                        checked={formik.values.fundraisingMethod === 'crowdfunding'}
                        onChange={handleFundraisingMethodChange}
                      />
                      <label htmlFor="crowdfunding">{t('crowdfunding')}</label>
                    </MethodOption>
                    <MethodOption>
                      <input
                        type="radio"
                        id="fundraisingAuction"
                        name="fundraisingMethod"
                        value="fundraisingAuction"
                        checked={formik.values.fundraisingMethod === 'fundraisingAuction'}
                        onChange={handleFundraisingMethodChange}
                      />
                      <label htmlFor="fundraisingAuction">{t('fundraisingAuction')}</label>
                    </MethodOption>
                  </FundraisingMethodsSection>

                  {/* Minimum offer and Expiration Date */}
                  <FormGroup>
                      <Label htmlFor="minimumOffer">{t('minimumOffer')}</Label>
                      <Input
                          type="number"
                          id="minimumOffer"
                          name="minimumOffer"
                          {...formik.getFieldProps('minimumOffer')}
                      />
                  </FormGroup>

                  <FormGroup>
                      <Label htmlFor="expirationDate">{t('expirationDate')}</Label>
                      <Input
                          type="date"
                          id="expirationDate"
                          name="expirationDate"
                          {...formik.getFieldProps('expirationDate')}
                      />
                  </FormGroup>

                  {/* Service Fee */}
                  <ServiceFeeSection>
                      <Label>{t('serviceFee')}</Label>
                      <span>{formik.values.serviceFee}%</span>
                  </ServiceFeeSection>

                  {/* Supplementary Document */}
                  <SupplementaryDocumentSection>
                      <Label htmlFor="supplementaryDocument">{t('supplementaryDocument')}</Label>
                      <GraphicalAbstractLabel htmlFor="supplementaryDocument">
                          {t('attachSupplementaryDocument')} (PDF file up to 2 MB)
                          <GraphicalAbstractInput
                              type="file"
                              id="supplementaryDocument"
                              name="supplementaryDocument"
                              onChange={handleFileChange}
                              accept=".pdf"
                          />
                      </GraphicalAbstractLabel>
                  </SupplementaryDocumentSection>

                  {/* Team Members */}
                  <TeamMemberSection>
                    <Label>{t('addMembersToYourTeam')}</Label>
                    {formik.values.teamMembers.map((member, index) => (
                      <TeamMemberInput key={index}>
                          <Input
                              type="email"
                              placeholder={t('inviteTeamMember')}
                              value={member.email}
                              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                          />
                          {/* Add a button or indicator to show invite status */}
                          <StyledIcon as={FaTrashAlt} onClick={() => deleteTeamMember(index)} style={{marginLeft: '10px', color: 'red', cursor: 'pointer'}} />
                      </TeamMemberInput>
                    ))}
                    <Button secondary onClick={addTeamMember}>
                      {t('addMember')}
                    </Button>
                  </TeamMemberSection>
                </>
              );
            default:
              return null;
        }
    };

    const totalSteps = 3;
    const progress = (activeStep - 1) * (100 / (totalSteps - 1));

    return (
      <>
        <Header />
        <DefineProjectContainer>
          <StepIndicator>
            <Step active={activeStep === 1}>1 {t('basicInfo')}</Step>
            <Step active={activeStep === 2}>2 {t('timelineBudget')}</Step>
            <Step active={activeStep === 3}>3 {t('methods')}</Step>
          </StepIndicator>
          <ProgressBar progress={progress} />
          <Form onSubmit={formik.handleSubmit}> {/* Add onSubmit to the Form */}
            {renderStepContent()}
            <div>
              {activeStep > 1 && (
                <Button secondary onClick={goToPrevStep}>
                  {t('prevStep')}
                </Button>
              )}
              {activeStep < 3 && (
                <Button primary onClick={goToNextStep}>
                  {t('nextStep')}
                </Button>
              )}
              {activeStep === 3 && (
                <>
                  <Button secondary type="submit"> {t('saveDraft')}</Button>  {/* Change secondary to type="submit" */}
                  <Button primary > {t('preview')}</Button>
                </>
              )}
            </div>
          </Form>
        </DefineProjectContainer>
        <NewsletterSection />
        <Footer />
      </>
    );
};

export default DefineProject ;