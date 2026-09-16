const clients = [
    "Gemeente Voerendaal",
    "Gemeente Stein",
    "Stichting Evenementenmanagement Nouveau Visage",
    "Bouwservice Peskens",
    "SerPaCo GmbH & Co. KG",
    "Dyanne Sleijpen",
    "Olrik Interim Management",
    "DOCK Legal Experts B.V.",
];

const CreativeStudioBrandTwo = () => (
    <section className="creative-brand-area mediadustry-clients pb-150" aria-labelledby="clients-title">
        <div className="container container-1580">
            <p id="clients-title" className="tp-section-subtitle fs-17 pre-circle mb-35">Organisaties waarvoor we werken</p>
            <div className="mediadustry-client-grid">
                {clients.map((client) => <span key={client}>{client}</span>)}
            </div>
        </div>
    </section>
);

export default CreativeStudioBrandTwo;
