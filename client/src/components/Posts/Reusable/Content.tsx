import { cn } from '@/lib/utils';
import Spliter from './Spliter';

interface ContentProps {
  text: string;
  imageLink?: string;
  className?: string;
}

export default function Content(props: ContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1 pr-5 mb-3 text-base hover:cursor-pointer text-start p-2',
        props.className,
      )}
    >
      <Spliter text={props.text} />
    </div>
  );
}
