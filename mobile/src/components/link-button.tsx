import { Link } from "expo-router";

type LinkButtonProps = {
  title: string;
  href: string;
};

export function LinkButton({ title, href }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="text-center border-2 border-white rounded-lg py-3 text-white mt-3"
    >
      {title}
    </Link>
  );
}
