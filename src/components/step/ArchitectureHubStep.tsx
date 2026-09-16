import { ConsultationIcon, FunctionalSpacesIcon, ProjectAnalysisIcon, ResidenceCondomIcon } from '@/svg/StepIcons';
import StepBg from '../../../public/assets/img/home-08/step/step-bg.jpg';
import { StepItemDT } from '@/types/custom-d-t';

const ArchitectureHubStep = () => {
  const steps: StepItemDT[] = [
    {
      id: 1,
      number: '01',
      title: 'Project Analysis',
      description: 'Stand out with a polished, professional look.',
      icon: <ProjectAnalysisIcon />
    },
    {
      id: 2,
      empty: true
    },
    {
      id: 3,
      number: '02',
      title: 'Functional Spaces',
      description: 'Stand out with a polished, professional look.',
      icon: <FunctionalSpacesIcon />
    },
    {
      id: 4,
      number: '03',
      title: 'Residence Condom',
      description: 'Stand out with a polished, professional look.',
      icon: <ResidenceCondomIcon />
    },
    {
      id: 5,
      empty: true
    },
    {
      id: 6,
      number: '04',
      title: 'Consultation',
      description: 'Stand out with a polished, professional look.',
      icon: <ConsultationIcon />
    }
  ];

  return (
    <div className="ar-step-area ar-step-bg z-index-1" style={{backgroundImage: `url(${StepBg.src})`}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-6 col-xl-5">
            <div className="ar-step-title-box">
              <span className="tp-section-subtitle-satisfy text-white mb-20 tp_fade_anim" data-delay=".3">
                Architecture process
              </span>
              <h3 className="tp-section-title-clash-600 text-white mb-0 tp_fade_anim" data-delay=".4">
                The project process.
              </h3>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-7">
            <div className="ar-step-right-wrap">
              <div className="row gx-0">
                {steps.map((step, index) => (
                  <div key={step.id} className={`col-md-6 ${index % 3 === 1 ? 'd-none d-md-block' : ''}`}>
                    <div className="ar-step-item">
                      {!step.empty && (
                        <>
                          <div className="ar-step-top d-flex justify-content-between align-items-center">
                            <span className="ar-step-icon">
                              {step.icon}
                            </span>
                            <span className="ar-step-number">{step.number}</span>
                          </div>
                          <div className="ar-step-content">
                            <h4 className="ar-step-title-sm">{step.title}</h4>
                            <span>{step.description}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureHubStep;