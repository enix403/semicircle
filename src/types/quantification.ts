import { failWithError } from "utils";

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
    naturalInterval: 1
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
  isCountable = (u: UnitInfo) => u.divisions == 0 || u.divisions == 1;
  all = () => allUnits as readonly UnitInfo[];
  fromCode = (code: UnitInfo["code"]) =>
    allUnits.find(u => u.code == code) ||
    failWithError(`Unit with code "${code.toString()}" not found`);
})());

export type WholeQuantity = {
  wholeValue: number;
};
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
  createC = (major: number = 0): CompositeQuantity => ({
    containers: 1,
    majorUnits: major,
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

    return ccq;
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

  incrementMajorC(ccq: CompleteCompositeQuantity, deltaMajor: number = 1) {
    ccq.qty.majorUnits += deltaMajor;
    this.simplifyC(ccq);
  }

  incrementContainerC(ccq: CompleteCompositeQuantity, deltaCont: number = 1) {
    ccq.qty.containers += deltaCont;
  }

  incrementNaturalC(ccq: CompleteCompositeQuantity) {
    this.incrementC(ccq, ccq.unitInfo.naturalInterval);
  }

  convertCTW(ccq: CompleteCompositeQuantity): CompleteWholeQuantity {
    const { qty, unitInfo } = ccq;

    let withoutContainers =
      qty.majorUnits * Math.max(unitInfo.divisions, 1) + qty.minorUnits;
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

  isZeroC(ccq: CompleteCompositeQuantity): boolean {
    return ccq.qty.majorUnits == 0 && ccq.qty.minorUnits == 0;
  }

  isZeroW(cwq: CompleteWholeQuantity): boolean {
    return cwq.qty.wholeValue == 0;
  }

  compareC(a: CompositeQuantity, b: CompositeQuantity): boolean {
    return (
      a.containers == b.containers &&
      a.majorUnits == b.majorUnits &&
      a.minorUnits == b.minorUnits
    );
  }

  numericValueC(ccq: CompleteCompositeQuantity): number {
    let { qty, unitInfo } = ccq;
    let total = qty.majorUnits;

    if (!UnitInfoM.isCountable(unitInfo))
      total += qty.minorUnits / unitInfo.divisions;

    return total * qty.containers;
  }
})());
