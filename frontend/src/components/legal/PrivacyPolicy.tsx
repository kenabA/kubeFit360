import { cn } from "@/lib/utils";

export default function PrivacyPolicy({ className }: { className?: string }) {
  return (
    <a
      href={"/Privacy Policy for kubeFit 360°.pdf"}
      download
      className={`${cn(
        "para-xl text-gray-tertiary hover:text-gray-secondary cursor-pointer",
        className
      )}`}
    >
      Privacy & Policy
    </a>
  );
}
