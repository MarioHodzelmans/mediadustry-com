import blogShape from '../../../public/assets/img/home-09/blog/blog-shape-1.png';
import CorporateBlogItem from './subComponents/CorporateBlogItem';
import blogData from '@/data/blogData';
import Image from 'next/image';

const CorporateAgencyBlog = () => {
  return (
    <div className="crp-blog-area pt-140 pb-100 p-relative">
      <div className="crp-blog-shape">
        <Image data-speed="1.1" src={blogShape} alt="shape" />
      </div>
      <div className="container container-1350">
        <div className="row align-items-start">
          <div className="col-xl-3">
            <div className="crp-blog-title-box">
              <h4 className="crp-blog-title" data-speed=".9" data-stagger="0.07">
                thoughts and insights
              </h4>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="crp-blog-wrap">
              {blogData.slice(13, 16).map((post) => (
                <CorporateBlogItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateAgencyBlog;