import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { href: "mailto:example@email.com", src: "/icons/icon-email.svg", alt: "메일 문의" },
    {
      href: "https://www.facebook.com/?locale=ko_KR",
      src: "/icons/icon-facebook.svg",
      alt: "페이스북",
    },
    { href: "https://www.instagram.com/", src: "/icons/icon-instagram.svg", alt: "인스타그램" },
  ];

  return (
    <>
      <div className="tablet:h-[100px] tablet:flex-row pc:px-[140px] tablet:px-10 tablet:mt-40 mt-28 flex flex-col items-center justify-between border-t border-t-[rgba(23,23,23,0.6)] pt-8">
        <p>©codeit - 2023</p>
        <div className="flex gap-8">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">FAQ</Link>
        </div>
        <div className="tablet:py-0 flex gap-4 py-16">
          {socialLinks.map(({ href, src, alt }) => (
            <a key={href} href={href} target="_blank" rel="">
              <Image src={src} alt={alt} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
