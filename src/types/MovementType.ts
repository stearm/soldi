export enum MovementType {
  FOOD = "FOOD",
  PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT",
  FUEL = "FUEL",
  FUN = "FUN",
  MUTUO = "MUTUO",
  SPESE_CONDOMINIALI = "SPESE_CONDOMINIALI",
  STIPENDIO = "STIPENDIO",
  OTHER = "OTHER"
}

export const MovementInfoAndIcon: { [k in MovementType]: { icon: string; info: string } } = {
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
