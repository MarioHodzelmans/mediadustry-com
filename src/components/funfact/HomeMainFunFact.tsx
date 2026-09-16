"use client"
import FunFactPanelItem from './subComponents/FunFactPanelItem';
import panelsData from '@/data/panelsData';
import React from 'react';

const HomeMainFunFact: React.FC = () => {
  return (
    <div className="tp-funfact-area">
      <div className="tp-funfact-panel-wrap">
        {panelsData.map((panel) => (
          <div className="tp-funfact-panel" key={panel.id}>
            <div className={`${panel.style} include-bg tp-text-bounce-trigger`}
            style={{ backgroundColor: "#F6F6F9" }}>
              <FunFactPanelItem panel={panel} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMainFunFact;