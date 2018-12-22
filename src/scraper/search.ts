import { parse, HTMLElement } from "node-html-parser";
import { Artist } from "../model/model";
import axios from "axios";
import { SEARCH_ARTISTS, SEARCH_RELATED } from "./am";

/* function to use to proxify HTTP requests */
let proxifyUrlFunc: ((url: string) => string) | undefined = undefined;

/* sets the proxify function */
export function setProxifyUrlFunc(fn?: (url: string) => string) {
  proxifyUrlFunc = fn;
}

function proxifyUrl(url: string) {
  if (proxifyUrlFunc) return proxifyUrlFunc(url);
  else return url;
}

function parseArtistLink(artistLinkNode: HTMLElement): Artist {
  let result: Artist = {
    name: artistLinkNode.text,
    id: JSON.parse(artistLinkNode.attributes["data-tooltip"]).id
  };

  return result;
}

function parseArtist(artistNode: HTMLElement): Artist {
  let genresNode: HTMLElement = <HTMLElement>(
    artistNode.querySelector(".info .genres")
  );
  let photoNode: HTMLElement = <HTMLElement>(
    artistNode.querySelector(".photo img")
  );

  return {
    ...parseArtistLink(<HTMLElement>artistNode.querySelector(".info .name a")),
    details: {
      pictureURL: photoNode && photoNode.attributes["src"],
      genres: genresNode && genresNode.text.trim().split(",")
    }
  };
}

export function searchArtists(q: string): Promise<Artist[]> {
  let searchUrl = SEARCH_ARTISTS(q);

  let parsedResult: Promise<Artist[]> = axios
    .get(proxifyUrl(searchUrl), {
      // XSS is not supported - proxy must be used when in a browser
      //headers: { "Access-Control-Allow-Origin": "*" }
    })
    .then(response => {
      return parse(response.data)
        .querySelectorAll(".search-results .artist")
        .map(artistNode => parseArtist(artistNode as HTMLElement));
    });

  return parsedResult;
}

export function similarArtists(a: Artist): Promise<Artist[]> {
  let searchUrl = SEARCH_RELATED(a.id);

  let parsedResult: Promise<Artist[]> = axios
    .get(proxifyUrl(searchUrl), {
      //headers: { "Access-Control-Allow-Origin": "*" }
    })
    .then(e =>
      parse(e.data)
        .querySelectorAll(".related.similars li a")
        .map(artistLinkNode => parseArtistLink(artistLinkNode as HTMLElement))
    );

  return parsedResult;
}
