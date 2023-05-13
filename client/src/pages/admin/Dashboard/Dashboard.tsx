import InfoCard from 'components/cards/InfoCard';
import { priceFormat } from 'utils';

function Dashboard() {
  return (
    <div className="w-full h-full flex justify-center items-center text-7xl">
      Soon!
    </div>
  );
  return (
    <div className="p-4 space-y-10">
      <div>
        <h4 className="text-2xl capitalize mb-4">Orders</h4>
        <div className="grid grid-cols-3 gap-4">
          <InfoCard title="Today" description="2" />
          <InfoCard title="This week" description="5" />
          <InfoCard title="This month" description="18" />
        </div>
      </div>
      <div>
        <h4 className="text-2xl capitalize mb-4">Revenue</h4>
        <div className="grid grid-cols-3 gap-4">
          <InfoCard title="Today" description={priceFormat(35, '$')} />
          <InfoCard title="This week" description={priceFormat(170, '$')} />
          <InfoCard title="This month" description={priceFormat(420, '$')} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
