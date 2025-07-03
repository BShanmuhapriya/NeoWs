import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';

interface AsteroidData {
  name: string;
  absolute_magnitude_h: number;
}

const MagnitudeChart: React.FC<{ data: AsteroidData[], colors: string[] }> = ({ data, colors }) => {
  const chartData = data.map((a) => ({
    name: a.name,
    magnitude: a.absolute_magnitude_h,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: 'rgb(25, 252, 195)' }}/>
        <YAxis label={{ value: 'Magnitude (H)', angle: -90, position: 'insideLeft' }}  tick={{ fill: 'rgb(25, 252, 195)' }} />
        <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: 'white' }}/>
        <Bar dataKey="magnitude">
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MagnitudeChart;
