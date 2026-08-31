import { ELEMENTS } from "./elements";

// Known molecules keyed by exact elemental composition (symbol -> count).
export const MOLECULES = [
  { formula: "H\u2082", name: "Hydrogen gas", composition: { H: 2 } },
  { formula: "O\u2082", name: "Oxygen gas", composition: { O: 2 } },
  { formula: "N\u2082", name: "Nitrogen gas", composition: { N: 2 } },
  { formula: "F\u2082", name: "Fluorine gas", composition: { F: 2 } },
  { formula: "Cl\u2082", name: "Chlorine gas", composition: { Cl: 2 } },
  { formula: "Br\u2082", name: "Bromine", composition: { Br: 2 } },
  { formula: "I\u2082", name: "Iodine", composition: { I: 2 } },
  { formula: "P\u2084", name: "White phosphorus", composition: { P: 4 } },
  { formula: "S\u2088", name: "Sulfur", composition: { S: 8 } },
  { formula: "H\u2082O", name: "Water", composition: { H: 2, O: 1 } },
  { formula: "H\u2082O\u2082", name: "Hydrogen peroxide", composition: { H: 2, O: 2 } },
  { formula: "HF", name: "Hydrogen fluoride", composition: { H: 1, F: 1 } },
  { formula: "HCl", name: "Hydrochloric acid", composition: { H: 1, Cl: 1 } },
  { formula: "HBr", name: "Hydrogen bromide", composition: { H: 1, Br: 1 } },
  { formula: "HI", name: "Hydrogen iodide", composition: { H: 1, I: 1 } },
  { formula: "H\u2082S", name: "Hydrogen sulfide", composition: { H: 2, S: 1 } },
  { formula: "CO", name: "Carbon monoxide", composition: { C: 1, O: 1 } },
  { formula: "CO\u2082", name: "Carbon dioxide", composition: { C: 1, O: 2 } },
  { formula: "CH\u2084", name: "Methane", composition: { C: 1, H: 4 } },
  { formula: "CH\u2084O", name: "Methanol", composition: { C: 1, H: 4, O: 1 } },
  { formula: "C\u2082H\u2086O", name: "Ethanol", composition: { C: 2, H: 6, O: 1 } },
  { formula: "C\u2082H\u2084", name: "Ethylene", composition: { C: 2, H: 4 } },
  { formula: "C\u2082H\u2082", name: "Acetylene", composition: { C: 2, H: 2 } },
  { formula: "C\u2082H\u2086", name: "Ethane", composition: { C: 2, H: 6 } },
  { formula: "C\u2083H\u2088", name: "Propane", composition: { C: 3, H: 8 } },
  { formula: "C\u2084H\u2081\u2080", name: "Butane", composition: { C: 4, H: 10 } },
  { formula: "C\u2086H\u2081\u2082O\u2086", name: "Glucose", composition: { C: 6, H: 12, O: 6 } },
  { formula: "NH\u2083", name: "Ammonia", composition: { N: 1, H: 3 } },
  { formula: "PH\u2083", name: "Phosphine", composition: { P: 1, H: 3 } },
  { formula: "NO", name: "Nitric oxide", composition: { N: 1, O: 1 } },
  { formula: "NO\u2082", name: "Nitrogen dioxide", composition: { N: 1, O: 2 } },
  { formula: "N\u2082O", name: "Nitrous oxide", composition: { N: 2, O: 1 } },
  { formula: "N\u2082O\u2084", name: "Dinitrogen tetroxide", composition: { N: 2, O: 4 } },
  { formula: "SO\u2082", name: "Sulfur dioxide", composition: { S: 1, O: 2 } },
  { formula: "SO\u2083", name: "Sulfur trioxide", composition: { S: 1, O: 3 } },
  { formula: "H\u2082SO\u2084", name: "Sulfuric acid", composition: { H: 2, S: 1, O: 4 } },
  { formula: "HNO\u2083", name: "Nitric acid", composition: { H: 1, N: 1, O: 3 } },
  { formula: "H\u2083PO\u2084", name: "Phosphoric acid", composition: { H: 3, P: 1, O: 4 } },
  { formula: "H\u2082CO\u2083", name: "Carbonic acid", composition: { H: 2, C: 1, O: 3 } },
  { formula: "NaCl", name: "Sodium chloride", composition: { Na: 1, Cl: 1 } },
  { formula: "NaOH", name: "Sodium hydroxide", composition: { Na: 1, O: 1, H: 1 } },
  { formula: "KOH", name: "Potassium hydroxide", composition: { K: 1, O: 1, H: 1 } },
  { formula: "NaHCO\u2083", name: "Sodium bicarbonate", composition: { Na: 1, H: 1, C: 1, O: 3 } },
  { formula: "Na\u2082CO\u2083", name: "Sodium carbonate", composition: { Na: 2, C: 1, O: 3 } },
  { formula: "CaCO\u2083", name: "Calcium carbonate", composition: { Ca: 1, C: 1, O: 3 } },
  { formula: "CaO", name: "Quicklime", composition: { Ca: 1, O: 1 } },
  { formula: "MgO", name: "Magnesium oxide", composition: { Mg: 1, O: 1 } },
  { formula: "Al\u2082O\u2083", name: "Aluminum oxide", composition: { Al: 2, O: 3 } },
  { formula: "Fe\u2082O\u2083", name: "Hematite", composition: { Fe: 2, O: 3 } },
  { formula: "Fe\u2083O\u2084", name: "Magnetite", composition: { Fe: 3, O: 4 } },
  { formula: "SiO\u2082", name: "Silica", composition: { Si: 1, O: 2 } },
  { formula: "P\u2082O\u2085", name: "Phosphorus pentoxide", composition: { P: 2, O: 5 } },
  { formula: "NH\u2084Cl", name: "Ammonium chloride", composition: { N: 1, H: 4, Cl: 1 } },
  { formula: "Na\u2082O", name: "Sodium oxide", composition: { Na: 2, O: 1 } },
  { formula: "K\u2082O", name: "Potassium oxide", composition: { K: 2, O: 1 } },
  { formula: "CaCl\u2082", name: "Calcium chloride", composition: { Ca: 1, Cl: 2 } },
  { formula: "Ca(OH)\u2082", name: "Calcium hydroxide", composition: { Ca: 1, O: 2, H: 2 } },
  { formula: "MgCl\u2082", name: "Magnesium chloride", composition: { Mg: 1, Cl: 2 } },
  { formula: "KCl", name: "Potassium chloride", composition: { K: 1, Cl: 1 } },
  { formula: "AgCl", name: "Silver chloride", composition: { Ag: 1, Cl: 1 } },
  { formula: "AgBr", name: "Silver bromide", composition: { Ag: 1, Br: 1 } },
  { formula: "CuO", name: "Copper(II) oxide", composition: { Cu: 1, O: 1 } },
  { formula: "Cu\u2082O", name: "Copper(I) oxide", composition: { Cu: 2, O: 1 } },
  { formula: "ZnO", name: "Zinc oxide", composition: { Zn: 1, O: 1 } },
  { formula: "ZnS", name: "Zinc sulfide", composition: { Zn: 1, S: 1 } },
  { formula: "CuSO\u2084", name: "Copper sulfate", composition: { Cu: 1, S: 1, O: 4 } },
  { formula: "FeCl\u2083", name: "Iron(III) chloride", composition: { Fe: 1, Cl: 3 } },
  { formula: "AlCl\u2083", name: "Aluminum chloride", composition: { Al: 1, Cl: 3 } },
  { formula: "NaNO\u2083", name: "Sodium nitrate", composition: { Na: 1, N: 1, O: 3 } },
  { formula: "KNO\u2083", name: "Potassium nitrate", composition: { K: 1, N: 1, O: 3 } },
  { formula: "KMnO\u2084", name: "Potassium permanganate", composition: { K: 1, Mn: 1, O: 4 } },
  { formula: "BaSO\u2084", name: "Barium sulfate", composition: { Ba: 1, S: 1, O: 4 } },
  { formula: "Na\u2082SO\u2084", name: "Sodium sulfate", composition: { Na: 2, S: 1, O: 4 } },
  { formula: "CCl\u2084", name: "Carbon tetrachloride", composition: { C: 1, Cl: 4 } },
  { formula: "CS\u2082", name: "Carbon disulfide", composition: { C: 1, S: 2 } },
  { formula: "BF\u2083", name: "Boron trifluoride", composition: { B: 1, F: 3 } },
  { formula: "BCl\u2083", name: "Boron trichloride", composition: { B: 1, Cl: 3 } },
];

// Runs / puzzles. composition is the target molecule's elemental makeup.
export const RUNS = [
  { id: "01", formula: "H\u2082O", name: "Water", tagline: "The universal solvent", level: "WARM-UP", composition: { H: 2, O: 1 } },
  { id: "02", formula: "NH\u2083", name: "Ammonia", tagline: "A sharp-smelling gas", level: "PRACTICE", composition: { N: 1, H: 3 } },
  { id: "03", formula: "CO\u2082", name: "Carbon dioxide", tagline: "A breath of carbon", level: "PRACTICE", composition: { C: 1, O: 2 } },
];

function sameComp(a, b) {
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  return ak.every((k) => a[k] === b[k]);
}

export function compositionFromItems(items) {
  const c = {};
  for (const it of items) c[it.symbol] = (c[it.symbol] || 0) + 1;
  return c;
}

export function matchMolecule(composition) {
  return MOLECULES.find((m) => sameComp(m.composition, composition)) || null;
}

export function molarMass(composition) {
  let m = 0;
  for (const k in composition) {
    const el = ELEMENTS.find((e) => e.symbol === k);
    if (el) m += el.weight * composition[k];
  }
  return m;
}

export function compositionsEqual(a, b) {
  return sameComp(a, b);
}