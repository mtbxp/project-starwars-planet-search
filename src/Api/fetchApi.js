export default async function fetchApi() {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await request.json();
  return results;
}
