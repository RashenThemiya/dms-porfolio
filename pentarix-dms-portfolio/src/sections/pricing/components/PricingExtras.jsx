import {
  ArrowUpRight,
  Building2,
  Check,
  ClipboardList,
  Coins,
  Infinity as InfinityIcon,
  Phone,
  Server,
  Settings2,
  ShieldCheck,
  Truck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import CallLink from '../../../components/ui/CallLink.jsx';
import { additionalLicenses, commercialNotes } from '../../../data/pricing.js';

const licenseIcons = [Building2, UserRound, Truck];
const licenseDescriptions = [
  'Expand to another branch.',
  'Add another person to your sales team.',
  'Add another person to your delivery team.',
];
const noteDetails = [
  [InfinityIcon, 'Included in every plan'],
  [Server, 'Hosting & servers'],
  [Settings2, 'Taxes & custom work'],
  [ShieldCheck, 'Ongoing maintenance'],
  [UsersRound, 'Flexible user licenses'],
  [Coins, 'Payment terms'],
];

export default function PricingExtras() {
  return (
    <>
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-dms-panel to-dms-panel p-5 sm:mt-10 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-dms-accent">
              Built around your business
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-dms-accent">
                <Settings2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">Custom Plan</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-dms-secondary">
              Tailored branches, sales reps and delivery team.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Unlimited Shops', 'Unlimited Routes'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dms-border bg-dms-bg/60 px-3 py-1.5 text-xs font-semibold text-slate-300"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 md:max-w-60 md:text-right">
            <CallLink className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-dms-accent px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">
              Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </CallLink>
            <p className="mt-3 text-xs leading-5 text-dms-muted">
              Pricing based on your business requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-dms-accent">
              Room to grow
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Additional Licenses</h2>
          </div>
          <span className="rounded-full border border-dms-border px-3 py-1.5 text-xs text-dms-secondary">
            One-time add-on charges
          </span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {additionalLicenses.map((license, index) => {
            const Icon = licenseIcons[index];
            return (
              <div
                key={license.name}
                className="min-w-0 rounded-2xl border border-dms-border bg-dms-panel p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-dms-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-bold text-dms-text">{license.name}</h3>
                </div>
                <p className="mt-4 text-2xl font-extrabold tabular-nums tracking-tight">
                  {license.price}
                </p>
                <p className="mt-2 text-xs leading-5 text-dms-muted">
                  {licenseDescriptions[index]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-dms-border bg-dms-panel sm:mt-10">
        <div className="flex items-center gap-3 border-b border-dms-border px-5 py-5 sm:px-7">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-dms-secondary">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Commercial Notes</h2>
            <p className="mt-1 text-xs text-dms-muted">What to know before getting started</p>
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-6 p-5 sm:p-7 md:grid-cols-2">
          {commercialNotes.map((note, index) => {
            const [Icon, title] = noteDetails[index];
            return (
              <li key={note} className="flex min-w-0 gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-dms-text">{title}</h3>
                  <p className="mt-1.5 text-xs leading-6 text-dms-secondary sm:text-sm">{note}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dms-border bg-dms-bg/40 px-5 py-4 sm:px-7">
          <p className="text-xs leading-5 text-dms-muted">
            Proposed prices are subject to final commercial agreement.
          </p>
          <CallLink className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Talk to us
          </CallLink>
        </div>
      </div>
    </>
  );
}
