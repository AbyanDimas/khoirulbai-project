export type PrayerTime = {
  name: string;
  time: string;
  passed: boolean;
  icon: JSX.Element;
};

export type PrayerSchedule = {
  today: PrayerTime[];
  tomorrow: PrayerTime[];
};

export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  category: string;
  image: string;
};

export type Service = {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
};

export type Tausyiah = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  type: 'video' | 'audio';
  views: string;
  image: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  type: 'video' | 'image';
};

export type Announcement = {
  id: number;
  title: string;
  date: string;
  content: string;
  important: boolean;
};

export type StatItem = {
  name: string;
  value: string;
  icon: JSX.Element;
};