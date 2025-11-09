'use client'

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const data1960 = [
  { name: 'Городское', value: 40, color: '#3b82f6' },
  { name: 'Сельское', value: 60, color: '#10b981' },
]

const data1985 = [
  { name: 'Городское', value: 57, color: '#3b82f6' },
  { name: 'Сельское', value: 43, color: '#10b981' },
]

const barData = [
  { year: '1960', urban: 40, rural: 60 },
  { year: '1985', urban: 57, rural: 43 },
]

const ratioData = [
  { year: 1960, ratio: 1.5 },
  { year: 1985, ratio: 0.754 },
]

export default function MathematicsSlide() {
  const urbanChange = 57 - 40
  const ruralChange = 43 - 60
  const urbanChangePercent = ((57 - 40) / 40) * 100
  const ruralChangePercent = ((43 - 60) / 60) * 100

  const ratio1960 = 60 / 40
  const ratio1985 = 43 / 57
  const ratioChange = ((ratio1985 - ratio1960) / ratio1960) * 100

  return (
    <div>
      <div className="border-b-4 border-blue-500 pb-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          📊 Mathematics - Соотношение городского и сельского населения
        </h2>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          8 баллов
        </span>
      </div>

      <p className="text-xl text-gray-600 mb-8">
        Диаграмма изменения соотношения (1960-1985)
      </p>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">📈 Данные</h3>
        <div className="bg-blue-50 p-6 rounded-xl">
          <ul className="space-y-2 text-lg text-gray-700">
            <li><strong>1960 г.:</strong> 40% городского, 60% сельского населения</li>
            <li><strong>1985 г.:</strong> 57% городского, 43% сельского населения</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-xl font-bold text-blue-800 mb-4">Диаграмма 1960 года</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: '1960', urban: 40, rural: 60 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="urban" stackId="a" fill="#3b82f6" name="Городское" />
              <Bar dataKey="rural" stackId="a" fill="#10b981" name="Сельское" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-xl font-bold text-blue-800 mb-4">Диаграмма 1985 года</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: '1985', urban: 57, rural: 43 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="urban" stackId="a" fill="#3b82f6" name="Городское" />
              <Bar dataKey="rural" stackId="a" fill="#10b981" name="Сельское" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h4 className="text-xl font-bold text-blue-800 mb-4">Сравнительная круговая диаграмма</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-center font-semibold mb-2">1960 год</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data1960}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data1960.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h5 className="text-center font-semibold mb-2">1985 год</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data1985}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data1985.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-xl font-bold text-blue-800 mb-4">Изменения в абсолютных значениях</h4>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">{urbanChange > 0 ? '+' : ''}{urbanChange}%</div>
              <div className="text-gray-700">Городское население</div>
              <div className="text-sm text-gray-600">{urbanChangePercent.toFixed(1)}% относительно 1960</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{ruralChange}%</div>
              <div className="text-gray-700">Сельское население</div>
              <div className="text-sm text-gray-600">{ruralChangePercent.toFixed(1)}% относительно 1960</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl">
          <h4 className="text-xl font-bold text-purple-800 mb-4">График изменения соотношения</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ratioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="ratio" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-l-4 border-blue-500">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">📐 Решение задачи</h4>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <strong className="text-blue-700">Вопрос:</strong> На сколько процентов и как изменилось соотношение сельского населения к городскому?
          </div>

          <div>
            <strong className="text-blue-700">Решение:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li>
                <strong>1960 год:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Городское: 40%</li>
                  <li>Сельское: 60%</li>
                  <li>Соотношение сельского к городскому: 60% ÷ 40% = <strong>1.5</strong> (или 150%)</li>
                </ul>
              </li>
              <li>
                <strong>1985 год:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Городское: 57%</li>
                  <li>Сельское: 43%</li>
                  <li>Соотношение сельского к городскому: 43% ÷ 57% = <strong>0.754</strong> (или 75.4%)</li>
                </ul>
              </li>
              <li>
                <strong>Изменение:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Абсолютное изменение: 0.754 - 1.5 = <strong>-0.746</strong></li>
                  <li>Относительное изменение: ((0.754 - 1.5) / 1.5) × 100% = <strong>-49.7%</strong></li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mt-4">
            <strong className="text-blue-700 text-lg">✅ Ответ:</strong> Соотношение сельского населения к городскому <strong>уменьшилось на 49.7%</strong> (с 1.5 до 0.754, то есть с 150% до 75.4%).
            <p className="mt-2">
              Это означает, что если в 1960 году сельского населения было в 1.5 раза больше городского, то в 1985 году сельского населения стало на 24.6% меньше городского.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

