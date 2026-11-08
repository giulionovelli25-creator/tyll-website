// Tyll explained one way everywhere: three parts, each holding the products the demo lists, in the demo's order. The
// homepage story, the Solutions menu and the overview page all read from here; the names and lines are in
// `home.parts` in each language file.
import type { SolutionKey } from '../i18n/routes';

export const parts = [['waste', 'stock'], ['forecasting'], ['revenue', 'finance', 'pour']] as const satisfies readonly (readonly SolutionKey[])[];
