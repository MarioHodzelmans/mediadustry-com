import chooseImg from "../../../public/assets/img/home-04/choose/chose-1.jpg";
import { ChooseArrow } from "@/svg/ChooseIcons";
import Image from "next/image";

const CreativeStudioChoose = () => {
    return (
        <div className="tp-service-5-features-ptb creative-service-2-style p-relative">
            <div className="tp-service-5-feature-wrap p-relative">
                <div className="row">
                    <div className="offset-xl-1 col-xl-6">
                        <div className="tp-service-5-feature-content">
                            <span><ChooseArrow /></span>
                            <h3 className="tp-service-5-feature-title">
                                We provide <br /> special offers for <br />
                                the best customers
                            </h3>
                        </div>
                    </div>
                </div>
                <Image style={{ width: "100%", height: "auto" }} data-speed=".8" className="w-100" src={chooseImg} alt="choose image" />
            </div>
        </div>
    );
};

export default CreativeStudioChoose;