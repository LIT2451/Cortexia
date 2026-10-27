// Photo sources. All photos are free Unsplash photos (Unsplash License: free for
// commercial use, attribution not required but kept here for reference).

export type ImageCredit = { file: string; source: string; author: string };

const unsplash = (slug: string) => `https://unsplash.com/photos/${slug}`;

export const imageCredits: ImageCredit[] = [
  {
    // Open Graph image (app/opengraph-image.jpg), cropped to 1200x630.
    file: "/opengraph-image.jpg",
    source: unsplash("modern-data-center-with-rows-of-white-server-cabinets-fImCPTZ026U"),
    author: "Tony Marinescu",
  },
  {
    file: "/images/home/service-custom-software.jpg",
    source: unsplash("people-coding-at-monitors-in-workspace-Im_cQ6hQo10"),
    author: "Compagnons",
  },
  {
    file: "/images/home/service-offshore-teams.jpg",
    source: unsplash("team-collaborating-around-a-computer-in-an-office-UikYLDQj9_I"),
    author: "Vitaly Gariev",
  },
  {
    file: "/images/home/service-telecom-platform.jpg",
    source: unsplash("man-using-ip-phone-inside-room-WEDDt-u3q3o"),
    author: "Berkeley Communications",
  },
  {
    file: "/images/home/about-engineering-team.jpg",
    source: unsplash("people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU"),
    author: "Marvin Meyer",
  },
  {
    file: "/images/home/ai-document-automation.jpg",
    source: unsplash("stacks-of-paper-documents-and-file-folders-snNHKZ-mGfE"),
    author: "Wesley Tingey",
  },
  {
    file: "/images/home/ai-support-copilot.jpg",
    source: unsplash("women-wearing-headsets-in-workspace-mHusyBu4bxM"),
    author: "Charanjeet Dhiman",
  },
  {
    file: "/images/home/ai-fleet-maintenance.jpg",
    source: unsplash("several-semi-trucks-parked-in-a-row-kuDtwayYiSA"),
    author: "Sijmen van Hooff",
  },
  {
    file: "/images/services/service-software-eng.jpg",
    source: unsplash("laptop-screen-displaying-colorful-code-8qEB0fTe9Vw"),
    author: "Mohammad Rahmani",
  },
  {
    file: "/images/services/service-odc-teams.jpg",
    source: unsplash("people-collaborating-in-modern-office-workspace-UpsEF48wAgk"),
    author: "Cherrydeck",
  },
  {
    file: "/images/services/service-telecom-network.jpg",
    source: unsplash("cable-network-M5tzZtFCOfs"),
    author: "Taylor Vick",
  },
  {
    file: "/images/services/service-mobile-app.jpg",
    source: unsplash("smartphone-and-laptop-workspace-xsGxhtAsfSA"),
    author: "Rahul Chakraborty",
  },
  {
    file: "/images/services/service-cloud-devops.jpg",
    source: unsplash("server-racks-in-data-center-klWUhr-wPJ8"),
    author: "imgix",
  },
  {
    file: "/images/services/service-security-maintenance.jpg",
    source: unsplash("red-padlock-on-black-computer-keyboard-mT7lXZPjk7U"),
    author: "FlyD",
  },
];
