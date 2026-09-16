"use client"
import shape from '../../../public/assets/img/home-07/shape/shape-6.png';
import PhotoProviderWrapper from '../shared/PhotoProviderWrapper';
import { Instagram_swiper_params } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import instagramPosts from '@/data/instagramData';
import {PhotoView } from 'react-photo-view';
import Image from 'next/image';

const UniqueAIImageInstagram = () => {
    return (
        <div className="ai-instagram-area p-relative">
            <div className="ai-instagram-shape-1">
                <Image src={shape} alt="shape" />
            </div>
            <div className="container-fluid p-0">
                <div className="row gx-0">
                    <div className="col-xl-12">
                        <PhotoProviderWrapper>
                            <Swiper
                                className='ai-instagram-active'
                                {...Instagram_swiper_params}
                            >
                                {instagramPosts.map((post) => (
                                    <SwiperSlide key={post.id}>
                                        <div className="ai-instagram-img">
                                            <PhotoView src={post.popupImage.src}>
                                                <Image src={post.image} alt={post.altText} className="img-fluid" />
                                            </PhotoView>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </PhotoProviderWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueAIImageInstagram;