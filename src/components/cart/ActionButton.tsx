'use client';

import Image from 'next/image';

const ACTION_ICON_CLASS =
  'm-auto block h-5 w-5 cursor-pointer transition-transform duration-100 active:scale-90';
const ACTION_LABEL_CLASS = 'text-[10px] font-semibold tracking-wider';

export interface ActionButtonProps {
  ariaLabel: string;
  iconSrc: string;
  label: string;
  onClick: () => void;
  title: string;
  leftIcon?: string;
}

export function ActionButton({
  ariaLabel,
  iconSrc,
  label,
  onClick,
  title,
  leftIcon,
}: ActionButtonProps) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} title={title}>
      {leftIcon && (
        <Image
          src={leftIcon}
          alt=""
          width={16}
          height={16}
          className="m-auto mr-1 inline h-4 w-4"
          aria-hidden
        />
      )}
      <Image
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        className={ACTION_ICON_CLASS}
        aria-hidden
      />
      <span aria-hidden className={ACTION_LABEL_CLASS}>
        {label}
      </span>
    </button>
  );
}
