import heroBg from '../../../public/assets/img/home-08/hero/hero-bg-shape.png';
import AnimatedCounterTwo from '../counter/AnimatedCounterTwo';

interface FunFactItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  delay: string;
  duration?: number;
}

const ArchitectureHubFunFact = ({ spacingCls = "mb-110" }) => {
  const funFacts: FunFactItem[] = [
    {
      id: 1,
      value: 4,
      suffix: "k+",
      label: "Projects completed",
      delay: ".3",
    },
    {
      id: 2,
      value: 91,
      suffix: "+",
      label: "renovation experts",
      delay: ".5",
    },
    {
      id: 3,
      value: 42,
      suffix: "+",
      label: "renovation experts",
      delay: ".7",
    },
    {
      id: 4,
      value: 24,
      suffix: "+",
      label: "Projects completed",
      delay: ".8",
    }
  ];

  return (
    <div className={`ar-funfact-area ar-funfact-bg ${spacingCls}`} style={{ backgroundImage: `url(${heroBg.src})` }}>
      <div className="container container-1330">
        <div className="row">
          {funFacts.map((fact) => (
            <div key={fact.id} className="col-lg-3 col-md-4">
              <div className="ar-funfact-item text-center mb-45 tp_fade_anim" data-delay={fact.delay}>
                <h4>
                  <AnimatedCounterTwo min={0} max={fact.value}/>
                  {fact.suffix}
                </h4>
                <span>{fact.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureHubFunFact;