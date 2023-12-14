import { FC, ReactNode } from 'react';
import ContentLoader from 'react-content-loader';

interface SkeletonLoaderProps {
  children: ReactNode;
  height?: number | string;
  width?: number | string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ children, height, width }) => {
  return (
    <ContentLoader backgroundColor="#d9d9d9" foregroundColor="#ededed" height={height} width={width} speed={2}>
      {children}
    </ContentLoader>
  );
};

export default SkeletonLoader;
