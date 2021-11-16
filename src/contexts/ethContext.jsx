import React, { useContext, createContext } from 'react';

const EthContext = createContext(null);

/**
 * Add an ethContext React context and some scaffolding code such that the
 * `PixelArt` component exposes some injection sites for functions that
 * interact with the Ethereum chain. The `EthContextProvider` takes a
 * function with the following signature:
 *
 * ```
 * interface RGBA {
 *     // r, g, and b are integers between [0, 255]
 *     r: number,
 *     g: number,
 *     b: number,
 *
 *     // a is a float in [0, 1]
 *     a: number
 * }
 *
 * // grid is a 2D grid, so each inner array must be the same length
 * (grid: Array<Array<RGBA>>): boolean
 * ```
 *
 * The return value is whether minting succeeded or failed.
 */
function EthContextProvider({ mintFn, children }) {
  return (
    <EthContext.Provider value={{ mintFn }}>{children}</EthContext.Provider>
  );
}

function useEthContext() {
  const context = useContext(EthContext);
  if (context === null) {
    throw new Error('context is not initialized. Use EthContextProvider');
  }
  return context;
}

export { EthContextProvider, useEthContext };
