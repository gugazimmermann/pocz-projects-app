import { WarningIcon } from '../../icons';
import { WARNING_TYPES, warningTypes } from '../../libs';

export interface CalloutProps {
  type?: WARNING_TYPES;
  title: string;
  emphasis?: string;
  content?: string;
}

export function Callout({
  type, title, emphasis, content,
}: CalloutProps) {
  const {
    text, bg, bgOpacity, border,
  } = warningTypes(
    type || WARNING_TYPES.NONE,
  );

  return (
    <div className="container mx-auto m-2 relative flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded p-2 space-x-0 sm:space-x-2 shadow-md">
      <div className={`absolute inset-0 border-l-4 ${border} rounded-sm`} />
      <div className="flex space-x-4 items-center ">
        {type && (
          <div className="w-12">
            <div className={`h-12 w-12 flex justify-center items-center rounded-full p-2 ${bg} ${bgOpacity}`}>
              <WarningIcon styles={`w-auto ${text}`} />
            </div>
          </div>
        )}
        <div className="flex flex-col flex-grow text-center sm:text-left">
          <h1 className="font-medium leading-relaxed sm:leading-normal">
            {title}
            {' '}
            {emphasis && <strong className={text}>{emphasis}</strong>}
          </h1>
          {content && (
            <p className="leading-tight text-xs md:text-sm">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Callout;
