export enum MovementType {
  FOOD,
  PUBLIC_TRANSPORT,
  FUEL,
  FUN,
  MUTUO,
  SPESE_CONDOMINIALI,
  STIPENDIO,
  OTHER
}

export const MovementInfoAndIcon = {
  [MovementType.FOOD]: {
    icon: "im-pizza",
    info: "Food"
  },
  [MovementType.PUBLIC_TRANSPORT]: {
    icon: "im-plane",
    info: "Public transport"
  },
  [MovementType.FUEL]: {
    icon: "im-rocket",
    info: "Fuel"
  },
  [MovementType.FUN]: {
    icon: "im-gamepad",
    info: "Fun"
  },
  [MovementType.MUTUO]: {
    icon: "im-bank",
    info: "Mutuo"
  },
  [MovementType.SPESE_CONDOMINIALI]: {
    icon: "im-home",
    info: "Spese condominio"
  },
  [MovementType.STIPENDIO]: {
    icon: "im-coin",
    info: "Stipendio"
  },
  [MovementType.OTHER]: {
    icon: "im-data",
    info: "Altro"
  }
};
