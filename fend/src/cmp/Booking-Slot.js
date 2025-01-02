import React, { useState } from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";

const SlotSelector = ({ onSlotChange,slotDetails }) => {
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleSlotChange = (event) => {
    const slot = event.target.value;
    setSelectedSlot(slot); 
    // Update the state with the selected slot value
    
    //********* Pass the selected slot value to the parent
    onSlotChange(slot); 
  };
 
  return (
    <FormControl required component="fieldset">
      <FormLabel component="legend">Select Slot</FormLabel>
      <RadioGroup value={selectedSlot} onChange={handleSlotChange}>
      {slotDetails.map((slot, index) => (
          <FormControlLabel
            key={index} // Key should be unique for each element in the list
            control={<Radio value={slot.value} slotDetailsd={slot.slotDetailsd} disabled={slot.disabled}/>}
            label={slot.value}
          />
        ))}
    </RadioGroup>
    </FormControl>
  );
};

export default SlotSelector;