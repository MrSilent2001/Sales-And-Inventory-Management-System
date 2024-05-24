// import * as React from 'react';
// import Checkbox from '@mui/material/Checkbox';
//
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//
// export default function Checkboxes() {
//     return (
//         <div>
//
//             <Checkbox {...label} />
//
//
//         </div>
//     );
// }

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes({ checked, onChange }) {
    return (
        <div>
            <Checkbox
                {...label}
                checked={checked} // Pass checked prop to the Checkbox component
                onChange={onChange} // Pass onChange prop to the Checkbox component
            />
        </div>
    );
}
