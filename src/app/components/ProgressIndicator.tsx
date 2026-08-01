import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: 'Akun' },
    { number: 2, label: 'Profil Bisnis' },
    { number: 3, label: 'Koneksi POS' }
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                step.number < currentStep
                  ? 'text-[#1A1A1B] border-2'
                  : step.number === currentStep
                  ? 'text-[#1A1A1B] border-2'
                  : 'text-[#4B5563] border'
              }`}
              style={
                step.number < currentStep
                  ? {
                      background: '#D1F07B',
                      bordercolor: '#1A1A1B',
                      boxShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
                    }
                  : step.number === currentStep
                  ? {
                      background: '#FFE16F',
                      bordercolor: '#1A1A1B',
                      boxShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
                    }
                  : {
                      background: '#1a1a1a',
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    }
              }
            >
              {step.number < currentStep ? <Check size={24} /> : step.number}
            </div>
            <p className="text-xs mt-2 text-[#4B5563]">{step.label}</p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className="w-10 h-px mb-6"
              style={{
                background:
                  step.number < currentStep
                    ? '#D1F07B'
                    : 'rgba(0, 0, 0, 0.1)'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
