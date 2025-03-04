import styled from 'styled-components';
// Statistics Section
export const StyledStatisticsSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 30px;
`;

export const Statistic = styled.div`
  text-align: center;
`;

export const StatisticValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

export const StatisticLabel = styled.span`
  font-size: 1rem;
  color: #ccc;
`;
