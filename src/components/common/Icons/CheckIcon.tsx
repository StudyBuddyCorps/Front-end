type CheckIconProps = {
  width?: string;
  height: string;
  color: string;
};

const CheckIcon = ({ width, height, color }: CheckIconProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="10" fill={color} />
      <path
        d="M10.625 13.75L14.2689 17.3939C14.3275 17.4525 14.4225 17.4525 14.4811 17.3939L24.375 7.5"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M24.3199 13.1589C24.7406 15.2885 24.4193 17.4978 23.4095 19.4193C22.3997 21.3408 20.7624 22.8585 18.77 23.7199C16.7776 24.5813 14.5502 24.7344 12.4587 24.1538C10.3671 23.5731 8.5375 22.2937 7.27431 20.5284C6.01111 18.7632 5.39053 16.6186 5.51584 14.4516C5.64116 12.2845 6.50481 10.2257 7.96307 8.61787C9.42133 7.01 11.3862 5.95 13.5308 5.6143C15.6753 5.2786 17.8702 5.68743 19.75 6.77276"
        stroke="#212E42"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default CheckIcon;
