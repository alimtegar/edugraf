import { useState, useEffect, ButtonHTMLAttributes, } from 'react';
import classNames from 'classnames';

// Types
import { default as Props } from '../types/Button';

const Button = ({
    children,
    bgColor = 'gradient-to-tl from-blue-500 to-blue-400',
    bgColorOn = 'gradient-to-tl from-blue-600 to-blue-500',
    textColor = 'white',
    textColorOn = 'white',
    w = 'full',
    h = 12,
    borderR = 'full',
    borderW = 0,
    borderColor = 'current',
    shadow = 'none',
    center = false,
    isPing = false,
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
    // const bgColorOnArr = bgColorOn.split(' ').splice(1);
    const [bgColorOnClassNames, setBgColorOnClassNames] = useState({
        // [`active:bg-${bgColorOn}`]: bgColorOn,
        // [`hover:bg-${bgColorOn}`]: bgColorOn,
    });

    useEffect(() => {
        // setTimeout(() => {
            const bgColorOnArr = bgColorOn.split(' ').splice(1);

            if (bgColorOnArr.length > 1) {
                setBgColorOnClassNames(bgColorOnArr.reduce((obj, item, i) => ({
                    ...obj,
                    ['hover:' + item]: !!item,
                    ['active:' + item]: !!item,
                }), {}));
            }
        // }, 100000);
    }, [bgColorOn]);

    return (
        <button
            className={classNames('relative font-extrabold focus:outline-none hover:border-transparent transition duration-300', {
                'flex justify-center items-center': center,
                [`w-${w}`]: w,
                [`h-${h}`]: h,
                [`bg-${bgColor}`]: bgColor,
                [`text-${textColor}`]: textColor,
                [`active:text-${textColorOn}`]: textColorOn,
                [`hover:text-${textColorOn}`]: textColorOn,
                [`rounded-${borderR}`]: borderR,
                [`border-${borderW}`]: borderW,
                [`border-${borderColor}`]: borderColor,
                [`shadow-${shadow}`]: shadow,
                ...bgColorOnClassNames,
            })}
            {...props}
        >
            {isPing && (
                <span className={classNames('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', {
                    [`bg-${bgColor}`]: bgColor,
                })} />
            )}
            {isPing ? (
                <span className="relative z-10">{children}</span>
            ) : children}
        </button>
    );
};

export default Button;