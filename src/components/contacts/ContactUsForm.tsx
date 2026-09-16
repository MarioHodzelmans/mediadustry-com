import mapIcon from '../../../public/assets/img/contact/map-icon.svg';
import Image from 'next/image';
import React from 'react';

const ContactUsForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const subject = encodeURIComponent(`Projectaanvraag van ${form.get("name") || "websitebezoeker"}`);
        const body = encodeURIComponent(`Naam: ${form.get("name")}\nE-mail: ${form.get("email")}\nWebsite: ${form.get("website")}\n\nVraag:\n${form.get("message")}`);
        window.location.href = `mailto:info@mediadustry.com?subject=${subject}&body=${body}`;
    };
    return (
        <div id="down" className="tp-contact-us-form-ptb pt-60 pb-120">
            <div className="container container-1750">
                <div className="tp-contact-us-form-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="tp-contact-us-map p-relative">
                                <div className="tp-contact-map-icon-box">
                                    <div className="tp-contact-map-icon">
                                        <span><Image src={mapIcon} alt="map icon" /></span>
                                    </div>
                                </div>
                                <iframe title="MEDIADUSTRY in Voerendaal" src="https://www.google.com/maps?q=Tenelenweg%2011%2C%206367%20VR%20Voerendaal&output=embed" width="600" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tp-contact-us-wrap">
                                <h4 className="tp-contact-us-title mb-55">Start een project</h4>
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Naam*</label>
                                                <input name="name" type="text" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>E-mailadres*</label>
                                                <input name="email" type="email" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Website</label>
                                                <input name="website" type="url" placeholder="https://" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Waar kunnen we je mee helpen?*
                                                </label>
                                                <textarea name="message" required></textarea>
                                            </div>
                                            <div className="tp-contact-form-btn">
                                                <button className="w-100" type="submit"><span>
                                                    <span className="text-1">Verstuur aanvraag</span>
                                                    <span className="text-2">Verstuur aanvraag</span>
                                                </span>
                                                </button>
                                                <p className="ajax-response mt-5"></p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsForm;
