import {forwardRef} from "react";

// eslint-disable-next-line react/display-name
export  const Power = forwardRef(({ position }, ref) => {
    return (
        <div 
            id = "power"
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '35px',
                height: '50px',
                backgroundColor: 'yellow',
            }}
        ></div>
    );
});
