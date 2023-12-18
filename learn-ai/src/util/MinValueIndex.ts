export default function getNameOfMinValue(props: {name: string,distance: number}[]): string {
  let minName = "";
  let minValue = props[0].distance;

  for (let i = 1; i < props.length; i++) {
    if (props[i].distance < minValue) {
      minValue = props[i].distance;
      minName = props[i].name;
    }
  }
  return minName;
}