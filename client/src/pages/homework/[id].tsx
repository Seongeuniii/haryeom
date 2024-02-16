import HomeworkContainer from '@/containers/HomeworkContainer';
import WithAuth from '@/hocs/withAuth';

export default WithAuth(HomeworkContainer);
export { getServerSideProps } from '@/containers/HomeworkContainer';
