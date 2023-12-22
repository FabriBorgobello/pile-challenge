import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';

import { Button } from './Button';
import { PrimaryText, SecondaryText } from './Typography';
import { formatCurrency } from '../utils';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useAccount } from '../hooks/useAccounts';

interface FilterValues {
  minBalance: number;
  maxBalance: number;
}

export function FilterPopover() {
  const { data } = useAccount();
  const methods = useForm<FilterValues>({
    values: {
      minBalance: 0,
      maxBalance: data?.highestBalance || 0,
    },
  });

  function onSubmit(data: FilterValues) {
    console.log(data);
  }
  console.log(methods.watch());

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="text">Filter</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 "
          sideOffset={5}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <BalanceFilter />
              <Button className="mt-6 w-full text-xs" type="submit">
                Apply
              </Button>
            </form>
          </FormProvider>
          <Popover.Close
            className="absolute right-1 top-0 cursor-pointer rounded-full p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
            aria-label="Close"
          >
            X
          </Popover.Close>
          <Popover.Arrow className="fill-gray-100 dark:fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function BalanceFilter() {
  const { data } = useAccount();
  const methods = useFormContext();
  const min = 0;
  const max = data?.highestBalance || 0;

  return (
    <div>
      <PrimaryText className="mb-4 text-black dark:text-white">By account balance:</PrimaryText>
      <div className="mb-6 flex flex-col justify-between text-black dark:text-white">
        <div className="flex justify-between">
          <SecondaryText>Min</SecondaryText>
          <SecondaryText>{formatCurrency(methods.watch('minBalance'), 'EUR')}</SecondaryText>
        </div>
        <div className="flex justify-between">
          <SecondaryText>Max</SecondaryText>
          <SecondaryText>{formatCurrency(methods.watch('maxBalance'), 'EUR')}</SecondaryText>
        </div>
      </div>
      <Slider.Root
        onValueChange={(value) => {
          methods.setValue('minBalance', value[0]);
          methods.setValue('maxBalance', value[1]);
        }}
        value={[methods.watch('minBalance'), methods.watch('maxBalance')]}
        className="relative flex h-5 w-[200px] touch-none select-none items-center"
        min={min}
        max={max}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-200 dark:bg-gray-600">
          <Slider.Range className="absolute h-full rounded-full bg-black dark:bg-indigo-200" />
        </Slider.Track>

        <Slider.Thumb
          className="hover:bg-violet3 block h-4 w-4 cursor-pointer rounded-[10px] bg-indigo-700 shadow shadow-indigo-900"
          aria-label="Minimum account balance"
        />
        <Slider.Thumb
          className="hover:bg-violet3 block h-4 w-4 cursor-pointer rounded-[10px] bg-indigo-700 shadow shadow-indigo-900"
          aria-label="Max account balance"
        />
      </Slider.Root>
      <div className="flex w-full justify-between pt-1">
        <span className="text-sm text-black opacity-60 dark:text-white">{min}</span>
        <span className="text-sm text-black opacity-60 dark:text-white">{max}</span>
      </div>
    </div>
  );
}
