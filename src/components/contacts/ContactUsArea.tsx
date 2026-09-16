import thumb1 from "../../../public/assets/img/contact/contact-us/contact-us-thumb-1.jpg";
import thumb2 from "../../../public/assets/img/contact/contact-location-2.jpg";
import thumb3 from "../../../public/assets/img/contact/contact-location-3.jpg";
import Image from "next/image";
import Link from "next/link";

const ContactUsArea = () => {
  const contactData = [
    {
      title: "Direct contact",
      img: thumb1,
      email: "info@mediadustry.com",
      phone: "+31 6 24 38 39 98",
      mapLink: "mailto:info@mediadustry.com",
      btnClass: "tp-btn-yellow-green w-100",
      speed: "1.2",
    },
    {
      title: "Studio Voerendaal",
      img: thumb2,
      email: "Tenelenweg 11",
      phone: "6367 VR Voerendaal",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Tenelenweg+11+6367+VR+Voerendaal",
      btnClass: "tp-btn-yellow-green active w-100",
      speed: ".9",
      extraClass: "mt-60",
    },
    {
      title: "Online",
      img: thumb3,
      email: "mediadustry.com",
      phone: "shop.mediadustry.com",
      mapLink: "https://shop.mediadustry.com",
      btnClass: "tp-btn-yellow-green w-100",
      speed: "1.2",
    },
  ];

  return (
    <div className="tp-contact-us-info-area pb-120">
      <div className="container container-1230">
        <div className="row">
          {contactData.map((item, index) => (
            <div key={index} className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div
                className={`tp-contact-us-content text-center ${item.extraClass || ""
                  }`}
                data-speed={item.speed}
              >
                <div className="tp-contact-us-thumb d-flex justify-content-center">
                  <Image style={{ width: "100%", height: "auto" }} src={item.img} alt={item.title} />
                </div>
                <div className="tp-contact-us-bottom">
                  <div className="tp-contact-us-info-details">
                    <h4 className="tp-contact-us-info-title">{item.title}</h4>
                    <span>{item.email}</span>
                    <span>{item.phone}</span>
                  </div>
                  <div className="tp-contact-us-btn">
                    <Link
                      className={item.btnClass}
                      target="_blank"
                      href={item.mapLink}
                    >
                      <span>
                        <span className="text-1">Bekijk</span>
                        <span className="text-2">Bekijk</span>
                      </span>
                    </Link>
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

export default ContactUsArea;
