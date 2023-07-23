import { Select, selectOptions } from './Select';
import { useState } from 'react';

// npx prettier --write .\src\App.tsx

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
];

function App() {
  const [value1, setValue1] = useState<selectOptions[]>([options[0]]);
  const [value2, setValue2] = useState<selectOptions | undefined>(options[0]);

  return (
    <>
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />
      <br />
      <Select options={options} value={value2} onChange={(o) => setValue2(o)} />
    </>
  );
}

export default App;
