import { cn } from "@/lib/utils";

export default function TermsAndCondition({
  className,
}: {
  className?: string;
}) {
  return (
    <a
      href={"/Terms and Conditions for kubeFit 360.pdf"}
      download
      className={`${cn(
        "para-xl text-gray-tertiary hover:text-gray-secondary cursor-pointer",
        className
      )}`}
    >
      Terms & Condition
    </a>
  );
}
