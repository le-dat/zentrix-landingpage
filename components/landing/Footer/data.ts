import { SiFacebook, SiX, SiInstagram, SiThreads } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";
import type { FooterLinkGroup, Social } from "@/types";

export const footerLinks: FooterLinkGroup = {
  Resources: ["Examples", "Community", "Guides", "Docs", "Press"],
  Legal: ["Privacy", "Terms", "Security"],
};

export const socials: Social[] = [
  { Icon: SiFacebook, label: "Facebook", href: "https://www.facebook.com/zentrix6868" },
  { Icon: SiX, label: "X", href: "https://x.com/Zentrixfund" },
  { Icon: SiInstagram, label: "Instagram", href: "https://www.instagram.com/zentrixfund" },
  { Icon: SiThreads, label: "Threads", href: "https://www.threads.com/@zentrixfund" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/zentrix6886" },
  { Icon: SiTelegram, label: "Telegram", href: "https://t.me/zentrix6868" },
];
