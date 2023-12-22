import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';

import { Button } from './Button';
import { PrimaryText, SecondaryText } from './Typography';
import { formatCurrency } from '../utils';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useAccount } from '../hooks/useAccounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountQuerySchema } from '../schemas/accountFilters.schema';
import { ErrorMessage } from './ErrorMessage';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface FilterValues {
  minBalance: number;
  maxBalance: number;
}

export function FilterPopover() {
  const { data, fetchData } = useAccount();
  const [open, setOpen] = useState(false);
  const methods = useForm<FilterValues>({
    values: {
      minBalance: 0,
      maxBalance: data?.highestBalance || 0,
    },
    resolver: zodResolver(accountQuerySchema),
  });

  async function onSubmit(data: FilterValues) {
    try {
      await fetchData({
        minBalance: data.minBalance,
        maxBalance: data.maxBalance,
      });
      setOpen(false);
      toast.success('Filter applied');
    } catch (error) {
      console.error(error);
    }
  }
  console.log(methods.watch());

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
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
  const { watch, formState, setValue } = useFormContext();
  const min = 0;
  const max = data?.highestBalance || 0;

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
          <SecondaryText>{formatCurrency(watch('maxBalance'), 'EUR')}</SecondaryText>
        </div>
      </div>
      <Slider.Root
        onValueChange={(value) => {
          setValue('minBalance', value[0]);
          setValue('maxBalance', value[1]);
        }}
        value={[watch('minBalance'), watch('maxBalance')]}
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
      {formState.errors.minBalance && <ErrorMessage>{formState.errors.minBalance.message?.toString()}</ErrorMessage>}
      {formState.errors.maxBalance && <ErrorMessage>{formState.errors.maxBalance.message?.toString()}</ErrorMessage>}
    </div>
  );
}
