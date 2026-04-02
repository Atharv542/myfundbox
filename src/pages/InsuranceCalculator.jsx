import { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
} from 'recharts';
import {
  Calculator, TrendingUp, Shield, IndianRupee, Target, Landmark,
  FileText, Phone, HelpCircle, AlertTriangle, CheckCircle2, XCircle,
  Zap, BarChart3, ChevronDown,
} from 'lucide-react';

// ==================== CALCULATION FUNCTIONS ====================
const calculateSimple = (monthlyIncome) => {
  const annualIncome = monthlyIncome * 12;
  const insuranceRequired = monthlyIncome * 200;
  return { annualIncome, insuranceRequired };
};

const calculateAdvanced = (inputs) => {
  const {
    monthlyIncome,
    salaryGrowthRate,
    inflationRate,
    financialGoals,
    assets,
    liabilities,
    existingCover,
  } = inputs;

  const annualIncome = monthlyIncome * 12;
  const growthDecimal = salaryGrowthRate / 100;
  const inflationDecimal = inflationRate / 100;
 let realRate = (1 + growthDecimal) / (1 + inflationDecimal) - 1;

  let incomeReplacement;
  let warning = null;

  if (realRate <= 0) {
    incomeReplacement = monthlyIncome * 200;
    warning = "Your salary growth is lower than inflation. Using 20× multiplier as fallback.";
  } else {
    const years = 20;
    //incomeReplacement = annualIncome * ((1 - Math.pow(1 + realRate, -years)) / realRate);
    incomeReplacement = Math.round(annualIncome / realRate);
  }

  
 const totalRequired = Math.round(
  incomeReplacement +
  financialGoals +
  liabilities -
  assets
);
  const gap = Math.max(0, totalRequired - existingCover);

  const breakdown = [
    { name: 'Income Replacement', value: incomeReplacement },
    { name: 'Financial Goals', value: financialGoals },
    
  ].filter(item => item.value > 0);

  return {
    annualIncome,
    realRate,
    incomeReplacement: incomeReplacement,
    totalRequired,
    gap,
    breakdown,
    warning,
  };
};

const scrollToContact = () => {
  const section = document.getElementById('contact');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCurrencyShort = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

// ==================== CHART COLORS ====================
const CHART_COLORS = [
  '#d97706', // amber-600 (gold)
  '#1e3a5f', // navy
  '#fbbf24', // amber-400 (gold-light)
];

// ==================== TOOLTIP COMPONENT ====================
const TooltipWrapper = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs bg-gray-900 text-white rounded-lg shadow-lg max-w-[250px] whitespace-normal">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

// ==================== INPUT COMPONENT ====================
const InputWithIcon = ({
  icon: Icon, label, value, onChange, tooltip, prefix = '₹', suffix,
  min = 0, max, step = 1, showSlider = false,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-amber-600" />
      <label className="text-sm font-medium text-gray-800">{label}</label>
      {tooltip && (
        <TooltipWrapper content={tooltip}>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help" />
        </TooltipWrapper>
      )}
    </div>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{prefix}</span>
      )}
      <input
        type="number"
        value={value || ''}
        onChange={e => onChange(Number(e.target.value) || 0)}
        className={`w-full h-10 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${prefix ? 'pl-8' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'}`}
        min={min}
        max={max}
        step={step}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{suffix}</span>
      )}
    </div>
    {showSlider && max && (
      <input
        type="range"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
      />
    )}
  </div>
);

// ==================== TABS COMPONENT ====================
const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="tabs-container" data-active={activeTab}>
      {typeof children === 'function' ? children({ activeTab, setActiveTab }) : children}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const InsuranceCalculatorSection = () => {
  const [activeTab, setActiveTab] = useState('simple');

  // Simple calculator state
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const simpleResult = useMemo(() => calculateSimple(monthlyIncome), [monthlyIncome]);

  // Advanced calculator state
  const [advInputs, setAdvInputs] = useState({
    monthlyIncome: 75000,
    salaryGrowthRate: 8,
    inflationRate: 6,
    financialGoals: 5000000,
    assets: 2000000,
    liabilities: 1500000,
    existingCover: 2500000,
  });
  const advResult = useMemo(() => calculateAdvanced(advInputs), [advInputs]);
  const setAdv = (key, value) => setAdvInputs(prev => ({ ...prev, [key]: value }));

  const isUnderinsured = advResult.totalRequired > advInputs.existingCover * 2;

  const barData = [
    { name: 'Required', value: advResult.totalRequired, fill: '#d97706' },
    { name: 'Existing', value: advInputs.existingCover, fill: '#1e3a5f' },
  ];

  const insights = useMemo(() => {
    const list = [];
    if (isUnderinsured) list.push("⚠️ You are significantly underinsured. Consider increasing your cover.");
    if (advResult.incomeReplacement > advResult.totalRequired * 0.5)
      list.push("💡 Major portion of your requirement comes from income replacement.");
    if (advResult.gap > 5000000) list.push("📈 Consider a term plan with a cover of at least " + formatCurrency(advResult.totalRequired));
    if (advInputs.liabilities > advInputs.assets) list.push("🏦 Your liabilities exceed your assets. Prioritise debt reduction alongside insurance.");
    return list;
  }, [advResult, advInputs, isUnderinsured]);

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a5f 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            Insurance Calculator
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 mb-4">
            How Much Life Insurance Do You{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Really Need?
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Get a quick estimate or a precise financial calculation in seconds
          </p>
          <ChevronDown className="h-5 w-5 text-amber-600 mx-auto mt-6 animate-bounce" />
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* Tab List */}
          <div className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12 bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('simple')}
              className={`flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'simple' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Zap className="h-4 w-4" /> Quick Estimate
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'advanced' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Advanced
            </button>
          </div>

          {/* Simple Tab Content */}
          {activeTab === 'simple' && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Input Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <div className="p-6 md:p-8 space-y-6">
                  <InputWithIcon
                    icon={IndianRupee} 
                    label="Monthly Contribution to Family"
                    value={monthlyIncome} 
                    onChange={setMonthlyIncome}
                    showSlider 
                    min={10000} 
                    max={1000000} 
                    step={5000}
                  />
                  <div className="p-4 rounded-lg bg-gray-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Annual Income</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(simpleResult.annualIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Multiplier</span>
                      <span className="font-semibold text-gray-800">200×</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">Based on industry thumb rule (200× montly contribution in family)</p>
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-xl shadow-2xl lg:sticky lg:top-24">
                <div className="p-8 md:p-10 text-center space-y-4">
                  <Shield className="h-12 w-12 mx-auto text-amber-400" />
                  <p className="text-sm text-amber-400 font-medium uppercase tracking-wider">You Need</p>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-white">
                    {formatCurrency(simpleResult.insuranceRequired)}
                  </p>
                  <p className="text-sm text-white/70">Term Insurance Cover</p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    {/* <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <FileText className="h-4 w-4" /> Download Report
                    </button> */}
                    <button  onClick={scrollToContact} className="flex-1 cursor-pointer border border-white/30 text-white hover:bg-white/10 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <Phone className="h-4 w-4" /> Get Expert Advice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tab Content */}
          {activeTab === 'advanced' && (
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Inputs Card - 3 cols */}
              <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <div className="p-6 md:p-8">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputWithIcon 
                      icon={IndianRupee} 
                      label="Monthly Contribution to Family" 
                      value={advInputs.monthlyIncome}
                      onChange={v => setAdv('monthlyIncome', v)} 
                      showSlider 
                      min={10000} 
                      max={1000000} 
                      step={5000} 
                    />
                    <InputWithIcon 
                      icon={TrendingUp} 
                      label="Expected Salary Growth Rate" 
                      value={advInputs.salaryGrowthRate}
                      onChange={v => setAdv('salaryGrowthRate', v)} 
                      prefix="" 
                      suffix="%" 
                      min={0} 
                      max={25} 
                      step={0.5}
                      showSlider 
                      tooltip="Expected annual increase in your salary" 
                    />
                    <InputWithIcon 
                      icon={TrendingUp} 
                      label="Inflation Rate" 
                      value={advInputs.inflationRate}
                      onChange={v => setAdv('inflationRate', v)} 
                      prefix="" 
                      suffix="%" 
                      min={0} 
                      max={20} 
                      step={0.5}
                      showSlider 
                      tooltip="Average rate at which prices increase yearly" 
                    />
                    <InputWithIcon 
                      icon={Target} 
                      label="Financial Goals" 
                      value={advInputs.financialGoals}
                      onChange={v => setAdv('financialGoals', v)} 
                      tooltip="Children's education, home purchase, etc." 
                    />
                    <InputWithIcon 
                      icon={Landmark} 
                      label="Total Assets" 
                      value={advInputs.assets}
                      onChange={v => setAdv('assets', v)} 
                      tooltip="Savings, investments, property value" 
                    />
                    <InputWithIcon 
                      icon={Landmark} 
                      label="Total Liabilities" 
                      value={advInputs.liabilities}
                      onChange={v => setAdv('liabilities', v)} 
                      tooltip="Home loan, car loan, other debts" 
                    />
                    <div className="sm:col-span-2">
                      <InputWithIcon 
                        icon={Shield} 
                        label="Existing Insurance Cover" 
                        value={advInputs.existingCover}
                        onChange={v => setAdv('existingCover', v)} 
                        showSlider 
                        min={0} 
                        max={50000000} 
                        step={500000} 
                      />
                    </div>
                  </div>

                  {/* Real Rate Info */}
                  <div className="mt-6 p-4 rounded-lg bg-gray-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        Real Rate
                        <TooltipWrapper content="Real Rate = ((1 + Growth) / (1 + Inflation)) − 1. Represents your actual earning power after inflation.">
                          <HelpCircle className="h-3 w-3 cursor-help" />
                        </TooltipWrapper>
                      </span>
                      <span className="font-semibold text-gray-800">{(advResult.realRate * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Annual Income</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(advResult.annualIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Income Replacement Value</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(advResult.incomeReplacement)}</span>
                    </div>
                  </div>

                  {advResult.warning && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-red-600">{advResult.warning}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Results - 2 cols */}
              <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
                {/* Main Result Card */}
                <div className={`rounded-xl shadow-2xl ${'bg-gradient-to-br from-slate-800 to-slate-700'
                } text-white`}>
                  <div className="p-6 md:p-8 text-center space-y-3">
                   
                       <CheckCircle2 className="h-10 w-10 mx-auto text-amber-400" />
                    
                    <p className="text-xs uppercase tracking-widest text-white/70">You Need</p>
                    <p className="text-3xl md:text-4xl font-serif font-bold">{formatCurrency(advResult.totalRequired)}</p>
                    <p className="text-sm text-white/70">Term Insurance Cover</p>
                    <div className="h-px bg-white/20 my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Current Gap<span className='text-[12px] text-amber-400 bold italic mx-1'>(Total Need - Existing Insurance Cover)</span></span>
                      <span className="font-semibold">{formatCurrency(advResult.gap)}</span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      isUnderinsured 
                        ? 'bg-white/20 text-white' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {isUnderinsured ? '⚠️ Underinsured' : '✅ Adequately Covered'}
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                {advResult.breakdown.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                    <div className="p-5">
                      <p className="text-sm font-semibold text-gray-800 mb-3">Requirement Breakdown</p>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie 
                              data={advResult.breakdown} 
                              dataKey="value" 
                              nameKey="name" 
                              cx="50%" 
                              cy="50%"
                              outerRadius={70} 
                              innerRadius={40} 
                              paddingAngle={3} 
                              strokeWidth={0}
                            >
                              {advResult.breakdown.map((_, i) => (
                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                            <Legend iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bar Chart */}
                {/* <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                  <div className="p-5">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Required vs Existing</p>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" tickFormatter={v => formatCurrencyShort(v)} tick={{ fontSize: 11 }} />
                          <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 12 }} />
                          <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                            {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div> */}

                {/* Insights */}
                {/* {insights.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-lg">
                    <div className="p-5 space-y-2">
                      <p className="text-sm font-semibold text-gray-800">Smart Insights</p>
                      {insights.map((ins, i) => (
                        <p key={i} className="text-sm text-gray-600">{ins}</p>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors h-11">
                    <FileText className="h-4 w-4" /> Download Report
                  </button> */}
                  <button onClick={scrollToContact} className="flex-1 cursor-pointer border border-slate-800/30 text-slate-800 hover:bg-slate-800/5 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors h-11">
                    <Phone className="h-4 w-4" /> Get Expert Advice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsuranceCalculatorSection;
