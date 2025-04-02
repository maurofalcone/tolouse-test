import { v4 as uuidv4 } from "uuid";

type SymbolState = {
  isValid: boolean;
  position: string;
  revertedSelection: boolean;
  isChecked: boolean;
};

export type GeneratedGridType = SymbolState & {
  id: string;
};

const list: SymbolState[] = [
  {
    isValid: true,
    position: "bottom",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: true,
    position: "right",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: true,
    position: "top-right",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: false,
    position: "top-left",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: false,
    position: "left",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: false,
    position: "top",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: false,
    position: "bottom-left",
    revertedSelection: false,
    isChecked: false,
  },
  {
    isValid: false,
    position: "bottom-right",
    revertedSelection: false,
    isChecked: false,
  },
];

// Función para obtener un elemento aleatorio de la lista
const getRandomItem = (): GeneratedGridType => ({
  ...list[Math.floor(Math.random() * list.length)],
  id: uuidv4(),
});

// Función para generar la cuadrícula
export const generateGrid = (
  width: number,
  height: number
): GeneratedGridType[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, getRandomItem)
  );
};

export const getResults = (
  grid: GeneratedGridType[][],
  items: Map<string, GeneratedGridType>
) => {
  const aciertos: GeneratedGridType[] = [];
  const errores: GeneratedGridType[] = [];
  const omisiones: GeneratedGridType[] = [];

  grid.forEach((rows) => {
    rows.forEach((cell) => {
      const checkedItem = items.get(cell.id);
      if (checkedItem) {
        if (cell.isValid && checkedItem.isChecked) {
          if (!checkedItem.revertedSelection) {
            aciertos.push(checkedItem);
          } else {
            errores.push(checkedItem);
          }
        } else if (!cell.isValid && checkedItem.isChecked) {
          if (!checkedItem.revertedSelection) {
            errores.push(checkedItem);
          } else {
            aciertos.push(checkedItem);
          }
        }
      } else {
        // si es valida pero no esta checkeada es una omision
        if (cell.isValid) {
          omisiones.push(cell);
        } else {
          aciertos.push(cell);
        }
      }
    });
  });
  const A = aciertos.length;
  const E = errores.length;
  const O = omisiones.length;

  const INDICE_DE_CONCENTRACION = ((A - E) * 100) / (A + O);
  return {
    A,
    E,
    O,
    IC: INDICE_DE_CONCENTRACION,
  };
};
