import Image from "next/image";
import Link from "next/link";

export const PortableTextComponent = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-4">
          <Image
            src={value.asset.url}
            alt={value.alt || " "}
            width={600}
            height={300}
            className="rounded-md"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value.href || "#";
      return (
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base text-lg mt-6 font-semibold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-md mt-4 font-semibold mb-4">{children}</h3>,
    normal: ({ children }) => <p className="text-sm mb-2 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 text-sm mb-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 text-sm mb-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};
