import ReviewContainer from '@/containers/ReviewContainer';
import WithAuth from '@/hocs/withAuth';

export default WithAuth(ReviewContainer);
export { getServerSideProps } from '@/containers/ReviewContainer';
