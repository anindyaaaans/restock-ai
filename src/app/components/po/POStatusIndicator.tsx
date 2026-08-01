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
                step.id <= currentStep ? 'text-[#1A1A1B]' : 'text-[#4B5563]'
              }`}
              style={
                step.id <= currentStep
                  ? {
                      background: '#FFE16F',
                      boxShadow: '0 0 12px rgba(255, 225, 111, 0.5)'
                    }
                  : {
                      background: 'transparent',
                      border: '2px solid rgba(0, 0, 0, 0.1)'
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
            <p className="text-[9px] text-[#4B5563] mt-1 text-center">
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
                    ? '#D1F07B'
                    : 'rgba(0, 0, 0, 0.1)',
                borderTop: step.id < currentStep ? 'none' : '1px dashed rgba(0, 0, 0, 0.1)'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
