import { SiFacebook, SiX, SiInstagram, SiThreads } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";
import type { Social } from "@/types";

export const socials: Social[] = [
  { Icon: SiFacebook, labelKey: "footer.socials.facebook", href: "https://www.facebook.com/zentrix6868" },
  { Icon: SiX, labelKey: "footer.socials.x", href: "https://x.com/Zentrixfund" },
  { Icon: SiInstagram, labelKey: "footer.socials.instagram", href: "https://www.instagram.com/zentrixfund" },
  { Icon: SiThreads, labelKey: "footer.socials.threads", href: "https://www.threads.com/@zentrixfund" },
  { Icon: FaLinkedin, labelKey: "footer.socials.linkedin", href: "https://www.linkedin.com/company/zentrix6886" },
  { Icon: SiTelegram, labelKey: "footer.socials.telegram", href: "https://t.me/zentrix6868" },
];

export const footerLinkCategories = [
  { titleKey: "footer.resources", linksKey: "footer.resourcesLinks" },
  { titleKey: "footer.legal", linksKey: "footer.legalLinks" },
];