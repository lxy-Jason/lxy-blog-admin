import { PageContainer } from '@ant-design/pro-components';
import System from './tabs/system';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <System />
    </PageContainer>
  );
};

export default HomePage;
