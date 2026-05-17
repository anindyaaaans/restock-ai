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
                  ? 'text-white border-2'
                  : step.number === currentStep
                  ? 'text-white border-2'
                  : 'text-gray-500 border'
              }`}
              style={
                step.number < currentStep
                  ? {
                      background: '#00FF7F',
                      borderColor: '#00FF7F',
                      boxShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
                    }
                  : step.number === currentStep
                  ? {
                      background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                      borderColor: '#00FF7F',
                      boxShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
                    }
                  : {
                      background: '#1a1a1a',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }
              }
            >
              {step.number < currentStep ? <Check size={24} /> : step.number}
            </div>
            <p className="text-xs mt-2 text-[#E8E8E8]">{step.label}</p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className="w-10 h-px mb-6"
              style={{
                background:
                  step.number < currentStep
                    ? '#00FF7F'
                    : 'rgba(255, 255, 255, 0.2)'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
