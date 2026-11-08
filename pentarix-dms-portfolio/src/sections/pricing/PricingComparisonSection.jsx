import CallLink from '../../components/ui/CallLink.jsx';
import { Fragment } from 'react';

import { Check, MessageSquare } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { comparisonCategories } from '../../data/pricing.js';

function RenderCell({ value, isBold = false, isOrange = false, isUnderline = false }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-[#ea580c] mx-auto stroke-[2.5]" />
    ) : (
      <span className="text-slate-300 text-base font-normal">—</span>
    );
  }

  return (
    <span
      className={`text-sm ${
        isOrange
          ? 'font-bold text-[#ea580c]'
          : isUnderline
            ? 'font-bold text-slate-800 underline underline-offset-4 decoration-slate-300'
            : isBold
              ? 'font-bold text-slate-900'
              : 'font-medium text-slate-500'
      }`}
    >
      {value}
    </span>
  );
}

function PricingComparisonSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container className="!max-w-[1200px] lg:!px-6">
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {'Detailed Feature Comparison'}
          </h2>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            {'Compare the branch and field-team limits included in each license.'}
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-100/70">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50">
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-900 w-[40%]">
                    {'FEATURE'}
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-900 w-[20%]">
                    {'BASIC'}
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-900 w-[20%] bg-[#fffaf5]/60">
                    {'PROFESSIONAL'}
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-900 w-[20%]">
                    {'ENTERPRISE'}
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonCategories.map((cat) => (
                  <Fragment key={cat.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="border-t border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900"
                      >
                        {cat.category}
                      </td>
                    </tr>

                    {cat.features.map((item) => (
                      <tr
                        key={item.name}
                        className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-slate-700">
                          {item.name}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <RenderCell value={item.basic} />
                        </td>
                        <td className="py-4 px-4 text-center bg-[#fffaf5]/60">
                          <RenderCell value={item.professional} isBold={item.isProfessionalBold} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <RenderCell
                            value={item.enterprise}
                            isOrange={item.isEnterpriseOrange}
                            isUnderline={item.isEnterpriseUnderline}
                          />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Talk to Sales Button */}
        <div className="mt-10 flex justify-center">
          <CallLink className="inline-flex items-center gap-2.5 rounded-xl bg-[#111827] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f172a] active:translate-y-0">
            <MessageSquare className="h-4 w-4 fill-white text-white" />
            <span>{'Talk to Sales'}</span>
          </CallLink>
        </div>
      </Container>
    </section>
  );
}

export default PricingComparisonSection;
