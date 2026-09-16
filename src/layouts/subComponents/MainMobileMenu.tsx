import Link from "next/link";

const MainMobileMenu = () => {
    const links = [
        { label: "Home", href: "/" },
        { label: "Over ons", href: "/about-us-light" },
        { label: "Diensten", href: "/service-3-light" },
        { label: "Projecten", href: "/portfolio-col-2-light" },
        { label: "Shop", href: "https://shop.mediadustry.com" },
        { label: "Contact", href: "/contact-us-light" },
    ];

    return (
        <ul>
            {links.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
        </ul>
    );
};

export default MainMobileMenu;
