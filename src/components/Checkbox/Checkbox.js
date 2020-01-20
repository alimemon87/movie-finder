import React from 'react';

const Checkbox = ({ type = 'checkbox', name,  onClick }) => (
   <div className="custom-control custom-checkbox">
    <input className="custom-control-input" type={type} name={name} onClick={onClick} />
    <label className="custom-control-label">Watch Movie Later</label>
  </div>
);

export default Checkbox;