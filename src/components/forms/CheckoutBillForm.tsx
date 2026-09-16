import React from 'react';

const CheckoutBillForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="tp-checkout-bill-inner">
                <div className="row">
                    <div className="col-md-6">
                        <div className="tp-checkout-input">
                            <label>First Name <span>*</span></label>
                            <input type="text" placeholder="First Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tp-checkout-input">
                            <label>Last Name <span>*</span></label>
                            <input type="text" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Company name (optional)</label>
                            <input type="text" placeholder="Example LTD." />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Country / Region </label>
                            <input type="text" placeholder="United States (US)" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Street address</label>
                            <input type="text" placeholder="House number and street name" />
                        </div>

                        <div className="tp-checkout-input">
                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Town / City</label>
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tp-checkout-input">
                            <label>State / County</label>
                            <div id="customSelect" className="custom-select">
                                <div className="selected">New York US <span className="arrow"></span></div>
                                <ul className="options">
                                    <li data-value="1">Berlin Germany</li>
                                    <li data-value="2">Paris France</li>
                                    <li data-value="3">Tokiyo Japan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tp-checkout-input">
                            <label>Postcode ZIP</label>
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Phone <span>*</span></label>
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Email address <span>*</span></label>
                            <input type="email" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-option-wrapper">
                            <div className="tp-checkout-option">
                                <input id="create_free_account" type="checkbox" />
                                <label htmlFor="create_free_account">Create an account?</label>
                            </div>
                            <div className="tp-checkout-option">
                                <input id="ship_to_diff_address" type="checkbox" />
                                <label htmlFor="ship_to_diff_address">Ship to a different address?</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="tp-checkout-input">
                            <label>Order notes (optional)</label>
                            <textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutBillForm;