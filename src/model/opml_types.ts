export interface Root {
  opml: Opml;
}

export interface Opml {
  $: GeneratedType;
  head: Head[];
  body: Body[];
}

export interface GeneratedType {
  version: string;
}

export interface Head {
  title: string[];
}

export interface Body {
  outline: Outline[];
}

export interface Outline {
  $: GeneratedType2;
  outline: Outline2[];
}

export interface GeneratedType2 {
  text: string;
}

export interface Outline2 {
  $: GeneratedType3;
  outline?: Outline3[];
}

export interface GeneratedType3 {
  type: string;
  overcastId?: string;
  text?: string;
  title: string;
  xmlUrl?: string;
  htmlUrl?: string;
  subscribed?: string;
  notifications?: string;
  smart?: string;
  sorting?: string;
  sortedEpisodeIds?: string;
  includePodcastIds?: string;
}

export interface Outline3 {
  $: GeneratedType4;
}

export interface GeneratedType4 {
  type: string;
  overcastId: string;
  pubDate: string;
  title: string;
  url: string;
  overcastUrl: string;
  enclosureUrl: string;
  userUpdatedDate: string;
  progress?: string;
  played?: string;
  userRecommendedDate?: string;
  userDeleted?: string;
}
