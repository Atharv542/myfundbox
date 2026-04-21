import { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell,
  ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
} from 'recharts';
import {
  Calculator, TrendingUp, Shield, IndianRupee, Target, Landmark,
  Phone, HelpCircle, AlertTriangle, CheckCircle2,
  Zap, BarChart3, ChevronDown, Clock,
} from 'lucide-react';

// ==================== CALCULATION FUNCTIONS ====================
const calculateSimple = (monthlyIncome) => {
  const annualIncome = monthlyIncome * 12;
  const insuranceRequired = monthlyIncome * 200;
  return { annualIncome, insuranceRequired };
};

const calculateAdvanced = (inputs) => {
  const {
    monthlyIncome, salaryGrowthRate, inflationRate,
    financialGoals, assets, liabilities, existingCover, yearsOfSupport,
  } = inputs;

  const annualIncome = monthlyIncome * 12;
  const growthDecimal = salaryGrowthRate / 100;
  const inflationDecimal = inflationRate / 100;
  let realRate = (1 + inflationDecimal) / (1 + growthDecimal) - 1;

  let incomeReplacement;
  const yearsToRetire = yearsOfSupport;
  if (Math.abs(realRate) < 0.0001) {
    incomeReplacement = annualIncome * yearsToRetire;
  } else {
    incomeReplacement =
      annualIncome *
      ((1 - Math.pow(1 + realRate, -yearsToRetire)) / realRate) *
      (1 + realRate);
  }

  const totalRequired = Math.round(incomeReplacement + financialGoals + liabilities - assets);
  const gap = Math.max(0, totalRequired - existingCover);
  const breakdown = [
    { name: 'Income Replacement', value: Math.round(incomeReplacement) },
    { name: 'Financial Goals',    value: financialGoals },
  ].filter((item) => item.value > 0);

  return { annualIncome, realRate, incomeReplacement, totalRequired, gap, breakdown };
};

const scrollToContact = () => {
  const section = document.getElementById('contact');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(value);

const CHART_COLORS = ['#16a34a', '#4ade80', '#bbf7d0'];

// ==================== TOOLTIP ====================
const TooltipWrapper = ({ children, content }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-gray-900 text-white rounded-lg shadow-lg max-w-[240px] whitespace-normal">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

// ==================== INPUT COMPONENT ====================
// Key fix: label row uses nowrap + ellipsis so it never breaks to next line
const InputWithIcon = ({
  icon: Icon, label, value, onChange, tooltip,
  prefix = '₹', suffix, min = 0, max, step = 1, showSlider = false,
}) => (
  <div className="space-y-1.5">
    {/* Label row — single line, no wrap */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <Icon style={{ flexShrink: 0, color: '#16a34a', width: 15, height: 15 }} />
      <label
        style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: '#374151',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
          minWidth: 0,
        }}
        title={label}
      >
        {label}
      </label>
      {tooltip && (
        <TooltipWrapper content={tooltip}>
          <HelpCircle style={{ flexShrink: 0, width: 13, height: 13, color: '#d1d5db', cursor: 'help' }} />
        </TooltipWrapper>
      )}
    </div>

    {/* Input */}
    <div style={{ position: 'relative' }}>
      {prefix && (
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#9ca3af', pointerEvents: 'none' }}>
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        style={{
          fontFamily: "'Poppins',sans-serif",
          width: '100%',
          height: 40,
          borderRadius: 10,
          border: '1.5px solid #e5e7eb',
          background: '#fff',
          color: '#111827',
          fontSize: 13,
          paddingLeft: prefix ? 28 : 12,
          paddingRight: suffix ? 36 : 12,
          outline: 'none',
          transition: 'border-color .2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = '#16a34a'}
        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        min={min} max={max} step={step}
      />
      {suffix && (
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#9ca3af', pointerEvents: 'none' }}>
          {suffix}
        </span>
      )}
    </div>

    {/* Slider */}
    {showSlider && max && (
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min} max={max} step={step}
        style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
      />
    )}
  </div>
);

// ==================== MAIN COMPONENT ====================
const InsuranceCalculatorSection = () => {
  const [activeTab, setActiveTab] = useState('simple');

  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const simpleResult = useMemo(() => calculateSimple(monthlyIncome), [monthlyIncome]);

  const [advInputs, setAdvInputs] = useState({
    monthlyIncome:    75000,
    salaryGrowthRate: 8,
    inflationRate:    6,
    financialGoals:   5000000,
    assets:           2000000,
    liabilities:      1500000,
    existingCover:    2500000,
    yearsOfSupport:   17,
  });
  const advResult = useMemo(() => calculateAdvanced(advInputs), [advInputs]);
  const setAdv = (key, value) => setAdvInputs((prev) => ({ ...prev, [key]: value }));
  const isUnderinsured = advResult.totalRequired > advInputs.existingCover * 2;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
    .calc-pf * { font-family: 'Poppins', sans-serif; }

    .calc-section {
      background: #f8fafb;
      background-image:
        radial-gradient(ellipse 55% 45% at 95% 5%,  rgba(209,250,229,0.55) 0%, transparent 60%),
        radial-gradient(ellipse 40% 35% at 5% 95%,  rgba(187,247,208,0.35) 0%, transparent 55%);
      padding: 96px 0 108px;
      position: relative;
      overflow: hidden;
    }
    .calc-dot-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(rgba(22,163,74,0.07) 1.5px, transparent 1.5px);
      background-size: 32px 32px;
    }
    .calc-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: #f0fdf4; border: 1px solid #bbf7d0;
      border-radius: 999px; padding: 6px 16px;
      font-size: 12px; font-weight: 600; color: #15803d;
      letter-spacing: .06em; text-transform: uppercase;
    }
    .calc-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }

    .tab-bar {
      display: grid; grid-template-columns: 1fr 1fr;
      background: #fff; border: 1.5px solid #e5e7eb;
      border-radius: 14px; padding: 5px; gap: 4px;
      max-width: 360px; margin: 0 auto 36px;
    }
    .tab-btn {
      display: flex; align-items: center; justify-content: center; gap: 7px;
      border-radius: 10px; padding: 9px 12px;
      font-size: 13.5px; font-weight: 600;
      border: none; cursor: pointer; transition: all .22s ease;
      font-family: 'Poppins', sans-serif;
    }
    .tab-btn-active   { background: linear-gradient(135deg, #16a34a, #15803d); color: #fff; box-shadow: 0 4px 14px rgba(22,163,74,0.30); }
    .tab-btn-inactive { background: transparent; color: #6b7280; }
    .tab-btn-inactive:hover { background: #f0fdf4; color: #16a34a; }

    .calc-card  { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .result-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 20px; box-shadow: 0 20px 50px rgba(15,23,42,0.22); color: #fff; }

    .cta-btn-outline {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      border: 1.5px solid #bbf7d0; background: #fff; color: #15803d;
      border-radius: 12px; padding: 11px 20px;
      font-size: 14px; font-weight: 600;
      cursor: pointer; transition: all .22s ease;
      font-family: 'Poppins', sans-serif; width: 100%;
    }
    .cta-btn-outline:hover { background: #f0fdf4; border-color: #16a34a; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(22,163,74,0.18); }

    .info-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 6px 0; }
    .info-label { color: #6b7280; font-weight: 400; }
    .info-val   { color: #0f172a; font-weight: 600; }

    .status-pill-warn { background: rgba(239,68,68,0.15); color: #ef4444; }
    .status-pill-ok   { background: rgba(22,163,74,0.15);  color: #16a34a; }
    .status-pill      { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; }

    /* 2-col input grid for advanced — min 260px so labels never get crushed */
    .adv-input-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px 24px;
    }
    .adv-input-full { grid-column: 1 / -1; }

    @media (max-width: 700px) {
      .adv-input-grid { grid-template-columns: 1fr; }
      .calc-section   { padding: 72px 0 80px; }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <section id="calculator" className="calc-section calc-pf">
        <div className="calc-dot-grid" />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="calc-badge" style={{ marginBottom: 16 }}>
              <span className="calc-badge-dot" />
              Insurance Calculator
            </div>
            <h2 style={{
              fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, color: '#0f172a',
              lineHeight: 1.15, letterSpacing: '-0.4px', marginBottom: 14,
            }}>
              How Much Life Insurance Do{' '}
              <span style={{
                background: 'linear-gradient(90deg, #15803d, #22c55e)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                You Really Need?
              </span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 15.5, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
              Get a quick estimate or a precise financial calculation in seconds.
            </p>
            <ChevronDown style={{ color: '#16a34a', margin: '18px auto 0', display: 'block', animation: 'bounce 1.5s infinite' }} size={20} />
          </div>

          {/* Tab switcher */}
          <div className="tab-bar">
            <button className={`tab-btn ${activeTab === 'simple' ? 'tab-btn-active' : 'tab-btn-inactive'}`} onClick={() => setActiveTab('simple')}>
              <Zap size={14} /> Quick Estimate
            </button>
            <button className={`tab-btn ${activeTab === 'advanced' ? 'tab-btn-active' : 'tab-btn-inactive'}`} onClick={() => setActiveTab('advanced')}>
              <BarChart3 size={14} /> Advanced
            </button>
          </div>

          {/* ══ SIMPLE TAB ══ */}
          {activeTab === 'simple' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, alignItems: 'start' }}>
              <div className="calc-card" style={{ padding: '32px 28px' }}>
                <InputWithIcon
                  icon={IndianRupee}
                  label="Monthly Contribution to Family"
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                  showSlider min={10000} max={1000000} step={5000}
                />
                <div style={{ marginTop: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 16px' }}>
                  <div className="info-row"><span className="info-label">Annual Income</span><span className="info-val">{formatCurrency(simpleResult.annualIncome)}</span></div>
                  <div className="info-row"><span className="info-label">Multiplier</span><span className="info-val">200×</span></div>
                </div>
                <p style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 12, fontStyle: 'italic' }}>
                  Based on industry thumb rule (200× monthly contribution to family)
                </p>
              </div>

              <div className="result-card" style={{ padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                  <Shield size={26} color="#4ade80" strokeWidth={2} />
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#4ade80', fontWeight: 600, marginBottom: 10 }}>Recommended Cover</p>
                <p style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                  {formatCurrency(simpleResult.insuranceRequired)}
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Term Insurance Cover</p>
                <button className="cta-btn-outline" onClick={scrollToContact}>
                  <Phone size={15} /> Get Expert Advice
                </button>
              </div>
            </div>
          )}

          {/* ══ ADVANCED TAB ══ */}
          {activeTab === 'advanced' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, alignItems: 'start' }}>

              {/* Input card — 2-col grid, each field gets enough room */}
              <div className="calc-card" style={{ padding: '32px 28px' }}>
                <div className="adv-input-grid">

                  <InputWithIcon
                    icon={IndianRupee} label="Monthly Contribution"
                    value={advInputs.monthlyIncome} onChange={(v) => setAdv('monthlyIncome', v)}
                    showSlider min={10000} max={1000000} step={5000}
                  />
                  <InputWithIcon
                    icon={Clock} label="Years of Support Needed"
                    value={advInputs.yearsOfSupport} onChange={(v) => setAdv('yearsOfSupport', v)}
                    prefix="" suffix="yrs" min={1} max={40} step={1} showSlider
                    tooltip="Number of years your family would need financial support — typically until your youngest dependent becomes financially independent"
                  />
                  <InputWithIcon
                    icon={TrendingUp} label="Salary Growth Rate"
                    value={advInputs.salaryGrowthRate} onChange={(v) => setAdv('salaryGrowthRate', v)}
                    prefix="" suffix="%" min={0} max={25} step={0.5} showSlider
                    tooltip="Expected annual increase in your salary"
                  />
                  <InputWithIcon
                    icon={TrendingUp} label="Inflation Rate"
                    value={advInputs.inflationRate} onChange={(v) => setAdv('inflationRate', v)}
                    prefix="" suffix="%" min={0} max={20} step={0.5} showSlider
                    tooltip="Average rate at which prices increase yearly"
                  />
                  <InputWithIcon
                    icon={Target} label="Financial Goals"
                    value={advInputs.financialGoals} onChange={(v) => setAdv('financialGoals', v)}
                    tooltip="Children's education, home purchase, etc."
                  />
                  <InputWithIcon
                    icon={Landmark} label="Total Assets"
                    value={advInputs.assets} onChange={(v) => setAdv('assets', v)}
                    tooltip="Savings, investments, property value"
                  />
                  <InputWithIcon
                    icon={Landmark} label="Total Liabilities"
                    value={advInputs.liabilities} onChange={(v) => setAdv('liabilities', v)}
                    tooltip="Home loan, car loan, other debts"
                  />
                  <InputWithIcon
                    icon={Shield} label="Existing Insurance Cover"
                    value={advInputs.existingCover} onChange={(v) => setAdv('existingCover', v)}
                    showSlider min={0} max={50000000} step={500000}
                  />

                </div>

                {/* Info box */}
                <div style={{ marginTop: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 16px' }}>
                  <div className="info-row">
                    <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      Real Rate
                      <TooltipWrapper content="Real Rate = ((1 + Growth) / (1 + Inflation)) − 1. Represents your actual earning power after inflation.">
                        <HelpCircle size={12} style={{ cursor: 'help', color: '#9ca3af' }} />
                      </TooltipWrapper>
                    </span>
                    <span className="info-val">{(advResult.realRate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Annual Income</span>
                    <span className="info-val">{formatCurrency(advResult.annualIncome)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Income Replacement Value</span>
                    <span className="info-val">{formatCurrency(advResult.incomeReplacement)}</span>
                  </div>
                </div>
              </div>

              {/* Results column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div className="result-card" style={{ padding: '32px 28px', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={24} color="#4ade80" strokeWidth={2} />
                  </div>
                  <p style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#4ade80', fontWeight: 600, marginBottom: 8 }}>Recommended Cover</p>
                  <p style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                    {formatCurrency(advResult.totalRequired)}
                  </p>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginBottom: 18 }}>Term Insurance Cover</p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14, marginBottom: 14 }}>
                    <div className="info-row" style={{ color: '#fff' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12.5 }}>
                        Current Gap
                        <span style={{ fontSize: 11, color: '#4ade80', marginLeft: 6, fontStyle: 'italic' }}>
                          (Total Need − Existing Cover)
                        </span>
                      </span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{formatCurrency(advResult.gap)}</span>
                    </div>
                  </div>

                  <span className={`status-pill ${isUnderinsured ? 'status-pill-warn' : 'status-pill-ok'}`}>
                    {isUnderinsured ? '⚠️ Underinsured' : '✅ Adequately Covered'}
                  </span>
                </div>

                {advResult.breakdown.length > 0 && (
                  <div className="calc-card" style={{ padding: '22px 20px' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Requirement Breakdown</p>
                    <div style={{ height: 190 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={advResult.breakdown} dataKey="value" nameKey="name"
                            cx="50%" cy="50%" outerRadius={72} innerRadius={42}
                            paddingAngle={3} strokeWidth={0}
                          >
                            {advResult.breakdown.map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(v) => formatCurrency(v)} />
                          <Legend iconSize={9} wrapperStyle={{ fontSize: 11, fontFamily: "'Poppins',sans-serif" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                <button className="cta-btn-outline" onClick={scrollToContact}>
                  <Phone size={15} /> Get Expert Advice
                </button>

              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default InsuranceCalculatorSection;