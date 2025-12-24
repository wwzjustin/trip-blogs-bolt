import { useState } from 'react';
import { Clock, MapPin, Users, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { historicalTimeline } from '../data/historicalTimeline';
import { coreFramework, scotlandTimeline } from '../data/coreFramework';

export const HistoricalOverview = () => {
  const [isEnglandExpanded, setIsEnglandExpanded] = useState(false);
  const [isScotlandExpanded, setIsScotlandExpanded] = useState(false);

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            英国历史时间线
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            这不是一张"旅游景点清单"，而是一条"文明如何通过空间、制度、人物不断自我修复与延续"的时间轴
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            {coreFramework.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreFramework.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-slate-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900">
              英格兰历史时期总览
            </h3>
            <button
              onClick={() => setIsEnglandExpanded(!isEnglandExpanded)}
              className="ml-4 p-2 rounded-full hover:bg-slate-200 transition-colors"
              aria-label={isEnglandExpanded ? "收起英格兰历史时期" : "展开英格兰历史时期"}
            >
              {isEnglandExpanded ? (
                <ChevronUp className="w-6 h-6 text-slate-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
          {isEnglandExpanded && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {historicalTimeline.map((period, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-slate-700"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-slate-600" />
                        <span className="text-sm font-medium text-slate-600">
                          {period.timeRange}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">
                        {period.period}
                      </h4>
                    </div>

                    <div className="lg:w-3/4 space-y-3">
                      {period.keyLocation && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700">地点：</span>
                            <span className="text-slate-600">{period.keyLocation}</span>
                          </div>
                        </div>
                      )}

                      {period.keyFigures && period.keyFigures.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Users className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700">关键人物：</span>
                            <span className="text-slate-600">{period.keyFigures.join('、')}</span>
                          </div>
                        </div>
                      )}

                      {period.majorEvents && (
                        <p className="text-slate-600">
                          <span className="font-semibold">核心事件：</span> {period.majorEvents}
                        </p>
                      )}

                      {period.significance && (
                        <p className="text-slate-600">
                          <span className="font-semibold">历史意义：</span> {period.significance}
                        </p>
                      )}

                      {period.relatedDays && period.relatedDays.length > 0 && (
                        <div className="flex items-center gap-2 pt-2">
                          <div className="flex gap-2">
                            {period.relatedDays.map((day) => (
                              <span
                                key={day}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                              >
                                Day {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900">
              苏格兰独立线（并行时间轴）
            </h3>
            <button
              onClick={() => setIsScotlandExpanded(!isScotlandExpanded)}
              className="ml-4 p-2 rounded-full hover:bg-slate-200 transition-colors"
              aria-label={isScotlandExpanded ? "收起苏格兰独立线" : "展开苏格兰独立线"}
            >
              {isScotlandExpanded ? (
                <ChevronUp className="w-6 h-6 text-slate-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
          {isScotlandExpanded && (
            <div className="overflow-x-auto animate-in fade-in duration-300">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-700 text-white">
                    <th className="p-4 text-left rounded-tl-lg">时期</th>
                    <th className="p-4 text-left">苏格兰状态</th>
                    <th className="p-4 text-left">英格兰关系</th>
                    <th className="p-4 text-left rounded-tr-lg">关键事件</th>
                  </tr>
                </thead>
                <tbody>
                  {scotlandTimeline.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="p-4 font-semibold text-slate-800 border-b border-slate-200">
                        {item.period}
                      </td>
                      <td className="p-4 text-slate-700 border-b border-slate-200">
                        {item.scotlandStatus}
                      </td>
                      <td className="p-4 text-slate-700 border-b border-slate-200">
                        {item.englandRelation}
                      </td>
                      <td className="p-4 text-slate-700 border-b border-slate-200">
                        {item.keyEvents}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
