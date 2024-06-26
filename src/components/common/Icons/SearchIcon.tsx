type SearchIconProps = {
  width?: string;
  height?: string;
};

const SearchIcon = ({ width, height }: SearchIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="6" stroke="#222222" stroke-width="2" />
      <path
        d="M20 20L17 17"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
