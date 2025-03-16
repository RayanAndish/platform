import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Select, Typography, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { web3Service } from '../../services/web3.service';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Project {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  riskScore: number;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  aiAnalysis: {
    riskLevel: 'low' | 'medium' | 'high';
    confidenceScore: number;
    keyFindings: string[];
  };
  imageUrl: string;
}

export const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async (projectId: string) => {
    try {
      const address = await web3Service.getAddress();
      // TODO: Implement investment logic
      console.log(`Investing in project ${projectId} from address ${address}`);
    } catch (error) {
      console.error('Error investing in project:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || project.aiAnalysis.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="projects-page">
      <Title level={2}>{t('projects.title')}</Title>

      <div className="filters-container">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder={t('projects.searchPlaceholder')}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={value => setStatusFilter(value)}
            >
              <Option value="all">{t('projects.filter.allStatuses')}</Option>
              <Option value="active">{t('projects.filter.active')}</Option>
              <Option value="completed">{t('projects.filter.completed')}</Option>
              <Option value="upcoming">{t('projects.filter.upcoming')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={value => setRiskFilter(value)}
            >
              <Option value="all">{t('projects.filter.allRisks')}</Option>
              <Option value="low">{t('projects.filter.lowRisk')}</Option>
              <Option value="medium">{t('projects.filter.mediumRisk')}</Option>
              <Option value="high">{t('projects.filter.highRisk')}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]} className="projects-grid">
        {filteredProjects.map(project => (
          <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
            <ProjectCard project={project} onInvest={handleInvest} />
          </Col>
        ))}
      </Row>
    </div>
  );
};