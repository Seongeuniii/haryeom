import RegisterUserInfoContainer from '@/containers/RegisterUserInfoContainer';
import WithAuth from '@/hocs/withAuth';

export default WithAuth(RegisterUserInfoContainer);
export { getServerSideProps } from '@/containers/RegisterUserInfoContainer';
