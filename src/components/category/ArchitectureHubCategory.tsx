
import { CommercialIcon, IndustrialIcon, LandscapeIcon, ResidentialIcon, UrbanIcon } from '@/svg/CategoriesIcons';
import Link from 'next/link';
import React from 'react';

type CategoryItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

const ArchitectureHubCategory = () => {
  const categories: CategoryItem[] = [
    {
      name: 'Landscape',
      icon: <LandscapeIcon />,
      href: '#'
    },
    {
      name: 'Commercial',
      icon: <CommercialIcon />,
      href: '#'
    },
    {
      name: 'Residential',
      icon: <ResidentialIcon />,
      href: '#'
    },
    {
      name: 'Industrial',
      icon: <IndustrialIcon />,
      href: '#'
    },
    {
      name: 'Urban',
      icon: <UrbanIcon />,
      href: '#'
    }
  ];

  return (
    <div className="ar-category-area ar-category-ptb">
      <div className="container container-1430">
        <div className="row">
          <div className="col-xl-12">
            <div className="ar-category-wrap d-flex justify-content-between align-items-center">
              {categories.map((category, index) => (
                <div className="ar-category-item" key={index}>
                  <Link href={category.href}>
                    <i>{category.icon}</i>{" "}
                    <span>{category.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureHubCategory;