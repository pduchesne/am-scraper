export class Artist {
  name: string;
  id: string;
  details?: {
    pictureURL?: string;
    genres?: string[];
  };

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
