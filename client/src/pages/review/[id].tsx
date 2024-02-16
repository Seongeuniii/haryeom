import ReviewTutoringContainer from '@/containers/ReviewContainer/ReviewTutoringContainer';
import WithAuth from '@/hocs/withAuth';

export default WithAuth(ReviewTutoringContainer);
export { getServerSideProps } from '@/containers/ReviewContainer/ReviewTutoringContainer';
