export enum ViewState {
  MORPHOLOGY = 'MORPHOLOGY', // Dashboard
  SEQUENCER = 'SEQUENCER',   // Data
  MYCELIUM = 'MYCELIUM',     // Process
  SYNAPSES = 'SYNAPSES',     // Analytics
  HOMEOSTASIS = 'HOMEOSTASIS' // Settings/Controls
}

export interface NavNode {
  id: ViewState;
  label: string;
  icon: any; 
  description: string;
}

export interface Organelle {
  id: string;
  name: string;
  function: string;
  energyLevel: number;
  status: 'stable' | 'mitosis' | 'apoptosis';
}