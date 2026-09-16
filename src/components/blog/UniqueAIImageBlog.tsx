import titleShape from '../../../public/assets/img/title-shape/title-shape-1.png';
import shape from '../../../public/assets/img/home-07/shape/shape-5.png';
import blogData from '@/data/blogData';
import Image from 'next/image';
import Link from 'next/link';

const UniqueAIImageBlog = () => {
  return (
    <div className="ai-blog-area pb-110 p-relative">
      <div className="ai-blog-shape-1">
        <Image src={shape} alt="shape" />
      </div>
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="ai-blog-title-box text-center mb-60">
              <div className="tp-section-subtitle-gradient mb-20 tp_fade_anim" data-delay=".3">
                <div><Image src={titleShape} alt="title-shape" /></div>
                newest article
              </div>
              <h4 className="tp-section-title fs-54 mb-20 tp_fade_anim" data-delay=".5">
                Our Latest News
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          {blogData.slice(10, 13).map((post, index) => (
            <div key={post.id} className="col-xl-4 col-lg-4 col-md-6">
              <div
                className={`ai-blog-item anim-zoomin-wrap mb-30 tp_fade_anim`}
                data-delay={`${0.3 + (index * 0.2)}`}
              >
                <div className="ai-blog-thumb anim-zoomin">
                  <Link href={post.link}>
                    <Image src={post.image} alt={post.title} className="img-fluid" />
                  </Link>
                </div>
                <div className="ai-blog-content-wrap">
                  <div className="ai-blog-content">
                    <span>{post.category}</span>
                    <h4 className="ai-blog-title">
                      <Link className="tp-line-white" href={post.link}>
                        {post.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="ai-blog-meta">
                    <span>{post.date}</span>
                    <span>{post.commentCount} Comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniqueAIImageBlog;