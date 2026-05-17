import { Check } from 'lucide-react';

interface POStatusIndicatorProps {
  currentStep: number;
}

export default function POStatusIndicator({ currentStep }: POStatusIndicatorProps) {
  const steps = [
    { id: 1, label: 'Draft' },
    { id: 2, label: 'Dikirim' },
    { id: 3, label: 'Dikonfirmasi' },
    { id: 4, label: 'Dikirim' },
    { id: 5, label: 'Diterima' }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                step.id <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
              style={
                step.id <= currentStep
                  ? {
                      background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                      boxShadow: '0 0 12px rgba(74, 16, 99, 0.5)'
                    }
                  : {
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }
              }
            >
              {step.id < currentStep ? (
                <Check size={14} />
              ) : (
                <span className="text-xs font-bold">{step.id}</span>
              )}
            </div>
            {/* Label */}
            <p className="text-[9px] text-[#E8E8E8] mt-1 text-center">
              {step.label}
            </p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className="flex-1 h-px mx-2 mb-4"
              style={{
                background:
                  step.id < currentStep
                    ? '#00FF7F'
                    : 'rgba(255, 255, 255, 0.2)',
                borderTop: step.id < currentStep ? 'none' : '1px dashed rgba(255, 255, 255, 0.2)'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
