import OverView from '@/pages/Home/tabs/overview';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <OverView />
      </div>
    </PageContainer>
  );
};

export default HomePage;
