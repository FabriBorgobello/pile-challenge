import { SecondaryText, Subtitle } from './Typography';

export function SEPAFormSkeleton() {
  // Function to render a single skeleton input field
  const renderSkeletonField = () => (
    <div className="flex flex-col gap-y-1">
      <div className="h-4 bg-gray-300 rounded-md w-1/4"></div> {/* Placeholder for Label */}
      <div className="h-10 bg-gray-300 rounded-md"></div> {/* Placeholder for Input/Select */}
    </div>
  );

  return (
    <div className="flex flex-col gap-y-8 p-4 sm:p-8 animate-pulse">
      <div>
        <Subtitle>SEPA bank transfer</Subtitle>
        <SecondaryText>Send money to any bank account in the EU.</SecondaryText>
      </div>
      <div className="flex flex-col gap-y-4">
        {renderSkeletonField()} {/* From field */}
        {renderSkeletonField()} {/* Amount field */}
        {renderSkeletonField()} {/* Recipient name field */}
        {renderSkeletonField()} {/* IBAN field */}
        {renderSkeletonField()} {/* BIC field */}
        {renderSkeletonField()} {/* Reference field */}
        <div className="h-10 bg-gray-300 rounded-md mt-8"></div> {/* Placeholder for Button */}
      </div>
    </div>
  );
}
