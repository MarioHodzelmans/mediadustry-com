import stackData from '@/data/stackData';
import StackSingleItem from './subComponents/StackSingleItem';

const MobileApplicationStack = () => {
  return (
    <div className="app-stack-area app-stack-ptb app-stack-box stack-panel-pin-area mt-145">
      <div className="app-stack-contain">
        {stackData.map((item) => (
          <StackSingleItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileApplicationStack;