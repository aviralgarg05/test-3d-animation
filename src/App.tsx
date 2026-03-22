/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLenis } from './hooks/useLenis';
import { Hero } from './components/Hero';
import { Logomark } from './components/Logomark';
import { MoltenColors } from './components/MoltenColors';
import { KineticTypography } from './components/KineticTypography';
import { BrandImagery } from './components/BrandImagery';

export default function App() {
  useLenis();

  return (
    <main className="w-full bg-background min-h-screen text-text overflow-hidden">
      <Hero />
      <Logomark />
      <MoltenColors />
      <KineticTypography />
      <BrandImagery />
    </main>
  );
}
