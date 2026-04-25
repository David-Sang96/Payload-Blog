// media is Media = If this function returns true → treat media as Media type ( "media is of type Media" )
// Type guard = runtime check + type hint for TypeScript
// function mediaIsObject(media: number | Media): media is Media {
// return typeof media === "object" && media !== null && "id" in media;
//   return typeof media !== "number";
// }

export function relationIsObject<T>(relation: number | T): relation is T {
  return typeof relation !== "number";
}

export function formatRole(role: string) {
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
