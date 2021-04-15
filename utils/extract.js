export const extract = (str) => {
  let maxLength = 250;
  let trimmedString = str.substr(0, maxLength);
  if(str.length > trimmedString.length){
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return trimmedString
  }
}