import TextbookContainer from '@/containers/TextbookContainer';
import WithAuth from '@/hocs/withAuth';

export default WithAuth(TextbookContainer);
export { getServerSideProps } from '@/containers/TextbookContainer';
