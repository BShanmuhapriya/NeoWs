import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface AsteroidData {
  name: string;
  missDistanceKm: number;
  speedKph: number;
}

const ScatterPlot: React.FC<{ data: AsteroidData[], colors: string[] }> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 0, right: 35, bottom: 0, left: 35 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="missDistanceKm"
          name="Distance to Earth"
          unit="km"
          tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
          tick={{ fill: 'rgb(25, 252, 195)' }}
        />
        <YAxis
          type="number"
          dataKey="speedKph"
          name="Speed"
          unit="km/h"
          tickFormatter={(value) => `${(value / 1_000).toFixed(1)}k`}
          tick={{ fill: 'rgb(25, 252, 195)' }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Asteroids" data={data}>
          {data.map((_, index) => (
            <Cell key={`point-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
