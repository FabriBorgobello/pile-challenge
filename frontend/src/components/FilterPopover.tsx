import * as Popover from '@radix-ui/react-popover';
import { Button } from './Button';

export const FilterPopover = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button variant="text">Filters</Button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 "
        sideOffset={5}
      >
        <div>Hello</div>
        <Popover.Close
          className="absolute right-1 top-0 cursor-pointer rounded-full p-2 hover:bg-gray-200"
          aria-label="Close"
        >
          X
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
