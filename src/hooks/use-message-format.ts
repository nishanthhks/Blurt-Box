export default function useMessageFormat(str: string) {
  return str.split(" ").join("").split("||");
}
