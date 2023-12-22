import { SecondaryText, Subtitle } from './Typography';

export function SEPAFormSkeleton() {
  // Function to render a single skeleton input field
  const renderSkeletonField = () => (
    <div className="flex flex-col gap-y-1">
      <div className="h-4 w-1/4 rounded-md bg-gray-300"></div> {/* Placeholder for Label */}
      <div className="h-10 rounded-md bg-gray-300"></div> {/* Placeholder for Input/Select */}
    </div>
  );

  return (
    <div className="flex animate-pulse flex-col gap-y-8 p-4 sm:p-8">
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
        <div className="mt-8 h-10 rounded-md bg-gray-300"></div> {/* Placeholder for Button */}
      </div>
    </div>
  );
}
