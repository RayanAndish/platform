import React from 'react';
import { Card, Progress, Tag, Typography, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

interface ProjectCardProps {
  project: {
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
  };
  onInvest: (projectId: string) => void;
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
    default:
      return 'default';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInvest }) => {
  const { t } = useTranslation();
  const progress = (project.raisedAmount / project.targetAmount) * 100;

  return (
    <Card
      hoverable
      className="project-card"
      cover={
        <div className="project-image">
          <img alt={project.name} src={project.imageUrl} />
          <Tag color={project.status === 'active' ? 'green' : project.status === 'upcoming' ? 'blue' : 'default'}>
            {t(`project.status.${project.status}`)}
          </Tag>
        </div>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={4}>{project.name}</Title>
        <Text type="secondary">{project.description}</Text>

        <div className="project-stats">
          <Progress
            percent={progress}
            status={progress >= 100 ? 'success' : 'active'}
            format={() => `${progress.toFixed(2)}%`}
          />
          <Space split={<span className="stat-divider">|</span>}>
            <Text>
              {t('project.raised')}: {project.raisedAmount} TOKEN
            </Text>
            <Text>
              {t('project.target')}: {project.targetAmount} TOKEN
            </Text>
          </Space>
        </div>

        <div className="ai-analysis">
          <Title level={5}>{t('project.aiAnalysis')}</Title>
          <Space direction="vertical">
            <Tag color={getRiskColor(project.aiAnalysis.riskLevel)}>
              {t('project.riskLevel')}: {t(`project.risk.${project.aiAnalysis.riskLevel}`)}
            </Tag>
            <Text>
              {t('project.confidence')}: {project.aiAnalysis.confidenceScore}%
            </Text>
            <div className="key-findings">
              {project.aiAnalysis.keyFindings.map((finding, index) => (
                <Text key={index} type="secondary" className="finding-item">
                  • {finding}
                </Text>
              ))}
            </div>
          </Space>
        </div>

        <Button
          type="primary"
          block
          onClick={() => onInvest(project.id)}
          disabled={project.status !== 'active'}
        >
          {t('project.invest')}
        </Button>
      </Space>
    </Card>
  );
};

export default ProjectCard; 