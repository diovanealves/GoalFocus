import { Href, Link } from "expo-router";

type LinkButtonProps = {
  title: string;
  href: Href<string | object>;
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
