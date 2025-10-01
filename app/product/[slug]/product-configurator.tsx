"use client"
import { useMemo, useState } from "react";

type AttributeOption = { label: string; priceDelta?: number };
type Attribute = { key: string; label: string; options: AttributeOption[] };
type Config = { attributes?: Attribute[]; leadTimeDays?: number };

export default function ProductConfigurator({ basePrice, config }: { basePrice: number; config?: Config }) {
    const attributes = useMemo(() => config?.attributes ?? [], [config]);
    const [selected, setSelected] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        for (const a of attributes) {
            initial[a.key] = a.options[0]?.label ?? "";
        }
        return initial;
    });

    const price = useMemo(() => {
        let p = basePrice;
        for (const a of attributes) {
            const chosen = selected[a.key];
            const opt = a.options.find((o) => o.label === chosen);
            if (opt?.priceDelta) p += Number(opt.priceDelta);
        }
        return p;
    }, [basePrice, attributes, selected]);

    return (
        <div>
            {attributes.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-5">
                    {attributes.map((a) => (
                        <Selector
                            key={a.key}
                            label={a.label}
                            value={selected[a.key]}
                            options={a.options.map((o) => o.label)}
                            onChange={(v) => setSelected((s) => ({ ...s, [a.key]: v }))}
                        />
                    ))}
                </div>
            )}

            <div className="mt-4 space-y-3">
                {typeof config?.leadTimeDays === "number" && (
                    <div className="flex items-center justify-between bg-[#f5f8fb] border border-[#e2ecf5] text-[var(--primaryColor)] rounded-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2 text-sm">
                            <i className="fi fi-br-alarm-clock mt-1.5"></i>
                            <span className="alibaba-bold">زمان انجام کار {config.leadTimeDays} روز کاری</span>
                        </div>
                    </div>
                )}
                <button className="w-full bg-[var(--primaryColor)] text-white rounded-2xl py-3 text-sm md:text-base">
                    ادامه و ثبت {price.toLocaleString("fa-IR")} تومان
                </button>
            </div>
        </div>
    );
}

function Selector({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button type="button" className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm bg-white flex items-center justify-between" onClick={() => setOpen((o) => !o)}>
                <span className="text-gray-700">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-900">{value}</span>
                    <i className="fi fi-rr-angle-small-down"></i>
                </div>
            </button>
            {open && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    {options.map((opt) => (
                        <button key={opt} type="button" className={`w-full text-right px-4 py-2 text-sm ${opt === value ? 'bg-gray-50' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


