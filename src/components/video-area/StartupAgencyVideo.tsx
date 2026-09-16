import StartupAgencyVideoTextSlider from '../text-slider/StartupAgencyVideoTextSlider';
import videoThumb from '../../../public/assets/img/home-12/video/st-video-thumb.jpg';
import avaterImg from '../../../public/assets/img/home-04/avater/avater-1.jpg';
import { useVideoModal } from '@/provider/VideoProvider';
import { QuoteIconFour, VideoPlayIcon } from '@/svg';
import Image from 'next/image';

const StartupAgencyVideo = () => {
    const { playVideo } = useVideoModal();

    return (
        <div className="st-video-area">
            <div className="st-video-wrapper p-relative">
                {/* Testimonial Section */}
                <div className="st-video-item">
                    <div className="creative-choose-text z-index-1">
                        <p>
                            <span className="creative-choose-text-top">
                                <QuoteIconFour />
                                Agntix created
                            </span>
                            <br />
                            <span className="creative-choose-text-middle">something better then I ever</span>
                            <br />
                            <span className="creative-choose-text-bottom">could have imagined</span>
                        </p>

                        <div className="creative-choose-avater-box d-inline-flex align-items-center">
                            <div className="creative-choose-avater">
                                <Image src={avaterImg} alt="Testimonial author avatar" />
                            </div>
                            <div className="creative-choose-avater-info">
                                <h4>Hear from Dang</h4>
                                <span>Co-Founder of Agntix</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Thumbnail Section */}
                <div className="st-video-img">
                    <Image
                        style={{ width: "100%", height: "auto" }}
                        className="w-100"
                        data-speed=".8"
                        src={videoThumb}
                        alt="Video thumbnail"
                        priority
                    />
                    <VideoPlayButton onClick={() => playVideo("VCPGMjCW0is")} />
                </div>

                {/* Slider Text Section */}
                <StartupAgencyVideoTextSlider />
            </div>
        </div>
    );
};

const VideoPlayButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="popup-video dgm-testimonial-playbtn z-index-1"
        aria-label="Play video"
    >
        <span>
            <VideoPlayIcon />
        </span>
    </button>
);



export default StartupAgencyVideo;