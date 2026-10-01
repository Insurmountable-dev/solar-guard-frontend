import React from 'react';
import Button from './Button';

export default function WizardNavigation({
  currentStep = 1,
  totalSteps = 6,
  onBack,
  onNext,
  isNextDisabled = false,
  isSubmitting = false,
  nextLabel,
  backLabel = 'Back',
  showBack = true,
  className = '',
}) {
  const isFirstStep = currentStep === 1;
  const isFinalStep = currentStep === totalSteps;

  const resolvedNextLabel =
    nextLabel || (isFinalStep ? 'Complete Assessment' : 'Continue');

  return (
    <div
      className={`w-full bg-white border-t border-slate-200/80 py-3 px-6 flex items-center justify-between gap-4 sticky bottom-0 z-40 ${className}`}
    >
      {/* Back Button */}
      <div>
        {showBack && !isFirstStep ? (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            disabled={isSubmitting}
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>{backLabel}</span>
          </Button>
        ) : (
          <div />
        )}
      </div>

      {/* Step Indicator */}
      <div className="text-xs text-slate-400 font-medium hidden sm:block">
        Step {currentStep} of {totalSteps}
      </div>

      {/* Next / Submit Button */}
      <div>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          isLoading={isSubmitting}
        >
          <span>{resolvedNextLabel}</span>
          {!isSubmitting && !isFinalStep && (
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}