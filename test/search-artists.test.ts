import { searchArtists, similarArtists } from "../src/scraper/search";

test("test search artists", () => {
  expect.assertions(1);
  return searchArtists("black keys").then(artists => {
    expect(artists[0].name).toBe("The Black Keys");
  });
});

test("test similar artists", () => {
  expect.assertions(2);
  return searchArtists("black keys")
    .then(artists => similarArtists(artists[0]))
    .then(similarArtists => {
      expect(similarArtists.length).toBe(62);
      expect(similarArtists[0].name).toBe("The White Stripes");
    });
});
