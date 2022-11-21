export type tError = {
  [key in eError]: {
    error: {
      status: number;
      message: string;
    };
  };
};

export enum eError {
  "user400" = "user400",
  "user403" = "user403",
  "user404" = "user404",
  "server503" = "server503",
  "page404" = "page404",
}
