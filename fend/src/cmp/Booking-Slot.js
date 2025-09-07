// Booking-Slot.jsx
import React, { useState, useMemo } from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, FormHelperText,Typography,} from "@mui/material";

const BookingSlot = ({ onSlotChange, slotDetails = [], isDateSelected = false }) => {
  const [selectedSlot, setSelectedSlot] = useState("");

  const hasAnySlot = slotDetails.length > 0;
  const hasEnabledSlot = useMemo(
    () => slotDetails.some(s => !s.disabled),
    [slotDetails]
  );

  const shouldDisableGroup = !isDateSelected || !hasAnySlot || !hasEnabledSlot;

  const handleSlotChange = (event) => {
    const slot = event.target.value;
    setSelectedSlot(slot); 
    // Update the state with the selected slot value
    
    //********* Pass the selected slot value to the parent
    onSlotChange(slot); 
  };

  return (
    <FormControl required component="fieldset"
    sx={{
        // Hide the red asterisk from required FormLabel
        "& .MuiFormLabel-asterisk": { display: "none" },
      }}>
      <FormLabel component="legend">Select Slot</FormLabel>

      {/* Notes, per your rules */}
      {!isDateSelected ? (
        <FormHelperText sx={{ fontSize: 12, mb: 1 }}>
          Select a date to enable slots.
        </FormHelperText>
      ) : !hasAnySlot || !hasEnabledSlot ? (
        <FormHelperText sx={{ fontSize: 12, mb: 1, color: "error.main" }}>
          No slots available for selected date
        </FormHelperText>
      ) : (
        <FormHelperText variant="caption" sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
          (Note : Can select only one slot at a time)
        </FormHelperText>
      )}

      <RadioGroup value={selectedSlot} onChange={handleSlotChange}
        sx={{
          pointerEvents: shouldDisableGroup ? "none" : "auto",
          opacity: shouldDisableGroup ? 0.5 : 1,
        }}
      >
        {slotDetails.map((slot, idx) => (
          <FormControlLabel
            key={slot.value ?? idx}
            value={slot.value}
            control={<Radio />}
            label={slot.value}
            disabled={shouldDisableGroup || slot.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default BookingSlot;
