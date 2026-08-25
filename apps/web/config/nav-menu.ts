import { PATH_URL } from "@/config/path";

export interface NavMenuItem {
  label: string;
  href: string;
}

export interface NavMenuCategory {
  label: string;
  items: NavMenuItem[];
}

export interface NavMenuConfig {
  href: string;
  categories: NavMenuCategory[];
}

export const STUDY_NAV_MENU: NavMenuConfig = {
  href: PATH_URL.STUDY,
  categories: [
    {
      label: "Huynh trưởng",
      items: [
        { label: "Kiên", href: "#" },
        { label: "Trì", href: "#" },
        { label: "Định", href: "#" },
        { label: "Lực", href: "#" },
      ],
    },
    {
      label: "Đoàn sinh",
      items: [
        { label: "Ngành Thanh", href: "#" },
        { label: "Ngành Thiếu", href: "#" },
        { label: "Ngành Đồng", href: "#" },
      ],
    },
  ],
};

export const TRAINING_NAV_MENU: NavMenuConfig = {
  href: PATH_URL.TRAINING,
  categories: [
    {
      label: "Huynh trưởng",
      items: [
        { label: "Trại Lộc Uyển", href: "#" },
        { label: "Trại A Dục", href: "#" },
        { label: "Trại Huyền Trang", href: "#" },
        { label: "Trại Vạn Hạnh", href: "#" },
      ],
    },
    {
      label: "Đoàn sinh",
      items: [
        { label: "Trại Tuyết Sơn", href: "#" },
        { label: "Trại Anoma – Ni Liên", href: "#" },
      ],
    },
  ],
};
