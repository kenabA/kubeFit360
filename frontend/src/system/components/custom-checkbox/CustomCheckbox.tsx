export default function CustomCheckbox({
  checked,
  handleOnChange,
}: {
  checked: boolean;
  handleOnChange: () => void;
}) {
  return (
    <div className="relative size-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        className="peer appearance-none relative border border-primary rounded cursor-pointer size-full bg-white checked:bg-primary"
      />
      <svg
        className="invisible pointer-events-none peer-checked:visible absolute top-0 right-0 translate-y-[50%] -translate-x-[20%]"
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6673 1L4.25065 7.41667L1.33398 4.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
