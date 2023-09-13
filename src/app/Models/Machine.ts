export enum Machine {
  SYSTEME_DE_ROBOT = 'système de robotique',
  SYSTEME_DE_PERFUSION = 'système de perfusion',
  SYSTEME_D_ASSISTANCE_CARDIAQUE = 'système d\'assistance cardiaque',
  SYSTEME_D_DIALYSE = 'système de dialyse',
  SYSTEME_D_ANALGESIE = 'système d\'analgésie',

}
export function getLabelFromValue(value: string): string | undefined {
  const keys = Object.keys(Machine) as (keyof typeof Machine)[];
  for (const key of keys) {
    if (Machine[key] === value) {
      return key;
    }
  }
  return undefined;
}



export type MachineEnum = keyof typeof Machine;
