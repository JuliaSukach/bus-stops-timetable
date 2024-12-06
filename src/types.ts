// Shared TypeScript Interfaces and Types

/**
 * Represents a bus stop with relevant details.
 */
export interface Stop {
    line: number; // The line number associated with the bus stop
    stop: string; // Name of the bus stop
    order: number; // Order of the stop within the line
    time: string; // Time associated with the stop
  }
  