'use client';

import Link from "next/link";
import React, { useState } from "react";

const About = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="d-flex justify-content-between align-items-center p-3 shadow">
      <div>
        <h3>Crea el component ‘Header’ amb un menú de navegació per a les vistes.</h3>
        <h3>Crea la vista MovieExplorer fent servir el prototip. Crea la vista About amb l’enunciat de l’examen.</h3>
      </div>
    </main>
  );
};

export default About;