export const timeSince = (date: Date) => {
  let seconds = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const getDetails = (text: string) => {
  const arr = text?.split(" ");
  const respIndex = arr?.indexOf("Responsopilities:\n");
  const compIndex = arr?.indexOf("\nCompensation");

  const desc = arr?.slice(0, respIndex).join(" ");
  const responsibilities = arr?.slice(respIndex + 1, compIndex).join(" ");
  const benefits = arr?.slice(compIndex + 3).join(" ");

  return { desc, responsibilities, benefits };
};

export const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getCountry = async (lat: number, long: number) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=Hannoverstr.&bias=proximity:${lat},${long}&format=json&apiKey=86f33369ddfc4a7aaf7bd6befbe71124`;
  let response = await fetch(url);
  let { results } = await response.json();
  return { city: results[0].city, country: results[0].country };
};
