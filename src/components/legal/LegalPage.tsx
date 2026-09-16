import CreativeStudioFooter from "@/layouts/footers/CreativeStudioFooter";
import CreativeStudioHeader from "@/layouts/headers/CreativeStudioHeader";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
    eyebrow: string;
    title: string;
    intro?: string;
    children: ReactNode;
};

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <section className="mb-45">
        <h2 className="mb-20">{title}</h2>
        <div className="legal-copy">{children}</div>
    </section>
);

const LegalPage = ({ eyebrow, title, intro, children }: LegalPageProps) => (
    <>
        <CreativeStudioHeader />
        <main className="pt-180 pb-120">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-9 col-lg-10">
                        <span className="tp-section-subtitle fs-17 pre-circle mb-20">{eyebrow}</span>
                        <h1 className="tp-section-title fs-64 mb-30">{title}</h1>
                        {intro && <p className="fs-20 mb-60">{intro}</p>}
                        <div className="legal-page-content">{children}</div>
                        <p className="mt-60">Vragen? <Link href="mailto:info@mediadustry.com">info@mediadustry.com</Link></p>
                    </div>
                </div>
            </div>
        </main>
        <CreativeStudioFooter />
    </>
);

export default LegalPage;
