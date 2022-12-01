import cn from 'classnames';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

const data = [
  {
    name: 'Page A',
    uv: 1200,
    pv: 800,
  },
  {
    name: 'Page B',
    uv: 2600,
    pv: 100,
  },
  {
    name: 'Page C',
    uv: 1900,
    pv: 1600,
  },
  {
    name: 'Page D',
    uv: 2280,
    pv: 1508,
  },
  {
    name: 'Page E',
    uv: 1290,
    pv: 3500,
  },
  {
    name: 'Page F',
    uv: 1690,
    pv: 3000,
  },
  {
    name: 'Page G',
    uv: 2590,
    pv: 4500,
  },
];

interface Props {
  chartWrapperClass?: string;
}

export default function OverviewChart({ chartWrapperClass, balance }) {
  const { isConnect } = useSelector((state) => state.blockchain);
  return (
    <div className="rounded-lg bg-gray-900 p-6 text-white dark:bg-light-dark sm:p-8">
      {isConnect && (
        <h3 className="text-xl font-medium tracking-tighter text-white sm:text-3xl">
          {balance} Usdt
        </h3>
      )}
      {!isConnect && (
        <h3 className="text-xl font-medium tracking-tighter text-white sm:text-3xl">
          Connect
        </h3>
      )}
      {isConnect && (
        <p className="mt-2 mb-1 text-xs font-medium text-gray-400 sm:text-sm">
          Balance
        </p>
      )}

      {!isConnect && (
        <p className="mt-2 mb-1 text-xs font-medium text-gray-400 sm:text-sm">
          your are not connected
        </p>
      )}
      <div className={cn('h-60 w-full', chartWrapperClass)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/*<Line
              type="natural"
              dataKey="pv"
              stroke="#1E40AF"
              strokeWidth={4}
              dot={false}
  />*/}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
