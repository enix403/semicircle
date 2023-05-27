export type UnitInfo = {
  code: string;

  majorLongName: string;
  majorShortName: string;
  minorLongName: string;
  minorShortName: string;

  divisions: number;
  naturalInterval: number;
};

const allUnits: UnitInfo[] = [
  {
    code: "pc",
    majorLongName: "Piece(s)",
    majorShortName: "pc",
    minorLongName: "",
    minorShortName: "",
    divisions: 0,
    naturalInterval: 0
  },
  {
    code: "kg",
    majorLongName: "Kilogram(s)",
    majorShortName: "kg",
    minorLongName: "Gram(s)",
    minorShortName: "gm",
    divisions: 1000,
    naturalInterval: 250
  }
];

export const UnitInfoM = ((<any>window).UnitInfoM = new (class {
  isCountable(u: UnitInfo) {
    return u.divisions == 0 || u.divisions == 1;
  }
  all = () => allUnits as readonly UnitInfo[];
})());

export type WholeQuantity = { wholeValue: number };
export type CompositeQuantity = {
  containers: number;
  majorUnits: number;
  minorUnits: number;
};

type CompleteQuantity<T> = {
  qty: T;
  unitInfo: UnitInfo;
};

export type CompleteWholeQuantity = CompleteQuantity<WholeQuantity>;
export type CompleteCompositeQuantity = CompleteQuantity<CompositeQuantity>;

export const QuantityM = ((<any>window).QuantityM = new (class {
  createC = (): CompositeQuantity => ({
    containers: 1,
    majorUnits: 0,
    minorUnits: 0
  });

  createW = (n: number = 0): WholeQuantity => ({
    wholeValue: n
  });

  simplifyC(ccq: CompleteCompositeQuantity) {
    const divisions = Math.max(1, ccq.unitInfo.divisions);

    let deltaMajor = Math.floor(ccq.qty.minorUnits / divisions);
    let minor = ccq.qty.minorUnits % divisions;

    ccq.qty.majorUnits += deltaMajor;
    ccq.qty.minorUnits = minor;
  }

  incrementC(ccq: CompleteCompositeQuantity, deltaMinor: number = 1) {
    // Make sure there is atleast 1 container
    ccq.qty.containers = Math.max(ccq.qty.containers, 1);

    if (UnitInfoM.isCountable(ccq.unitInfo)) {
      ccq.qty.majorUnits += deltaMinor;
    } else {
      ccq.qty.minorUnits += deltaMinor;
      this.simplifyC(ccq);
    }
  }

  incrementNaturalC(ccq: CompleteCompositeQuantity) {
    this.incrementC(ccq, ccq.unitInfo.naturalInterval);
  }

  convertCTW(ccq: CompleteCompositeQuantity): CompleteWholeQuantity {
    const { qty, unitInfo } = ccq;

    let withoutContainers =
      qty.majorUnits * unitInfo.divisions + qty.minorUnits;
    let total = withoutContainers * qty.containers;

    return {
      qty: this.createW(total),
      unitInfo: unitInfo
    };
  }

  convertWTC(cwq: CompleteWholeQuantity): CompleteCompositeQuantity {
    let ret: CompleteCompositeQuantity = {
      qty: this.createC(),
      unitInfo: cwq.unitInfo
    };
    this.incrementC(ret, cwq.qty.wholeValue);
    return ret;
  }
})());
