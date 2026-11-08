import { Barcode, Box, Boxes, ChartNoAxesCombined, Image, Layers3 } from 'lucide-react';
import { inventoryItems } from '../../data/features.js';

export function InventoryPanel() {
  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-[0_18px_28px_-18px_rgba(15,23,42,0.35)]">
      <div className="rounded-[20px] border border-slate-200 bg-white">
        <div className="flex h-[54px] items-center justify-between border-b border-slate-200 px-4">
          <h3 className="text-sm font-extrabold text-slate-800">Inventory List</h3>
          <span className="tracking-[3px] text-slate-300">••</span>
        </div>
        <div className="space-y-3 p-3 sm:p-6">
          {inventoryItems.map((item) => (
            <div
              key={item.name}
              className="grid min-h-[74px] grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-3 sm:grid-cols-[auto_1fr_auto] rounded-lg bg-slate-50 px-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded bg-slate-200 text-slate-400">
                <Box className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-800">{item.name}</p>
                <p className="mt-0.5 text-[9px] text-slate-400">{item.sku}</p>
              </div>
              <div className="col-start-2 text-left sm:col-start-auto sm:text-right">
                <p className={`text-xs font-bold ${item.color}`}>{item.status}</p>
                <p className="mt-0.5 text-[9px] text-slate-400">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductPanel() {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_18px_28px_-18px_rgba(15,23,42,0.4)]">
      <div className="flex h-[114px] items-center gap-4 bg-slate-50 px-4">
        <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
          <Box className="h-6 w-6" />
        </span>
        <div>
          <p className="text-base font-extrabold">Product ID: #882910</p>
          <p className="text-xs text-slate-500">Editing Mode: Draft</p>
        </div>
      </div>
      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4">
          {[
            ['PRODUCT NAME', 'Ultra HD Monitor'],
            ['CATEGORY', 'Electronics'],
          ].map(([label, value]) => (
            <label key={label} className="text-[10px] font-bold text-slate-400">
              {label}
              <span className="mt-2 block rounded border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                {value}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-7 text-[10px] font-bold text-slate-400">VARIANTS</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Black / 27”', 'Black / 32”', 'Silver / 27”'].map((item, i) => (
            <span
              key={item}
              className={`rounded px-3 py-2 text-[10px] font-bold ${i === 0 ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-500'}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-6 border-t border-slate-200 pt-4">
          <button className="text-xs font-bold text-slate-500">Cancel</button>
          <button className="rounded-md bg-orange-500 px-5 py-3 text-xs font-bold text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const toolIcons = { settings: Layers3, price: ChartNoAxesCombined, media: Image, barcode: Barcode };

export function ToolIcon({ name }) {
  const Icon = toolIcons[name];
  return <Icon className="h-5 w-5 text-orange-500" />;
}

export function PosPanel() {
  return (
    <div className="min-h-[400px] w-full rounded-[24px] bg-[#111827] p-4 sm:p-8 text-white shadow-xl">
      <div className="flex justify-end gap-1.5">
        <i className="h-2 w-2 rounded-full bg-red-400" />
        <i className="h-2 w-2 rounded-full bg-amber-400" />
        <i className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold">Transaction Terminal</h3>
          <span className="rounded bg-orange-500/10 px-3 py-1.5 text-[9px] font-bold text-orange-500">
            LIVE SESSION
          </span>
        </div>
        <div className="mt-7 flex justify-between border-b border-slate-700 pb-3 text-xs text-slate-400">
          <span>Item Name</span>
          <span>Price</span>
        </div>
        <div className="mt-3 space-y-3 text-xs">
          {[
            ['Premium Filter Pack x2', '$440.00'],
            ['Hose Connector XL', '$25.50'],
            ['Service Fee', '$15.00'],
          ].map(([name, price]) => (
            <div key={name} className="flex justify-between text-slate-200">
              <span>{name}</span>
              <b className="text-white">{price}</b>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 sm:mt-12 border-t border-slate-700 pt-6">
          <div>
            <p className="text-[9px] font-bold text-slate-400">TOTAL DUE</p>
            <p className="text-3xl font-extrabold">$480.50</p>
          </div>
          <button className="rounded-lg bg-orange-500 px-6 py-4 text-sm font-bold">
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
}

export function BranchPanel() {
  return (
    <div className="flex min-h-[300px] sm:min-h-[400px] w-full items-center rounded-[24px] border border-slate-700 bg-[#1d2533] p-6">
      <div className="grid w-full grid-cols-1 min-[420px]:grid-cols-2 gap-4">
        {[
          ['NEW YORK HUB', '$12,440.00', 'Daily Sales'],
          ['LONDON STORE', '£8,900.00', 'Daily Sales'],
          ['TOKYO BRANCH', '¥2,140,000', 'Daily Sales'],
          ['NEW BRANCH', 'Setup Pending', 'Coming Soon'],
        ].map(([name, value, note], i) => (
          <div
            key={name}
            className={`min-h-[87px] rounded-xl p-3 sm:p-4 ${i === 3 ? 'bg-orange-500 text-white' : 'bg-white text-slate-900'}`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-[10px] font-bold ${i === 3 ? 'text-orange-100' : 'text-slate-400'}`}
              >
                {name}
              </p>
              {i === 3 ? (
                <span className="text-xl leading-none">+</span>
              ) : (
                <i className="h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </div>
            <p className="mt-2 text-sm font-extrabold">{value}</p>
            <p className={`text-[10px] ${i === 3 ? 'text-orange-100' : 'text-slate-400'}`}>
              {note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportsPanel() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="min-h-[450px] w-full rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_28px_-18px_rgba(15,23,42,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-extrabold">Revenue Trends</h3>
        <span className="text-[10px] font-semibold text-slate-400">
          Monthly &nbsp; <b className="border-b border-orange-500 pb-1 text-orange-500">Weekly</b>
        </span>
      </div>
      <div className="relative ml-10 mt-9 h-[245px] border-b border-slate-400">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_24%,#e2e8f0_25%,transparent_26%,transparent_49%,#e2e8f0_50%,transparent_51%,transparent_74%,#e2e8f0_75%,transparent_76%)]" />
        <div className="absolute -left-8 inset-y-0 flex flex-col justify-between text-[10px] text-slate-500">
          <span>6000</span>
          <span>4000</span>
          <span>2000</span>
          <span>0</span>
        </div>
        <svg
          viewBox="0 0 500 190"
          className="absolute bottom-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fb7a3d" stopOpacity=".7" />
              <stop offset="1" stopColor="#fb7a3d" stopOpacity=".5" />
            </linearGradient>
          </defs>
          <path
            d="M0 150 L80 115 L160 130 L240 72 L320 86 L400 35 L500 8 L500 190 L0 190Z"
            fill="url(#chart-fill)"
          />
          <path
            d="M0 150 L80 115 L160 130 L240 72 L320 86 L400 35 L500 8"
            fill="none"
            stroke="#f55a0a"
            strokeWidth="3"
          />
          {[
            [0, 150],
            [80, 115],
            [160, 130],
            [240, 72],
            [320, 86],
            [400, 35],
            [500, 8],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.5" fill="#f55a0a" />
          ))}
        </svg>
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[10px] text-slate-600">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-4">
        {[
          ['TOTAL SALES', '$42.4k'],
          ['AVG. ORDER', '$288'],
          ['GROWTH', '+12%'],
        ].map(([label, value], i) => (
          <div
            key={label}
            className="h-[60px] rounded-xl border border-slate-100 bg-white p-3 text-center"
          >
            <p className="text-[9px] font-bold text-slate-400">{label}</p>
            <p className={`mt-1 text-sm font-extrabold ${i === 2 ? 'text-emerald-500' : ''}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniIcon() {
  return <Boxes className="h-5 w-5" />;
}
