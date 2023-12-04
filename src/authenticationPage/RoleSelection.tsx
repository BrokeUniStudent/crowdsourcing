import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const roles = ["participant", "researcher", "reviewer"]

export default function RoleSelection() {
    const [alignment, setAlignment] = useState<string | null>(roles[0]);

    const handleAlignment = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string | null,
    ) => {
      setAlignment(newAlignment);
    };
  
    return (
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="primary"
      >
        {roles.map(role => <ToggleButton value={role}>{role}</ToggleButton>)}
      </ToggleButtonGroup>
    );
}