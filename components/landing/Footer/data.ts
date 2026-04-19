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

export type FooterLinkItem = {
  key: string;
  labelKey: string;
  modalContentKey?: "modal.infoModal.aboutUs" | "modal.infoModal.privacyPolicy" | "modal.infoModal.riskWarning";
};

export const footerLinkCategories = [
  { titleKey: "footer.legal" },
];

export const legalLinksItems: FooterLinkItem[] = [
  { key: "privacyPolicy", labelKey: "footer.privacyPolicy", modalContentKey: "modal.infoModal.privacyPolicy" },
  // { key: "termsOfService", labelKey: "footer.termsOfService" },
  // { key: "security", labelKey: "footer.security" },
  { key: "aboutUs", labelKey: "footer.aboutUs", modalContentKey: "modal.infoModal.aboutUs" },
  { key: "riskWarning", labelKey: "footer.riskWarning", modalContentKey: "modal.infoModal.riskWarning" },
];