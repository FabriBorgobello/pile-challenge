import { zodResolver } from '@hookform/resolvers/zod';
import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAccount } from '@/hooks/useAccounts';
import { accountQuerySchema } from '@/schemas/accountFilters.schema';
import { formatCurrency } from '@/utils';

import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { PrimaryText, SecondaryText } from './Typography';

interface FilterValues {
  minBalance: number;
  maxBalance: number;
}

export function FilterPopover() {
  const { highestBalance, applyFilters } = useAccount();
  const [open, setOpen] = useState(false);
  const methods = useForm<FilterValues>({
    values: {
      minBalance: 0,
      maxBalance: highestBalance || 0,
    },
    resolver: zodResolver(accountQuerySchema),
  });

  async function onSubmit(data: FilterValues) {
    try {
      applyFilters({ ...data });
      setOpen(false);
      toast.success('Filter applied');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="text">Filter</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[260px] rounded border border-gray-100 bg-white p-6 data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade dark:border-gray-700 dark:bg-gray-800 "
          data-testid="filter-popover"
          sideOffset={5}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <BalanceFilter />
              {/* NOTE: More filters could be easily added here just by adding more components and including them in the form */}
              <Button className="mt-6 w-full text-xs" type="submit">
                Apply
              </Button>
            </form>
          </FormProvider>
          <Popover.Close
            aria-label="Close"
            className="absolute right-1 top-0 cursor-pointer rounded-full p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
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
  const { highestBalance } = useAccount();
  const { watch, formState, setValue } = useFormContext();
  const min = 0;
  const max = highestBalance;

  return (
    <div>
      <PrimaryText className="mb-4 text-black dark:text-white">By account balance:</PrimaryText>
      <div className="mb-6 flex flex-col justify-between text-black dark:text-white">
        <div className="flex justify-between">
          <SecondaryText>Min</SecondaryText>
          <SecondaryText>{formatCurrency(watch('minBalance'), 'EUR')}</SecondaryText>
        </div>
        <div className="flex justify-between">
          <SecondaryText>Max</SecondaryText>
          <SecondaryText data-testid="max-balance">{formatCurrency(watch('maxBalance'), 'EUR')}</SecondaryText>
        </div>
      </div>
      <Slider.Root
        className="relative flex h-5 w-[200px] touch-none select-none items-center"
        max={max}
        min={min}
        minStepsBetweenThumbs={1}
        value={[watch('minBalance'), watch('maxBalance')]}
        onValueChange={(value) => {
          setValue('minBalance', value[0]);
          setValue('maxBalance', value[1]);
        }}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-200 dark:bg-gray-600">
          <Slider.Range
            className="absolute h-full rounded-full bg-black dark:bg-indigo-200"
            data-testid="filter-account-balance-slider"
          />
        </Slider.Track>

        <Slider.Thumb
          aria-label="Minimum account balance"
          className="hover:bg-violet3 block h-4 w-4 cursor-pointer rounded-[10px] bg-indigo-700 shadow shadow-indigo-900"
        />
        <Slider.Thumb
          aria-label="Max account balance"
          className="hover:bg-violet3 block h-4 w-4 cursor-pointer rounded-[10px] bg-indigo-700 shadow shadow-indigo-900"
        />
      </Slider.Root>
      <div className="flex w-full justify-between pt-1">
        <span className="text-sm text-black opacity-60 dark:text-white">{min}</span>
        <span className="text-sm text-black opacity-60 dark:text-white">{max}</span>
      </div>
      {formState.errors.minBalance && <ErrorMessage>{formState.errors.minBalance.message?.toString()}</ErrorMessage>}
      {formState.errors.maxBalance && <ErrorMessage>{formState.errors.maxBalance.message?.toString()}</ErrorMessage>}
    </div>
  );
}
