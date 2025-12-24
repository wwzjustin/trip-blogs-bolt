import { useState } from 'react';
import { Clock, MapPin, Users, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { historicalTimeline } from '../data/historicalTimeline';
import { coreFramework, scotlandTimeline } from '../data/coreFramework';

export const HistoricalOverview = () => {
  const [isEnglandExpanded, setIsEnglandExpanded] = useState(false);
  const [isScotlandExpanded, setIsScotlandExpanded] = useState(false);

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            英国历史时间线
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto px-2">
            这不是一张"旅游景点清单"，而是一条"文明如何通过空间、制度、人物不断自我修复与延续"的时间轴
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 md:mb-12">
          <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
            <span>{coreFramework.title}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {coreFramework.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                  {index + 1}
                </div>
                <p className="text-sm md:text-base text-slate-700 pt-0.5 md:pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 md:mb-16">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-3xl font-bold text-slate-900">
              英格兰历史时期总览
            </h3>
            <button
              onClick={() => setIsEnglandExpanded(!isEnglandExpanded)}
              className="ml-3 md:ml-4 p-1.5 md:p-2 rounded-full hover:bg-slate-200 transition-colors"
              aria-label={isEnglandExpanded ? "收起英格兰历史时期" : "展开英格兰历史时期"}
            >
              {isEnglandExpanded ? (
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
              ) : (
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
              )}
            </button>
          </div>
          {isEnglandExpanded && (
            <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
              {historicalTimeline.map((period, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-shadow border-l-4 border-slate-700"
                >
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-slate-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-slate-600">
                          {period.timeRange}
                        </span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-900">
                        {period.period}
                      </h4>
                    </div>

                    <div className="lg:w-3/4 space-y-2 md:space-y-3">
                      {period.keyLocation && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm md:text-base">
                            <span className="font-semibold text-slate-700">地点：</span>
                            <span className="text-slate-600">{period.keyLocation}</span>
                          </div>
                        </div>
                      )}

                      {period.keyFigures && period.keyFigures.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm md:text-base">
                            <span className="font-semibold text-slate-700">关键人物：</span>
                            <span className="text-slate-600">{period.keyFigures.join('、')}</span>
                          </div>
                        </div>
                      )}

                      {period.majorEvents && (
                        <p className="text-sm md:text-base text-slate-600">
                          <span className="font-semibold">核心事件：</span> {period.majorEvents}
                        </p>
                      )}

                      {period.significance && (
                        <p className="text-sm md:text-base text-slate-600">
                          <span className="font-semibold">历史意义：</span> {period.significance}
                        </p>
                      )}

                      {period.relatedDays && period.relatedDays.length > 0 && (
                        <div className="flex items-center gap-2 pt-2">
                          <div className="flex flex-wrap gap-2">
                            {period.relatedDays.map((day) => (
                              <span
                                key={day}
                                className="px-2 md:px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs md:text-sm font-medium"
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

        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-3xl font-bold text-slate-900 text-center">
              苏格兰独立线（并行时间轴）
            </h3>
            <button
              onClick={() => setIsScotlandExpanded(!isScotlandExpanded)}
              className="ml-3 md:ml-4 p-1.5 md:p-2 rounded-full hover:bg-slate-200 transition-colors flex-shrink-0"
              aria-label={isScotlandExpanded ? "收起苏格兰独立线" : "展开苏格兰独立线"}
            >
              {isScotlandExpanded ? (
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
              ) : (
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
              )}
            </button>
          </div>
          {isScotlandExpanded && (
            <div className="animate-in fade-in duration-300">
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-700 text-white">
                      <th className="p-3 md:p-4 text-left rounded-tl-lg text-sm md:text-base">时期</th>
                      <th className="p-3 md:p-4 text-left text-sm md:text-base">苏格兰状态</th>
                      <th className="p-3 md:p-4 text-left text-sm md:text-base">英格兰关系</th>
                      <th className="p-3 md:p-4 text-left rounded-tr-lg text-sm md:text-base">关键事件</th>
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
                        <td className="p-3 md:p-4 font-semibold text-slate-800 border-b border-slate-200 text-sm md:text-base">
                          {item.period}
                        </td>
                        <td className="p-3 md:p-4 text-slate-700 border-b border-slate-200 text-sm md:text-base">
                          {item.scotlandStatus}
                        </td>
                        <td className="p-3 md:p-4 text-slate-700 border-b border-slate-200 text-sm md:text-base">
                          {item.englandRelation}
                        </td>
                        <td className="p-3 md:p-4 text-slate-700 border-b border-slate-200 text-sm md:text-base">
                          {item.keyEvents}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {scotlandTimeline.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-slate-700"
                  >
                    <h4 className="font-bold text-slate-900 text-base mb-3">{item.period}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700">苏格兰状态：</span>
                        <span className="text-slate-600">{item.scotlandStatus}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">英格兰关系：</span>
                        <span className="text-slate-600">{item.englandRelation}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">关键事件：</span>
                        <span className="text-slate-600">{item.keyEvents}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
