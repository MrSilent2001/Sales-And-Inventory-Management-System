import React from 'react';

function InputLabel({ htmlFor, color, fontsize, fontweight, children }) {
    return (
        <label htmlFor={htmlFor} className="input-label" style={{ fontSize: fontsize, fontWeight: fontweight, color: color }}>
            {children}
        </label>
    );
}

export default InputLabel;