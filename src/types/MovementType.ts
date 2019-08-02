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

export const MovementInfoAndIcon: { [k in MovementType]: { icon: string; info: string; color: string } } = {
  [MovementType.FOOD]: {
    icon: "im-pizza",
    info: "Food",
    color: "#7285a5"
  },
  [MovementType.PUBLIC_TRANSPORT]: {
    icon: "im-plane",
    info: "Public transport",
    color: "#4682b4"
  },
  [MovementType.FUEL]: {
    icon: "im-rocket",
    info: "Fuel",
    color: "#0e4d92"
  },
  [MovementType.FUN]: {
    icon: "im-gamepad",
    info: "Fun",
    color: "#b0dfe5"
  },
  [MovementType.MUTUO]: {
    icon: "im-bank",
    info: "Mutuo",
    color: "#1d2951"
  },
  [MovementType.SPESE_CONDOMINIALI]: {
    icon: "im-home",
    info: "Spese condominio",
    color: "#008ecc"
  },
  [MovementType.STIPENDIO]: {
    icon: "im-coin",
    info: "Stipendio",
    color: "#1f64d4"
  },
  [MovementType.OTHER]: {
    icon: "im-data",
    info: "Altro",
    color: "#3fe0d0"
  }
};
